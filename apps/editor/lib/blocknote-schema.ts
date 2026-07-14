import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";

/**
 * Shared between the client editor (components/editor) and the server-side
 * round-trip fixture corpus (blocknote-html.test.ts) so both convert HTML
 * through the exact same block schema -- see
 * project-management/editor-implementation-plan.md section 6, item 2.
 *
 * No customization yet: every tag in doc-core's normalizeHtml allow-list
 * (h2-h4, p, strong/em, ul/ol/li, table, pre/code, img, a, blockquote) has a
 * 1:1 native BlockNote block or mark (heading supports levels up to 6,
 * "quote" covers blockquote) -- confirmed by the fixture corpus, not
 * assumed. Extend this schema (e.g. a raw-HTML passthrough block) only once
 * a fixture proves a real gap; see that test file for what's been checked.
 */
export const schema = BlockNoteSchema.create({
  blockSpecs: { ...defaultBlockSpecs },
});
