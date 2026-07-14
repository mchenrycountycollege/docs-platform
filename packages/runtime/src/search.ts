import { createSearchIndex, type SearchIndex } from "@docs-platform/doc-shell";
import type { SearchEntry, SearchResponse } from "./types.js";

// The Fuse config + query semantics now live in doc-shell's createSearchIndex,
// so the editor's cmdk palette searches identically. This file keeps only the
// public-URL fetch/cache and all the DOM overlay wiring below.
let cachedEntries: SearchEntry[] | null = null;
let index: SearchIndex | null = null;

async function loadIndex(searchUrl: string): Promise<SearchEntry[]> {
  if (cachedEntries) return cachedEntries;
  const res = await fetch(searchUrl);
  if (!res.ok) throw new Error(`failed to load search index: ${res.status}`);
  const data = (await res.json()) as SearchResponse;
  cachedEntries = data.pages;
  index = createSearchIndex(cachedEntries);
  return cachedEntries;
}

function filter(entries: SearchEntry[], query: string): SearchEntry[] {
  if (!index) return entries;
  return index.search(query);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(text: string, query: string): string {
  const q = query.trim();
  if (!q) return escapeHtml(text);
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return escapeHtml(text);
  return (
    escapeHtml(text.slice(0, i)) +
    "<mark>" +
    escapeHtml(text.slice(i, i + q.length)) +
    "</mark>" +
    escapeHtml(text.slice(i + q.length))
  );
}

export function initSearch(config: { searchUrl: string }): void {
  const trigger = document.getElementById("searchTrigger");
  const overlay = document.getElementById("searchOverlay");
  const input = document.getElementById("searchInput") as HTMLInputElement | null;
  const results = document.getElementById("searchResults");
  const kbdHint = document.getElementById("kbdHint");
  if (!trigger || !overlay || !input || !results) return;

  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  if (kbdHint) kbdHint.textContent = isMac ? "⌘K" : "Ctrl K";

  let activeIndex = -1;
  let currentMatches: SearchEntry[] = [];
  let loadedEntries: SearchEntry[] = [];

  function render(list: SearchEntry[]): void {
    currentMatches = list;
    activeIndex = list.length ? 0 : -1;
    if (!list.length) {
      results!.innerHTML = '<p class="search-empty">No pages match. Try a different term.</p>';
      return;
    }
    const q = input!.value;
    results!.innerHTML = list
      .map(
        (item, i) =>
          `<a class="search-result${i === 0 ? " active" : ""}" data-i="${i}" href="/${item.path}.html">` +
          `<div class="r-title">${highlight(item.title, q)}</div>` +
          `<div class="r-path">${escapeHtml(item.excerpt)}</div>` +
          `</a>`,
      )
      .join("");
  }

  function open(): void {
    overlay!.classList.add("open");
    input!.value = "";
    loadIndex(config.searchUrl)
      .then((entries) => {
        loadedEntries = entries;
        render(filter(loadedEntries, input!.value));
      })
      .catch(() => {
        results!.innerHTML = '<p class="search-empty">Search is unavailable right now.</p>';
      });
    render(loadedEntries);
    setTimeout(() => input!.focus(), 0);
  }

  function close(): void {
    overlay!.classList.remove("open");
  }

  input.addEventListener("input", () => render(filter(loadedEntries, input.value)));
  results.addEventListener("click", () => close());
  trigger.addEventListener("click", open);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    const mod = isMac ? e.metaKey : e.ctrlKey;
    if (mod && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (overlay!.classList.contains("open")) close();
      else open();
      return;
    }
    if (!overlay!.classList.contains("open")) return;
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!currentMatches.length) return;
      activeIndex =
        e.key === "ArrowDown"
          ? (activeIndex + 1) % currentMatches.length
          : (activeIndex - 1 + currentMatches.length) % currentMatches.length;
      document.querySelectorAll(".search-result").forEach((el, i) => {
        el.classList.toggle("active", i === activeIndex);
      });
      document.querySelector(`.search-result[data-i="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
      return;
    }
    if (e.key === "Enter" && activeIndex !== -1) {
      const activeEl = document.querySelector(`.search-result[data-i="${activeIndex}"]`);
      if (activeEl instanceof HTMLAnchorElement) activeEl.click();
    }
  });
}
