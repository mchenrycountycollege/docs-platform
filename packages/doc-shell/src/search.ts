import Fuse, { type IFuseOptions } from "fuse.js";
import type { SearchEntry } from "./types.js";

// The one Fuse configuration both the public reader (runtime's `initSearch`)
// and the editor front-door (cmdk palette) build their index from, so a
// relevance tweak (keys, threshold) changes both surfaces at once instead of
// drifting. This is the ~5 lines the plan (E-Shell) calls out as the shared
// search "brain".
export const SEARCH_OPTIONS: IFuseOptions<SearchEntry> = {
  keys: ["title", "excerpt", "tags"],
  threshold: 0.35,
};

export interface SearchIndex {
  search(query: string): SearchEntry[];
}

// Wraps a Fuse instance over already-fetched entries. Each renderer fetches
// `search-index.json` its own way (the reader hits the public URL, the editor
// its `/api/*` proxy) and passes the parsed entries here -- doc-shell never
// fetches. An empty/whitespace query returns every entry in its original
// order, preserving runtime's prior "nothing typed yet" behavior.
export function createSearchIndex(entries: SearchEntry[]): SearchIndex {
  const fuse = new Fuse(entries, SEARCH_OPTIONS);
  return {
    search(query: string): SearchEntry[] {
      const q = query.trim();
      if (!q) return entries;
      return fuse.search(q).map((r) => r.item);
    },
  };
}
