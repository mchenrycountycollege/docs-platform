import { describe, expect, it } from "vitest";
import { slugify } from "./slug.js";

describe("slugify", () => {
  it("lowercases and hyphenates spaces", () => {
    expect(slugify("Getting Started")).toBe("getting-started");
  });

  it("strips diacritics", () => {
    expect(slugify("Café Configuration")).toBe("cafe-configuration");
  });

  it("collapses punctuation runs into a single hyphen", () => {
    expect(slugify("WYSIWYG: callouts & tables!")).toBe("wysiwyg-callouts-tables");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  --Overview--  ")).toBe("overview");
  });

  it("passes through an already-kebab-case string unchanged", () => {
    expect(slugify("already-kebab-case")).toBe("already-kebab-case");
  });
});
