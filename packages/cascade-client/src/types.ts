export type AssetType = "page" | "file" | "folder";

export interface CascadeConfig {
  /** e.g. https://college.cascadecms.com */
  baseUrl: string;
  /** Cascade site name the docs/ subtree lives under */
  siteName: string;
  apiKey: string;
  /**
   * Internal Cascade id of the Documentation Page Content Type. The REST
   * `create`/`edit` payload identifies Content Type by id, not by name/path
   * (confirmed by the Cascade REST API operations reference), so this must
   * be resolved once (read the Content Type asset, or copy its id from the
   * Cascade UI) and supplied here — there is no by-name fallback.
   */
  documentationPageContentTypeId: string;
  /**
   * Internal Cascade id of the "Nav Output" Content Type (WYSIWYG, bound to
   * a Configuration pinned to nav-format.vm). Used by ensureBookNavPage()
   * to auto-create a book's nav container page on first publish — see
   * implementation-checklist.md.
   */
  navOutputContentTypeId: string;
}

/** Editorial fields that live in the Documentation Page data definition. */
export interface StructuredDataFields {
  title: string;
  /** Sibling sort order. Cascade DDs have no integer type; stored as zero-padded text. */
  order: number;
  tags: string[];
  bodyHtml: string;
}

/** Provenance fields that live in the Metadata Set, kept separate from editorial content. */
export interface MetadataFields {
  docId: string;
  origin: "git" | "web";
  sourceRepoPath?: string;
  editorName?: string;
  authorEmail?: string;
}

export interface PageAsset {
  /** Internal Cascade asset id -- required to identify the page for edit() (path alone isn't accepted). */
  id: string;
  path: string;
  /** Parent folder path, needed because edit() requires it be resupplied even when unchanged. */
  parentFolderPath: string;
  siteName: string;
  /** Cascade's lastModifiedDate, used as the optimistic-concurrency version token. */
  version: string;
  fields: StructuredDataFields;
  metadata: MetadataFields;
}

/**
 * A page with no Documentation Page structured data -- used for system
 * bookkeeping pages (nav containers, the docId manifest) that store a
 * plain `xhtml` blob instead of DD fields/metadata.
 */
export interface RawPageAsset {
  id: string;
  path: string;
  parentFolderPath: string;
  siteName: string;
  version: string;
  xhtml: string;
  /** Needed because edit() requires it be resupplied even when unchanged (same as PageAsset.parentFolderPath). */
  contentTypeId: string;
}

/**
 * A File asset -- static content (unlike pages, not templated/serialized
 * from structured data). Used to host docs-runtime.js so it can be
 * referenced from the Template via <script src>, instead of being pasted
 * inline (see implementation-checklist.md Phase 6b for why: manual paste
 * of a large minified bundle into the Template editor was corrupting
 * \uXXXX escapes into raw bytes).
 */
export interface FileAsset {
  /** Internal Cascade asset id -- required to identify the file for edit(). */
  id: string;
  path: string;
  /** Parent folder path, needed because edit() requires it be resupplied even when unchanged. */
  parentFolderPath: string;
  siteName: string;
  /** Cascade's lastModifiedDate, used as the optimistic-concurrency version token. */
  version: string;
  data: Buffer;
}

export interface FolderEntry {
  path: string;
  type: AssetType;
  displayName: string;
}

export interface FolderAsset {
  /** Internal Cascade asset id -- required to identify the folder as a move() destination. */
  id: string;
  path: string;
  siteName: string;
  children: FolderEntry[];
}

export class CascadeApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = "CascadeApiError";
  }
}

export class VersionConflictError extends Error {
  constructor(
    public readonly currentVersion: string,
    public readonly currentBodyHtml: string,
  ) {
    super("Asset was modified since it was last read (expectedVersion mismatch)");
    this.name = "VersionConflictError";
  }
}

/**
 * A page's structuredData/metadata didn't match what fromStructuredData/
 * fromMetadata expect (e.g. a stray/partial asset from a script or a manual
 * edit, or a page authored against an older Data Definition) -- distinct from
 * CascadeApiError so callers can tell "Cascade answered, but this asset's
 * shape is wrong" apart from an upstream request failure, and give the user
 * an actionable message instead of a generic 500.
 */
export class MalformedPageError extends Error {
  constructor(
    public readonly path: string,
    cause: unknown,
  ) {
    super(`Page at ${path} has data that doesn't match the current Data Definition: ${(cause as Error)?.message ?? cause}`);
    this.name = "MalformedPageError";
  }
}
