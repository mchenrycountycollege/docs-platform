import { slugify } from "./slug.js";

export interface DocPlacement {
  book: string;
  chapter?: string;
  slug: string;
}

/**
 * Deterministic frontmatter -> Cascade asset path mapping. Driven entirely by
 * frontmatter (book/chapter/slug), not by the git file's location in the
 * repo -- a doc's book/chapter can change without moving the underlying file,
 * and vice versa (see delete/rename semantics in implementation-plan.md).
 */
export function mapDocPath(placement: DocPlacement): string {
  const parts = ["docs", slugify(placement.book)];
  if (placement.chapter) parts.push(slugify(placement.chapter));
  parts.push(placement.slug);
  return parts.join("/");
}
