/**
 * Phase 0 live smoke test: creates, edits, publishes (and by default cleans up)
 * a single throwaway page under docs/_smoke-test/ via the real Cascade REST API.
 *
 * Requires the Manual configuration steps (service account + API key, DD,
 * content type, metadata set, factories, Formats, publish destination) to be
 * done first — see project-management/implementation-plan.md, section
 * "Manual configuration steps", parts A-C.
 *
 * Usage:
 *   CASCADE_BASE_URL=https://college.cascadecms.com \
 *   CASCADE_API_KEY=xxx \
 *   CASCADE_SITE_NAME=docs \
 *   CASCADE_DOC_CONTENT_TYPE_ID=xxx \
 *   CASCADE_NAV_CONTENT_TYPE_ID=xxx \
 *   pnpm --filter @docs-platform/cascade-client smoke [-- --keep]
 *
 * CASCADE_DOC_CONTENT_TYPE_ID/CASCADE_NAV_CONTENT_TYPE_ID are the internal
 * Cascade ids of the Documentation Page / Nav Output Content Types (see
 * implementation-checklist.md) -- the REST API identifies Content Type by
 * id, not name, so these can't be inferred and must come from your instance.
 *
 * Pass --keep to leave the page published instead of deleting it at the end,
 * so you can eyeball it on the live site.
 */
import { randomUUID } from "node:crypto";
import {
  createPage,
  deletePage,
  editPage,
  ensureBookNavPage,
  ensureFolder,
  moveAsset,
  pageExists,
  publishAsset,
  readPage,
} from "./assets.js";
import type { CascadeConfig } from "./types.js";

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
  const keep = process.argv.includes("--keep");
  const path = `docs/_smoke-test/smoke-${Date.now()}`;
  const docId = randomUUID();

  console.log("[smoke] ensuring docs/_smoke-test exists");
  await ensureFolder(config, "docs/_smoke-test");

  console.log(`[smoke] creating ${path}`);
  await createPage(
    config,
    path,
    { title: "Phase 0 smoke test", order: 999, tags: ["smoke-test"], bodyHtml: "<p>created</p>" },
    { docId, origin: "git", sourceRepoPath: "docs-platform/smoke", editorName: "Phase 0 smoke script" },
  );

  console.log("[smoke] reading it back");
  const created = await readPage(config, path);
  if (created.fields.title !== "Phase 0 smoke test") {
    throw new Error(`Unexpected title after create: ${created.fields.title}`);
  }

  console.log("[smoke] editing it");
  await editPage(
    config,
    path,
    { ...created.fields, bodyHtml: "<p>edited</p>" },
    created.metadata,
    created.version,
  );

  console.log("[smoke] publishing it");
  await publishAsset(config, "page", path);

  const edited = await readPage(config, path);
  if (edited.fields.bodyHtml !== "<p>edited</p>") {
    throw new Error(`Unexpected body after edit: ${edited.fields.bodyHtml}`);
  }

  const bookSlug = `smoke-book-${Date.now()}`;
  const navPath = `docs/_system/nav/${bookSlug}`;
  console.log(`[smoke] ensureBookNavPage for a new book (${bookSlug})`);
  await ensureBookNavPage(config, bookSlug);
  if (!(await pageExists(config, navPath))) {
    throw new Error(`ensureBookNavPage did not create ${navPath}`);
  }
  console.log("[smoke] calling ensureBookNavPage again to confirm it's a no-op (idempotency)");
  await ensureBookNavPage(config, bookSlug);

  const moveSrcFolder = `docs/_smoke-test/move-src-${Date.now()}`;
  const moveDstFolder = `docs/_smoke-test/move-dst-${Date.now()}`;
  const moveSrcPath = `${moveSrcFolder}/move-me`;
  const moveDstPath = `${moveDstFolder}/move-me`;
  console.log(`[smoke] moveAsset: ${moveSrcPath} -> ${moveDstPath}`);
  await ensureFolder(config, moveSrcFolder);
  await ensureFolder(config, moveDstFolder);
  await createPage(
    config,
    moveSrcPath,
    { title: "move test", order: 999, tags: [], bodyHtml: "<p>move me</p>" },
    { docId: randomUUID(), origin: "git", sourceRepoPath: "docs-platform/smoke" },
  );
  await moveAsset(config, "page", moveSrcPath, moveDstPath);
  if (await pageExists(config, moveSrcPath)) {
    throw new Error(`moveAsset did not remove the source page at ${moveSrcPath}`);
  }
  if (!(await pageExists(config, moveDstPath))) {
    throw new Error(`moveAsset did not create the destination page at ${moveDstPath}`);
  }

  if (keep) {
    console.log(
      `[smoke] done. Left published at ${path}, ${navPath}, and ${moveDstPath} (--keep was passed).`,
    );
  } else {
    console.log("[smoke] cleaning up (hard delete)");
    await deletePage(config, path, { hard: true });
    await deletePage(config, navPath, { hard: true });
    await deletePage(config, moveDstPath, { hard: true });
    console.log(
      "[smoke] done. Create, edit, publish, ensureBookNavPage, and moveAsset all succeeded and the pages were removed.",
    );
  }
}

main().catch((err) => {
  console.error("[smoke] FAILED:", err);
  process.exitCode = 1;
});
