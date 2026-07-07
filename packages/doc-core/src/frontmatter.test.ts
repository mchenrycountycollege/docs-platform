import { describe, expect, it } from "vitest";
import { FrontmatterError, parseFrontmatter } from "./frontmatter.js";

const VALID_ID = "550e8400-e29b-41d4-a716-446655440000";

function doc(frontmatter: string, body = "Body text."): string {
  return `---\n${frontmatter}\n---\n${body}\n`;
}

describe("parseFrontmatter", () => {
  it("parses required fields and applies defaults", () => {
    const parsed = parseFrontmatter(doc(`id: ${VALID_ID}\ntitle: Overview\nbook: My Book`));
    expect(parsed).toMatchObject({
      docId: VALID_ID,
      title: "Overview",
      book: "My Book",
      chapter: undefined,
      tags: [],
      order: 500,
      takeover: false,
      delete: false,
    });
    expect(parsed.content.trim()).toBe("Body text.");
  });

  it("parses all optional fields", () => {
    const parsed = parseFrontmatter(
      doc(
        `id: ${VALID_ID}\ntitle: Overview\nbook: My Book\nchapter: Setup\ntags: [a, b]\norder: 10\nslug: custom-slug\ntakeover: true\ndelete: true\nauthorEmail: a@b.com`,
      ),
    );
    expect(parsed).toMatchObject({
      chapter: "Setup",
      tags: ["a", "b"],
      order: 10,
      slug: "custom-slug",
      takeover: true,
      delete: true,
      authorEmail: "a@b.com",
    });
  });

  it("throws when id is missing", () => {
    expect(() => parseFrontmatter(doc("title: Overview\nbook: My Book"))).toThrow(FrontmatterError);
  });

  it("throws when id is not a UUID", () => {
    expect(() => parseFrontmatter(doc("id: not-a-uuid\ntitle: Overview\nbook: My Book"))).toThrow(
      FrontmatterError,
    );
  });

  it("throws when title is missing", () => {
    expect(() => parseFrontmatter(doc(`id: ${VALID_ID}\nbook: My Book`))).toThrow(FrontmatterError);
  });

  it("throws when book is missing", () => {
    expect(() => parseFrontmatter(doc(`id: ${VALID_ID}\ntitle: Overview`))).toThrow(FrontmatterError);
  });

  it("throws when tags is not an array of strings", () => {
    expect(() =>
      parseFrontmatter(doc(`id: ${VALID_ID}\ntitle: Overview\nbook: My Book\ntags: not-an-array`)),
    ).toThrow(FrontmatterError);
  });

  it("throws when order is negative", () => {
    expect(() =>
      parseFrontmatter(doc(`id: ${VALID_ID}\ntitle: Overview\nbook: My Book\norder: -1`)),
    ).toThrow(FrontmatterError);
  });
});
