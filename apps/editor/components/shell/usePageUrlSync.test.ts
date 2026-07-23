import { describe, expect, it } from "vitest";
import { pagePathFromUrl, pagePathToUrl } from "./usePageUrlSync.js";

/**
 * The two pure halves of the shareable-link feature. The hook itself is a
 * pair of effects over browser history and is covered by the manual
 * signed-in/signed-out passes in the plan's verification section; these
 * helpers are where a link can silently break, so they're pinned here.
 */

function roundTrip(path: string): string | null {
  // pagePathToUrl returns "/?p=..."; location.search is the "?p=..." part.
  const search = pagePathToUrl(path).slice(1);
  return pagePathFromUrl(search);
}

describe("pagePathToUrl", () => {
  it("keeps slashes literal so a pasted link stays readable", () => {
    expect(pagePathToUrl("docs/docs-platform/getting-started/hello-world")).toBe(
      "/?p=docs/docs-platform/getting-started/hello-world",
    );
  });

  it("escapes characters that would break out of the query param", () => {
    expect(pagePathToUrl("docs/book/a b&c=d#e")).toBe("/?p=docs/book/a%20b%26c%3Dd%23e");
  });
});

describe("pagePathFromUrl", () => {
  it("reads the page path back out", () => {
    expect(pagePathFromUrl("?p=docs/book/chapter/page")).toBe("docs/book/chapter/page");
  });

  it("tolerates a leading '?' being absent and other params being present", () => {
    expect(pagePathFromUrl("p=docs/book/page")).toBe("docs/book/page");
    expect(pagePathFromUrl("?utm=email&p=docs/book/page")).toBe("docs/book/page");
  });

  it("returns null when there is no page param", () => {
    expect(pagePathFromUrl("")).toBeNull();
    expect(pagePathFromUrl("?")).toBeNull();
    expect(pagePathFromUrl("?other=1")).toBeNull();
    expect(pagePathFromUrl("?p=")).toBeNull();
  });

  it("rejects anything not rooted at docs/ so a junk param can't drive a fetch", () => {
    expect(pagePathFromUrl("?p=/etc/passwd")).toBeNull();
    expect(pagePathFromUrl("?p=../../secrets")).toBeNull();
    expect(pagePathFromUrl("?p=https://example.com")).toBeNull();
    expect(pagePathFromUrl("?p=docsy/book/page")).toBeNull();
    expect(pagePathFromUrl("?p=docs")).toBeNull();
  });
});

describe("round trip", () => {
  it("survives encode -> decode unchanged", () => {
    for (const path of [
      "docs/docs-platform/getting-started/hello-world",
      "docs/book/a b&c=d#e",
      "docs/book/chapter/page+plus",
      "docs/book/chapter/café",
    ]) {
      expect(roundTrip(path)).toBe(path);
    }
  });
});
