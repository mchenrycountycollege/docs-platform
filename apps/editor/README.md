# docs-platform editor

The authenticated "front door" for MCC Docs (see
[`../../project-management/editor-implementation-plan.md`](../../project-management/editor-implementation-plan.md)
for the full design). It's the same reader experience as the public docs
site, plus edit powers, gated behind Cloudflare Access.

## Using it (for editors)

1. **Sign in.** Visit the editor's URL and complete the email one-time-code
   prompt (Cloudflare Access). Only allow-listed email addresses can get in.
2. **Browse.** The left sidebar lists every book, chapter, and page. Click a
   page to open it — it opens **read-only** by default, styled just like the
   public site.
3. **Search.** Press `⌘K` (or `Ctrl K`) anywhere, or click "Search docs" in
   the top bar, to jump straight to a page by title, tag, or a word from its
   text.
4. **Edit.** On any page you're allowed to change, click **Edit this page**.
   The page body becomes editable in place — no new screen. Make your
   changes, then **Save & publish**. You'll see your change immediately;
   the public site catches up within a few seconds to a minute. Click
   **Cancel** any time to discard your edits and go back to the read-only
   view.
5. **Create.** Use **+ Book**, **+ Chapter**, **+ Page** in the sidebar to
   add new structure. Double-click a page or chapter name to rename it, or
   drag it to reorder or move it to a different chapter.
6. **Conflicts.** If someone else saved the same page while you were
   editing, Save will tell you and offer to reload their version — your
   unsaved edits in that case are discarded, so copy anything you want to
   keep before reloading.
7. **Pages managed in git.** Some pages are authored outside the editor (in
   a git repository) and show a banner instead of an Edit button — change
   those in their source repo instead; edits here would be overwritten on
   the next publish.

## Developing

- `pnpm dev` — Next.js dev server (UI only; `/api/*` needs `pnpm pages:dev`
  or a deployed proxy to actually answer).
- `pnpm build` — builds the workspace dependencies this app needs, then the
  static export (`out/`) and the bundled Pages Function worker
  (`out/_worker.js`).
- `pnpm pages:dev` — runs the built output under `wrangler pages dev`,
  exercising the real proxy routes locally.
- `pnpm typecheck` / `pnpm test` — as usual.

See `functions/worker.ts` for the proxy's route table and
`components/shell/` for the front-door reader shell (sidebar, breadcrumb,
⌘K, ToC) that mirrors `packages/runtime`'s public-reader rendering via the
shared `@docs-platform/doc-shell` package.
