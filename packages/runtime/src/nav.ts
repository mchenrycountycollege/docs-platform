import type { NavChapter, NavFolder, NavPage, NavResponse, NavTree } from "./types.js";

// docPath is "docs/<book>/<chapter>/<page>" or "docs/<book>/<page>" -- the
// book slug is always the second segment.
export function deriveBookSlug(docPath: string): string {
  const segments = docPath.split("/").filter(Boolean);
  const bookSlug = segments[1];
  if (!bookSlug) throw new Error(`cannot derive book slug from path "${docPath}"`);
  return bookSlug;
}

export async function fetchNav(bookSlug: string): Promise<NavResponse> {
  const res = await fetch(`/docs/_system/nav/${bookSlug}.json`);
  if (!res.ok) throw new Error(`failed to load nav for book "${bookSlug}": ${res.status}`);
  return res.json();
}

// nav-format.vm returns a flat list of chapter folders and pages under one
// book. Pages are already sorted by `order`; folders already carry
// Cascade's own drag-and-drop order. Grouping the nesting back together is
// left to this pure function specifically so it can be unit-tested without
// a DOM or a live Cascade instance.
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
function folderDisplayName(folder: NavFolder): string {
  if (folder.displayName) return folder.displayName;
  const slug = folder.path.split("/").filter(Boolean).pop() ?? folder.path;
  return humanizeSlug(slug);
}

export function renderSidebar(container: HTMLElement, tree: NavTree, currentPath: string): void {
  container.innerHTML = "";
  for (const chapter of tree.chapters) {
    const containsActive = chapter.pages.some((p) => p.path === currentPath);
    const section = document.createElement("div");
    section.className = "chapter" + (containsActive ? "" : " collapsed");

    if (chapter.folder) {
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "chapter-toggle";
      toggle.innerHTML =
        '<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 1.5l4 3.5-4 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      toggle.appendChild(document.createTextNode(folderDisplayName(chapter.folder)));
      toggle.addEventListener("click", () => section.classList.toggle("collapsed"));
      section.appendChild(toggle);
    }

    const list = document.createElement("ul");
    list.className = "page-list";
    for (const page of chapter.pages) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "/" + page.path + ".html";
      a.textContent = page.title;
      if (page.path === currentPath) a.className = "active";
      li.appendChild(a);
      list.appendChild(li);
    }
    section.appendChild(list);
    container.appendChild(section);
  }
}

export function renderBreadcrumb(
  container: HTMLElement,
  tree: NavTree,
  bookSlug: string,
  currentPath: string,
): void {
  const chapter = tree.chapters.find((c) => c.pages.some((p) => p.path === currentPath));
  const page = chapter?.pages.find((p) => p.path === currentPath);

  container.innerHTML = "";

  // Neither the book nor a chapter necessarily has its own browsable page
  // in this architecture (only leaf Documentation Pages are real assets),
  // so these segments render as plain text, not links, to avoid dead hrefs.
  const bookCrumb = document.createElement("span");
  bookCrumb.className = "crumb";
  bookCrumb.textContent = humanizeSlug(bookSlug);
  container.appendChild(bookCrumb);

  if (chapter?.folder) {
    container.appendChild(sep());
    const chapterCrumb = document.createElement("span");
    chapterCrumb.className = "crumb";
    chapterCrumb.textContent = folderDisplayName(chapter.folder);
    container.appendChild(chapterCrumb);
  }

  if (page) {
    container.appendChild(sep());
    const current = document.createElement("span");
    current.className = "current";
    current.textContent = page.title;
    container.appendChild(current);
  }
}

function sep(): HTMLSpanElement {
  const span = document.createElement("span");
  span.setAttribute("aria-hidden", "true");
  span.textContent = "/";
  return span;
}
