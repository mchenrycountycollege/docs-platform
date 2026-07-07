export type ChangeType = "added" | "modified" | "deleted";

export interface DocChange {
  changeType: ChangeType;
  path: string;
}

/**
 * Parses `git diff --name-status -M <before> <after> -- <docsDir>` output.
 *
 * A rename (R###) is split into a deleted (old path) + added (new path) pair
 * rather than surfaced as a distinct change type -- Cascade's path is
 * frontmatter-driven (book/chapter/slug), not the git file's location, so a
 * git-level rename doesn't necessarily correspond to a Cascade-level move
 * (the frontmatter could be unchanged, or could itself have moved the doc).
 * publishDoc()'s own manifest-driven move detection handles that uniformly;
 * this layer only needs to know "what changed on disk."
 *
 * A copy (C###) only adds the new path -- the old path still exists on disk,
 * so it isn't a deletion.
 */
export function parseDiffOutput(raw: string): DocChange[] {
  const changes: DocChange[] = [];

  for (const line of raw.split("\n")) {
    if (line.length === 0) continue;
    const fields = line.split("\t");
    const status = fields[0];
    if (status === undefined) continue;

    if (status.startsWith("R")) {
      const [, oldPath, newPath] = fields;
      if (oldPath) changes.push({ changeType: "deleted", path: oldPath });
      if (newPath) changes.push({ changeType: "added", path: newPath });
      continue;
    }
    if (status.startsWith("C")) {
      const newPath = fields[2];
      if (newPath) changes.push({ changeType: "added", path: newPath });
      continue;
    }

    const path = fields[1];
    if (!path) continue;
    if (status === "A") changes.push({ changeType: "added", path });
    else if (status === "M") changes.push({ changeType: "modified", path });
    else if (status === "D") changes.push({ changeType: "deleted", path });
    // Other statuses (T = type change, U = unmerged, etc.) aren't expected
    // for a docs/**/*.md diff and are intentionally ignored.
  }

  return changes;
}
