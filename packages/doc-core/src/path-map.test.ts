import { describe, expect, it } from "vitest";
import { mapDocPath } from "./path-map.js";

describe("mapDocPath", () => {
  it("maps book + slug with no chapter", () => {
    expect(mapDocPath({ book: "Cascade Component", slug: "overview" })).toBe(
      "docs/cascade-component/overview",
    );
  });

  it("maps book + chapter + slug", () => {
    expect(mapDocPath({ book: "Cascade Component", chapter: "WYSIWYG", slug: "callouts" })).toBe(
      "docs/cascade-component/wysiwyg/callouts",
    );
  });

  it("slugifies book and chapter but leaves the pre-computed slug untouched", () => {
    expect(mapDocPath({ book: "My Book!", chapter: "Ch. 1", slug: "already-a-slug" })).toBe(
      "docs/my-book/ch-1/already-a-slug",
    );
  });
});
