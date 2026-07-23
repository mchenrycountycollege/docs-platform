# Web Documentation Contributor — Implementation Plan

Detailed build plan for the **web-based editor** (the "contributor" write path).
This is a drill-down of Phases 2–3 of
[`implementation-plan.md`](implementation-plan.md); read that first for the
overall architecture and the locked decisions. This document assumes those
decisions and focuses only on what it takes to ship the editor app.

---

## 1. Where this fits (current state as of 2026-07-13)

| Layer | Status |
|---|---|
| `cascade-client` (REST primitives) | **Done, live-verified** — `readPage`, `createPage`, `editPage`, `moveAsset`, `deletePage`, `publishAsset`/`unpublishAsset`, `readFolder`, `upsertFile`, `assertInScope`, structured-data + metadata mappers |
| `doc-core` (domain logic) | **Done** — `normalizeHtml` (rehype-sanitize to the one allowed schema), `frontmatter`, `markdown` (md→HTML), `path-map`, `slug` |
| `cascade-publish` (git orchestrator) | **Done, live-verified** — `publishDoc`, `processDiff`, manifest, archive |
| Git path (GitHub Actions) | **Done, live-verified** — two real consuming repos onboarded |
| Runtime **viewer** (`packages/runtime`) | **Done, live** — sidebar hydration, breadcrumb, ⌘K search, ToC, theme toggle; shipped as `docs/_system/docs-runtime.js` |
| **Web editor (`apps/editor`)** | **E0–E4 all built** (E0 scaffold/auth, E1 read/edit round-trip, E2 create/rename/move/reorder, E3 delete + image upload, E4 front-door reader shell — see §5) — no sub-phase left unstarted. Live/Access verification still outstanding for E2/E3/E4. |
| **Shared shell (`packages/doc-shell`)** | **E-Shell built 2026-07-14** — `buildTree`/slug/search extracted from `runtime`; runtime adopts it (9 existing tests unchanged), doc-shell has 21 own tests; pure refactor, byte-identical bundle. Now also consumed by `apps/editor`'s E4 shell. Live-visual reader check outstanding. |

> **UI-model revision — 2026-07-14 (supersedes the standalone-admin-panel shape of E3/E4).**
> The E0–E2 UI was built as a standalone CMS-admin panel (a bare file tree +
> an editor pane — see the `docs-platform editor` screenshot), visually
> unrelated to the beautiful BookStack-inspired **public reader** the runtime
> (`packages/runtime`) already ships. That was never an explicit requirement
> either way, and it drifted into the conventional "two separate apps" split.
> **The user's actual requirement (confirmed 2026-07-14):** an authenticated
> editor should feel like *the same delightful reader site, with edit powers* —
> one login, browse the pretty UI, and at any moment either **edit the page
> you're on** or **create a new book/page**, seeing the change immediately.
> The chosen model is **"editor-as-front-door + shared shell package"** (§4a).
> Nothing below the UI changes — `cascade-client`, `doc-core`, the proxy, and
> the BlockNote round-trip are all unaffected. E3 and E4 below are recast
> around this; the phase *numbers* and their backend deliverables are
> unchanged, but E4's UI target is now shell-parity, not a separate admin skin.

The editor is the last major vertical slice. Critically, it is **not**
greenfield below the UI: every Cascade write it needs already exists as a
tested function in `cascade-client`, and the canonical-HTML contract
(`normalizeHtml`) is already the single source of truth both paths must honor.
The editor's real work is **(a)** a thin authenticated proxy that exposes those
functions over HTTP, and **(b)** a BlockNote/react-arborist SPA on top of it.

### What "contributor" means here (scope)

A non-technical editor signs in with an email OTP and can:
1. Browse the `docs/` tree (books → chapters → pages) in a sidebar.
2. Open a page and edit its body in a rich editor; save → auto-publish → see it live.
3. Create new pages/chapters/books; rename; drag to reorder or reparent; delete.
4. Upload and place images/attachments.
5. Never see Cascade, never hold an API key, never touch git.

Explicitly **out of scope** for this plan (deferred / other phases): editing
git-owned pages (they render read-only), a full media library UI, comments/review
workflows, and multi-user live collaboration (we use optimistic concurrency, not CRDT).

---

## 2. Architecture

```
  Browser (allow-listed editor)
     │  gated by Cloudflare Access (email OTP)  ── sets Cf-Access-Jwt-Assertion
     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ Cloudflare Pages                                             │
  │  ├─ static Next.js SPA (output: export)  ── apps/editor/app │
  │  └─ Pages Function proxy  ── apps/editor/functions/api/*     │
  │        · verifies Access JWT → email                        │
  │        · assertInScope() on every path                      │
  │        · holds CASCADE_API_KEY (never sent to browser)      │
  │        · reuses cascade-client + doc-core verbatim          │
  └───────────────────────────────┬─────────────────────────────┘
                                   │ REST /api/v1/  (Bearer key)
                                   ▼
                         Cascade CMS Cloud  ──publish──▶  static docs site
```

**Two deployables, one repo:** the static SPA and the Function proxy are one
Cloudflare Pages project. The proxy is the trust boundary — the browser is
untrusted and only ever talks to `/api/*` on the same origin.

### Reuse boundary (do not duplicate)

| Concern | Source | Editor usage |
|---|---|---|
| All Cascade REST ops | `@docs-platform/cascade-client` | imported by the proxy **only** (server-side; it carries the key) |
| HTML sanitize/normalize schema | `doc-core` `normalizeHtml` | run in the proxy on every save (authoritative); optionally also client-side for instant feedback |
| Path scoping | `cascade-client` `assertInScope` | every proxy write, before touching Cascade |
| Structured-data / metadata mapping | `cascade-client` `toStructuredData`/`toMetadata` | proxy translates editor JSON ⇄ Cascade wire |
| `docId` / `origin` identity model | metadata set | proxy stamps `origin:"web"`, generates `docId` on create |

