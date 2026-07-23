import {
  createFolder,
  createPage,
  deleteFolder,
  deletePage,
  editPage,
  ensureBookNavPage,
  folderExists,
  MalformedPageError,
  moveAsset,
  pageExists,
  publishAsset,
  publishBookArtifacts,
  publishGlobalArtifacts,
  publishPageAndArtifacts,
  readFile,
  readFolder,
  readPage,
  removeManifestEntries,
  removeManifestEntry,
  upsertFile,
  type AssetType,
  type CascadeConfig,
  type MetadataFields,
  type StructuredDataFields,
} from "@docs-platform/cascade-client";
import { normalizeHtml, slugify } from "@docs-platform/doc-core";
import type { NavFolder, NavPage, SearchEntry } from "@docs-platform/doc-shell";
import { validateCascadeLogin } from "./lib/cascade-login.js";
import { cascadeConfigFromEnv } from "./lib/cascade-config.js";
import type { Env } from "./lib/env.js";
import { errorResponse, json } from "./lib/http.js";
import {
  clearSessionCookie,
  createSessionCookie,
  SessionAuthError,
  verifySession,
  type SessionIdentity,
} from "./lib/session.js";

/** docs/<book-slug>/... -- publishPageAndArtifacts needs the book slug to publish its nav.json. */
function bookSlugFromPath(path: string): string {
  const slug = path.split("/")[1];
  if (!slug) throw new Error(`path has no book segment: ${path}`);
  return slug;
}

/**
 * Order for a newly created page: after all existing siblings. Falls back to
 * doc-core's own frontmatter default (500 -- see frontmatter.ts) when the
 * folder has no page children yet, so a fresh web-created page interleaves
 * sensibly with git-authored pages instead of always sorting first.
 */
async function nextPageOrder(config: CascadeConfig, parentPath: string): Promise<number> {
  const folder = await readFolder(config, parentPath);
  const siblingPages = folder.children.filter((c) => c.type === "page");
  if (siblingPages.length === 0) return 500;
  const orders = await Promise.all(siblingPages.map((c) => readPage(config, c.path).then((p) => p.fields.order)));
  return Math.max(...orders) + 10;
}

/**
 * Live equivalent of nav-format.vm's output for one book (editor-
 * implementation-plan.md E4/E-Shell): a flat `{ folders, pages }` shape
 * doc-shell's buildTree() groups into a tree, built directly from Cascade
 * REST instead of fetching the *published* nav.json artifact. The published
 * static docs site's hostname isn't wired into this app at all (see
 * editor-implementation-plan.md section 7 -- only the editor's own
 * `*.pages.dev` hostname is settled; the git path's publish destination is
 * still "the existing static web server", no fixed URL in any env var
 * here), so cross-origin-fetching it would be undefined behavior. Reading
 * live from Cascade instead also means the editor's own front-door never
 * waits on the publish-lag §4b already accepts for the *public* site.
 * Docs are two levels deep (book -> chapter -> page, chapters don't nest --
 * see DocsTree's depthOf reasoning), so this is a bounded two-level walk.
 */
/** Chapter folder paths + page paths one level down under a book, without reading any page content. */
async function listBookChildren(config: CascadeConfig, bookPath: string): Promise<{ folderPaths: string[]; pagePaths: string[] }> {
  const bookFolder = await readFolder(config, bookPath);
  const chapterFolders = bookFolder.children.filter((c) => c.type === "folder");
  const rootPages = bookFolder.children.filter((c) => c.type === "page");
  const chapterPages = await Promise.all(
    chapterFolders.map(async (chapter) => (await readFolder(config, chapter.path)).children.filter((c) => c.type === "page")),
  );
  return {
    folderPaths: chapterFolders.map((c) => c.path),
    pagePaths: [...rootPages, ...chapterPages.flat()].map((c) => c.path),
  };
}

async function buildBookNav(config: CascadeConfig, bookPath: string): Promise<{ folders: NavFolder[]; pages: NavPage[] }> {
  const { folderPaths, pagePaths } = await listBookChildren(config, bookPath);
  // Same tolerance as GET /api/tree: one page with structured data that
  // doesn't match the current DD shouldn't 500 the whole book's nav -- drop
  // it from the list instead (it's still reachable directly, where GET
  // /api/page reports the malformed-page error specifically).
  const results = await Promise.all(
    pagePaths.map(async (p) => {
      try {
        return await readPage(config, p);
      } catch (err) {
        console.error(`[api] nav: failed to read page ${p}, omitting from nav`, err);
        return null;
      }
    }),
  );
  const pages = results.filter((p): p is NonNullable<typeof p> => p !== null);
  pages.sort((a, b) => a.fields.order - b.fields.order);

  return {
    folders: folderPaths.map((path) => ({ type: "folder", path })),
    pages: pages.map((p) => ({
      type: "page",
      path: p.path,
      title: p.fields.title,
      order: String(p.fields.order),
      tags: p.fields.tags,
    })),
  };
}

