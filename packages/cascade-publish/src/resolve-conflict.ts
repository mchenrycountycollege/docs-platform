import { readFileSync, writeFileSync } from "node:fs";
import matter from "gray-matter";
import { pageExists, readPage, type CascadeConfig } from "@docs-platform/cascade-client";
import { htmlToMarkdown, parseFrontmatter } from "@docs-platform/doc-core";
import { readManifest } from "./manifest.js";

export interface SyncDocResult {
  /** True if the local file was rewritten with the live web-edited content. */
  synced: boolean;
  /** Human-readable explanation of what happened (or why nothing needed to happen). */
  message: string;
}

export interface LiveFields {
  title: string;
  tags: string[];
  order: number;
}

/**
 * Pure decision + merge logic, split out from syncDoc() so it's testable
 * without hitting Cascade or the filesystem: local frontmatter fields are
 * kept as-is (book/chapter/slug/docId/etc.) except title/tags/order, which
 * are overwritten from the live page since the web editor may have changed
 * them too, and `takeover` is forced to true so a subsequent push is
 * pre-authorized.
 */
export function buildSyncedFrontmatter(
  localData: Record<string, unknown>,
  live: LiveFields,
): Record<string, unknown> {
  return {
    ...localData,
    title: live.title,
    tags: live.tags,
    order: live.order,
    takeover: true,
  };
}

/**
 * Run before editing a doc locally (the Cascade-side analog of `git pull`).
 * If the doc's live Cascade page was last written by the web editor (origin:
 * "web"), the local file is stale relative to it: overwrites the local file
 * in place with the live content, converted back to Markdown, and sets
 * `takeover: true` so a subsequent git-path push is pre-authorized to
 * overwrite that web edit instead of being rejected by publishDoc()'s
 * OwnershipConflictError. Layering new intended edits on top, and the
 * commit/push itself, stay manual -- this only folds in what's already live.
 *
 * No-ops (synced: false) when the doc doesn't exist yet in Cascade, or its
 * live origin is already "git" -- nothing to fold in either way.
 */
export async function syncDoc(config: CascadeConfig, filePath: string): Promise<SyncDocResult> {
  const raw = readFileSync(filePath, "utf-8");
  const fm = parseFrontmatter(raw);

  const manifest = await readManifest(config);
  const path = manifest.entries[fm.docId];
  if (path === undefined || !(await pageExists(config, path))) {
    return { synced: false, message: `no live Cascade page found for docId ${fm.docId} -- nothing to sync` };
  }

  const live = await readPage(config, path);
  if (live.metadata.origin !== "web") {
    return { synced: false, message: `live page at '${path}' was last written by the git path -- safe to edit` };
  }

  const markdownBody = await htmlToMarkdown(live.fields.bodyHtml);
  const { data } = matter(raw);
  const updated = matter.stringify(markdownBody, buildSyncedFrontmatter(data, live.fields));

  writeFileSync(filePath, updated, "utf-8");
  return {
    synced: true,
    message:
      `'${filePath}' was last edited via the web editor at '${path}' -- local file overwritten with the live ` +
      `content and 'takeover: true' set. Layer your intended edit back in, then commit and push.`,
  };
}
