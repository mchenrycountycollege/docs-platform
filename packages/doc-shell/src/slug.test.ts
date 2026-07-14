import { describe, expect, it } from "vitest";
import { slugify } from "./slug.js";

describe("slugify", () => {
  it("lowercases and hyphenates a heading", () => {
    expect(slugify("Getting Started")).toBe("getting-started");
  });

  it("collapses runs of punctuation and whitespace into a single hyphen", () => {
    expect(slugify("Two   Write -- Paths!")).toBe("two-write-paths");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  Hello, World  ")).toBe("hello-world");
  });

  it("falls back to 'section' when nothing usable remains", () => {
    expect(slugify("!!!")).toBe("section");
    expect(slugify("")).toBe("section");
  });
});
