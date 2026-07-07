import type { MetadataFields, StructuredDataFields } from "./types.js";

/** Width chosen so lexical (string) sort matches numeric sort up to 999999. */
const ORDER_WIDTH = 6;

export function padOrder(order: number): string {
  if (!Number.isInteger(order) || order < 0) {
    throw new RangeError(`order must be a non-negative integer, got ${order}`);
  }
  return String(order).padStart(ORDER_WIDTH, "0");
}

export function unpadOrder(padded: string): number {
  const n = Number.parseInt(padded, 10);
  if (Number.isNaN(n)) throw new RangeError(`order field is not numeric: ${padded}`);
  return n;
}

/**
 * Wire shape of a Cascade `structuredData` block: a flat list of nodes.
 * `type` is required on every node (confirmed against a live instance --
 * omitting it fails with "Unsupported Data Definition node schema type:
 * null"); our DD only uses plain text fields, so it's always "text" here.
 * A `multiple="true"` text field like `tags` is NOT one node with an array
 * property -- there is no such property. It's repeated sibling nodes that
 * share the same `identifier` (confirmed: a single node with an invented
 * `multipleText` array was silently accepted but produced an empty field on
 * read-back).
 */
export interface StructuredDataNode {
  type: "text";
  identifier: string;
  text?: string;
}

export interface StructuredDataWire {
  structuredDataNodes: StructuredDataNode[];
}

export function toStructuredData(fields: StructuredDataFields): StructuredDataWire {
  return {
    structuredDataNodes: [
      { type: "text", identifier: "title", text: fields.title },
      { type: "text", identifier: "order", text: padOrder(fields.order) },
      ...fields.tags.map((tag): StructuredDataNode => ({ type: "text", identifier: "tags", text: tag })),
      { type: "text", identifier: "body", text: fields.bodyHtml },
    ],
  };
}

export function fromStructuredData(wire: StructuredDataWire): StructuredDataFields {
  const title = wire.structuredDataNodes.find((n) => n.identifier === "title")?.text;
  const order = wire.structuredDataNodes.find((n) => n.identifier === "order")?.text;
  const body = wire.structuredDataNodes.find((n) => n.identifier === "body")?.text;
  if (title === undefined) throw new Error("structuredData missing 'title' node");
  if (order === undefined) throw new Error("structuredData missing 'order' node");
  if (body === undefined) throw new Error("structuredData missing 'body' node");
  const tags = wire.structuredDataNodes
    .filter((n) => n.identifier === "tags" && n.text !== undefined)
    .map((n) => n.text as string);
  return {
    title,
    order: unpadOrder(order),
    tags,
    bodyHtml: body,
  };
}

/** Wire shape of a Cascade `metadata` block's custom (dynamic) fields. */
export interface DynamicMetadataField {
  name: string;
  fieldValues: { value: string }[];
}

export interface MetadataWire {
  dynamicFields: DynamicMetadataField[];
}

export function toMetadata(fields: MetadataFields): MetadataWire {
  const entries: [string, string | undefined][] = [
    ["docId", fields.docId],
    ["origin", fields.origin],
    ["sourceRepoPath", fields.sourceRepoPath],
    ["editorName", fields.editorName],
    ["authorEmail", fields.authorEmail],
  ];
  return {
    dynamicFields: entries
      .filter((entry): entry is [string, string] => entry[1] !== undefined)
      .map(([name, value]) => ({ name, fieldValues: [{ value }] })),
  };
}

export function fromMetadata(wire: MetadataWire): MetadataFields {
  const byName = new Map(wire.dynamicFields.map((f) => [f.name, f.fieldValues[0]?.value]));
  const docId = byName.get("docId");
  const origin = byName.get("origin");
  if (docId === undefined) throw new Error("metadata missing 'docId' field");
  if (origin !== "git" && origin !== "web") {
    throw new Error(`metadata 'origin' must be 'git' or 'web', got ${origin}`);
  }
  return {
    docId,
    origin,
    sourceRepoPath: byName.get("sourceRepoPath"),
    editorName: byName.get("editorName"),
    authorEmail: byName.get("authorEmail"),
  };
}
