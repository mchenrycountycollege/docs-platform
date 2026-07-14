/**
 * Typed fetch wrappers for /api/* (editor-implementation-plan.md section 4,
 * "lib/api.ts"). Centralizes 401/409/git-owned handling so UI components
 * stay dumb -- they call these functions and switch on the returned variant
 * instead of parsing raw Response objects themselves.
 */

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

export async function savePage(input: { path: string; bodyHtml: string; expectedVersion: string }): Promise<SavePageResult> {
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
