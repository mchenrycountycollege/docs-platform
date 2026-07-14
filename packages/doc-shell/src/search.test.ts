import { describe, expect, it } from "vitest";
import { SEARCH_OPTIONS, createSearchIndex } from "./search.js";
import type { SearchEntry } from "./types.js";

const entries: SearchEntry[] = [
  { title: "Getting Started", path: "docs/book/getting-started", tags: ["intro"], excerpt: "How to begin." },
  { title: "Two Write Paths", path: "docs/book/two-write-paths", tags: ["architecture"], excerpt: "Git and web." },
  { title: "Publishing", path: "docs/book/publishing", tags: ["ops"], excerpt: "Cascade publish flow." },
];

describe("SEARCH_OPTIONS", () => {
  it("is the config both renderers share", () => {
    expect(SEARCH_OPTIONS.keys).toEqual(["title", "excerpt", "tags"]);
    expect(SEARCH_OPTIONS.threshold).toBe(0.35);
  });
});

describe("createSearchIndex", () => {
  it("returns every entry in original order for an empty query", () => {
    const index = createSearchIndex(entries);
    expect(index.search("")).toEqual(entries);
    expect(index.search("   ")).toEqual(entries);
  });

  it("matches on the title field", () => {
    const hits = createSearchIndex(entries).search("write paths");
    expect(hits[0]?.path).toBe("docs/book/two-write-paths");
  });

  it("matches on tags", () => {
    const hits = createSearchIndex(entries).search("architecture");
    expect(hits.map((h) => h.path)).toContain("docs/book/two-write-paths");
  });

  it("returns no hits for a term absent from every field", () => {
    expect(createSearchIndex(entries).search("zzzznonexistent")).toEqual([]);
  });
});
