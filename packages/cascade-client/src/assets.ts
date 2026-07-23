import { buildAuthHeaders } from "./auth.js";
import { assertInScope } from "./scope.js";
import {
  fromMetadata,
  fromStructuredData,
  toMetadata,
  toStructuredData,
} from "./structured-data.js";
import type {
  AssetType,
  CascadeConfig,
  FileAsset,
  FolderAsset,
  MetadataFields,
  PageAsset,
  RawPageAsset,
  StructuredDataFields,
} from "./types.js";
import { CascadeApiError, MalformedPageError, VersionConflictError } from "./types.js";

async function request<T>(
  config: CascadeConfig,
  method: "GET" | "POST" | "DELETE",
  urlPath: string,
  body?: unknown,
): Promise<T> {
  const url = new URL(`api/v1/${urlPath}`, config.baseUrl.replace(/\/+$/, "") + "/");
  const res = await fetch(url, {
    method,
    headers: buildAuthHeaders(config),
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = text.length > 0 ? JSON.parse(text) : undefined;
  } catch {
    throw new CascadeApiError(
      `Cascade API request failed: ${method} ${url} -> ${res.status} (non-JSON response, ` +
        `first 200 chars: ${text.slice(0, 200).replace(/\s+/g, " ")})`,
      res.status,
      text,
    );
  }

  if (!res.ok) {
    throw new CascadeApiError(
      `Cascade API request failed: ${method} ${url} -> ${res.status}`,
      res.status,
      parsed,
    );
  }

  // Cascade returns HTTP 200 even for logical failures, with `success: false`
  // and a `message` in the body (confirmed against a live instance -- e.g. a
  // read for a nonexistent path responds 200 with
  // {"success":false,"message":"Unable to identify an entity..."}). The HTTP
  // status alone is not a reliable success signal; this field must be too.
  if (
    parsed !== null &&
    typeof parsed === "object" &&
    "success" in parsed &&
    (parsed as { success: unknown }).success === false
  ) {
    const message = "message" in parsed ? String((parsed as { message: unknown }).message) : "";
    throw new CascadeApiError(
      `Cascade API operation failed: ${method} ${url} -> ${message}`,
      res.status,
      parsed,
    );
  }

  return parsed as T;
}

// --- Wire response shapes (best-effort; confirm against the live instance
// during the Phase 0 smoke test and adjust here if field names differ). ---

interface ReadPageResponse {
  asset: {
    page: {
      // Confirmed against a live instance: path is a plain string here (not
      // nested like a folder child's path), and id/parentFolderPath are
      // both required later to edit() this same page.
      id: string;
      path: string;
      parentFolderPath: string;
      lastModifiedDate: string;
      structuredData: Parameters<typeof fromStructuredData>[0];
      metadata: Parameters<typeof fromMetadata>[0];
    };
  };
}

interface ReadFolderResponse {
  asset: {
    folder: {
      // Confirmed against a live instance: the folder's own path is a plain
      // string, but each child's path is nested under { path, siteId } with
      // `type` as a sibling (not nested inside path). The folder's own `id`
      // is required later to move() something into it.
      id: string;
      path: string;
      children: { id: string; path: { path: string; siteId: string }; type: AssetType }[];
    };
  };
}

interface CreateResponse {
  createdAssetId: string;
  success: boolean;
}

interface EditResponse {
  success: boolean;
}

export async function readPage(config: CascadeConfig, path: string): Promise<PageAsset> {
  const scoped = assertInScope(path);
  const res = await request<ReadPageResponse>(
    config,
    "GET",
    `read/page/${config.siteName}/${scoped}`,
  );
  try {
    return {
      id: res.asset.page.id,
      path: res.asset.page.path,
      parentFolderPath: res.asset.page.parentFolderPath,
      siteName: config.siteName,
      version: res.asset.page.lastModifiedDate,
      fields: fromStructuredData(res.asset.page.structuredData),
      metadata: fromMetadata(res.asset.page.metadata),
    };
  } catch (err) {
    throw new MalformedPageError(path, err);
  }
}

export async function readFolder(config: CascadeConfig, path: string): Promise<FolderAsset> {
  const scoped = assertInScope(path);
  const res = await request<ReadFolderResponse>(
    config,
    "GET",
    `read/folder/${config.siteName}/${scoped}`,
  );
  return {
    id: res.asset.folder.id,
    path: res.asset.folder.path,
    siteName: config.siteName,
    // The read/folder response's children entries don't carry a display
    // name (confirmed against a live instance); derive one from the path
    // until a caller needs the real metadata (a follow-up readPage/
    // readFolder per child would be required for that).
    children: res.asset.folder.children.map((c) => ({
      path: c.path.path,
      type: c.type,
      displayName: c.path.path.split("/").pop() ?? c.path.path,
    })),
  };
}

export async function folderExists(config: CascadeConfig, path: string): Promise<boolean> {
  const scoped = assertInScope(path);
  try {
    await request<unknown>(config, "GET", `read/folder/${config.siteName}/${scoped}`);
    return true;
  } catch (err) {
    if (err instanceof CascadeApiError && /unable to identify an entity/i.test(err.message)) {
      return false;
    }
    throw err;
  }
}

/**
 * Create a folder. Cascade does not auto-create intermediate parent
 * folders when creating a page (confirmed against a live instance: create
 * fails with "folder with path/name: ... could not be found" if the parent
 * doesn't already exist), so callers that create pages under a path that
 * might not exist yet should ensureFolder() each ancestor first.
 */
export async function createFolder(config: CascadeConfig, path: string): Promise<void> {
  const scoped = assertInScope(path);
  const parentFolderPath = scoped.slice(0, scoped.lastIndexOf("/")) || "docs";
  const name = scoped.slice(scoped.lastIndexOf("/") + 1);
  await request<CreateResponse>(config, "POST", "create", {
    asset: {
      folder: { name, parentFolderPath, siteName: config.siteName },
    },
  });
}

export async function ensureFolder(config: CascadeConfig, path: string): Promise<void> {
  if (await folderExists(config, path)) return;
  await createFolder(config, path);
}

export async function createPage(
  config: CascadeConfig,
  path: string,
  fields: StructuredDataFields,
  metadata: MetadataFields,
): Promise<{ path: string }> {
  const scoped = assertInScope(path);
  const parentFolderPath = scoped.slice(0, scoped.lastIndexOf("/")) || "docs";
  const name = scoped.slice(scoped.lastIndexOf("/") + 1);
  await request<CreateResponse>(config, "POST", "create", {
    asset: {
      page: {
        name,
        parentFolderPath,
        siteName: config.siteName,
        contentTypeId: config.documentationPageContentTypeId,
        structuredData: toStructuredData(fields),
        metadata: toMetadata(metadata),
      },
    },
  });
  return { path: scoped };
}

export async function editPage(
  config: CascadeConfig,
  path: string,
  fields: StructuredDataFields,
  metadata: MetadataFields,
  expectedVersion: string,
): Promise<{ version: string }> {
  const scoped = assertInScope(path);

  const current = await readPage(config, scoped);
  if (current.version !== expectedVersion) {
    throw new VersionConflictError(current.version, current.fields.bodyHtml);
  }

  // Confirmed against a live instance: edit needs `id` (a `path` object is
  // rejected with "Expected STRING but was BEGIN_OBJECT"), and separately
  // requires parentFolderPath/siteName to be resupplied even though we're
  // not moving the page -- omitting them fails with "Either one of
  // parentFolderId, parentFolderPath is required."
  await request<EditResponse>(config, "POST", "edit", {
    asset: {
      page: {
        id: current.id,
        parentFolderPath: current.parentFolderPath,
        siteName: config.siteName,
        contentTypeId: config.documentationPageContentTypeId,
        structuredData: toStructuredData(fields),
        metadata: toMetadata(metadata),
      },
    },
  });

  const updated = await readPage(config, scoped);
  return { version: updated.version };
}

/**
 * True if a page exists at `path`. Unlike readPage(), this doesn't assume
 * the page has Documentation Page structured data — used for plain system
 * artifact pages (see ensureBookNavPage) as well as general existence
 * checks.
 */
export async function pageExists(config: CascadeConfig, path: string): Promise<boolean> {
  const scoped = assertInScope(path);
  try {
    await request<unknown>(config, "GET", `read/page/${config.siteName}/${scoped}`);
    return true;
  } catch (err) {
    // Cascade responds HTTP 200 with success:false for a nonexistent path
    // (confirmed against a live instance) rather than a 404 status, so the
    // "not found" signal has to come from the message text instead.
    if (err instanceof CascadeApiError && /unable to identify an entity/i.test(err.message)) {
      return false;
    }
    throw err;
  }
}

interface ReadRawPageResponse {
  asset: {
    page: {
      id: string;
      path: string;
      parentFolderPath: string;
      lastModifiedDate: string;
      xhtml: string;
      contentTypeId: string;
    };
  };
}

/**
 * Read a page with no Documentation Page structured data (a plain xhtml
 * blob) -- for system bookkeeping pages, see RawPageAsset.
 */
export async function readRawPage(config: CascadeConfig, path: string): Promise<RawPageAsset> {
  const scoped = assertInScope(path);
  const res = await request<ReadRawPageResponse>(
    config,
    "GET",
    `read/page/${config.siteName}/${scoped}`,
  );
  return {
    id: res.asset.page.id,
    path: res.asset.page.path,
    parentFolderPath: res.asset.page.parentFolderPath,
    siteName: config.siteName,
    version: res.asset.page.lastModifiedDate,
    xhtml: res.asset.page.xhtml,
    contentTypeId: res.asset.page.contentTypeId,
  };
}

/**
 * Create a page with no Documentation Page structured data (a plain xhtml
 * blob) under the given `contentTypeId` -- used both for nav containers and
 * the docId manifest (see RawPageAsset). Cascade rejects an empty string
 * for `xhtml` ("Either one of structuredData, xhtml is required" --
 * confirmed against a live instance, empty string counts as absent).
 */
export async function createRawPage(
  config: CascadeConfig,
  path: string,
  contentTypeId: string,
  xhtml: string,
): Promise<void> {
  const scoped = assertInScope(path);
  const parentFolderPath = scoped.slice(0, scoped.lastIndexOf("/")) || "docs";
  const name = scoped.slice(scoped.lastIndexOf("/") + 1);
  await request<CreateResponse>(config, "POST", "create", {
    asset: {
      page: {
        name,
        parentFolderPath,
        siteName: config.siteName,
        contentTypeId,
        xhtml,
      },
    },
  });
}

/** Edit a raw page's xhtml blob, with the same optimistic-concurrency contract as editPage(). */
export async function editRawPage(
  config: CascadeConfig,
  path: string,
  xhtml: string,
  expectedVersion: string,
): Promise<{ version: string }> {
  const scoped = assertInScope(path);
  const current = await readRawPage(config, scoped);
  if (current.version !== expectedVersion) {
    throw new VersionConflictError(current.version, current.xhtml);
  }
  await request<EditResponse>(config, "POST", "edit", {
    asset: {
      page: {
        id: current.id,
        parentFolderPath: current.parentFolderPath,
        siteName: config.siteName,
        contentTypeId: current.contentTypeId,
        xhtml,
      },
    },
  });
  const updated = await readRawPage(config, scoped);
  return { version: updated.version };
}

/**
 * Ensures the per-book nav container page (docs/_system/nav/<bookSlug>,
 * published as <bookSlug>.json) exists, creating and publishing it if not.
 * This is what makes onboarding a new book zero-touch: nav-format.vm reads
 * $currentPage.name to know which book to query, so the only thing that
 * needs to exist per book is this one lightweight page, of the "Nav
 * Output" Content Type (WYSIWYG, Configuration pinned to nav-format.vm —
 * see implementation-checklist.md). Call this from the publish
 * orchestrator (cascade-publish) whenever a page under docs/<bookSlug>/...
 * is published.
 */
export async function ensureBookNavPage(config: CascadeConfig, bookSlug: string): Promise<void> {
  const path = `docs/_system/nav/${bookSlug}`;
  if (await pageExists(config, path)) return;

  await ensureFolder(config, "docs/_system/nav");
  // This page's real content comes entirely from nav-format.vm's Query API
  // call at publish time, so the placeholder xhtml is never actually rendered.
  await createRawPage(config, path, config.navOutputContentTypeId, "<div></div>");
  await publishAsset(config, "page", path);
}

/**
 * Move (and/or rename) a page or folder. `type` must name what currently
 * lives at `fromPath` -- moving a folder into another folder is how a
 * book/chapter restructure is expressed (see delete/rename semantics in
 * implementation-plan.md: a path change with the same docId is a move).
 */
export async function moveAsset(
  config: CascadeConfig,
  type: "page" | "folder",
  fromPath: string,
  toPath: string,
): Promise<void> {
  const scopedFrom = assertInScope(fromPath);
  const scopedTo = assertInScope(toPath);
  const destFolderPath = scopedTo.slice(0, scopedTo.lastIndexOf("/")) || "docs";
  const newName = scopedTo.slice(scopedTo.lastIndexOf("/") + 1);

  const [sourceId, destFolder] = await Promise.all([
    type === "page"
      ? readPage(config, scopedFrom).then((p) => p.id)
      : readFolder(config, scopedFrom).then((f) => f.id),
    readFolder(config, destFolderPath),
  ]);

  // Confirmed against a live instance: move rejects the by-path identifier
  // shape used elsewhere ("Unable to identify an entity ... type 'null'" --
  // same class of bug as editPage). Unlike edit, there is no URL-based
  // identifier fallback either; both the source and
  // moveParameters.destinationContainerIdentifier must be the flat
  // { id, type } form, and moveParameters must wrap
  // destinationContainerIdentifier/newName/doWorkflow (the top-level
  // siblings the WSDL docs show are misleading for the REST body).
  await request<EditResponse>(config, "POST", "move", {
    identifier: { id: sourceId, type },
    moveParameters: {
      destinationContainerIdentifier: { id: destFolder.id, type: "folder" },
      newName,
      doWorkflow: false,
    },
  });
}

/**
 * Cascade's publish queue is async, so an operation on an asset that was
 * just published/queued moments ago can transiently conflict with that
 * still-in-flight job (confirmed against a live instance in two forms: a
 * hard delete fails with "currently being published", and a second publish
 * request for the same asset fails with "already exists in the publish
 * queue"). Both clear within a few seconds, so retry a bounded number of
 * times instead of surfacing a spurious failure to callers that publish
 * and then immediately delete/republish (a completely normal sequence --
 * this package's own smoke test and cascade-publish's orchestrator both do it).
 */
async function retryOnQueueConflict<T>(pattern: RegExp, fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (!(err instanceof CascadeApiError && pattern.test(err.message)) || attempt >= 4) throw err;
      await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
    }
  }
}

