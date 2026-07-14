/**
 * Local pre-edit check/fold, run by hand before editing a doc through the
 * git path -- the Cascade-side analog of `git pull`. See syncDoc() in
 * resolve-conflict.ts for what it actually does.
 *
 * Usage:
 *   CASCADE_BASE_URL=... CASCADE_API_KEY=... CASCADE_SITE_NAME=...
 *   CASCADE_DOC_CONTENT_TYPE_ID=... CASCADE_NAV_CONTENT_TYPE_ID=...
 *   pnpm --filter @docs-platform/cascade-publish sync-doc /path/to/repo/docs/some-doc.md
 */
import type { CascadeConfig } from "@docs-platform/cascade-client";
import { syncDoc } from "./resolve-conflict.js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var ${name}`);
  return value;
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: pnpm --filter @docs-platform/cascade-publish sync-doc <path-to-doc.md>");
    process.exitCode = 1;
    return;
  }

  const config: CascadeConfig = {
    baseUrl: requireEnv("CASCADE_BASE_URL"),
    siteName: requireEnv("CASCADE_SITE_NAME"),
    apiKey: requireEnv("CASCADE_API_KEY"),
    documentationPageContentTypeId: requireEnv("CASCADE_DOC_CONTENT_TYPE_ID"),
    navOutputContentTypeId: requireEnv("CASCADE_NAV_CONTENT_TYPE_ID"),
  };

  const result = await syncDoc(config, filePath);
  console.log(`[sync-doc] ${result.message}`);
}

main().catch((err) => {
  console.error("[sync-doc] FAILED:", err);
  process.exitCode = 1;
});
