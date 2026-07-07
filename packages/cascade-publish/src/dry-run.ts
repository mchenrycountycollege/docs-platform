/**
 * Live dry run: proves publishDoc() end-to-end against the real Cascade
 * REST API using local fixture markdown files (packages/cascade-publish/fixtures/)
 * -- no GitHub Actions/git-diff plumbing involved yet (that's the next pass).
 *
 * Exercises: create (book-only and book+chapter placement), idempotent
 * re-publish (same docId -> same page, not a duplicate), and a rename
 * (changing `chapter` in frontmatter between runs -> the old page is moved,
 * not left behind as an orphan), all backed by the docs/_system/manifest.json
 * docId->path index.
 *
 * Usage:
 *   CASCADE_BASE_URL=... CASCADE_API_KEY=... CASCADE_SITE_NAME=...
 *   CASCADE_DOC_CONTENT_TYPE_ID=... CASCADE_NAV_CONTENT_TYPE_ID=...
 *   pnpm --filter @docs-platform/cascade-publish dry-run [-- --keep]
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { deletePage, editRawPage, pageExists, readRawPage, type CascadeConfig } from "@docs-platform/cascade-client";
import { publishDoc } from "./index.js";

const FIXTURES_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "fixtures");
const MANIFEST_PATH = "docs/_system/manifest.json";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var ${name}`);
  return value;
}

async function removeManifestEntries(config: CascadeConfig, docIds: string[]): Promise<void> {
  if (!(await pageExists(config, MANIFEST_PATH))) return;
  const page = await readRawPage(config, MANIFEST_PATH);
  const match = /<!\[CDATA\[([\s\S]*)\]\]>/.exec(page.xhtml);
  if (!match) return;
  const entries: Record<string, string> = JSON.parse(match[1] ?? "{}");
  for (const docId of docIds) delete entries[docId];
  await editRawPage(config, MANIFEST_PATH, `<div><![CDATA[${JSON.stringify(entries)}]]></div>`, page.version);
}

async function main() {
  const config: CascadeConfig = {
    baseUrl: requireEnv("CASCADE_BASE_URL"),
    siteName: requireEnv("CASCADE_SITE_NAME"),
    apiKey: requireEnv("CASCADE_API_KEY"),
    documentationPageContentTypeId: requireEnv("CASCADE_DOC_CONTENT_TYPE_ID"),
    navOutputContentTypeId: requireEnv("CASCADE_NAV_CONTENT_TYPE_ID"),
  };
  const keep = process.argv.includes("--keep");
  const overviewRaw = readFileSync(path.join(FIXTURES_DIR, "overview.md"), "utf-8");
  const referenceRaw = readFileSync(path.join(FIXTURES_DIR, "reference.md"), "utf-8");
  const gitAuthorEmail = "dry-run@example.com";

  console.log("[dry-run] publishing reference.md (book-only placement, no chapter)");
  const ref = await publishDoc(config, {
    content: referenceRaw,
    sourceRepoPath: "docs-platform/cascade-publish/fixtures/reference.md",
    gitAuthorEmail,
  });
  if (ref.path !== "docs/dry-run-fixtures/reference") {
    throw new Error(`unexpected reference path: ${ref.path}`);
  }

  console.log("[dry-run] publishing overview.md (book+chapter placement)");
  const created = await publishDoc(config, {
    content: overviewRaw,
    sourceRepoPath: "docs-platform/cascade-publish/fixtures/overview.md",
    gitAuthorEmail,
  });
  if (created.path !== "docs/dry-run-fixtures/setup/overview") {
    throw new Error(`unexpected overview path: ${created.path}`);
  }
  if (created.moved) throw new Error("first publish of overview.md should not report moved:true");

  console.log("[dry-run] re-publishing overview.md unchanged (idempotency)");
  const republished = await publishDoc(config, {
    content: overviewRaw,
    sourceRepoPath: "docs-platform/cascade-publish/fixtures/overview.md",
    gitAuthorEmail,
  });
  if (republished.path !== created.path) {
    throw new Error(`re-publish created a different page: ${republished.path} != ${created.path}`);
  }
  if (republished.moved) throw new Error("unchanged re-publish should not report moved:true");

  console.log("[dry-run] changing overview.md's chapter in-memory and re-publishing (rename via manifest)");
  const movedContent = overviewRaw.replace("chapter: Setup", "chapter: Advanced");
  const moved = await publishDoc(config, {
    content: movedContent,
    sourceRepoPath: "docs-platform/cascade-publish/fixtures/overview.md",
    gitAuthorEmail,
  });
  if (moved.path !== "docs/dry-run-fixtures/advanced/overview") {
    throw new Error(`unexpected moved path: ${moved.path}`);
  }
  if (!moved.moved) throw new Error("chapter change should report moved:true");
  if (await pageExists(config, created.path)) {
    throw new Error(`old path ${created.path} should no longer exist after the move`);
  }

  if (keep) {
    console.log(`[dry-run] done. Left published at ${ref.path} and ${moved.path} (--keep was passed).`);
    return;
  }

  console.log("[dry-run] cleaning up (hard delete + manifest entries)");
  await deletePage(config, ref.path, { hard: true });
  await deletePage(config, moved.path, { hard: true });
  await deletePage(config, "docs/_system/nav/dry-run-fixtures", { hard: true });
  await removeManifestEntries(config, [
    "a1a1a1a1-0000-4000-8000-000000000001",
    "a1a1a1a1-0000-4000-8000-000000000002",
  ]);
  console.log("[dry-run] done. Create, idempotent re-publish, and rename-via-manifest all succeeded.");
}

main().catch((err) => {
  console.error("[dry-run] FAILED:", err);
  process.exitCode = 1;
});
