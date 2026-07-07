import { describe, expect, it } from "vitest";
import { assertInScope, Forbidden } from "./scope.js";

describe("assertInScope", () => {
  it("allows the docs root itself", () => {
    expect(assertInScope("docs")).toBe("docs");
  });

  it("allows nested paths under docs/", () => {
    expect(assertInScope("docs/book/chapter/page")).toBe("docs/book/chapter/page");
  });

  it("collapses repeated slashes and trailing slashes", () => {
    expect(assertInScope("docs//book///chapter/")).toBe("docs/book/chapter");
  });

  it("rejects paths outside docs/", () => {
    expect(() => assertInScope("other/book")).toThrow(Forbidden);
  });

  it("rejects a sibling folder that merely shares the docs prefix", () => {
    expect(() => assertInScope("docs-archive/book")).toThrow(Forbidden);
  });

  it("rejects parent-directory traversal", () => {
    expect(() => assertInScope("docs/../secrets")).toThrow(Forbidden);
    expect(() => assertInScope("docs/book/../../secrets")).toThrow(Forbidden);
  });

  it("rejects a bare current-directory segment", () => {
    expect(() => assertInScope("docs/./book")).toThrow(Forbidden);
  });
});