/**
 * Default (soft) delete: unpublish the page but keep the Cascade asset —
 * reversible. Hard delete is opt-in via { hard: true } (see plan's delete/rename
 * semantics: repo file removal is usually a refactor, not intent to destroy docs).
 * Deciding *which* to use, and stamping any "archived" bookkeeping, is the
 * orchestrator's job (cascade-publish); this is just the raw primitive.
 */
export async function deletePage(
  config: CascadeConfig,
  path: string,
  opts: { hard?: boolean } = {},
): Promise<void> {
  const scoped = assertInScope(path);
  if (opts.hard) {
    // Confirmed against a live instance: unlike edit/move, delete takes its
    // identifier in the URL (matching read's `{type}/{siteName}/{path}`
    // form), not in the body -- an in-body `identifier` (by-path or
    // otherwise) gives "Unable to identify an entity ... type 'null'".
    // deleteParameters.unpublish asks Cascade to remove the published file
    // from the web server as part of the same delete (without it, deleting
    // a published asset strands its published output live). Confirmed
    // against a live instance (2026-07-23): the delete succeeds with this
    // body and the asset is gone from the site tree immediately. Whether the
    // unpublish half is honored couldn't be probed from this repo (the
    // public web server's hostname isn't configured anywhere here -- Cascade
    // has silently ignored misplaced body keys before, see unpublishAsset
    // below), so eyeball the published URL 404ing once after deploy.
    await retryOnQueueConflict(/currently being published/i, () =>
      request<EditResponse>(config, "POST", `delete/page/${config.siteName}/${scoped}`, {
        deleteParameters: { unpublish: true, doWorkflow: false },
      }),
    );
    return;
  }
  await unpublishAsset(config, "page", scoped);
}

