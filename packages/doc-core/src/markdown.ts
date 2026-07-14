import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import rehypeStringify from "rehype-stringify";

const toHtml = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

/** Markdown (with GFM tables/strikethrough/etc.) -> HTML. Callers must pass the result through normalizeHtml(). */
export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await toHtml.process(markdown);
  return String(file);
}

const toMarkdown = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(remarkStringify);

/**
 * HTML -> Markdown, the reverse of markdownToHtml(). Used to fold a page's
 * live Cascade content (e.g. one last edited via the web editor) back into a
 * local doc file before a git-path takeover, so that edit isn't silently lost.
 * Not a perfect inverse of markdownToHtml() byte-for-byte (Markdown
 * formatting choices like heading style or emphasis characters can shift),
 * but round-trips content losslessly.
 */
export async function htmlToMarkdown(html: string): Promise<string> {
  const file = await toMarkdown.process(html);
  return String(file).trim();
}
