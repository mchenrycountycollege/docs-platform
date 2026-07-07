/**
 * Local/manual CLI entrypoint for processDiff() -- the same core the
 * GitHub Action (actions/publish/src/index.ts) uses, so this is also how
 * you'd dry-run a real repo's history locally without needing a live GitHub
 * Actions run.
 *
 * Usage:
 *   CASCADE_BASE_URL=... CASCADE_API_KEY=... CASCADE_SITE_NAME=...
 *   CASCADE_DOC_CONTENT_TYPE_ID=... CASCADE_NAV_CONTENT_TYPE_ID=...
 *   REPO_DIR=/path/to/checkout REPO_NAME=some-org/some-repo
 *   BEFORE_SHA=<sha> AFTER_SHA=<sha> [DOCS_DIR=docs] [GIT_AUTHOR_EMAIL=a@b.com]
 *   pnpm --filter @docs-platform/cascade-publish cli
 */
import type { CascadeConfig } from "@docs-platform/cascade-client";
import { processDiff } from "./process-diff.js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var ${name}`);
  return value;
}

async function main() {
  const config: CascadeConfig = {
    baseUrl: requireEnv("CASCADE_BASE_URL"),
    siteName: requireEnv("CASCADE_SITE_NAME"),
    apiKey: requireEnv("CASCADE_API_KEY"),
    documentationPageContentTypeId: requireEnv("CASCADE_DOC_CONTENT_TYPE_ID"),
    navOutputContentTypeId: requireEnv("CASCADE_NAV_CONTENT_TYPE_ID"),
  };

  const result = await processDiff({
    config,
    repoDir: requireEnv("REPO_DIR"),
    repoName: requireEnv("REPO_NAME"),
    beforeSha: requireEnv("BEFORE_SHA"),
    afterSha: requireEnv("AFTER_SHA"),
    docsDir: process.env["DOCS_DIR"] ?? "docs",
    gitAuthorEmail: process.env["GIT_AUTHOR_EMAIL"] ?? "unknown@example.com",
  });

  console.log(`[cascade-publish] processed ${result.processed} file(s), ${result.errors.length} error(s)`);
  if (result.errors.length > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error("[cascade-publish] FAILED:", err);
  process.exitCode = 1;
});