/**
 * Hard-delete a folder and everything inside it (Cascade folder delete is
 * recursive; the subtree lands in Cascade's Trash). Always hard -- there is
 * no soft variant because "unpublish a folder" has no meaning of its own;
 * deciding whether a folder should die is the caller's job (the web editor's
 * DELETE /api/folder route preflights ownership/counts first).
 * Confirmed against a live instance (2026-07-23): one call removes the whole
 * subtree, but *descendants* disappear asynchronously -- the folder itself is
 * gone immediately while its pages still read back for a few seconds. Callers
 * that rebuild derived artifacts afterward must wait for the descendants to
 * actually vanish (see the worker's waitForPagesGone). Same unverified-
 * unpublish caveat as deletePage's hard path.
 */
export async function deleteFolder(config: CascadeConfig, path: string): Promise<void> {
  const scoped = assertInScope(path);
  await retryOnQueueConflict(/currently being published/i, () =>
    request<EditResponse>(config, "POST", `delete/folder/${config.siteName}/${scoped}`, {
      deleteParameters: { unpublish: true, doWorkflow: false },
    }),
  );
}

export async function publishAsset(
  config: CascadeConfig,
  type: AssetType,
  path: string,
): Promise<void> {
  const scoped = assertInScope(path);
  await retryOnQueueConflict(/already exists in the publish queue/i, () =>
    request<EditResponse>(config, "POST", `publish/${type}/${config.siteName}/${scoped}`, {}),
  );
}

