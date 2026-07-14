import { buildTree, deriveBookSlug, folderDisplayName, humanizeSlug } from "@docs-platform/doc-shell";
import type { NavResponse, NavTree } from "./types.js";

// The pure nav transforms (buildTree, deriveBookSlug, humanizeSlug) moved to
// @docs-platform/doc-shell so the editor front-door groups/labels the nav
// identically. Re-exported here so index.ts and nav.test.ts keep importing
// them from "./nav.js" unchanged. This file now owns only the DOM renderers.
export { buildTree, deriveBookSlug, humanizeSlug };

export async function fetchNav(bookSlug: string): Promise<NavResponse> {
  const res = await fetch(`/docs/_system/nav/${bookSlug}.json`);
  if (!res.ok) throw new Error(`failed to load nav for book "${bookSlug}": ${res.status}`);
  return res.json();
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
