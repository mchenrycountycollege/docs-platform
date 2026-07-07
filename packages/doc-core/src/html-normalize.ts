import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import type { Schema } from "hast-util-sanitize";

/**
 * The one allowed-HTML subset both write paths converge on (git markdown and,
 * in Phase 2, the BlockNote editor export) -- matches the WYSIWYG Editor
 * Configuration's Valid Elements list in
 * _cms/specs/docs-platform/implementation-checklist.md exactly, so content
 * saved through either path can't exceed what the Cascade-side editor itself
 * would allow. Every top-level Schema key we don't set here falls back to
 * hast-util-sanitize's defaultSchema (per its docs), so `tagNames` and
 * `attributes` are given in full -- an unlisted tag or attribute is dropped,
 * not merged with the (much more permissive) default allowlist.
 */
const schema: Schema = {
  tagNames: [
    "h2",
    "h3",
    "h4",
    "p",
    "strong",
    "em",
    "ul",
    "ol",
    "li",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "pre",
    "code",
    "img",
    "a",
    "blockquote",
  ],
  attributes: {
    img: ["src", "alt", "width", "height"],
    a: ["href", "title", "target"],
  },
  protocols: {
    href: ["http", "https", "mailto"],
    src: ["http", "https"],
  },
};

const processor = unified().use(rehypeParse, { fragment: true }).use(rehypeSanitize, schema).use(rehypeStringify);

/** Sanitize HTML down to the allowed subset. Authoritative for both write paths -- never trust a client export blindly. */
export function normalizeHtml(html: string): string {
  return String(processor.processSync(html));
}
