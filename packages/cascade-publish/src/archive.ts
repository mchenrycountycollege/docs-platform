import { parseFrontmatter, type ParsedDoc } from "@docs-platform/doc-core";
import { deletePage, type CascadeConfig } from "@docs-platform/cascade-client";
import { readManifest, removeManifestEntry } from "./manifest.js";

export interface ArchiveInput {
  /** Content of the file at the `before` SHA (recovered via `git show`), since the file no longer exists on disk. */
  lastKnownContent: string;
  sourceRepoPath: string;
}

export interface ArchiveResult {
  path: string;
  hardDeleted: boolean;
}

export type ArchiveAction =
  | { kind: "hard-delete"; path: string; docId: string }
  | { kind: "unpublish"; path: string }
  | { kind: "unknown"; docId: string; sourceRepoPath: string };

/**
 * Pure decision logic, split out from archiveDoc() so it's testable without
 * hitting Cascade: default is "unpublish" (reversible orphan, per the plan's
 * delete/rename semantics); the doc's *last* frontmatter having `delete: true`
 * means hard-delete instead, which also drops the manifest entry (the page is
 * truly gone, not just unpublished, so the manifest would otherwise point at
 * a dead path).
 */
export function decideArchiveAction(
  fm: ParsedDoc,
  manifestEntries: Record<string, string>,
  sourceRepoPath: string,
): ArchiveAction {
  const path = manifestEntries[fm.docId];
  if (path === undefined) return { kind: "unknown", docId: fm.docId, sourceRepoPath };
  return fm.delete ? { kind: "hard-delete", path, docId: fm.docId } : { kind: "unpublish", path };
}

/** A file was removed from the repo -- archives (or hard-deletes) the Cascade page it last mapped to. */
export async function archiveDoc(config: CascadeConfig, input: ArchiveInput): Promise<ArchiveResult> {
  const fm = parseFrontmatter(input.lastKnownContent);
  const manifest = await readManifest(config);
  const action = decideArchiveAction(fm, manifest.entries, input.sourceRepoPath);

  if (action.kind === "unknown") {
    throw new Error(
      `cannot archive '${action.sourceRepoPath}' (docId ${action.docId}): no known Cascade path in the manifest`,
    );
  }
  if (action.kind === "hard-delete") {
    await deletePage(config, action.path, { hard: true });
    await removeManifestEntry(config, action.docId);
    return { path: action.path, hardDeleted: true };
  }
  await deletePage(config, action.path, { hard: false });
  return { path: action.path, hardDeleted: false };
}
