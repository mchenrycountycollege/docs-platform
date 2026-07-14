import { describe, expect, it } from "vitest";
import { htmlToMarkdown, markdownToHtml } from "./markdown.js";

describe("markdownToHtml", () => {
  it("converts headings, paragraphs, and links", async () => {
    const html = await markdownToHtml("## Title\n\nSome [text](https://example.com).");
    expect(html).toContain("<h2>Title</h2>");
    expect(html).toContain('<a href="https://example.com">text</a>');
  });

  it("converts lists", async () => {
    const html = await markdownToHtml("- one\n- two\n");
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>one</li>");
    expect(html).toContain("<li>two</li>");
  });

  it("converts GFM tables", async () => {
    const html = await markdownToHtml("| A | B |\n| --- | --- |\n| 1 | 2 |\n");
    expect(html).toContain("<table>");
    expect(html).toContain("<td>1</td>");
  });

  it("converts fenced code blocks", async () => {
    const html = await markdownToHtml("```js\nconst x = 1;\n```\n");
    expect(html).toContain("<pre>");
    expect(html).toContain("const x = 1;");
  });
});

describe("htmlToMarkdown", () => {
  it("converts headings, paragraphs, and links", async () => {
    const markdown = await htmlToMarkdown('<h2>Title</h2><p>Some <a href="https://example.com">text</a>.</p>');
    expect(markdown).toContain("## Title");
    expect(markdown).toContain("[text](https://example.com)");
  });

  it("converts lists", async () => {
    const markdown = await htmlToMarkdown("<ul><li>one</li><li>two</li></ul>");
    expect(markdown).toContain("* one");
    expect(markdown).toContain("* two");
  });

  it("round-trips through markdownToHtml", async () => {
    const original = "## Title\n\nSome **bold** text with a [link](https://example.com).\n";
    const html = await markdownToHtml(original);
    const roundTripped = await htmlToMarkdown(html);
    const reHtml = await markdownToHtml(roundTripped);
    expect(reHtml).toBe(html);
  });
});