export async function unpublishAsset(
  config: CascadeConfig,
  type: AssetType,
  path: string,
): Promise<void> {
  const scoped = assertInScope(path);
  // Confirmed against a live instance: a top-level `unpublish` key is
  // silently ignored -- Cascade just runs a normal publish (lastPublishedDate
  // advances). `unpublish` must be nested under `publishInformation`.
  await request<EditResponse>(
    config,
    "POST",
    `publish/${type}/${config.siteName}/${scoped}`,
    { publishInformation: { unpublish: true } },
  );
}

interface ReadFileResponse {
  asset: {
    file: {
      id: string;
      path: string;
      parentFolderPath: string;
      lastModifiedDate: string;
      // ASSUMPTION: field name/shape not confirmed against a live instance
      // yet -- the only local documentation is a one-line note that "Reading/
      // Editing File assets using REST API uses byte array format whereas
      // SOAP uses base64 encoded format" (rest-api-cascade-cms-knowledge-base.md),
      // which implies a plain JSON array of byte values rather than a base64
      // string. Verify with a real read/file call and adjust the field name/
      // decoding here (and in create/editFile below) if wrong.
      data: number[];
    };
  };
}

/** Read a File asset's raw bytes. See ReadFileResponse for the byte-array-format caveat. */
export async function readFile(config: CascadeConfig, path: string): Promise<FileAsset> {
  const scoped = assertInScope(path);
  const res = await request<ReadFileResponse>(
    config,
    "GET",
    `read/file/${config.siteName}/${scoped}`,
  );
  return {
    id: res.asset.file.id,
    path: res.asset.file.path,
    parentFolderPath: res.asset.file.parentFolderPath,
    siteName: config.siteName,
    version: res.asset.file.lastModifiedDate,
    data: Buffer.from(res.asset.file.data),
  };
}

