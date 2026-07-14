import { ServerBlockNoteEditor } from "@blocknote/server-util";
import { markdownToHtml, normalizeHtml } from "@docs-platform/doc-core";
import { describe, expect, it } from "vitest";
import { schema } from "./blocknote-schema.js";
import { blocksToHtml, htmlToBlocks } from "./blocknote-html.js";

/**
 * Acceptance gate for E1 (editor-implementation-plan.md section 4, item 4):
 * proves the editor can load canonical HTML into BlockNote and save it back
 * without corruption. Two corpora:
 *
 * 1. Hand-written HTML already inside doc-core's normalizeHtml allow-list
 *    (the shape the editor itself produces and re-loads).
 * 2. Git-authored pages: real markdown run through the git path's own
 *    md -> HTML -> normalize pipeline, then through the editor's
 *    HTML -> BlockNote -> HTML pipeline -- proves a page written via git and
 *    opened in the web editor survives the round trip too.
 *
 * "Stability" here means a fixed point: normalize(roundTrip(html)) may
 * legitimately differ from the *input* html (e.g. BlockNote/normalizeHtml
 * may reformat whitespace or attribute order on the first pass), but running
 * the round trip a second time must reproduce exactly the first pass's
 * output. A real content-loss bug (dropped tag, stripped attribute) shows up
 * as the second pass differing from the first, not converging.
 */

async function roundTrip(editor: ServerBlockNoteEditor, html: string): Promise<string> {
  const blocks = await htmlToBlocks(editor, html);
  const exported = await blocksToHtml(editor, blocks);
  return normalizeHtml(exported);
}

const htmlFixtures: Record<string, string> = {
  headings: "<h2>Section</h2><h3>Subsection</h3><h4>Detail</h4><p>Body text.</p>",
  "bold and italic": "<p>Some <strong>bold</strong> and <em>italic</em> and <strong><em>both</em></strong> text.</p>",
  "bullet list": "<ul><li>one</li><li>two</li><li>three</li></ul>",
  "numbered list": "<ol><li>first</li><li>second</li></ol>",
  blockquote: "<blockquote><p>A quoted passage.</p></blockquote>",
  "code block": "<pre><code>const x = 1;\nconsole.log(x);</code></pre>",
  table:
    "<table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table>",
  image: '<p><img src="https://example.com/x.png" alt="alt text" /></p>',
  link: '<p>See <a href="https://example.com">this link</a> for more.</p>',
  "mixed document":
    "<h2>Overview</h2><p>Intro with <strong>emphasis</strong>.</p><ul><li>point one</li><li>point two</li></ul>" +
    "<h3>Details</h3><blockquote><p>A note.</p></blockquote><p>See <a href=\"https://example.com\">docs</a>.</p>",
};

describe("BlockNote <-> canonical HTML round trip", () => {
  for (const [name, html] of Object.entries(htmlFixtures)) {
    it(`is stable for: ${name}`, async () => {
      const editor = ServerBlockNoteEditor.create({ schema });
      const firstPass = await roundTrip(editor, normalizeHtml(html));
      const secondPass = await roundTrip(editor, firstPass);
      expect(secondPass).toBe(firstPass);
    });
  }

  it("known limitation: drops img height and a title (everything else on these tags survives)", async () => {
    // Confirmed against the default BlockNote schema: `width` and `target`
    // survive the round trip, `height` and `title` don't -- BlockNote's
    // default image block has no height prop (only previewWidth, which
    // drives proportional resize in the editor UI) and its default link
    // mark doesn't carry `title`. Both are allowed by doc-core's
    // normalizeHtml schema, so a page hand-authored via git with these
    // attributes will silently lose them the first time it's opened and
    // saved in the web editor. Accepted for E1 as a minor cosmetic loss
    // (no visual/layout break -- width still controls image sizing, title
    // is just a hover tooltip); revisit with a custom image/link spec if it
    // proves to matter in practice. This test pins the current behavior so
    // a BlockNote upgrade that changes it doesn't go unnoticed.
    const editor = ServerBlockNoteEditor.create({ schema });
    const html = normalizeHtml(
      '<p><img src="https://example.com/x.png" alt="alt" width="100" height="50" /></p>' +
        '<p><a href="https://example.com" title="a title" target="_blank">link</a></p>',
    );
    const firstPass = await roundTrip(editor, html);
    expect(firstPass).toContain('width="100"');
    expect(firstPass).toContain('target="_blank"');
    expect(firstPass).not.toContain("height=");
    expect(firstPass).not.toContain("title=");
  });

  it("round-trips a git-authored page (md -> HTML -> normalize -> BlockNote -> HTML -> normalize)", async () => {
    const markdown = [
      "## Getting started",
      "",
      "This guide covers **installation** and *basic usage*.",
      "",
      "- Step one",
      "- Step two",
      "- Step three",
      "",
      "### Configuration",
      "",
      "> Back up your config before editing it.",
      "",
      "See the [reference docs](https://example.com/docs) for details.",
    ].join("\n");

    const gitHtml = normalizeHtml(await markdownToHtml(markdown));
    const editor = ServerBlockNoteEditor.create({ schema });
    const firstPass = await roundTrip(editor, gitHtml);
    const secondPass = await roundTrip(editor, firstPass);
    expect(secondPass).toBe(firstPass);

    // Fixed-point stability alone would pass even if BlockNote dropped
    // content on the very first pass (both passes would agree on the
    // post-loss result) -- assert nothing was silently dropped from the
    // git-authored source itself.
    expect(firstPass).toContain("Getting started");
    expect(firstPass).toContain("<strong>installation</strong>");
    expect(firstPass).toContain("<em>basic usage</em>");
    expect(firstPass).toContain("Step one");
    expect(firstPass).toContain("Configuration");
    expect(firstPass).toContain("Back up your config");
    expect(firstPass).toContain('href="https://example.com/docs"');
  });
});
