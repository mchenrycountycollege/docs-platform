import { describe, expect, it } from "vitest";
import { folderDisplayName } from "./nav.js";

describe("folderDisplayName", () => {
  it("prefers the folder's own displayName when Cascade set one", () => {
    expect(
      folderDisplayName({ type: "folder", path: "docs/book/getting-started", displayName: "Getting Started" }),
    ).toBe("Getting Started");
  });

  it("humanizes the last path segment when displayName is missing", () => {
    // createFolder()-made chapters have no metadata.displayName (see nav.ts).
    expect(folderDisplayName({ type: "folder", path: "docs/book/getting-started" })).toBe("Getting Started");
  });

  it("falls back to the full path when there is no trailing segment", () => {
    expect(folderDisplayName({ type: "folder", path: "" })).toBe("");
  });
});
