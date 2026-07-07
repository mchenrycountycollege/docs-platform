import { describe, expect, it } from "vitest";
import { normalizeHtml } from "./html-normalize.js";

describe("normalizeHtml", () => {
  it("keeps allowed tags", () => {
    const html = normalizeHtml("<h2>Title</h2><p>Body <strong>bold</strong> <em>em</em>.</p>");
    expect(html).toBe("<h2>Title</h2><p>Body <strong>bold</strong> <em>em</em>.</p>");
  });

  it("strips disallowed tags but keeps their text content", () => {
    const html = normalizeHtml('<div class="x"><p>Body</p></div><script>evil()</script>');
    expect(html).not.toContain("<div");
    expect(html).not.toContain("<script>");
    expect(html).toContain("<p>Body</p>");
  });

  it("strips disallowed attributes but keeps the element", () => {
    const html = normalizeHtml('<p style="color:red" onclick="evil()">Body</p>');
    expect(html).toBe("<p>Body</p>");
  });

  it("keeps only the whitelisted attributes on img and a", () => {
    const html = normalizeHtml(
      '<img src="https://example.com/x.png" alt="x" onerror="evil()" class="y" /><a href="https://example.com" title="t" target="_blank" onclick="evil()">link</a>',
    );
    expect(html).toContain('<img src="https://example.com/x.png" alt="x">');
    expect(html).toContain('<a href="https://example.com" title="t" target="_blank">link</a>');
  });

  it("drops disallowed link protocols", () => {
    const html = normalizeHtml('<a href="javascript:alert(1)">bad</a>');
    expect(html).not.toContain("javascript:");
  });

  it("keeps tables intact", () => {
    const html = normalizeHtml("<table><thead><tr><th>A</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>");
    expect(html).toBe(
      "<table><thead><tr><th>A</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>",
    );
  });
});
