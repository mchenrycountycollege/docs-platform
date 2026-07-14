import { editPage, publishPageAndArtifacts, readFolder, readPage, type MetadataFields } from "@docs-platform/cascade-client";
import { normalizeHtml } from "@docs-platform/doc-core";
import { AccessAuthError, verifyAccessJwt } from "./lib/access-auth.js";
import { cascadeConfigFromEnv } from "./lib/cascade-config.js";
import type { Env } from "./lib/env.js";
import { errorResponse, json } from "./lib/http.js";

/** docs/<book-slug>/... -- publishPageAndArtifacts needs the book slug to publish its nav.json. */
function bookSlugFromPath(path: string): string {
  const slug = path.split("/")[1];
  if (!slug) throw new Error(`path has no book segment: ${path}`);
  return slug;
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

async function handleApi(request: Request, env: WorkerEnv): Promise<Response> {
  let email: string;
  try {
    ({ email } = await verifyAccessJwt(request, env));
  } catch (err) {
    if (err instanceof AccessAuthError) {
      return json({ error: "unauthorized", message: err.message }, { status: 401 });
    }
    throw err;
  }
  const url = new URL(request.url);
  const route = url.pathname.replace(/^\/api\/?/, "");
  const config = cascadeConfigFromEnv(env);

  try {
    if (request.method === "GET" && route === "tree") {
      const path = url.searchParams.get("path") ?? "docs";
      const folder = await readFolder(config, path);
      return json({ path: folder.path, children: folder.children });
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
      const body = (await request.json()) as { path?: unknown; bodyHtml?: unknown; expectedVersion?: unknown };
      if (typeof body.path !== "string" || typeof body.bodyHtml !== "string" || typeof body.expectedVersion !== "string") {
        return json(
          { error: "bad-request", message: "path, bodyHtml, and expectedVersion are all required strings" },
          { status: 400 },
        );
      }
      const { path, bodyHtml, expectedVersion } = body;

      // Ownership guard (editor-implementation-plan.md section 3): the UI
      // renders git-owned pages read-only, but the proxy enforces it
      // regardless of the client, since Access-authenticated callers other
      // than the SPA (curl, a future integration) could otherwise bypass a
      // client-only check.
      const current = await readPage(config, path);
      if (current.metadata.origin === "git") {
        return json(
          { error: "git-owned", repo: current.metadata.sourceRepoPath },
          { status: 409 },
        );
      }

      // Only the body changes in E1 -- title/order/tags editing arrives with
      // rename/reorder in E2. normalizeHtml is authoritative here (section 4,
      // "Server normalize is authoritative"): a lossy BlockNote export can't
      // corrupt storage even if the client-side sanitization has a gap.
      const fields = { ...current.fields, bodyHtml: normalizeHtml(bodyHtml) };
      const metadata: MetadataFields = { ...current.metadata, authorEmail: email };

      // editPage() re-reads the page itself and compares against
      // expectedVersion, throwing VersionConflictError (-> 409 via
      // errorResponse) on a mismatch -- no separate check needed here.
      const result = await editPage(config, path, fields, metadata, expectedVersion);
      await publishPageAndArtifacts(config, path, bookSlugFromPath(path));
      return json({ path, version: result.version });
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
