import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

/** Markdown (with GFM tables/strikethrough/etc.) -> HTML. Callers must pass the result through normalizeHtml(). */
export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await processor.process(markdown);
  return String(file);
}