/**
 * Image uploads only (editor-implementation-plan.md E3) -- maps a browser
 * File's name/MIME type to the extension the asset is stored under in
 * Cascade, and back again for GET /api/file's Content-Type. Keyed by
 * extension (not MIME string) since that's what upsertFile's path needs;
 * MIME is only consulted as a fallback when the filename has none.
 */
const IMAGE_EXTENSIONS: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
};
const MIME_TO_EXTENSION: Record<string, string> = Object.fromEntries(
  Object.entries(IMAGE_EXTENSIONS).map(([ext, mime]) => [mime, ext]),
);

/** Extension for a newly uploaded image, or null if it's not one of IMAGE_EXTENSIONS. */
function imageExtensionFor(fileName: string, mimeType: string): string | null {
  const fromName = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
  if (fromName in IMAGE_EXTENSIONS) return fromName;
  return MIME_TO_EXTENSION[mimeType] ?? null;
}

/** Content-Type for GET /api/file, from the stored asset's own extension. */
function contentTypeForPath(path: string): string {
  const ext = path.slice(path.lastIndexOf(".") + 1).toLowerCase();
  return IMAGE_EXTENSIONS[ext] ?? "application/octet-stream";
}

/** Plain-text excerpt from canonical body HTML, mirroring _shared.vm's extractDocFields (strip tags, truncate to 200). */
function excerptFromHtml(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length <= 200 ? text : `${text.slice(0, 200).trimEnd()}...`;
}

/** Every Documentation Page path under docs/, across every book (for the cmdk search index). Skips docs/_system, the derived-artifact output area. */
async function listAllPagePaths(config: CascadeConfig): Promise<string[]> {
  const root = await readFolder(config, "docs");
  const books = root.children.filter((c) => c.type === "folder" && c.path !== "docs/_system");
  const perBook = await Promise.all(books.map((b) => listBookChildren(config, b.path)));
  return perBook.flatMap((b) => b.pagePaths);
}

/**
 * Why a folder delete can't just be forwarded to Cascade blindly: the confirm
 * dialog needs child counts the tree doesn't have (it lazy-loads one folder
 * per expand), and the git-owned guard has to consider every descendant page,
 * not the folder asset itself (folders carry no origin metadata). Both the
 * GET preflight route and DELETE /api/folder run this same walk -- the GET is
 * only advisory for the dialog; the DELETE re-checks authoritatively.
 */
interface FolderDeletePreflight {
  /** Descendant pages (malformed ones included -- they die with the folder too). */
  pages: number;
  /** Descendant folders (chapters when deleting a book). */
  chapters: number;
  /** Descendant file attachments. */
  files: number;
  /** docIds of every readable descendant page, for manifest cleanup after the delete. */
  docIds: string[];
  /** Every descendant page path -- waitForPagesGone() polls these after the delete (never returned to the client). */
  pagePaths: string[];
  /** Set when any descendant page is git-owned -- blocks the delete with a 409. */
  gitOwned: { count: number; examplePath: string; repo?: string } | null;
}

async function listDescendants(
  config: CascadeConfig,
  folderPath: string,
): Promise<{ pagePaths: string[]; folderPaths: string[]; filePaths: string[] }> {
  const folder = await readFolder(config, folderPath);
  const pagePaths: string[] = [];
  const folderPaths: string[] = [];
  const filePaths: string[] = [];
  // Docs are two levels deep in practice (see buildBookNav's comment), but
  // walk unbounded rather than hard-coding that.
  await Promise.all(
    folder.children.map(async (child) => {
      if (child.type === "folder") {
        folderPaths.push(child.path);
        const nested = await listDescendants(config, child.path);
        pagePaths.push(...nested.pagePaths);
        folderPaths.push(...nested.folderPaths);
        filePaths.push(...nested.filePaths);
      } else if (child.type === "page") {
        pagePaths.push(child.path);
      } else {
        filePaths.push(child.path);
      }
    }),
  );
  return { pagePaths, folderPaths, filePaths };
}

