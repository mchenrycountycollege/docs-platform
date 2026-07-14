// Anchor-slug for a heading's text, used by both renderers' "On this page"
// ToC. Lifted verbatim from runtime/toc.ts so the public reader and the
// editor generate identical `#fragment` ids for the same heading text. This
// is intentionally distinct from doc-core's path `slugify` (which has no
// "section" fallback and serves a different purpose).
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section"
  );
}
