import type { Block, PartialBlock } from "@blocknote/core";
import type { schema } from "./blocknote-schema.js";

type Schema = typeof schema;
type SchemaBlock = Block<Schema["blockSchema"], Schema["inlineContentSchema"], Schema["styleSchema"]>;
type SchemaPartialBlock = PartialBlock<Schema["blockSchema"], Schema["inlineContentSchema"], Schema["styleSchema"]>;

/**
 * Both `BlockNoteEditor` (browser, used by the DocEditor component) and
 * `ServerBlockNoteEditor` (Node, used by the fixture corpus below) expose
 * this same pair of methods, so a single adapter works for both -- see
 * editor-implementation-plan.md section 4, "lib/blocknote-html.ts". They
 * differ in sync-ness though: the browser editor's methods are synchronous,
 * while ServerBlockNoteEditor's wrap them in a Promise (it has to run them
 * inside a JSDOM shim). The adapter functions below normalize both to always
 * return a Promise so call sites don't need to care which editor they hold.
 */
export interface HtmlConverter {
  tryParseHTMLToBlocks(html: string): SchemaBlock[] | Promise<SchemaBlock[]>;
  blocksToFullHTML(blocks: SchemaPartialBlock[]): string | Promise<string>;
}

export async function htmlToBlocks(editor: HtmlConverter, html: string): Promise<SchemaBlock[]> {
  return await editor.tryParseHTMLToBlocks(html);
}

export async function blocksToHtml(editor: HtmlConverter, blocks: SchemaPartialBlock[]): Promise<string> {
  return await editor.blocksToFullHTML(blocks);
}