async function folderDeletePreflight(config: CascadeConfig, folderPath: string): Promise<FolderDeletePreflight> {
  const { pagePaths, folderPaths, filePaths } = await listDescendants(config, folderPath);
  const pages = await Promise.all(
    pagePaths.map(async (p) => {
      try {
        return await readPage(config, p);
      } catch (err) {
        // A page whose stored data no longer matches the current DD can't be
        // *read*, but it deletes with the folder just fine -- count it as a
        // deletable web-owned page (no docId to clean up) instead of letting
        // one broken asset block the whole folder.
        if (err instanceof MalformedPageError) {
          console.warn(`[api] folder delete: treating malformed page ${p} as web-owned`);
          return null;
        }
        throw err;
      }
    }),
  );

  const docIds: string[] = [];
  let gitOwned: FolderDeletePreflight["gitOwned"] = null;
  for (const page of pages) {
    if (!page) continue;
    if (page.metadata.docId) docIds.push(page.metadata.docId);
    if (page.metadata.origin === "git") {
      gitOwned ??= { count: 0, examplePath: page.path, repo: page.metadata.sourceRepoPath };
      gitOwned.count++;
    }
  }
  return { pages: pagePaths.length, chapters: folderPaths.length, files: filePaths.length, docIds, pagePaths, gitOwned };
}

/**
 * Confirmed against a live instance: folder delete removes the whole subtree
 * in one call, but *descendants* disappear asynchronously -- the folder
 * itself is gone immediately while its pages still read back for a few
 * seconds afterward. Republishing nav/search-index in that window would bake
 * the doomed pages right back into the artifacts (their Formats query live
 * state at publish time), so wait -- bounded -- for the descendants to
 * actually vanish before republishing.
 */
async function waitForPagesGone(config: CascadeConfig, pagePaths: string[]): Promise<void> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const exists = await Promise.all(pagePaths.map((p) => pageExists(config, p)));
    if (!exists.some(Boolean)) return;
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  console.warn(
    "[api] folder delete: descendants still readable after waiting; derived artifacts may briefly list deleted pages",
  );
}

/**
 * Paths a folder delete must refuse even though the tree never offers them
 * (nothing stops a direct API call): the docs root, the derived-artifact
 * area, and the shared uploads root. Per-book docs/uploads/<slug> stays
 * deletable -- it dies automatically with its book below.
 */
function folderDeletePathError(path: string): string | null {
  const segments = path.split("/").filter(Boolean);
  if (segments[0] !== "docs" || segments.length < 2) {
    return "only folders under docs/ can be deleted";
  }
  if (segments[1] === "_system") {
    return "docs/_system holds derived artifacts, not deletable content";
  }
  if (segments.length === 2 && segments[1] === "uploads") {
    return "docs/uploads is the shared image area; a book's own uploads are removed when the book is deleted";
  }
  return null;
}

/**
 * Cloudflare Pages "Advanced Mode" entry point: a single self-contained
 * Worker module (bundled to out/_worker.js by build-worker.mjs) that owns
 * every request, instead of Pages' file-based Functions routing. Switched
 * to this from functions/api/[[route]].ts because Pages' own
 * Functions-bundling step can't resolve @docs-platform/cascade-client -- it
 * runs in a separate, older, sandboxed Wrangler process that doesn't follow
 * the pnpm symlink out of apps/editor's root directory into
 * ../../packages/cascade-client, even though the real `next build` step (run
 * with full monorepo access) has no such problem. A _worker.js at the output
 * root makes Pages skip Functions-bundling entirely and deploy this
 * pre-bundled file as-is -- same fix as actions/publish/esbuild.config.mjs
 * for the same class of problem (a consumer that can't do its own
 * monorepo-aware dependency resolution).
 */
interface WorkerEnv extends Env {
  /** Static asset binding Pages injects in Advanced Mode -- serves everything `next build` put in out/. */
  ASSETS: Fetcher;
}

/**
 * POST /api/login -- the one place the user's own Cascade credentials are
 * ever seen (cascade-auth-migration-plan.md section 2.2). Validates them
 * against Cascade, checks docs-site membership, and mints the app session
 * cookie. Distinct 401 vs 403 bodies: the login form shows different
 * messages for "wrong password" and "your account was never granted the
 * docs site" (the latter is the one people will actually hit).
 */
