import * as core from "@actions/core";
import type { CascadeConfig } from "@docs-platform/cascade-client";
import { processDiff } from "@docs-platform/cascade-publish";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var ${name}`);
  return value;
}

async function run(): Promise<void> {
  const config: CascadeConfig = {
    baseUrl: requireEnv("CASCADE_BASE_URL"),
    siteName: requireEnv("CASCADE_SITE_NAME"),
    apiKey: requireEnv("CASCADE_API_KEY"),
    documentationPageContentTypeId: requireEnv("CASCADE_DOC_CONTENT_TYPE_ID"),
    navOutputContentTypeId: requireEnv("CASCADE_NAV_CONTENT_TYPE_ID"),
  };

  // github.event.before/github.event.after cover the normal push case; a
  // manually-dispatched or first-ever push can have `before` as all zeros
  // (no prior commit to diff against), which the reusable workflow falls
  // back to HEAD~1 for -- see reusable-cascade-publish.yml.
  const result = await processDiff({
    config,
    repoDir: process.cwd(),
    repoName: requireEnv("GITHUB_REPOSITORY"),
    beforeSha: requireEnv("BEFORE_SHA"),
    afterSha: requireEnv("AFTER_SHA"),
    docsDir: core.getInput("docs-dir") || "docs",
    gitAuthorEmail: process.env["GIT_AUTHOR_EMAIL"] || "actions@github.com",
  });

  core.info(`processed ${result.processed} file(s), ${result.errors.length} error(s)`);
  for (const error of result.errors) {
    core.error(`${error.path}: ${error.error}`);
  }
  if (result.errors.length > 0) {
    core.setFailed(`${result.errors.length} doc(s) failed to publish`);
  }
}

run().catch((err) => {
  core.setFailed(err instanceof Error ? err.message : String(err));
});
