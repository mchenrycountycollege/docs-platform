/**
 * Pushes packages/runtime/dist/docs-runtime.js to Cascade as a File asset at
 * docs/_system/docs-runtime.js (published to /docs/_system/docs-runtime.js),
 * so the docs-platform-page Template can reference it via a static
 * <script src>. Replaces the old workflow of pasting the bundle into the
 * Template's inline <script> block by hand -- that copy/paste step was what
 * corrupted the \uXXXX escapes in Fuse.js's diacritics table on a live push
 * (see implementation-checklist.md Phase 6b).
 *
 * Usage:
 *   pnpm --filter @docs-platform/runtime build   # produces dist/docs-runtime.js
 *   CASCADE_BASE_URL=https://college.cascadecms.com \
 *   CASCADE_API_KEY=xxx \
 *   CASCADE_SITE_NAME=docs \
 *   CASCADE_DOC_CONTENT_TYPE_ID=xxx \
 *   CASCADE_NAV_CONTENT_TYPE_ID=xxx \
 *   pnpm --filter @docs-platform/cascade-client push:runtime
 *
 * (The two content-type-id vars aren't used by this script, but CascadeConfig
 * requires them -- reuse the same env as smoke.ts/cascade-publish.)
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ensureFolder, upsertFile } from "./assets.js";
import type { CascadeConfig } from "./types.js";

const RUNTIME_PATH = "docs/_system/docs-runtime.js";
const DIST_FILE = fileURLToPath(
  new URL("../../runtime/dist/docs-runtime.js", import.meta.url),
);

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var ${name}`);
  }
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

  const data = readFileSync(DIST_FILE);
  console.log(`[push-runtime] read ${DIST_FILE} (${data.length} bytes)`);

  console.log("[push-runtime] ensuring docs/_system exists");
  await ensureFolder(config, "docs/_system");

  console.log(`[push-runtime] upserting + publishing ${RUNTIME_PATH}`);
  await upsertFile(config, RUNTIME_PATH, data);

  console.log(`[push-runtime] done. Live at /${RUNTIME_PATH}`);
}

main().catch((err) => {
  console.error("[push-runtime] FAILED:", err);
  process.exitCode = 1;
});