async function handleLogin(request: Request, env: Env): Promise<Response> {
  const body = (await request.json().catch(() => null)) as { username?: unknown; password?: unknown } | null;
  if (typeof body?.username !== "string" || typeof body?.password !== "string" || body.username === "" || body.password === "") {
    return json({ error: "bad-request", message: "username and password are required" }, { status: 400 });
  }

  // Branch logs are for `wrangler pages deployment tail` during manual
  // browser testing (username only -- the password never leaves `body`).
  const result = await validateCascadeLogin(body.username, body.password, env);
  if (result.ok === "unauthorized") {
    console.warn(`[api] login: 401 for ${body.username} (Cascade did not confirm the credentials)`);
    return json({ error: "unauthorized", message: "The username or password is incorrect" }, { status: 401 });
  }
  if (result.ok === "forbidden") {
    console.warn(`[api] login: 403 for ${body.username} (valid Cascade account without docs-site access)`);
    return json({ error: "forbidden", message: "This Cascade account doesn't have access to the docs site" }, { status: 403 });
  }

  console.log(`[api] login: 200 for ${body.username}`);
  const cookie = await createSessionCookie(body.username, result.email, env);
  return json({ username: body.username, email: result.email }, { headers: { "set-cookie": cookie } });
}

async function handleApi(request: Request, env: WorkerEnv): Promise<Response> {
  const url = new URL(request.url);
  const route = url.pathname.replace(/^\/api\/?/, "");

  // Login/logout are reachable without a session -- everything else 401s
  // first. Logout needs no auth: clearing a cookie is harmless, and a
  // half-expired session should still be able to sign out cleanly.
  if (request.method === "POST" && route === "login") {
    try {
      return await handleLogin(request, env);
    } catch (err) {
      return errorResponse(err);
    }
  }
  if (request.method === "POST" && route === "logout") {
    return json({ ok: true }, { headers: { "set-cookie": clearSessionCookie() } });
  }

  let session: SessionIdentity;
  try {
    session = await verifySession(request, env);
  } catch (err) {
    if (err instanceof SessionAuthError) {
      return json({ error: "unauthorized", message: err.message }, { status: 401 });
    }
    throw err;
  }

  const response = await handleAuthedApi(request, env, session);
  // Sliding session (plan section 2.4): verifySession minted a fresh cookie
  // when <7 days remained -- attach it to whatever this request returned.
  if (session.refreshedCookie) {
    response.headers.append("set-cookie", session.refreshedCookie);
  }
  return response;
}

