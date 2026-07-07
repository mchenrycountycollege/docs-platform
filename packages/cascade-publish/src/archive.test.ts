import { describe, expect, it } from "vitest";
import type { ParsedDoc } from "@docs-platform/doc-core";
import { decideArchiveAction } from "./archive.js";

function doc(overrides: Partial<ParsedDoc> = {}): ParsedDoc {
  return {
    docId: "550e8400-e29b-41d4-a716-446655440000",
    title: "Overview",
    book: "My Book",
    tags: [],
    order: 500,
    takeover: false,
    delete: false,
    content: "Body.",
    ...overrides,
  };
}

describe("decideArchiveAction", () => {
  it("defaults to unpublish when the docId is known", () => {
    const action = decideArchiveAction(doc(), { "550e8400-e29b-41d4-a716-446655440000": "docs/my-book/overview" }, "repo/docs/overview.md");
    expect(action).toEqual({ kind: "unpublish", path: "docs/my-book/overview" });
  });

  it("hard-deletes when the last frontmatter had delete: true", () => {
    const action = decideArchiveAction(
      doc({ delete: true }),
      { "550e8400-e29b-41d4-a716-446655440000": "docs/my-book/overview" },
      "repo/docs/overview.md",
    );
    expect(action).toEqual({
      kind: "hard-delete",
      path: "docs/my-book/overview",
      docId: "550e8400-e29b-41d4-a716-446655440000",
    });
  });

  it("is unknown when the docId isn't in the manifest", () => {
    const action = decideArchiveAction(doc(), {}, "repo/docs/overview.md");
    expect(action).toEqual({
      kind: "unknown",
      docId: "550e8400-e29b-41d4-a716-446655440000",
      sourceRepoPath: "repo/docs/overview.md",
    });
  });
});
