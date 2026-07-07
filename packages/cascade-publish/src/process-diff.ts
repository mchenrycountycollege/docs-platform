import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { CascadeConfig } from "@docs-platform/cascade-client";
import { archiveDoc } from "./archive.js";
import { parseDiffOutput } from "./git-diff.js";
import { publishDoc } from "./publish-doc.js";

export interface ProcessDiffInput {
  config: CascadeConfig;
  /** Absolute path to the repo checkout; git commands and file reads run relative to this. */
  repoDir: string;
  /** Path to the docs folder, relative to repoDir (e.g. "docs"). */
  docsDir: string;
  beforeSha: string;
  afterSha: string;
  /** e.g. "your-org/some-cascade-component" -- stamped into metadata.sourceRepoPath alongside each file's path. */
  repoName: string;
  gitAuthorEmail: string;
}

export interface ProcessDiffResult {
  processed: number;
  errors: { path: string; error: string }[];
}

/**
 * The shared core between the CLI entrypoint (cli.ts, for local/manual runs)
 * and the GitHub Action entrypoint (actions/publish/src/index.ts): diffs
 * `docsDir` between two git refs and calls publishDoc() (added/modified) or
 * archiveDoc() (deleted, recovering the last version via `git show` since
 * the file itself is gone) for every changed markdown file.
 *
 * Does not fail fast -- one bad doc in a push shouldn't block the rest;
 * callers should treat a non-empty `errors` as the run having failed overall.
 */
export async function processDiff(input: ProcessDiffInput): Promise<ProcessDiffResult> {
  const raw = execFileSync(
    "git",
    ["diff", "--name-status", "-M", input.beforeSha, input.afterSha, "--", input.docsDir],
    { cwd: input.repoDir, encoding: "utf-8" },
  );
  const changes = parseDiffOutput(raw).filter((change) => change.path.endsWith(".md"));

  let processed = 0;
  const errors: { path: string; error: string }[] = [];

  for (const change of changes) {
    const sourceRepoPath = `${input.repoName}/${change.path}`;
    try {
      if (change.changeType === "deleted") {
        const lastKnownContent = execFileSync("git", ["show", `${input.beforeSha}:${change.path}`], {
          cwd: input.repoDir,
          encoding: "utf-8",
        });
        const result = await archiveDoc(input.config, { lastKnownContent, sourceRepoPath });
        console.log(`[cascade-publish] archived ${change.path} -> ${result.path} (hardDeleted: ${result.hardDeleted})`);
      } else {
        const content = readFileSync(path.join(input.repoDir, change.path), "utf-8");
        const result = await publishDoc(input.config, {
          content,
          sourceRepoPath,
          gitAuthorEmail: input.gitAuthorEmail,
        });
        console.log(`[cascade-publish] published ${change.path} -> ${result.path} (moved: ${result.moved})`);
      }
      processed++;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[cascade-publish] FAILED ${change.path}: ${message}`);
      errors.push({ path: change.path, error: message });
    }
  }

  return { processed, errors };
}
