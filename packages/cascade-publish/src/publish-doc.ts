import {
  createPage,
  editPage,
  ensureBookNavPage,
  ensureFolder,
  moveAsset,
  pageExists,
  publishAsset,
  readPage,
  type CascadeConfig,
  type MetadataFields,
  type StructuredDataFields,
} from "@docs-platform/cascade-client";
import { mapDocPath, markdownToHtml, normalizeHtml, parseFrontmatter, slugify } from "@docs-platform/doc-core";
import { readManifest, updateManifestEntry } from "./manifest.js";

export class OwnershipConflictError extends Error {
  constructor(path: string) {
    super(
      `page at '${path}' is owned by the web editor (origin: web) -- refusing to overwrite ` +
        `without 'takeover: true' in frontmatter`,
    );
    this.name = "OwnershipConflictError";
  }
}

export class PathCollisionError extends Error {
  constructor(path: string, existingDocId: string, incomingDocId: string) {
    super(
      `page at '${path}' already belongs to a different doc (docId ${existingDocId}); this ` +
        `doc's docId is ${incomingDocId} -- change 'book'/'chapter'/'slug' to avoid the collision`,
    );
    this.name = "PathCollisionError";
  }
}

export interface PublishDocInput {
  /** Raw markdown file content, including YAML frontmatter. */
  content: string;
  /** e.g. "some-cascade-component/docs/overview.md" -- stamped into metadata.sourceRepoPath. */
  sourceRepoPath: string;
  /** Fallback identity when frontmatter has no authorEmail override. */
  gitAuthorEmail: string;
}

export interface PublishDocResult {
  path: string;
  version: string;
  /** True if this run moved the page from a previously-known different path. */
  moved: boolean;
}

/** Cascade does not auto-create intermediate parent folders, so each ancestor must be ensured in order. */
async function ensureFolderChain(config: CascadeConfig, folderPath: string): Promise<void> {
  const segments = folderPath.split("/").slice(1); // drop the leading "docs" segment
  let current = "docs";
  for (const segment of segments) {
    current = `${current}/${segment}`;
    await ensureFolder(config, current);
  }
}

/**
 * Parse -> normalize -> place -> create-or-update-or-move -> publish a
 * single doc. See project-management/implementation-plan.md's "Delete /
 * rename semantics" and this package's design notes for the manifest-backed
 * rename detection this relies on (Cascade's Search API can't look up a
 * page by our custom docId metadata field -- confirmed against a live
 * instance).
 */
export async function publishDoc(config: CascadeConfig, input: PublishDocInput): Promise<PublishDocResult> {
  const fm = parseFrontmatter(input.content);
  const bodyHtml = normalizeHtml(await markdownToHtml(fm.content));
  const bookSlug = slugify(fm.book);
  const slug = fm.slug ?? slugify(fm.title);
  const path = mapDocPath({ book: fm.book, chapter: fm.chapter, slug });
  const parentFolderPath = path.slice(0, path.lastIndexOf("/"));

  const fields: StructuredDataFields = { title: fm.title, order: fm.order, tags: fm.tags, bodyHtml };
  const metadata: MetadataFields = {
    docId: fm.docId,
    origin: "git",
    sourceRepoPath: input.sourceRepoPath,
    authorEmail: fm.authorEmail ?? input.gitAuthorEmail,
  };

  const manifest = await readManifest(config);
  const knownPath = manifest.entries[fm.docId];
  let moved = false;

  if (knownPath !== undefined && knownPath !== path && (await pageExists(config, knownPath))) {
    const existing = await readPage(config, knownPath);
    if (existing.metadata.origin === "web" && !fm.takeover) {
      throw new OwnershipConflictError(knownPath);
    }
    await ensureFolderChain(config, parentFolderPath);
    await moveAsset(config, "page", knownPath, path);
    moved = true;
  }

  let version: string;
  if (await pageExists(config, path)) {
    const existing = await readPage(config, path);
    if (existing.metadata.docId !== fm.docId) {
      throw new PathCollisionError(path, existing.metadata.docId, fm.docId);
    }
    if (existing.metadata.origin === "web" && !fm.takeover) {
      throw new OwnershipConflictError(path);
    }
    const result = await editPage(config, path, fields, metadata, existing.version);
    version = result.version;
  } else {
    await ensureFolderChain(config, parentFolderPath);
    await createPage(config, path, fields, metadata);
    version = (await readPage(config, path)).version;
  }

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
        `[cascade-publish] could not publish ${artifactPath} (has it been created yet? see ` +
          `implementation-checklist.md Phase 7): ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  await updateManifestEntry(config, fm.docId, path);

  return { path, version, moved };
}
