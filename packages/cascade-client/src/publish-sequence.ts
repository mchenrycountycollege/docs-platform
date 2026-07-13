import { ensureBookNavPage, pageExists, publishAsset } from "./assets.js";
import type { CascadeConfig } from "./types.js";

/**
 * Publishes a docs page and its dependent derived artifacts, in order: the
 * page itself, then its book's nav.json (creating the per-book nav container
 * page on first use), then the two global search-index.json/tags.json
 * artifacts. Both write paths (the git-path orchestrator in cascade-publish
 * and the web editor's proxy) call this so publish ordering can never drift
 * between them -- see project-management/editor-implementation-plan.md section 6.
 */
export async function publishPageAndArtifacts(config: CascadeConfig, path: string, bookSlug: string): Promise<void> {
  await publishAsset(config, "page", path);

  // ensureBookNavPage() already publishes the nav page itself the first time
  // it creates one (confirmed against a live instance: publishing it again
  // immediately after fails with "This asset already exists in the publish
  // queue", since that first publish job is still in flight) -- only publish
  // here when the container already existed, since then ensureBookNavPage
  // was a no-op that didn't just publish it for us.
  const navPath = `docs/_system/nav/${bookSlug}`;
  const navAlreadyExisted = await pageExists(config, navPath);
  await ensureBookNavPage(config, bookSlug);
  if (navAlreadyExisted) {
    await publishAsset(config, "page", navPath);
  }

  // These two one-time global pages are created by hand
  // (implementation-checklist.md Phase 7). Their Cascade asset path has no
  // `.json` extension -- confirmed against a live instance -- that's purely
  // the *published output* filename, driven by their Configuration's file
  // extension setting, not part of the asset's own path.
  for (const artifactPath of ["docs/_system/search-index", "docs/_system/tags"]) {
    try {
      await publishAsset(config, "page", artifactPath);
    } catch (err) {
      console.warn(
        `[cascade-client] could not publish ${artifactPath} (has it been created yet? see ` +
          `implementation-checklist.md Phase 7): ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
}
