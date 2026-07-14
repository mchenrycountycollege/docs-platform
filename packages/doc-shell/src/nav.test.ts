import { describe, expect, it } from "vitest";
import { buildTree, deriveBookSlug, humanizeSlug } from "./nav.js";
import type { NavResponse } from "./types.js";

describe("deriveBookSlug", () => {
  it("reads the second path segment", () => {
    expect(deriveBookSlug("docs/docs-platform/getting-started/hello-world")).toBe("docs-platform");
  });

  it("works for a page directly under the book (no chapter)", () => {
    expect(deriveBookSlug("docs/docs-platform/overview")).toBe("docs-platform");
  });

  it("throws on a path with no book segment", () => {
    expect(() => deriveBookSlug("docs")).toThrow();
  });
});

describe("humanizeSlug", () => {
  it("title-cases a kebab-case slug", () => {
    expect(humanizeSlug("docs-platform")).toBe("Docs Platform");
  });
});

describe("buildTree", () => {
  const nav: NavResponse = {
    folders: [
      { type: "folder", path: "docs/docs-platform/getting-started", displayName: "Getting Started" },
      { type: "folder", path: "docs/docs-platform/architecture", displayName: "Architecture" },
    ],
    pages: [
      {
        type: "page",
        path: "docs/docs-platform/getting-started/hello-world",
        title: "Hello World",
        order: "000100",
        tags: ["smoke-test"],
      },
      {
        type: "page",
        path: "docs/docs-platform/architecture/two-write-paths",
        title: "Two Write Paths",
        order: "000100",
        tags: [],
      },
      {
        type: "page",
        path: "docs/docs-platform/overview",
        title: "Overview",
        order: "000050",
        tags: [],
      },
    ],
  };

  it("groups pages under their parent chapter folder", () => {
    const tree = buildTree(nav);
    const getting_started = tree.chapters.find((c) => c.folder?.displayName === "Getting Started");
    expect(getting_started?.pages.map((p) => p.title)).toEqual(["Hello World"]);
  });

  it("preserves folder order and per-chapter page order as given", () => {
    const tree = buildTree(nav);
    const folderChapters = tree.chapters.filter((c) => c.folder !== null);
    expect(folderChapters.map((c) => c.folder!.displayName)).toEqual(["Getting Started", "Architecture"]);
  });

  it("buckets pages with no matching chapter folder under a root group", () => {
    const tree = buildTree(nav);
    expect(tree.chapters[0]!.folder).toBeNull();
    expect(tree.chapters[0]!.pages.map((p) => p.title)).toEqual(["Overview"]);
  });

  it("omits the root group entirely when every page belongs to a chapter", () => {
    const noRootPages: NavResponse = {
      folders: nav.folders,
      pages: nav.pages.filter((p) => p.path !== "docs/docs-platform/overview"),
    };
    const tree = buildTree(noRootPages);
    expect(tree.chapters.every((c) => c.folder !== null)).toBe(true);
  });

  it("returns empty chapters for an empty book", () => {
    expect(buildTree({ folders: [], pages: [] }).chapters).toEqual([]);
  });
});