The **only** editor-specific server logic is: JWT verification, request/response
shaping, optimistic-version checks, and the BlockNote-HTML ⇄ canonical-HTML
bridge. Everything else is a call into the shared packages.

---

## 3. Proxy API surface

All routes are Pages Functions under `/api/*`, same-origin, Access-gated. Each
maps to shared-client calls. (Refines the table in the parent plan with the real
function names now available.)

| Method + route | Purpose | Shared calls |
|---|---|---|
| `GET /api/tree?path=` | Lazy children for react-arborist | `readFolder` |
| `GET /api/page?path=` | Load page for editing (returns body + `version` = lastModified) | `readPage` → `fromStructuredData`/`fromMetadata` |
| `GET /api/nav?path=docs/<book>` | **Added E4.** Live `NavResponse` (flat folders+pages) for one book — feeds the reader-shell's breadcrumb/ToC via `doc-shell`'s `buildTree`. Computed from Cascade directly, not the *published* nav.json (that artifact's hostname isn't configured anywhere in this app — see §5's E4 entry) | `readFolder` (book, then each chapter) + `readPage` per page |
| `GET /api/search-index` | **Added E4.** `{ pages: SearchEntry[] }` across every book, for the cmdk palette (`doc-shell`'s `createSearchIndex`) | `readFolder` (walk) + `readPage` per page, excerpt via strip+truncate-200 |
| `POST /api/page` | Create page (generate `docId`, stamp `origin:"web"` + identity) | `ensureFolder` + `createPage` + `publishAsset` |
| `PUT /api/page` | Edit page (optimistic `expectedVersion`) | `readPage` (compare) → `normalizeHtml` → `editPage` → `publishAsset` |
| `POST /api/page/move` | Reparent and/or reorder | `moveAsset` and/or `editPage` (order) |
| `DELETE /api/page?path=` | **Built E3, revised 2026-07-23 (see §10 item 4).** Hard delete: the asset moves to Cascade's Trash and its published output is unpublished in the same call (`deleteParameters`). Git-owned guarded same as PUT. Drops the page's docId from the shared manifest, then republishes the book's `nav.json` + global `search-index.json`/`tags.json` | `readPage` (ownership check) → `deletePage({hard:true})` → `removeManifestEntry` → `publishBookArtifacts` |
| `GET /api/folder/delete-preflight?path=` | **Added 2026-07-23.** Recursive subtree counts (`{ pages, chapters, files, gitOwned }`) for the folder-delete confirm dialog — the tree lazy-loads one folder per expand, so it can't count collapsed subtrees itself. Advisory only; DELETE re-checks | `readFolder` (recursive walk) + `readPage` per descendant page |
| `DELETE /api/folder?path=` | **Added 2026-07-23.** Recursive hard delete of a chapter or book (subtree → Cascade Trash, published output unpublished). 409 `git-owned` if *any* descendant page is git-origin (folders carry no origin metadata themselves). Rejects `docs`, `docs/_system/**`, and the `docs/uploads` root. Cleans up: manifest docIds; a deleted book's own nav container page and `docs/uploads/<slug>` folder; then republishes book artifacts (chapter) or the global artifacts (book) | preflight walk → `deleteFolder` → `removeManifestEntries` → `publishBookArtifacts` / `deletePage({hard:true})` (nav) + `deleteFolder` (uploads) + `publishGlobalArtifacts` |
| `POST /api/folder` | Create book/chapter | `createFolder` / `ensureFolder` (+ `ensureBookNavPage` for a new book) |
| `POST /api/upload` | **Built E3.** Multipart `{ file, path }` (`path` = the page being edited, to derive the book). Stores under `docs/uploads/<book>/<uuid>.<ext>` (images only, 15MB cap), returns `{ path, url }` where `url` is the root-relative canonical path (same convention as `packages/runtime`'s hrefs) — that's what lands in the saved `bodyHtml` | `upsertFile` (bytes) → `publishAsset` |
| `GET /api/file?path=` | **Added E3.** Streams a File asset's raw bytes with an inferred image Content-Type. Exists solely so the editor's *own* preview (BlockNote's `resolveFileUrl`, `PageView`'s read-only render) can display an uploaded image right now — the canonical root-relative `src` only resolves on the real public web server, whose hostname isn't configured anywhere in this app (same constraint as `GET /api/nav`, see below) | `readFile` |

**Derived-artifact republish after writes.** The proxy mirrors `publishDoc`'s
sequencing: after a page write it publishes the page → the book's `nav.json`
(via `ensureBookNavPage`) → `search-index.json` + `tags.json`. Rather than
re-implement this, **extract the publish-sequencing step out of
`cascade-publish`'s `publishDoc` into a shared helper** both paths call (see
§6, first task) so the editor and git path can never drift on ordering.

### Cross-cutting proxy behavior

- **Auth:** every route verifies `Cf-Access-Jwt-Assertion` against the Access
  JWKS (cache the JWKS), checks `aud` == the app's AUD tag, extracts `email` +
  name. No valid JWT → 401. (Access already blocks unauth'd traffic at the edge;
  this is defense-in-depth + identity extraction, and it makes local dev honest.)
- **Scope:** `assertInScope(path)` on every path param before any Cascade call.
- **Ownership guard:** on `PUT`/`DELETE`/`move`, if the target's `origin` is
  `"git"`, reject `409 { error:"git-owned", repo:sourceRepoPath }`. The UI renders
  such pages read-only, but the proxy enforces it regardless of the client.
- **Optimistic concurrency:** `GET` returns `version` (the asset's
  `lastModifiedDate`). `PUT`/`move`/`DELETE` send it back as `expectedVersion`;
  the proxy re-reads, and on mismatch returns `409 { error:"conflict",
  currentVersion, currentBodyHtml }` so the client can prompt reload/merge.
- **Errors:** normalize Cascade errors to `{ error, message }` + a sane status;
  never leak the API key or raw Cascade internals to the browser.

---

## 4. Frontend

Stack (locked in parent plan): **Next.js `output: export`** (static SPA, no SSR —
the proxy is the only server surface), **BlockNote** editor, **react-arborist**
tree, **cmdk + Fuse** command palette, **shadcn/ui + Tailwind**.

```
apps/editor/
├─ app/                      # Next.js App Router, output: export
│  ├─ layout.tsx  page.tsx   # front-door shell; single-page, client-rendered
│  └─ (reader)/…             # reader-shell route: sidebar + page body, read-only
│                            #   by default, "Edit this page" swaps body → BlockNote
├─ components/
│  ├─ shell/                 # React renderers of the shared doc-shell (§4a):
│  │                         #   Sidebar, Breadcrumb, Search (⌘K), ToC — visual
│  │                         #   parity with the public reader
│  ├─ editor/                # BlockNote wrapper + toolbar + raw-HTML block
│  │                         #   (mounted in-place when Edit is clicked)
│  ├─ command/               # cmdk palette (open page, new page, search)
│  └─ ui/                    # shadcn primitives
├─ lib/
│  ├─ api.ts                 # typed fetch wrappers for /api/*
│  ├─ blocknote-html.ts      # BlockNote ⇄ canonical-HTML adapters (client mirror)
│  └─ conflict.ts            # 409 handling / reload-merge prompt
└─ functions/
   └─ api/[[route]].ts       # Cloudflare Pages Function proxy (§3)
```

### 4a. UI model — editor-as-front-door + shared shell (revision 2026-07-14)

There are **two audiences, two doors, one Cascade backend, one shared body of
rendering logic**:

| | Public reader | Authenticated editor |
|---|---|---|
| Who | Anyone with the URL, no login | Allow-listed staff (Cloudflare Access OTP) |
| Where | Static HTML **published by Cascade** to the college web server | `apps/editor` on Cloudflare Pages (`*.pages.dev`) |
| Renders with | `packages/runtime` (vanilla DOM) | `apps/editor` React components |
| Can | Read + search only | Read + search **and** edit-in-place / create / delete |
| Changed by this revision? | **No — untouched.** Still the canonical public face. | **Yes — becomes the front door**, not a separate admin panel. |

**Editor-as-front-door:** an authenticated user *never has to visit the public
site to browse*. `apps/editor` loads the **same** derived artifacts Cascade
publishes — `nav.json`, `search-index.json`, `tags.json`, and each page's
canonical body HTML — and renders them in a shell that is a visual match for the
public reader (same sidebar, breadcrumb, ⌘K search, ToC, typography). **Every
page opens read-only by default** (just the canonical HTML in a container).
Clicking **"Edit this page"** swaps *that one page's body* into BlockNote, in
place, on the same route and shell — no separate editor screen, no context
switch. "+ New book / + New page" are affordances in the same chrome. When you
land somewhere and want to change it, you're already there.

**Shared shell package (the "middle path"):** to keep the two renderers from
silently drifting (which is exactly how the current mismatch happened), the
**framework-agnostic logic** — group `nav.json` into the chapter/page tree
(`buildTree`), humanize slugs / derive book slug, and the Fuse search **config**
(keys + threshold) — moves into a new package **`packages/doc-shell`**. It
exports plain data transforms and types, **no DOM and no React**. (Scope
confirmed by reading the runtime source 2026-07-14 — the genuinely shareable
surface is small and centers on `buildTree`; fetching, all DOM rendering, and
the ToC h2-scan stay per-renderer. See E-Shell in §5 for the exact split.) Both
surfaces consume it:

- `packages/runtime` (public) calls `doc-shell` and renders the result to the
  **DOM** (its existing vanilla approach — minimal change; it just stops owning
  the parsing/search logic and imports it instead).
- `apps/editor` (authenticated) calls the **same** `doc-shell` functions and
  renders the result as **React** components (`components/shell/`).

We deliberately **share the brains, not the pixels**: search behavior, nav
structure, and sort order — the things that cause real, hard-to-spot bugs when
duplicated — have exactly one implementation; each app keeps an idiomatic
renderer so neither is forced into the other's paradigm. Visual parity between
the two renderers is maintained by eye + shared design tokens (a small CSS
variables / Tailwind theme both consume), not by sharing a rendering engine.

**What this is *not*:** it is not "put the public site behind a login." The
public reader stays unauthenticated on the real web server. The editor is a
*second, richer* front door for the people who also edit. They share look and
logic, not hosting or auth.

### 4b. Save → live latency and the "instant vs. reconciled" model (settled 2026-07-14)

"See my change immediately" splits into two different *live*s, and the editor
handles them differently:

- **In the editor (instant):** on Save, the app already holds the just-authored
  HTML in memory. It **immediately** renders the read-only shell view from that
  in-memory copy — zero round-trip — so the author's own experience is instant.
- **On the public Cascade site (seconds-to-a-minute):** Save → proxy writes to
  Cascade → publish-sequence regenerates the static page + `nav.json` +
  `search-index.json` + `tags.json` → they land on the web server. This is the
  parent plan's locked, accepted tradeoff (*"publish latency of
  seconds-to-minutes save→live"*) — inherent to *Cascade-is-the-only-persistence-
  layer + static public site*, **not** something the UI can remove. Truly-instant
  public updates would require a live server in front of the public site, i.e.
  exactly the persistence layer the project deliberately did **not** build.

**Settled behavior after Save (user-confirmed 2026-07-14): do *both*.**
1. **Optimistic instant render** — show the in-memory version in the read-only
   shell the moment Save returns, for responsiveness.
2. **Background reconcile** — after the publish settles, re-fetch the *stored/
   published* canonical HTML and quietly reconcile the on-screen view against it,
   so what the author sees converges on what the world sees (this is what catches
   any server-side `normalizeHtml` adjustment the optimistic copy wouldn't
   reflect). Reconcile is non-blocking and silent on match; on a divergence it
   just updates the rendered body (no modal, no interruption).

This is a UI/UX behavior only — no backend or schema change. It lives in
`lib/api.ts` (save returns the optimistic body immediately; a follow-up fetch
reconciles) and the reader-shell route (§5, E1 wires the instant half; E4 adds
the background reconcile polish).

### The one hard frontend problem: BlockNote HTML round-trip fidelity

BlockNote's HTML import/export is lossy for anything outside its block schema.
The parent plan's mitigations still stand and are the backbone of Phase 2:

1. **One allowed HTML schema** (already enforced server-side by `normalizeHtml`
   and by the WYSIWYG config in the Cascade checklist Phase 1). Map each allowed
   element to a BlockNote block 1:1.
2. **Raw-HTML passthrough block** — a custom BlockNote block that stores verbatim
   HTML for anything that must survive untouched (embeds, special markup).
3. **Server normalize is authoritative** — the proxy runs `normalizeHtml` before
   `editPage`, so a lossy browser export can't corrupt storage.
4. **Round-trip fixture tests in CI** — a corpus asserting stability across
   `md→HTML→normalize` (git path) **and** `HTML→BlockNote→HTML→normalize`
   (editor path). The git path already produces canonical HTML; the editor must
   prove it can load that HTML and save it back unchanged. **This corpus is the
   acceptance gate for Phase 2 — build it early, before the UI feels done.**

---

## 5. Phased build (sub-phases of the parent's Phase 2–3)

Ordered so each step is independently verifiable against the **live** instance,
and so the riskiest thing (HTML round-trip) is proven before UI polish.

- **E0 — Scaffold + proxy skeleton + auth.**
  Create `apps/editor` (Next.js `output: export`) + `functions/api/[[route]].ts`.
  Wire Access JWT verification (JWKS fetch/verify, `aud` check, email extract) and
  a `GET /api/tree` + `GET /api/page` that call `readFolder`/`readPage`. No editor
  UI yet — verify with `curl` through a real Access token + a dead-simple tree view.
  *Exit:* an allow-listed email loads the real `docs/` tree and one page's JSON;
  a non-listed email is denied; a bad/missing JWT → 401.

- **E1 — Read + edit round-trip (the core of parent Phase 2).**
  BlockNote wrapper; load a page's canonical HTML into blocks; `PUT /api/page`
  with `normalizeHtml` + `expectedVersion`; publish-sequencing helper (§6) fires
  on save. Build the **round-trip fixture corpus** and CI job here. Optimistic
  409 surfaced as a reload/merge prompt. Identity stamped from JWT.
  *Exit:* edit an existing web-owned page, save, see it live with `editorName`/
  `authorEmail` set; a two-tab conflict yields a 409 prompt; the fixture corpus is
  green; a git-owned page opens **read-only** with a "managed in `<repo>`" banner.

- **E2 — Create + structure ops (parent Phase 3, part 1).** **Built 2026-07-13,
  pending live verification.**
  `POST /api/page` (generate `docId`, `origin:"web"`), `POST /api/folder`
  (book/chapter, `ensureBookNavPage` on new book), inline rename, and
  react-arborist drag → `POST /api/page/move` (reparent) / a new
  `POST /api/page/reorder` (recomputes the `order` field for a folder's page
  siblings after a drag). `GET /api/tree` now also preloads each page child's
  real DD `title` (one extra read per page, bounded to whatever folder is
  currently expanding) instead of showing the URL slug, so inline rename
  (which writes slug + title together) visibly reflects what was typed.
  *Exit:* create a book→chapter→page from scratch in the UI, reorder siblings,
  drag a page to another chapter — all reflected live in nav.json + the viewer.
  Verified so far: `pnpm typecheck`/`test`/`build` green; the built worker
  boots under `wrangler pages dev` and every new route is reachable and
  correctly 401s pre-auth; the tree/create/rename/open-in-editor flows were
  driven end-to-end in a real browser against a mocked API (Playwright +
  `page.route`) with zero console errors. **Not yet verified against the live
  Cascade instance** (no Access token available in this environment) — that
  step, and actually dragging a page in the real UI, are still on the
  developer per this phase's exit criteria.
  **Known limitations, deliberately deferred:** (1) chapters/books can't be
  reordered or dropped at the very top level — there's no `order` field for
  folders to persist against (nav-format.vm: chapter/book order follows
  Cascade's own folder position, which this proxy doesn't expose a way to
  change); (2) moving a *folder* (a whole chapter) is unverified for whether
  Cascade auto-republishes the pages inside it at their new location the way
  a single page move does — flagged as an ASSUMPTION in `worker.ts`, revisit
  if pages inside a moved chapter come back unpublished in practice; (3) file
  attachments aren't draggable/renameable (that's E3's territory).

- **E3 — Delete + image upload (parent Phase 3, part 2). — BUILT 2026-07-14,
  pending live/Access verification.**
  - **Delete (revised 2026-07-23 — real deletes, folders included; supersedes
    the original unpublish-only build):** a small trash button on every page
    *and folder* row in `DocsTree` (visible on row hover, via a
    `TreeActionsContext` so the react-arborist-owned `Row` renderer can reach
    a handler defined in `DocsTree` without becoming a fresh component
    identity every render), `window.confirm`'d (matches E2's existing
    `window.prompt`-based create/rename UX rather than introducing a custom
    modal). Deletes are **hard**: the asset (or whole subtree) moves to
    Cascade's Trash — admin-restorable there until purged — and its published
    output is unpublished in the same REST call (`deleteParameters`), so the
    row disappears from the tree, search, and the public site immediately.
    Pages go through `lib/api.ts`'s `deletePage()` → `DELETE /api/page?path=`
    (same git-owned guard as before). Chapters/books go through
    `getFolderDeletePreflight()` (server-side recursive walk supplies the
    child counts the confirm dialog states, and detects git-owned descendant
    pages — those block the delete with a pointer to the git flow's
    `delete: true` frontmatter) then `deleteFolder()` → `DELETE
    /api/folder?path=`. After either delete the worker cleans up every
    derived artifact: manifest docId(s), the book's `nav.json`, global
    `search-index.json`/`tags.json`; deleting a whole book also hard-deletes
    its nav container page and `docs/uploads/<slug>`. The client invalidates
    the cached cmdk search index, and `app/page.tsx`'s `onDeleted` clears
    `openPath` on a *prefix* match so deleting a folder closes a page open
    inside it. The old "tree still lists an unpublished page" caveat is gone
    — the asset no longer exists, so the refreshed tree simply drops it.
  - **Image upload:** `POST /api/upload` takes a multipart `{ file, path }`
    (`path` = the page being edited, to derive the book slug) and calls
    `upsertFile` under `docs/uploads/<book>/<uuid>.<ext>` (images only —
    png/jpg/gif/webp/svg — 15MB cap), returning `{ path, url }` where `url` is
    root-relative (`/docs/uploads/...`) — the **same convention `packages/
    runtime` already uses for hrefs** (confirmed against `nav.ts`/`search.ts`
    before building this, not invented fresh), and what's saved verbatim in
    `bodyHtml` since it's the correct src once the real public site publishes
    it. Wired into BlockNote via `useCreateBlockNote`'s `uploadFile` option in
    `DocEditor` (BlockNote's native image-upload UI — drag-drop, paste, or the
    image block's upload button — needed zero custom UI, `uploadFile` is a
    stock BlockNoteEditorOptions hook), so images upload and insert with the
    editor's own built-in flow.
  - **The preview problem, and how it's resolved:** the root-relative stored
    `src` can't resolve on the editor's own `*.pages.dev` origin (the real web
    server's hostname isn't wired into this app anywhere — same constraint
    `buildBookNav`'s comment already documents for `nav.json`). Rather than
    invent a new mechanism, this reuses BlockNote's existing `resolveFileUrl`
    editor option (confirmed via the compiled bundle it's consulted only by
    the live image/video block renderer, `bn-visual-media` — **not** by
    `blocksToFullHTML` export, so it can't leak into what gets saved) to route
    display through a new `GET /api/file?path=` proxy (`readFile` + a small
    image-extension→Content-Type map). `PageView`'s read-only render — plain
    `dangerouslySetInnerHTML`, no BlockNote involved — gets the same rewrite
    via a small regex helper, `withDisplayableImages()`, since sanitized HTML
    from `normalizeHtml` always emits simple double-quoted `src="..."`
    attributes. Both funnel through one shared `imageDisplayUrl()` in
    `lib/api.ts` so the rewrite rule lives in exactly one place.
  *Exit:* upload an image into a page and see it render live (both the
  BlockNote editing view and the read-only view); delete a page and confirm
  it unpublishes (reversible) — a simple confirm-to-orphan dialog, no
  hard-delete option presented. **These operate through whatever chrome exists
  at the time (E2's tree is fine); E3 does not depend on the shell rewrite.**
  Workspace typecheck/test/build all green (needed one fix: `apps/editor/
  functions/tsconfig.json`'s `types` array was `["@cloudflare/workers-types"]`
  only, dropping the ambient `Buffer` type `upsertFile`'s caller needs even
  though `nodejs_compat` already provides it at runtime — added `"node"`
  alongside it). **Not yet verified:** the live Access-gated flow (no Access
  token in this environment, same outstanding item as E2/E4).

- **E-Shell — `packages/doc-shell` extraction + runtime adoption (do before E4;
  can run in parallel with E3). — BUILT 2026-07-14, pending live-visual check.**
  `packages/doc-shell` now exists (framework-agnostic, no DOM/React) holding
  `buildTree`/`deriveBookSlug`/`humanizeSlug`/`folderDisplayName` (lifted
  verbatim), `slugify` (lifted from `toc.ts`), and `SEARCH_OPTIONS` +
  `createSearchIndex` (the Fuse config extracted out of `search.ts`'s
  module-level singletons). `runtime` imports all of them: `types.ts` re-exports
  the shared types, `nav.ts` re-exports the pure transforms (so `index.ts` /
  `nav.test.ts` import from `./nav.js` **unchanged**), `search.ts` routes through
  `createSearchIndex`, `toc.ts` imports `slugify`. Verified: `runtime`'s 9
  existing tests pass unchanged; `doc-shell` has 21 of its own tests (incl. the
  previously-untested search/slug/folderDisplayName cores); full-workspace
  typecheck+test green; the esbuild bundle inlines Fuse + the `||"section"`
  slugify fallback with zero unresolved imports (byte-identical logic → pure
  refactor). **Not yet done:** a live side-by-side visual check of the public
  reader (no published site available in this env) — the only remaining exit item.
  Original spec below:

  Create `packages/doc-shell` (framework-agnostic,
  no DOM/React) holding *only the drift-prone logic*, which — after reading the
  runtime source (2026-07-14) — is smaller than "the whole nav/search/toc files":

  | Moves to `doc-shell` | Notes |
  |---|---|
  | `buildTree` (nav grouping) | **Lifts verbatim** — already pure, already covered by `nav.test.ts` (5 cases). This is the real drift risk and the clean win. |
  | `deriveBookSlug`, `humanizeSlug`, `folderDisplayName`, `slugify` | Pure string helpers; lift verbatim. |
  | Fuse **config** (`{keys:["title","excerpt","tags"],threshold:0.35}`) + `SearchEntry` shape, as a small `createSearchIndex(entries)` | **Extraction, not a lift** — `search.ts` today uses module-level singletons (`cachedEntries`/`fuse`) and `filter` closes over them; refactor that caching out. The editor reuses ~5 lines of config, *not* the 90-line `initSearch`. |

  **Stays in `runtime` (does NOT move):** all DOM renderers (`renderSidebar`,
  `renderBreadcrumb`, `initSearch`, `initToc`) — these are runtime's idiomatic
  "pixels"; the editor writes React equivalents and uses cmdk instead of
  `initSearch`. **`fetchNav`/`loadIndex` also stay** — they hardcode the public
  URL scheme (`/docs/_system/nav/<slug>.json`), whereas the editor fetches the
  same JSON via its `/api/*` proxy; `doc-shell` operates on **already-fetched
  JSON**, it does not fetch. **ToC:** share only `slugify`; the h2-scan in
  `initToc` reads *and mutates* the live DOM (assigns `heading.id` for anchors),
  so it stays per-renderer rather than forcing `doc-shell` to touch the DOM.

  Refactor `runtime` to import the moved pieces instead of owning them (behavior
  must be byte-identical). **Test guard is partial:** `nav.test.ts` genuinely
  guards the `buildTree`/slug extraction, but there are currently **no tests for
  search or toc**, so new `doc-shell` unit tests for the Fuse config and
  `slugify` are *required*, not optional.
  *Exit:* `runtime` builds and passes its existing tests unchanged after the
  extraction; the public reader is visually and behaviorally identical (pure
  refactor, zero user-visible change); `doc-shell` has its own unit tests for
  every transform it owns (including the previously-untested search/toc cores).

- **E4 — Front-door shell + command palette + polish + rollout. — BUILT
  2026-07-14, pending live/Access verification.** *This is the phase recast by
  the 2026-07-14 UI-model revision (§4a).* The standalone tree+pane admin panel
  (`app/page.tsx`) is gone. In its place:
  - `components/shell/ShellChrome.tsx` — the topbar/sidebar/content/rail grid,
    React port of `runtime`'s chrome (theme toggle, mobile nav), styled from
    the new shared tokens (below).
  - `components/shell/Breadcrumb.tsx`, `Toc.tsx`, `useBookNav.ts` — React ports
    of `runtime`'s `renderBreadcrumb`/`initToc`, built on `doc-shell`
    (`buildTree`, `folderDisplayName`, `slugify`) via a live-from-Cascade
    `GET /api/nav?path=docs/<book>` route (see below) rather than fetching the
    *published* nav.json — that artifact's hostname isn't configured anywhere
    in this app (only the editor's own `*.pages.dev` host is settled, per §7),
    so the proxy now computes the same `NavResponse` shape directly from
    Cascade REST (bounded two-level walk: book → chapters → pages).
  - `components/shell/PageView.tsx` (`usePageView` hook) — the reader-shell
    "route" for one page: read-only by default (canonical `bodyHtml` rendered
    with reader typography + tags + origin badge), **"Edit this page"** swaps
    to `DocEditor` in place (no route change), git-owned pages get the banner
    instead of an Edit button. Implements §4b in full: `onSaved` renders the
    just-saved copy instantly, then a 6s-delayed background `reconcilePage`
    (new `lib/api.ts` export) silently swaps in the stored copy if it
    differs — no modal either way. Empty/loading/error states included.
  - `components/shell/SearchPalette.tsx` — cmdk-based ⌘K palette (global
    keydown handler in `app/page.tsx`), backed by a new `GET /api/search-index`
    route (walks every book, excerpts via the same strip-and-truncate-200 rule
    `_shared.vm` uses) and `doc-shell`'s `createSearchIndex`/`SEARCH_OPTIONS` —
    literally the same Fuse config the public reader's ⌘K uses.
  - `packages/runtime/tokens.css` — the shared design tokens (the `:root`
    custom properties, lifted verbatim out of the Cascade Template), imported
    directly by `apps/editor/app/globals.css`. The Cascade Template can't
    `@import` it back (Templates aren't part of this JS build), so it keeps a
    cross-reference comment instead; layout/typography CSS around the tokens
    is kept in sync by eye per §4a, not shared verbatim.
  - `DocsTree` (E2's react-arborist tree) is **kept, not replaced** — restyled
    to the shared tokens (chapter-style uppercase group labels, active-page
    highlight, accent colors) rather than rebuilt as a second read-only nav
    renderer. This was a deliberate scope call: rebuilding drag-and-drop nav
    from scratch risked E2 regressions for a parity gain achievable by
    restyling; "+ Book / + Chapter / + Page" already lived in this same
    persistent sidebar chrome, just restyled now instead of moved.
  - Deferred, matching the plan's own framing: autosave-draft-on-blur (marked
    optional in §5 already); §7's Cloudflare Pages/Access console config
    (manual dashboard work, no environment access here).
  *Verified so far:* `pnpm typecheck`/`test`/`build` green for the whole
  workspace including the new `doc-shell`-consuming code; the built worker's
  static export renders the full expected shell HTML server-side (topbar,
  restyled sidebar tree, empty-state content pane, all with the new CSS
  classes) confirmed via `wrangler pages dev` + `curl` before local
  verification was cut short in favor of the developer testing remotely.
  **Not yet verified:** the live Access-gated flow end to end (sign-in →
  browse real nav/search data → edit → save → see it live) — no Access token
  in this environment; also the very first live check that `doc-shell`'s
  extraction left the *public* reader pixel-for-pixel unchanged (E-Shell's
  own outstanding item, now doubly relevant since E4 is the tokens' first
  real second consumer).
  *Exit:* an allow-listed non-technical user, from the editor URL alone, browses
  the tree in the pretty shell, searches with ⌘K, opens a page read-only, clicks
  Edit and sees the change instantly, and that change appears on the **public**
  Cascade site within the accepted seconds-to-a-minute window; a full
  create→edit→image→reorder→publish loop completes unaided; conflict + git-owned
  + denied-email paths all behave; deployed to the real Pages project behind
  Access. Side-by-side, the editor's read-only view and the public reader are
  visibly the same product.

---

## 6. Key implementation tasks that cut across phases

1. **Extract publish-sequencing into a shared helper.** Pull the "publish page →
   book nav → search-index → tags" step out of `cascade-publish`'s `publishDoc`
   into something like `cascade-client` (or a new `doc-core` fn) that both the
   Action and the proxy call. Prevents the two paths from drifting on publish
   ordering. *Do this first — it's a refactor of proven code, low risk, high leverage.*
2. **BlockNote ⇄ canonical-HTML adapter** (`lib/blocknote-html.ts`) + the
   **raw-HTML passthrough block**. The linchpin of fidelity; owns the fixture corpus.
3. **JWT verification module** in the proxy (JWKS cache, `aud`, clock skew). Small,
   security-critical, test it in isolation.
4. **Typed API client** (`lib/api.ts`) shared by all UI components; centralizes
   409/401/git-owned handling so components stay dumb. Also owns the **save model**
   (§4b): a save returns the optimistic in-memory body immediately, and exposes a
   follow-up `reconcile(path)` that re-fetches the stored canonical HTML once the
   publish settles.
5. **`packages/doc-shell` (shared shell logic).** Framework-agnostic nav/search/
   ToC/breadcrumb transforms consumed by both `packages/runtime` (DOM) and
   `apps/editor` (React), so the public reader and the editor front-door share
   one implementation of the drift-prone logic. *Extract from `runtime` first
   (E-Shell), proving it against `runtime`'s existing tests, before the editor
   consumes it.* This is the structural fix for the 2026-07-14 UI mismatch.

---

## 7. Manual config for the editor (beyond the parent plan's steps A–D)

These are the editor-specific console steps (parent plan steps **E/F** + Access):

**Hostname decision (settled 2026-07-13):** `mchenry.edu`'s DNS is on the
college's own internal AD-integrated domain controllers, not Cloudflare
(confirmed live via `dig NS mchenry.edu`) — `dev.mchenry.edu` is just a plain
A record in that same internal zone. Getting a real `*.mchenry.edu` hostname
would require a DNS change from whoever administers those internal servers,
which the user doesn't have access to and chose not to pursue. **The editor
ships on Cloudflare Pages' free auto-assigned `*.pages.dev` subdomain instead**
(e.g. `mcc-docs-editor.pages.dev`), gated by Cloudflare Pages' **built-in
Access Policy** toggle (Pages project → Settings → Access policy) — this puts
the email-OTP gate directly on the `pages.dev` URL with **no custom domain and
no DNS/IT work at all**. Revisit only if a real subdomain becomes easy to get
later; nothing in the build below depends on the hostname.

1. **Cloudflare Pages project** for `apps/editor` (build = Next.js static export;
   output dir `out`). Bind the `functions/` directory as Pages Functions.
2. **Function secrets/vars:** `CASCADE_API_KEY`, `CASCADE_BASE_URL`,
   `CASCADE_SITE_NAME`, the four content-type ids already in `.env`
   (`CASCADE_DOC_CONTENT_TYPE_ID` etc.), plus Access `AUD` and team domain.
3. **Cloudflare Access policy on the Pages project itself** (Settings → Access
   policy, not a separate Zero Trust "Access application" over a custom
   domain): policy = **email OTP** with the **explicit email allow-list** (no
   IdP). Record the **AUD** tag for JWT verification in the proxy.
4. **No DNS step** — the `*.pages.dev` hostname Cloudflare assigns is used as-is.

> Reuse the **same** `svc-docs-api` scoped service account and `CASCADE_API_KEY`
> the git path uses — the proxy is just another consumer of it. The `docs/`-only
> Access Rights already configured (checklist Phase 9) cover the editor too.

---

## 8. Editor-specific risks

| # | Risk | Default / mitigation |
|---|---|---|
| 1 | BlockNote round-trip drops markup | Constrained schema + raw-HTML block + **server normalize authoritative** + CI fixture corpus (gate for E1) |
| 2 | Static export can't do server auth | Auth lives entirely in the Pages **Function** proxy, not in Next.js SSR — SPA is fully static, proxy is the only trust boundary |
| 3 | Git ⇄ web clobber | `origin` guard: git-owned pages read-only in UI **and** rejected by proxy; create stamps `origin:"web"` |
| 4 | Lost update (two editors) | Optimistic `expectedVersion` → 409 reload/merge prompt; escalate to KV/DO advisory lock only if it proves insufficient |
| 5 | Access JWT verification wrong/stale JWKS | Dedicated tested module; cache JWKS with refresh; verify `aud` + expiry; fail closed (401) |
| 6 | Image `src` points at unpublished/relative path | Upload to `docs/uploads/<book>/…`, publish the file, rewrite `src` to the published URL before storing body |
| 7 | Publish-order drift between paths | Shared publish-sequencing helper (§6 task 1) — single implementation |
| 8 | Editor writes valid-in-BlockNote but invalid-in-viewer HTML | Same `normalizeHtml` schema the viewer/git path already assume; fixture corpus includes git-authored pages loaded into the editor |
| 9 | Reader shell & public reader drift apart again (the 2026-07-14 mismatch, recurring) | Shared `packages/doc-shell` owns the drift-prone logic (nav/search/sort/ToC); shared design tokens for visual parity; extract-and-prove-against-runtime-tests before the editor consumes it (E-Shell) |
| 10 | Author confused when editor shows their edit but public site lags | Explicit two-live model (§4b): instant in-editor render is the optimistic copy; background reconcile converges on the stored version; publish latency is the parent plan's accepted tradeoff, surfaced honestly in-UI (e.g. a subtle "publishing…" → "live" indicator), not hidden |

---

## 9. Verification (end-to-end, live)

- **E0:** allow-listed email loads the real tree + a page; non-listed denied; no/bad JWT → 401.
- **E1:** edit a web-owned page → live update with identity stamped; two-tab edit → 409 prompt;
  open a **git-owned** page → read-only banner; fixture corpus green in CI.
- **E2:** build book→chapter→page in UI; reorder + reparent → nav.json + viewer reflect it.
- **E3:** upload image → renders live; delete → unpublishes (reversible); hard-delete gated.
- **E-Shell:** `runtime` builds + all its existing tests pass unchanged after the
  `doc-shell` extraction; public reader visibly/behaviorally identical (pure refactor).
- **E4:** from the editor URL alone, a non-technical user browses the pretty shell,
  ⌘K-searches, opens a page read-only, clicks Edit, sees the change **instantly**
  in-editor, and confirms it lands on the **public** Cascade site within the
  accepted seconds-to-a-minute window; background reconcile leaves the on-screen
  body matching the stored HTML; side-by-side, editor read-only view and public
  reader look like one product; completes a full authoring loop unaided; deployed
  behind Access.
- **Regression:** after any editor write, confirm nav/search/tags republish (shared helper),
  and that a subsequent **git push** to the same book still works (paths don't interfere).

---

## 10. Open questions to confirm before E1

1. ~~Editor hostname~~ — **settled, see §7**: free `*.pages.dev` subdomain +
   Cloudflare Pages' built-in Access Policy; no DNS/IT dependency.
2. ~~BlockNote version/license~~ — **settled 2026-07-13**: core package is
   MPL 2.0 (free, commercial/closed-source use permitted). Verified live
   against BlockNote's own docs: custom block types (`createReactBlockSpec` —
   the mechanism for the raw-HTML passthrough block) are plain core
   functionality, and HTML conversion (`blocksToHTMLLossy`/`blocksToFullHTML`
   and the HTML→blocks importer) is explicitly marked **not** Pro-only in
   their feature table. The paid Business tier ($195/mo, dual GPL-3.0/
   commercial "XL packages") only gates AI integration, multi-column layouts,
   and PDF/DOCX/ODT/Email export — none of which this plan needs. No
   subscription required for E0–E4.
3. ~~Draft/autosave behavior~~ — **settled 2026-07-13**: explicit
   "Save/Publish" only in E1 (no autosave-on-blur). Autosave is a possible
   E4 polish item, not a requirement.
4. ~~Hard-delete policy in the UI~~ — **settled 2026-07-13 as orphan+unpublish
   only; REVERSED 2026-07-23**: the unpublish-only trash button read as broken
   in practice (the tree lists live Cascade state, so the "deleted" page never
   visibly went away — exactly the confusion the E3 note said to revisit on),
   and chapters/books had no delete at all. The web editor now performs
   **real hard deletes** for pages, chapters, and books (asset/subtree →
   Cascade's Trash, admin-restorable until purged; published output
   unpublished in the same call). Folder deletes are recursive with a
   count-stating confirm dialog. Git-owned content remains undeletable from
   the web (409 for a page, or for any folder with a git-origin descendant
   page) — hard-deleting it from git's source of truth stays the git path's
   `delete: true` frontmatter affordance. See the revised E3 entry and the
   `DELETE /api/page` / `DELETE /api/folder` route table rows.
5. ~~Editor UI model~~ — **settled 2026-07-14, see §4a**: **editor-as-front-door
   + shared shell**. The editor is not a standalone admin panel; it's a second,
   authenticated front door that renders the same reader shell (sidebar /
   breadcrumb / ⌘K search / ToC) as the public site, every page read-only by
   default with an in-place "Edit this page". The public reader stays
   unauthenticated on the real web server, **unchanged**. Drift-prone rendering
   logic is shared via `packages/doc-shell`; look is shared via design tokens;
   auth/hosting are *not* shared. Recasts E3/E4 and adds an E-Shell step.
6. ~~"After you save" freshness model~~ — **settled 2026-07-14, see §4b**: **do
   both** — render the in-memory copy instantly for responsiveness, then
   silently **background-reconcile** against the stored/published canonical HTML
   once the publish settles. In-editor is instant; the public site follows in
   the parent plan's accepted seconds-to-a-minute publish window (a static-
   publishing property of the locked architecture, not a UI defect).
```
