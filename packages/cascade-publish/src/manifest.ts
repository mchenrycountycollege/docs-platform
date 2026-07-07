import {
  CascadeApiError,
  VersionConflictError,
  createRawPage,
  editRawPage,
  ensureFolder,
  pageExists,
  readRawPage,
  type CascadeConfig,
} from "@docs-platform/cascade-client";

const MANIFEST_PATH = "docs/_system/manifest.json";
const MAX_RETRIES = 4;

export interface Manifest {
  /** Cascade's lastModifiedDate; "" if the manifest page doesn't exist yet. */
  version: string;
  /** docId -> Cascade path, for detecting cross-run renames/moves (see cascade-publish's design notes). */
  entries: Record<string, string>;
}

function serialize(entries: Record<string, string>): string {
  return `<div><![CDATA[${JSON.stringify(entries)}]]></div>`;
}

function deserialize(xhtml: string): Record<string, string> {
  const match = /<!\[CDATA\[([\s\S]*)\]\]>/.exec(xhtml);
  if (!match) {
    throw new Error(`manifest page xhtml is not in the expected CDATA format: ${xhtml}`);
  }
  return JSON.parse(match[1] ?? "{}");
}

export async function readManifest(config: CascadeConfig): Promise<Manifest> {
  if (!(await pageExists(config, MANIFEST_PATH))) {
    return { version: "", entries: {} };
  }
  const page = await readRawPage(config, MANIFEST_PATH);
  return { version: page.version, entries: deserialize(page.xhtml) };
}

/**
 * Re-reads the manifest, applies `mutate` to its entries, and writes the
 * result back, retrying on conflict. Retries matter because this one page is
 * global (not per-repo), so concurrent publish runs from *different*
 * consuming repos can race on it; a git-path run is only serialized within
 * its own repo (the reusable workflow's `concurrency:` group), not across
 * repos. Reuses the existing "Nav Output" Content Type as a generic
 * plain-xhtml container (confirmed against a live instance to have no
 * required metadata, same as ensureBookNavPage's nav containers) -- no new
 * Cascade config needed.
 */
async function mutateManifest(
  config: CascadeConfig,
  mutate: (entries: Record<string, string>) => Record<string, string>,
): Promise<void> {
  for (let attempt = 0; ; attempt++) {
    const manifest = await readManifest(config);
    const entries = mutate(manifest.entries);
    if (entries === manifest.entries) return; // mutate signals "no-op" by returning the same reference

    try {
      if (manifest.version === "") {
        await ensureFolder(config, "docs/_system");
        await createRawPage(config, MANIFEST_PATH, config.navOutputContentTypeId, serialize(entries));
      } else {
        await editRawPage(config, MANIFEST_PATH, serialize(entries), manifest.version);
      }
      return;
    } catch (err) {
      // A version conflict on edit, or a duplicate-create race the very
      // first time the manifest is bootstrapped, both mean "someone else
      // just wrote it" -- re-read and reapply this one mutation.
      const retryable =
        err instanceof VersionConflictError || (manifest.version === "" && err instanceof CascadeApiError);
      if (retryable && attempt < MAX_RETRIES) continue;
      throw err;
    }
  }
}

/** Set entries[docId] = path in the shared manifest. */
export async function updateManifestEntry(config: CascadeConfig, docId: string, path: string): Promise<void> {
  await mutateManifest(config, (entries) =>
    entries[docId] === path ? entries : { ...entries, [docId]: path },
  );
}

/** Remove docId from the shared manifest (a hard delete -- the page is truly gone, not just unpublished). */
export async function removeManifestEntry(config: CascadeConfig, docId: string): Promise<void> {
  await mutateManifest(config, (entries) => {
    if (!(docId in entries)) return entries;
    const { [docId]: _removed, ...rest } = entries;
    return rest;
  });
}
