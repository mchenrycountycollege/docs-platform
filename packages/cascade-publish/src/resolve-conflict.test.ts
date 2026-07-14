import { describe, expect, it } from "vitest";
import { buildSyncedFrontmatter } from "./resolve-conflict.js";

describe("buildSyncedFrontmatter", () => {
  it("keeps local structural fields but overwrites title/tags/order from the live page", () => {
    const merged = buildSyncedFrontmatter(
      { id: "550e8400-e29b-41d4-a716-446655440000", book: "My Book", chapter: "Getting Started", title: "Old Title", tags: ["old"], order: 1 },
      { title: "New Title (edited on the web)", tags: ["new", "web"], order: 2 },
    );

    expect(merged).toEqual({
      id: "550e8400-e29b-41d4-a716-446655440000",
      book: "My Book",
      chapter: "Getting Started",
      title: "New Title (edited on the web)",
      tags: ["new", "web"],
      order: 2,
      takeover: true,
    });
  });

  it("forces takeover to true even if it was already false locally", () => {
    const merged = buildSyncedFrontmatter(
      { id: "550e8400-e29b-41d4-a716-446655440000", book: "My Book", title: "T", tags: [], order: 1, takeover: false },
      { title: "T", tags: [], order: 1 },
    );
    expect(merged["takeover"]).toBe(true);
  });
});
