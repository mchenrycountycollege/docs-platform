# v1 Manual Test Checklist

Manual UAT pass for the end-to-end system once E3 (delete + image upload) lands.
Organized by user journey, not by feature — the goal is to catch integration/UX
gaps that unit tests under each package don't exercise. Not automated regression
coverage; that's a separate, later investment if this becomes worth it.

Run this against the real Cascade instance / real Cloudflare deployment, not a
mock — the whole point of this system is the seams between Cascade, git, and
the editor.

## 0. Preconditions

- [ ] Seed content is live (see seed-content brief below) — at least 2 books,
      one with nested chapters, one flat.
- [ ] You have an allow-listed email for Access OTP and a non-allow-listed one
      to test rejection.
- [ ] Both `docs-platform`'s own repo and one external consumer repo
      (`cascade-cms-components-dev`) are available for git-path tests.

## 1. Anonymous reader (public site, unauthenticated)

- [ ] Sidebar renders full nav tree for all seeded books, correct chapter nesting.
- [ ] Breadcrumb matches book → chapter → page for a nested page.
- [ ] ⌘K search finds a page by title, by a word in its body, and by tag.
- [ ] ToC on a long page jumps to the right heading and highlights on scroll.
- [ ] Theme toggle persists across a page navigation (not just a re-render).
- [ ] Reload directly on a deep page URL (not via nav click) — SSR/static output
      still renders full shell, not a blank/broken page.
- [ ] Mobile width: sidebar collapses to a usable drawer/menu, ToC doesn't
      overlap content.

## 2. Git-path contributor (highest-priority path — test first, test hardest)

- [ ] New page: push a markdown file with valid frontmatter (new `id` UUID) →
      Action succeeds → page appears in nav within the publish window.
- [ ] Edit: change title/body on an existing seeded page, same `id` → updates
      in place, no duplicate page created.
- [ ] Move: change a page's `chapter` field → page moves in the sidebar,
      old location is gone (manifest-driven rename detection).
- [ ] Order: change `order` values across siblings → sidebar re-sorts correctly.
- [ ] Tags: add/change `tags` → page shows up under new tag in search/tags.
- [ ] Orphan on removal: delete the file from the repo (no `delete: true`) →
      page is unpublished/orphaned but still exists in Cascade, not hard-deleted.
- [ ] Hard delete: set `delete: true` on a page's last commit, then remove the
      file → page and its manifest entry are actually gone.
- [ ] Cross-repo: run the same create/edit flow from the external consumer
      repo (`cascade-cms-components-dev`), confirm `sourceRepoPath` reflects
      the correct repo.
- [ ] Bad frontmatter (missing `id`, malformed UUID, non-boolean `takeover`) →
      Action fails loudly with a clear error, does not publish garbage.

## 3. Web-editor contributor (`apps/editor`, Access-gated)

- [ ] Login via Access OTP with an allow-listed email → lands on the reader
      shell, not a bare admin panel.
- [ ] Browse via sidebar/breadcrumb/search exactly like the public reader —
      confirm visual parity (shared `tokens.css`), not a different-feeling UI.
- [ ] "Edit this page" on a page you're viewing → swaps to `DocEditor` in place,
      not a navigation to a separate screen.
- [ ] Edit body content with BlockNote, hit Save → reader view updates
      **instantly** (in-memory render), then confirm the background reconcile
      (~6s later) settles on the same content (no flicker/revert to something
      different).
- [ ] Create a new book from the editor UI → appears correctly in `DocsTree`
      and in the reader sidebar after publish.
- [ ] Create a new page under an existing chapter → same check.
- [ ] Move a page via `DocsTree` drag/drop (`POST page/move`) → sidebar order
      and nav reflect it.
- [ ] Reorder siblings via `DocsTree` (`POST page/reorder`) → order persists
      after a full page reload, not just in local state.
- [ ] Delete a page from the editor UI → confirm it **only orphans/unpublishes**
      (E3 policy) — there must be no hard-delete affordance anywhere in this UI.
- [ ] Image upload (E3): insert an image in BlockNote → uploads via
      `POST /api/upload` → `src` is rewritten to the published URL, image
      actually renders after publish, not just in the editor's local preview.
- [ ] Cancel button on `DocEditor` discards in-progress edits without saving.

## 4. Cross-path consistency

- [ ] Edit a page via the web editor, then push a git-path edit to the *same*
      page (same `id`) without `takeover: true` → confirm the documented
      conflict behavior (git write should require `takeover: true` to
      overwrite a web-owned page — verify it actually blocks/warns instead of
      silently clobbering).
- [ ] Edit a page via git, then open the same page in the web editor →
      editor shows the latest git-authored content, not stale cache.
- [ ] Confirm `authorEmail` is stamped correctly on each path: git commit
      author for git-path writes, Access-JWT identity for editor writes.

## 5. Auth / access edges

- [ ] Non-allow-listed email attempting to reach `apps/editor` → blocked by
      Cloudflare Access before the app even loads.
- [ ] Expired/revoked Access session → editor prompts re-auth, doesn't silently
      fail API calls or show stale data as if it were live.
- [ ] Public reader is reachable with zero auth prompts — confirm the two
      "doors" are actually independent (editor's auth gate never leaks onto
      the public site).

## 6. Async / retry / failure paths

- [ ] Fire two rapid successive edits (git or editor) to the same page to
      force a "currently being published" / "already in publish queue"
      conflict — confirm the `retryOnQueueConflict` logic actually recovers
      instead of surfacing an error to the user.
- [ ] Kill/interrupt a GitHub Action mid-run (or simulate via a bad Cascade
      credential) → confirm partial failure doesn't leave the manifest or
      nav/search-index inconsistent with actual Cascade state.

## 7. Edge-case content (see seed brief)

- [ ] Very long page (many headings) — ToC and scroll performance are fine.
- [ ] Page with special characters / unicode in title — slug generation and
      URL are sane, no broken links.
- [ ] Two pages with near-duplicate titles — search ranks/distinguishes them
      reasonably, no `id`/slug collision.
- [ ] Book with a single page and no chapters (chapter is optional) — nav
      renders without a dangling empty chapter node.
- [ ] Page with embedded images from the git path (existing `uploads/` asset)
      renders correctly next to editor-uploaded images (E3 path) — same
      rendering treatment regardless of which path created them.

## Sign-off

- [ ] All boxes above checked, or open gaps explicitly deferred with a reason.
- [ ] Known deferrals noted in `editor-implementation-plan.md` / memory before
      calling v1 done.
