import matter from "gray-matter";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class FrontmatterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FrontmatterError";
  }
}

export interface ParsedDoc {
  docId: string;
  title: string;
  book: string;
  chapter?: string;
  tags: string[];
  order: number;
  /** Explicit slug override; callers fall back to slugify(title) when absent. */
  slug?: string;
  /** Allows this write to overwrite a web-owned page at the same path. */
  takeover: boolean;
  /** Opt-in hard delete on removal, instead of the default orphan+unpublish. */
  delete: boolean;
  /** Overrides the git-commit-author default for authorEmail. */
  authorEmail?: string;
  /** Markdown body, frontmatter stripped. */
  content: string;
}

function requireString(data: Record<string, unknown>, field: string): string {
  const value = data[field];
  if (typeof value !== "string" || value.length === 0) {
    throw new FrontmatterError(`frontmatter is missing required field '${field}'`);
  }
  return value;
}

function optionalString(data: Record<string, unknown>, field: string): string | undefined {
  const value = data[field];
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.length === 0) {
    throw new FrontmatterError(`frontmatter field '${field}' must be a non-empty string`);
  }
  return value;
}

function optionalBoolean(data: Record<string, unknown>, field: string): boolean {
  const value = data[field];
  if (value === undefined) return false;
  if (typeof value !== "boolean") {
    throw new FrontmatterError(`frontmatter field '${field}' must be a boolean`);
  }
  return value;
}

export function parseFrontmatter(raw: string): ParsedDoc {
  const { data, content } = matter(raw);

  const docId = requireString(data, "id");
  if (!UUID_RE.test(docId)) {
    throw new FrontmatterError(`frontmatter 'id' must be a UUID, got '${docId}'`);
  }

  const tagsValue = data["tags"];
  let tags: string[] = [];
  if (tagsValue !== undefined) {
    if (!Array.isArray(tagsValue) || !tagsValue.every((t) => typeof t === "string")) {
      throw new FrontmatterError("frontmatter 'tags' must be an array of strings");
    }
    tags = tagsValue;
  }

  const orderValue = data["order"];
  let order = 500;
  if (orderValue !== undefined) {
    if (typeof orderValue !== "number" || !Number.isInteger(orderValue) || orderValue < 0) {
      throw new FrontmatterError("frontmatter 'order' must be a non-negative integer");
    }
    order = orderValue;
  }

  return {
    docId,
    title: requireString(data, "title"),
    book: requireString(data, "book"),
    chapter: optionalString(data, "chapter"),
    tags,
    order,
    slug: optionalString(data, "slug"),
    takeover: optionalBoolean(data, "takeover"),
    delete: optionalBoolean(data, "delete"),
    authorEmail: optionalString(data, "authorEmail"),
    content,
  };
}
