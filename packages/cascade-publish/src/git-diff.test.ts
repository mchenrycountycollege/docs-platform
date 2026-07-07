import { describe, expect, it } from "vitest";
import { parseDiffOutput } from "./git-diff.js";

describe("parseDiffOutput", () => {
  it("parses added, modified, and deleted files", () => {
    const raw = "A\tdocs/new.md\nM\tdocs/existing.md\nD\tdocs/gone.md\n";
    expect(parseDiffOutput(raw)).toEqual([
      { changeType: "added", path: "docs/new.md" },
      { changeType: "modified", path: "docs/existing.md" },
      { changeType: "deleted", path: "docs/gone.md" },
    ]);
  });

  it("splits a rename into a deleted old path + added new path", () => {
    const raw = "R100\tdocs/old-name.md\tdocs/new-name.md\n";
    expect(parseDiffOutput(raw)).toEqual([
      { changeType: "deleted", path: "docs/old-name.md" },
      { changeType: "added", path: "docs/new-name.md" },
    ]);
  });

  it("treats a copy as only adding the new path", () => {
    const raw = "C90\tdocs/original.md\tdocs/copy.md\n";
    expect(parseDiffOutput(raw)).toEqual([{ changeType: "added", path: "docs/copy.md" }]);
  });

  it("ignores blank lines", () => {
    const raw = "A\tdocs/new.md\n\n\nM\tdocs/existing.md\n";
    expect(parseDiffOutput(raw)).toEqual([
      { changeType: "added", path: "docs/new.md" },
      { changeType: "modified", path: "docs/existing.md" },
    ]);
  });

  it("returns an empty list for empty input", () => {
    expect(parseDiffOutput("")).toEqual([]);
  });
});