export async function fileExists(config: CascadeConfig, path: string): Promise<boolean> {
  const scoped = assertInScope(path);
  try {
    await request<unknown>(config, "GET", `read/file/${config.siteName}/${scoped}`);
    return true;
  } catch (err) {
    if (err instanceof CascadeApiError && /unable to identify an entity/i.test(err.message)) {
      return false;
    }
    throw err;
  }
}

export async function createFile(config: CascadeConfig, path: string, data: Buffer): Promise<void> {
  const scoped = assertInScope(path);
  const parentFolderPath = scoped.slice(0, scoped.lastIndexOf("/")) || "docs";
  const name = scoped.slice(scoped.lastIndexOf("/") + 1);
  await request<CreateResponse>(config, "POST", "create", {
    asset: {
      file: {
        name,
        parentFolderPath,
        siteName: config.siteName,
        data: Array.from(data),
      },
    },
  });
}

/** Edit a File asset's bytes, with the same optimistic-concurrency contract as editPage(). */
export async function editFile(
  config: CascadeConfig,
  path: string,
  data: Buffer,
  expectedVersion: string,
): Promise<{ version: string }> {
  const scoped = assertInScope(path);
  const current = await readFile(config, scoped);
  if (current.version !== expectedVersion) {
    throw new VersionConflictError(current.version, current.data.toString("utf8"));
  }
  await request<EditResponse>(config, "POST", "edit", {
    asset: {
      file: {
        id: current.id,
        parentFolderPath: current.parentFolderPath,
        siteName: config.siteName,
        data: Array.from(data),
      },
    },
  });
  const updated = await readFile(config, scoped);
  return { version: updated.version };
}

/**
 * Create-or-update a File asset's contents and publish it, so the bytes at
 * `path` end up matching `data` regardless of whether anything was there
 * before -- the primitive the docs-runtime push script uses (see
 * push-runtime.ts) to make "make Cascade's copy match this Buffer" a single
 * idempotent call instead of a manual paste-into-Template round trip.
 */
export async function upsertFile(config: CascadeConfig, path: string, data: Buffer): Promise<void> {
  const scoped = assertInScope(path);
  if (await fileExists(config, scoped)) {
    const current = await readFile(config, scoped);
    await editFile(config, scoped, data, current.version);
  } else {
    await createFile(config, scoped, data);
  }
  await publishAsset(config, "file", scoped);
}
