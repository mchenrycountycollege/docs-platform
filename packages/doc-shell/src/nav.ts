import type { NavChapter, NavFolder, NavPage, NavResponse, NavTree } from "./types.js";

// docPath is "docs/<book>/<chapter>/<page>" or "docs/<book>/<page>" -- the
// book slug is always the second segment.
export function deriveBookSlug(docPath: string): string {
  const segments = docPath.split("/").filter(Boolean);
  const bookSlug = segments[1];
  if (!bookSlug) throw new Error(`cannot derive book slug from path "${docPath}"`);
  return bookSlug;
}

// nav-format.vm returns a flat list of chapter folders and pages under one
// book. Pages are already sorted by `order`; folders already carry
// Cascade's own drag-and-drop order. Grouping the nesting back together is
// left to this pure function specifically so it can be unit-tested without
// a DOM or a live Cascade instance -- and so both renderers group identically.
export function buildTree(nav: NavResponse): NavTree {
  const folderChapters: { folder: NavFolder; pages: NavPage[] }[] = nav.folders.map((folder) => ({
    folder,
    pages: [],
  }));
  const rootPages: NavPage[] = [];

  for (const page of nav.pages) {
    const parentPath = page.path.slice(0, page.path.lastIndexOf("/"));
    const chapter = folderChapters.find((c) => c.folder.path === parentPath);
    if (chapter) {
      chapter.pages.push(page);
    } else {
      rootPages.push(page);
    }
  }

  const chapters: NavChapter[] = [];
  if (rootPages.length > 0) chapters.push({ folder: null, pages: rootPages });
  chapters.push(...folderChapters);
  return { chapters };
}

// nav.json doesn't carry the book folder's own display name (only its
// contents), so the breadcrumb's book segment is a best-effort humanized
// slug, not the real Cascade display name -- a known v1 gap.
export function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Chapter folders created via cascade-client's createFolder() never get a
// Cascade metadata.displayName set (confirmed live -- nav-format.vm's
// $folderAsset.metadata.displayName resolves to nothing and the field is
// dropped from the JSON entirely), so this can't be trusted as always
// present. Same fallback as the book slug above: humanize the folder's own
// path segment rather than showing "undefined".
export function folderDisplayName(folder: NavFolder): string {
  if (folder.displayName) return folder.displayName;
  const slug = folder.path.split("/").filter(Boolean).pop() ?? folder.path;
  return humanizeSlug(slug);
}
