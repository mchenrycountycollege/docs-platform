const COMBINING_DIACRITICS = /[̀-ͯ]/g;

/** Kebab-case slugify: lowercase, strip diacritics, collapse non-alphanumerics to single hyphens. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(COMBINING_DIACRITICS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