async function handleAuthedApi(request: Request, env: WorkerEnv, session: SessionIdentity): Promise<Response> {
  // What gets stamped into pages' authorEmail metadata: the account's real
  // email when the login-time lookup got one, else the bare Cascade username
  // (plan section 4 -- option b with fallback to c; never fabricate an
  // address by appending a domain).
  const authorEmail = session.email ?? session.username;
  const url = new URL(request.url);
  const route = url.pathname.replace(/^\/api\/?/, "");
  const config = cascadeConfigFromEnv(env);

  try {
    if (request.method === "GET" && route === "me") {
      return json({ username: session.username, email: session.email });
    }

    if (request.method === "GET" && route === "tree") {
      const path = url.searchParams.get("path") ?? "docs";
      const folder = await readFolder(config, path);
      // docs/_system holds derived artifacts (nav, etc.) that the editor UI
      // itself writes -- it's not real content, so keep it out of the tree
      // the same way listAllPagePaths already does for search.
      const visibleChildren = folder.children.filter((child) => child.path !== "docs/_system");
      // readFolder's own displayName is derived from the path segment (see
      // its comment in assets.ts) -- for pages, swap in the real DD `title`
      // so the tree shows what editors actually typed and an inline rename
      // (which writes both slug and title together) visibly reflects what
      // was submitted. Bounded to one folder's worth of children at a time
      // (lazy per-expand loading), so this stays cheap even though it's an
      // extra read per page.
      const children = await Promise.all(
        visibleChildren.map(async (child) => {
          if (child.type !== "page") return child;
          // A page whose structured data doesn't match the current Documentation
          // Page DD (e.g. a stray/partial asset from a script or a manual edit)
          // throws out of readPage/fromStructuredData -- don't let one bad page
          // 500 the whole folder's listing. Fall back to readFolder's
          // path-derived displayName instead.
          try {
            const page = await readPage(config, child.path);
            return { ...child, displayName: page.fields.title };
          } catch (err) {
            console.error(`[api] tree: failed to read page ${child.path}, using path-derived name`, err);
            return child;
          }
        }),
      );
      return json({ path: folder.path, children });
    }

    if (request.method === "GET" && route === "nav") {
      const path = url.searchParams.get("path");
      if (!path) {
        return json({ error: "bad-request", message: "path query param is required" }, { status: 400 });
      }
      const nav = await buildBookNav(config, path);
      return json(nav);
    }

    if (request.method === "GET" && route === "search-index") {
      const paths = await listAllPagePaths(config);
      // Same tolerance as GET /api/tree and /api/nav -- one malformed page
      // anywhere on the site shouldn't take down search for everyone.
      const pages = await Promise.all(
        paths.map(async (p) => {
          try {
            return await readPage(config, p);
          } catch (err) {
            console.error(`[api] search-index: failed to read page ${p}, omitting from index`, err);
            return null;
          }
        }),
      );
      const entries: SearchEntry[] = pages
        .filter((p): p is NonNullable<typeof p> => p !== null)
        .map((p) => ({
          title: p.fields.title,
          path: p.path,
          tags: p.fields.tags,
          excerpt: excerptFromHtml(p.fields.bodyHtml),
        }));
      return json({ pages: entries });
    }

    if (request.method === "GET" && route === "file") {
      const path = url.searchParams.get("path");
      if (!path) {
        return json({ error: "bad-request", message: "path query param is required" }, { status: 400 });
      }
      // Same-origin read proxy for images uploaded through E3 (see POST
      // /api/upload below): the stored/published <img src> is a root-relative
      // Cascade path, which is only reachable on the real public web server
      // (its hostname isn't configured anywhere in this app -- see the
      // buildBookNav comment above for the same constraint on nav.json). This
      // route lets the editor's own preview -- BlockNote's resolveFileUrl and
      // PageView's read-only render -- display the bytes right now, live from
      // Cascade, instead of showing a broken image until the real site
      // publishes. Access already gated this whole /api/* surface above.
      const file = await readFile(config, path);
      return new Response(file.data, {
        headers: { "content-type": contentTypeForPath(path), "cache-control": "private, max-age=300" },
      });
    }

    if (request.method === "GET" && route === "page") {
      const path = url.searchParams.get("path");
      if (!path) {
        return json({ error: "bad-request", message: "path query param is required" }, { status: 400 });
      }
      const page = await readPage(config, path);
      return json({
        path: page.path,
        version: page.version,
        title: page.fields.title,
        order: page.fields.order,
        tags: page.fields.tags,
        bodyHtml: page.fields.bodyHtml,
        origin: page.metadata.origin,
        sourceRepoPath: page.metadata.sourceRepoPath,
        editorName: page.metadata.editorName,
        authorEmail: page.metadata.authorEmail,
      });
    }

    if (request.method === "PUT" && route === "page") {
      const body = (await request.json()) as {
        path?: unknown;
        expectedVersion?: unknown;
        bodyHtml?: unknown;
        title?: unknown;
        order?: unknown;
        tags?: unknown;
      };
      if (typeof body.path !== "string" || typeof body.expectedVersion !== "string") {
        return json(
          { error: "bad-request", message: "path and expectedVersion are required strings" },
          { status: 400 },
        );
      }
      const { path, expectedVersion } = body;

      const current = await readPage(config, path);

      // Ownership (editor-implementation-plan.md section 3, extended): a web
      // save on a git-owned page takes it over -- flips origin to "web" and
      // drops sourceRepoPath, mirroring publishDoc's git-side takeover (the
      // `takeover: true` frontmatter flag flips a web-owned page back to
      // "git"). Without this flip the page would keep the git badge while
      // silently diverging from its source file, and the next git publish
      // would clobber the web edit with no warning.
      const fields: StructuredDataFields = {
        title: typeof body.title === "string" ? body.title : current.fields.title,
        order: typeof body.order === "number" ? body.order : current.fields.order,
        tags: Array.isArray(body.tags)
          ? body.tags.filter((t): t is string => typeof t === "string")
          : current.fields.tags,
        bodyHtml: typeof body.bodyHtml === "string" ? normalizeHtml(body.bodyHtml) : current.fields.bodyHtml,
      };
      const metadata: MetadataFields = {
        ...current.metadata,
        origin: "web",
        sourceRepoPath: undefined,
        authorEmail,
      };

      // editPage() re-reads the page itself and compares against
      // expectedVersion, throwing VersionConflictError (-> 409 via
      // errorResponse) on a mismatch -- no separate check needed here.
      const result = await editPage(config, path, fields, metadata, expectedVersion);
      await publishPageAndArtifacts(config, path, bookSlugFromPath(path));
      return json({ path, version: result.version });
    }

    if (request.method === "DELETE" && route === "page") {
      const path = url.searchParams.get("path");
      if (!path) {
        return json({ error: "bad-request", message: "path query param is required" }, { status: 400 });
      }

      // Same ownership guard as PUT/move: never let the web UI touch a git-owned page.
      const current = await readPage(config, path);
      if (current.metadata.origin === "git") {
        return json(
          { error: "git-owned", repo: current.metadata.sourceRepoPath },
          { status: 409 },
        );
      }

      // Hard delete (editor-implementation-plan.md section 10 item 4,
      // reversed 2026-07-23): the asset moves to Cascade's Trash -- an admin
      // can restore it there until it's purged -- and its published output is
      // unpublished in the same call (deletePage's deleteParameters).
      await deletePage(config, path, { hard: true });

      // The page is truly gone, so drop its docId from the shared manifest --
      // a formerly git-owned page that a web save took over still has an
      // entry there, and a later git-side archive would chase the dead path.
      if (current.metadata.docId) {
        await removeManifestEntry(config, current.metadata.docId);
      }

      // nav.json, search-index.json, and tags.json are separate published
      // artifacts that keep listing the deleted page until republished.
      await publishBookArtifacts(config, bookSlugFromPath(path));

      return json({ ok: true, path });
    }

    if (request.method === "POST" && route === "page") {
      const body = (await request.json()) as { parentPath?: unknown; title?: unknown; tags?: unknown };
      if (typeof body.parentPath !== "string" || typeof body.title !== "string" || body.title.trim() === "") {
        return json(
          { error: "bad-request", message: "parentPath and a non-empty title are required" },
          { status: 400 },
        );
      }
      const tags = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === "string") : [];
      const slug = slugify(body.title);
      if (!slug) {
        return json(
          { error: "bad-request", message: "title must contain at least one alphanumeric character" },
          { status: 400 },
        );
      }
      const path = `${body.parentPath}/${slug}`;

      if ((await pageExists(config, path)) || (await folderExists(config, path))) {
        return json({ error: "conflict", message: `${path} already exists` }, { status: 409 });
      }

      const order = await nextPageOrder(config, body.parentPath);
      const fields: StructuredDataFields = { title: body.title, order, tags, bodyHtml: "" };
      const metadata: MetadataFields = { docId: crypto.randomUUID(), origin: "web", authorEmail };
      await createPage(config, path, fields, metadata);
      await publishPageAndArtifacts(config, path, bookSlugFromPath(path));
      const created = await readPage(config, path);
      return json({ path, version: created.version });
    }

    if (request.method === "POST" && route === "folder") {
      const body = (await request.json()) as { parentPath?: unknown; name?: unknown };
      if (typeof body.parentPath !== "string" || typeof body.name !== "string" || body.name.trim() === "") {
        return json(
          { error: "bad-request", message: "parentPath and a non-empty name are required" },
          { status: 400 },
        );
      }
      const slug = slugify(body.name);
      if (!slug) {
        return json(
          { error: "bad-request", message: "name must contain at least one alphanumeric character" },
          { status: 400 },
        );
      }
      const path = `${body.parentPath}/${slug}`;

      if ((await folderExists(config, path)) || (await pageExists(config, path))) {
        return json({ error: "conflict", message: `${path} already exists` }, { status: 409 });
      }

      await createFolder(config, path);

      // A folder created directly under "docs" is a new book -- give it a
      // nav container immediately so it shows up in the viewer/search on
      // first publish instead of only after its first page exists.
      if (body.parentPath === "docs") {
        await ensureBookNavPage(config, slug);
      }

      return json({ path });
    }

    if (request.method === "GET" && route === "folder/delete-preflight") {
      const path = url.searchParams.get("path");
      if (!path) {
        return json({ error: "bad-request", message: "path query param is required" }, { status: 400 });
      }
      const pathError = folderDeletePathError(path);
      if (pathError) {
        return json({ error: "bad-request", message: pathError }, { status: 400 });
      }
      const { pages, chapters, files, gitOwned } = await folderDeletePreflight(config, path);
      return json({ pages, chapters, files, gitOwned });
    }

    if (request.method === "DELETE" && route === "folder") {
      const path = url.searchParams.get("path");
      if (!path) {
        return json({ error: "bad-request", message: "path query param is required" }, { status: 400 });
      }
      const pathError = folderDeletePathError(path);
      if (pathError) {
        return json({ error: "bad-request", message: pathError }, { status: 400 });
      }

      // Same ownership guard as DELETE /api/page, applied to every descendant
      // page (the folder asset itself carries no origin metadata). Re-run
      // here even though the UI already called the preflight route -- that
      // GET is only advisory, and a git page could land in this folder
      // between the two calls.
      const preflight = await folderDeletePreflight(config, path);
      if (preflight.gitOwned) {
        return json(
          {
            error: "git-owned",
            count: preflight.gitOwned.count,
            examplePath: preflight.gitOwned.examplePath,
            repo: preflight.gitOwned.repo,
          },
          { status: 409 },
        );
      }

      // Recursive hard delete: the whole subtree moves to Cascade's Trash and
      // its published output is unpublished (deleteFolder's deleteParameters).
      await deleteFolder(config, path);
      await removeManifestEntries(config, preflight.docIds);

      const segments = path.split("/").filter(Boolean);
      if (segments[1] === "uploads") {
        // A per-book image folder (docs/uploads/<slug>): images appear in no
        // nav/search artifact, so there is nothing to republish (and nothing
        // to wait for).
      } else if (segments.length >= 3) {
        await waitForPagesGone(config, preflight.pagePaths);
        // A chapter: the book's nav.json must drop the deleted subtree, and
        // the global search-index/tags must drop its pages.
        await publishBookArtifacts(config, bookSlugFromPath(path));
      } else {
        // A whole book: its nav container is now pointless -- hard-delete it
        // (which also unpublishes the published <slug>.json) instead of
        // republishing it, remove the book's uploads folder, then refresh the
        // global artifacts. publishBookArtifacts would be wrong here: its
        // ensureBookNavPage would recreate the container we just removed.
        const bookSlug = bookSlugFromPath(path);
        const navPath = `docs/_system/nav/${bookSlug}`;
        if (await pageExists(config, navPath)) {
          await deletePage(config, navPath, { hard: true });
        }
        const uploadsPath = `docs/uploads/${bookSlug}`;
        if (await folderExists(config, uploadsPath)) {
          await deleteFolder(config, uploadsPath);
        }
        await waitForPagesGone(config, preflight.pagePaths);
        await publishGlobalArtifacts(config);
      }

      return json({ ok: true, path, deletedPages: preflight.pages });
    }

    if (request.method === "POST" && route === "upload") {
      const form = await request.formData();
      const file = form.get("file");
      const pagePath = form.get("path");
      if (!(file instanceof File) || typeof pagePath !== "string" || pagePath === "") {
        return json(
          { error: "bad-request", message: "multipart form with 'file' and 'path' (the page being edited) is required" },
          { status: 400 },
        );
      }

      const MAX_BYTES = 15 * 1024 * 1024;
      if (file.size > MAX_BYTES) {
        return json({ error: "bad-request", message: "Image exceeds the 15MB upload limit" }, { status: 400 });
      }
      const ext = imageExtensionFor(file.name, file.type);
      if (!ext) {
        return json({ error: "bad-request", message: "Only image uploads (png/jpg/gif/webp/svg) are supported" }, { status: 400 });
      }

      const uploadPath = `docs/uploads/${bookSlugFromPath(pagePath)}/${crypto.randomUUID()}.${ext}`;
      const data = Buffer.from(await file.arrayBuffer());
      await upsertFile(config, uploadPath, data);

      // Root-relative, matching the Cascade path verbatim -- the same
      // convention the git path and packages/runtime already rely on (nav.ts/
      // search.ts build hrefs the same way). This is what gets stored in the
      // page's bodyHtml; the editor's own live preview resolves it through
      // GET /api/file instead (see DocEditor's resolveFileUrl/PageView).
      return json({ path: uploadPath, url: `/${uploadPath}` });
    }

    if (request.method === "POST" && route === "page/move") {
      const body = (await request.json()) as {
        type?: unknown;
        fromPath?: unknown;
        toParentPath?: unknown;
        newName?: unknown;
        title?: unknown;
      };
      if (
        (body.type !== "page" && body.type !== "folder") ||
        typeof body.fromPath !== "string" ||
        typeof body.toParentPath !== "string" ||
        typeof body.newName !== "string" ||
        body.newName.trim() === ""
      ) {
        return json(
          {
            error: "bad-request",
            message: "type ('page'|'folder'), fromPath, toParentPath, and newName are required",
          },
          { status: 400 },
        );
      }
      const type: AssetType = body.type;
      const { fromPath, toParentPath } = body;
      const slug = slugify(body.newName);
      if (!slug) {
        return json(
          { error: "bad-request", message: "newName must contain at least one alphanumeric character" },
          { status: 400 },
        );
      }
      const toPath = `${toParentPath}/${slug}`;

      let takeover = false;
      if (type === "page") {
        const current = await readPage(config, fromPath);
        takeover = current.metadata.origin === "git";
      }

      if (fromPath !== toPath) {
        await moveAsset(config, type, fromPath, toPath);
      }

      if (type === "page") {
        // A plain drag-to-reparent sends no `title` (the display name isn't
        // changing); an inline rename sends the new human title alongside
        // the slugified newName so the DD's `title` field (and nav.json's
        // docTitle) stay in sync with what the tree now shows.
        const wantsTitleUpdate = typeof body.title === "string" && body.title.trim() !== "";
        if (wantsTitleUpdate || takeover) {
          // Same ownership takeover as PUT /page (editor-implementation-plan.md
          // section 3, extended): moving/renaming a git-owned page from the web
          // UI takes it over too -- flips origin to "web" and drops
          // sourceRepoPath, rather than refusing the move outright. Without this
          // the next git publish would move it right back to its frontmatter
          // path with no warning.
          const current = await readPage(config, toPath);
          const fields: StructuredDataFields = wantsTitleUpdate
            ? { ...current.fields, title: body.title as string }
            : current.fields;
          const metadata: MetadataFields = takeover
            ? { ...current.metadata, origin: "web", sourceRepoPath: undefined, authorEmail }
            : { ...current.metadata, authorEmail };
          await editPage(config, toPath, fields, metadata, current.version);
        }
        await publishPageAndArtifacts(config, toPath, bookSlugFromPath(toPath));

        // A cross-book move leaves the old book's nav.json stale (still
        // listing a page that's no longer there) until something republishes
        // it -- the page's own publish above only refreshes the *new* book.
        const fromBook = bookSlugFromPath(fromPath);
        const toBook = bookSlugFromPath(toPath);
        if (fromBook !== toBook) {
          const oldNavPath = `docs/_system/nav/${fromBook}`;
          if (await pageExists(config, oldNavPath)) {
            await publishAsset(config, "page", oldNavPath);
          }
        }
      } else {
        // Folder move (reparenting a chapter, or a whole book under docs/).
        // Republish nav.json for whichever book(s) just changed contents.
        const fromBook = bookSlugFromPath(fromPath);
        const toBook = bookSlugFromPath(toPath);
        for (const book of new Set([fromBook, toBook])) {
          const navPath = `docs/_system/nav/${book}`;
          if (await pageExists(config, navPath)) {
            await publishAsset(config, "page", navPath);
          }
        }
        // ASSUMPTION, not yet confirmed against a live instance: this
        // assumes moveAsset carries each page inside the moved folder to its
        // new location already published, the same way a single page move
        // appears to (see publish-doc.ts, which republishes only the moved
        // page itself, never its siblings). If pages inside a moved chapter
        // come back unpublished in practice, this needs to walk the moved
        // subtree and call publishAsset on each page too.
      }

      return json({ path: toPath });
    }

    if (request.method === "POST" && route === "page/reorder") {
      const body = (await request.json()) as { items?: unknown };
      if (!Array.isArray(body.items)) {
        return json(
          { error: "bad-request", message: "items (array of { path, type }) is required" },
          { status: 400 },
        );
      }
      const items: { path: string; type: AssetType }[] = [];
      for (const raw of body.items as unknown[]) {
        const item = raw as { path?: unknown; type?: unknown };
        if (typeof item.path !== "string" || (item.type !== "page" && item.type !== "folder")) {
          return json(
            { error: "bad-request", message: "each item needs a string path and type 'page'|'folder'" },
            { status: 400 },
          );
        }
        items.push({ path: item.path, type: item.type });
      }

      // Only pages carry an `order` field (chapters/books are plain folders
      // -- see nav-format.vm, which sorts pages by `order` but leaves folder
      // order as whatever Cascade's own child position is). Folder entries
      // in the list are skipped but still consume an index, which is fine:
      // only the *relative* order of the page entries matters here.
      let bookSlug: string | undefined;
      for (const [index, item] of items.entries()) {
        if (item.type !== "page") continue;
        const current = await readPage(config, item.path);
        // Git-owned order comes from frontmatter; rewriting it here would
        // just be clobbered by the next git publish, so leave those alone
        // rather than fighting the git path.
        if (current.metadata.origin === "git") continue;
        const order = index * 10;
        if (current.fields.order !== order) {
          const fields: StructuredDataFields = { ...current.fields, order };
          await editPage(config, item.path, fields, current.metadata, current.version);
        }
        bookSlug ??= bookSlugFromPath(item.path);
      }

      if (bookSlug) {
        const navPath = `docs/_system/nav/${bookSlug}`;
        if (await pageExists(config, navPath)) {
          await publishAsset(config, "page", navPath);
        }
      }

      return json({ ok: true });
    }

    return json(
      { error: "not-found", message: `No route for ${request.method} /api/${route}` },
      { status: 404 },
    );
  } catch (err) {
    return errorResponse(err);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<WorkerEnv>;
