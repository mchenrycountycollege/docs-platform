import { describe, expect, it } from "vitest";
import {
  fromMetadata,
  fromStructuredData,
  padOrder,
  toMetadata,
  toStructuredData,
  unpadOrder,
} from "./structured-data.js";
import type { MetadataFields, StructuredDataFields } from "./types.js";

describe("order padding", () => {
  it("zero-pads for lexical sort safety", () => {
    expect(padOrder(0)).toBe("000000");
    expect(padOrder(300)).toBe("000300");
  });

  it("round-trips through unpadOrder", () => {
    expect(unpadOrder(padOrder(4200))).toBe(4200);
  });

  it("rejects negative or non-integer order", () => {
    expect(() => padOrder(-1)).toThrow(RangeError);
    expect(() => padOrder(1.5)).toThrow(RangeError);
  });

  it("sorts padded strings the same as the numbers they represent", () => {
    const nums = [500, 10, 3, 100000];
    const sortedByNum = [...nums].sort((a, b) => a - b).map(padOrder);
    const sortedByString = nums.map(padOrder).sort();
    expect(sortedByString).toEqual(sortedByNum);
  });
});

describe("structured data mapping", () => {
  const fields: StructuredDataFields = {
    title: "Callout component",
    order: 300,
    tags: ["wysiwyg", "components"],
    bodyHtml: "<h2>Hello</h2>",
  };

  it("round-trips fields through the wire shape", () => {
    expect(fromStructuredData(toStructuredData(fields))).toEqual(fields);
  });
});

describe("metadata mapping", () => {
  const fields: MetadataFields = {
    docId: "3f1b7c2e-3b8d-4a9a-9d1e-8f6c2f6a9b1a",
    origin: "git",
    sourceRepoPath: "some-component/docs/overview.md",
    editorName: "Sean Mattson",
    authorEmail: "sean@example.edu",
  };

  it("round-trips fields through the wire shape", () => {
    expect(fromMetadata(toMetadata(fields))).toEqual(fields);
  });

  it("omits undefined optional fields from the wire shape", () => {
    const minimal: MetadataFields = { docId: "abc", origin: "web" };
    const wire = toMetadata(minimal);
    expect(wire.dynamicFields.map((f) => f.name)).toEqual(["docId", "origin"]);
  });

  it("rejects an invalid origin value when reading from the wire", () => {
    expect(() =>
      fromMetadata({
        dynamicFields: [
          { name: "docId", fieldValues: [{ value: "abc" }] },
          { name: "origin", fieldValues: [{ value: "bogus" }] },
        ],
      }),
    ).toThrow(/origin/);
  });
});
