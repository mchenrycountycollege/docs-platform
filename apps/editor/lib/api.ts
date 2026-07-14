/**
 * Typed fetch wrappers for /api/* (editor-implementation-plan.md section 4,
 * "lib/api.ts"). Centralizes 401/409/git-owned handling so UI components
 * stay dumb -- they call these functions and switch on the returned variant
 * instead of parsing raw Response objects themselves.
 */

import type { NavResponse, SearchEntry } from "@docs-platform/doc-shell";

export interface FolderEntry {
  path: string;
  type: "page" | "file" | "folder";
  displayName: string;
}

export interface TreeResult {
  path: string;
  children: FolderEntry[];
}

export interface PageResult {
  path: string;
  version: string;
  title: string;
  order: number;
  tags: string[];
  bodyHtml: string;
  origin: "git" | "web";
  sourceRepoPath?: string;
  editorName?: string;
  authorEmail?: string;
}

export interface SavePageOk {
  ok: true;
  path: string;
  version: string;
}

export interface SavePageConflict {
  ok: false;
  kind: "conflict";
  currentVersion: string;
  currentBodyHtml: string;
}

export interface SavePageGitOwned {
  ok: false;
  kind: "git-owned";
  repo?: string;
}

export interface SavePageError {
  ok: false;
  kind: "error";
  message: string;
}

export type SavePageResult = SavePageOk | SavePageConflict | SavePageGitOwned | SavePageError;

export class ApiUnauthorizedError extends Error {
  constructor() {
    super("Not signed in (401) -- reload to re-trigger the Access login flow");
    this.name = "ApiUnauthorizedError";
  }
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (res.status === 401) throw new ApiUnauthorizedError();
  const data: unknown = await res.json();
  if (!res.ok) {
    const message =
      data !== null && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : `HTTP ${res.status}`;
    throw new Error(message);
  }
  return data as T;
}

export function getTree(path: string): Promise<TreeResult> {
  return getJson<TreeResult>(`/api/tree?path=${encodeURIComponent(path)}`);
}

export function getPage(path: string): Promise<PageResult> {
  return getJson<PageResult>(`/api/page?path=${encodeURIComponent(path)}`);
}

/**
 * Background half of the save model (editor-implementation-plan.md section
 * 4b, "instant vs. reconciled"): Save already shows the in-memory optimistic
 * body immediately (see DocEditor/PageView). Once the publish sequence has
 * had time to settle, the caller re-fetches with this and quietly swaps the
 * on-screen body if the stored/published canonical HTML differs (e.g. a
 * server-side normalizeHtml adjustment the optimistic copy wouldn't
 * reflect) -- silent on match, no modal either way.
 */
export function reconcilePage(path: string): Promise<PageResult> {
  return getPage(path);
}

/** One book's nav, built live from Cascade (editor-implementation-plan.md E-Shell/E4) -- bookPath is "docs/<book-slug>". */
export function getNav(bookPath: string): Promise<NavResponse> {
  return getJson<NavResponse>(`/api/nav?path=${encodeURIComponent(bookPath)}`);
}

/** Whole-site search index for the cmdk palette, loaded once per session and cached (mirrors runtime's loadIndex). */
let searchIndexPromise: Promise<SearchEntry[]> | null = null;
export function getSearchIndex(): Promise<SearchEntry[]> {
  searchIndexPromise ??= getJson<{ pages: SearchEntry[] }>("/api/search-index").then((r) => r.pages);
  return searchIndexPromise;
}

async function putPageFields(input: {
  path: string;
  expectedVersion: string;
  bodyHtml?: string;
  title?: string;
  order?: number;
  tags?: string[];
}): Promise<SavePageResult> {
  const res = await fetch("/api/page", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (res.status === 401) throw new ApiUnauthorizedError();

  const data: unknown = await res.json();

  if (res.ok) {
    const ok = data as { path: string; version: string };
    return { ok: true, path: ok.path, version: ok.version };
  }

  if (res.status === 409) {
    const body = data as { error: string; currentVersion?: string; currentBodyHtml?: string; repo?: string };
    if (body.error === "git-owned") {
      return { ok: false, kind: "git-owned", repo: body.repo };
    }
    return {
      ok: false,
      kind: "conflict",
      currentVersion: body.currentVersion ?? "",
      currentBodyHtml: body.currentBodyHtml ?? "",
    };
  }

  const message =
    data !== null && typeof data === "object" && "message" in data
      ? String((data as { message: unknown }).message)
      : `HTTP ${res.status}`;
  return { ok: false, kind: "error", message };
}

export function savePage(input: { path: string; bodyHtml: string; expectedVersion: string }): Promise<SavePageResult> {
  return putPageFields(input);
}

/** Rename a page's display title without touching its URL slug or body. */
export function renamePageTitle(input: {
  path: string;
  title: string;
  expectedVersion: string;
}): Promise<SavePageResult> {
  return putPageFields(input);
}

export interface CreatePageResult {
  path: string;
  version: string;
}

export async function createPage(input: { parentPath: string; title: string; tags?: string[] }): Promise<CreatePageResult> {
  const res = await fetch("/api/page", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (res.status === 401) throw new ApiUnauthorizedError();
  const data: unknown = await res.json();
  if (!res.ok) {
    const message =
      data !== null && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : `HTTP ${res.status}`;
    throw new Error(message);
  }
  return data as CreatePageResult;
}

export async function createFolder(input: { parentPath: string; name: string }): Promise<{ path: string }> {
  const res = await fetch("/api/folder", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (res.status === 401) throw new ApiUnauthorizedError();
  const data: unknown = await res.json();
  if (!res.ok) {
    const message =
      data !== null && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : `HTTP ${res.status}`;
    throw new Error(message);
  }
  return data as { path: string };
}

export interface MoveItemInput {
  type: "page" | "folder";
  fromPath: string;
  toParentPath: string;
  newName: string;
  /** Pages only: the new human title, when this is a rename rather than a plain drag-to-reparent. */
  title?: string;
}

export type MoveItemResult =
  | { ok: true; path: string }
  | { ok: false; kind: "git-owned"; repo?: string }
  | { ok: false; kind: "error"; message: string };

export async function moveItem(input: MoveItemInput): Promise<MoveItemResult> {
  const res = await fetch("/api/page/move", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (res.status === 401) throw new ApiUnauthorizedError();
  const data: unknown = await res.json();
  if (res.ok) {
    return { ok: true, path: (data as { path: string }).path };
  }
  if (res.status === 409) {
    const body = data as { error: string; repo?: string };
    if (body.error === "git-owned") {
      return { ok: false, kind: "git-owned", repo: body.repo };
    }
  }
  const message =
    data !== null && typeof data === "object" && "message" in data
      ? String((data as { message: unknown }).message)
      : `HTTP ${res.status}`;
  return { ok: false, kind: "error", message };
}

export async function reorderItems(items: { path: string; type: "page" | "folder" }[]): Promise<void> {
  const res = await fetch("/api/page/reorder", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (res.status === 401) throw new ApiUnauthorizedError();
  const data: unknown = await res.json();
  if (!res.ok) {
    const message =
      data !== null && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : `HTTP ${res.status}`;
    throw new Error(message);
  }
}
