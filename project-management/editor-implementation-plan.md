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
| **Web editor (`apps/editor`)** | **E0–E2 built** (E0 scaffold/auth, E1 read/edit round-trip, E2 create/rename/move/reorder) — E3 (delete + image upload) and E4 (polish + rollout) remain |

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
| `POST /api/page` | Create page (generate `docId`, stamp `origin:"web"` + identity) | `ensureFolder` + `createPage` + `publishAsset` |
| `PUT /api/page` | Edit page (optimistic `expectedVersion`) | `readPage` (compare) → `normalizeHtml` → `editPage` → `publishAsset` |
| `POST /api/page/move` | Reparent and/or reorder | `moveAsset` and/or `editPage` (order) |
| `DELETE /api/page?path=` | Orphan+unpublish (only mode exposed via the editor — see §10 item 4) | `unpublishAsset` (+ status) |
| `POST /api/folder` | Create book/chapter | `createFolder` / `ensureFolder` (+ `ensureBookNavPage` for a new book) |
| `POST /api/upload` | Upload image/attachment | `upsertFile` (bytes) → `publishAsset` |
| `POST /api/publish?path=` | Manual republish | `publishAsset` |

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
│  ├─ layout.tsx  page.tsx   # shell; single-page, client-rendered
│  └─ (editor)/…             # tree + editor split view
├─ components/
│  ├─ tree/                  # react-arborist sidebar (lazy load via /api/tree)
│  ├─ editor/                # BlockNote wrapper + toolbar + raw-HTML block
│  ├─ command/               # cmdk palette (open page, new page, search)
│  └─ ui/                    # shadcn primitives
├─ lib/
│  ├─ api.ts                 # typed fetch wrappers for /api/*
│  ├─ blocknote-html.ts      # BlockNote ⇄ canonical-HTML adapters (client mirror)
│  └─ conflict.ts            # 409 handling / reload-merge prompt
└─ functions/
   └─ api/[[route]].ts       # Cloudflare Pages Function proxy (§3)
```

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

- **E3 — Delete + image upload (parent Phase 3, part 2).**
  `DELETE /api/page` (orphan+unpublish only — no hard-delete path in the UI at
  all; hard delete stays a git-`delete:true` affordance, see §10 item 4),
  `POST /api/upload` → `upsertFile` under `docs/uploads/<book>/…`, rewrite the
  image `src` to the published URL, insert into the BlockNote doc.
  *Exit:* upload an image into a page and see it render live; delete a page and
  confirm it unpublishes (reversible) — a simple confirm-to-orphan dialog, no
  hard-delete option presented.

- **E4 — Command palette + polish + rollout.**
  cmdk palette (jump-to-page over the tree, "new page", quick search via the same
  `search-index.json` Fuse index the viewer uses), empty/error/loading states,
  BookStack-like layout parity with the viewer, autosave-draft-on-blur (optional),
  onboarding docs. Finalize Cloudflare Pages + Access config (§7).
  *Exit:* an allow-listed non-technical user does a full create→edit→image→
  reorder→publish loop unaided; conflict + git-owned + denied-email paths all
  behave; deployed to the real Pages project behind Access.

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
   409/401/git-owned handling so components stay dumb.

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

---

## 9. Verification (end-to-end, live)

- **E0:** allow-listed email loads the real tree + a page; non-listed denied; no/bad JWT → 401.
- **E1:** edit a web-owned page → live update with identity stamped; two-tab edit → 409 prompt;
  open a **git-owned** page → read-only banner; fixture corpus green in CI.
- **E2:** build book→chapter→page in UI; reorder + reparent → nav.json + viewer reflect it.
- **E3:** upload image → renders live; delete → unpublishes (reversible); hard-delete gated.
- **E4:** a non-technical user completes a full authoring loop unaided; deployed behind Access.
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
4. ~~Hard-delete policy in the UI~~ — **settled 2026-07-13**: web editors
   only ever orphan+unpublish (E3's `DELETE /api/page` default). Hard delete
   is **not** exposed in the UI at all; it stays a git-path-only affordance
   (`delete: true` in frontmatter, per the parent plan's delete/rename
   semantics). Simplifies E3 — no hard-delete confirmation dialog needed.
   (Default: orphan-only in the UI; hard delete deferred.)
```
