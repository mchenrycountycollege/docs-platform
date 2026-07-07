# Cascade-Backed Docs Platform — Implementation Plan

## Context

The web team at a community college needs an internal, BookStack-like documentation
system with a modern editing experience, but with **no new persistence layer**: all
content, structure, and files live as **Cascade CMS assets** and publish out as static
files alongside the existing site. The team already runs the same "authenticated
Cloudflare function proxies a vendor API" pattern (for an Asana ticket form); this is
that pattern at larger scale.

The system has **two write paths that converge on one canonical HTML body format**:

1. **Git path (highest priority / most-used):** markdown + YAML frontmatter in each
   component repo → a reusable GitHub Actions workflow → Cascade REST create-or-update →
   publish. One `git push` publishes a doc from the same repo as the component code.
2. **Web editor:** a Next.js app (BlockNote editor, react-arborist tree) where
   non-technical editors never see Cascade; a stateless Cloudflare proxy holds the API
   key, validates scope, stamps identity, and triggers publish.

Reads are pure static: Velocity Formats render page HTML plus derived JSON artifacts
(nav, tag index, search index) at publish time; the published pages hydrate a small
client runtime for the sidebar tree and Cmd+K search.

### Settled decisions (locked with the user — do not relitigate)

| Decision | Value |
|---|---|
| Cascade | Cloud instance **v20260701_6020**, **REST API** (`/api/v1/`) |
| Hosting | **All-in Cloudflare** — static Next.js on Pages + Pages Functions/Worker proxy |
| Auth | **Cloudflare Access email OTP** (no IdP, no IT dept), **explicit email allow-list** |
| Identity in proxy | Access-signed JWT (`Cf-Access-Jwt-Assertion`) → email |
| Cascade credential | Dedicated service account **scoped to the `docs/` subtree only** |
| Body storage | Canonical **HTML** (BlockNote round-trips HTML; git path converts md→HTML) |
| Accepted tradeoff | Publish latency of seconds-to-minutes save→live |

---

## Architecture at a glance

```
                       ┌───────────────────── Cascade CMS Cloud (persistence) ─────────────────────┐
                       │  Site: docs/                                                                │
   ┌─────────┐  REST   │   <book>/<chapter>/<page>  (Documentation Page assets, DD-structured)       │
   │ GH      │────────▶│   uploads/<...>            (File assets: images/attachments)                │   publish
   │ Actions │         │   _system/nav|search|tags  (derived JSON artifacts via Index Block+Format)   │──────────▶  static
   └─────────┘         └─────────────────────────────────────────────────────────────────────────────┘             web
        ▲ shared cascade-client + doc-core                         ▲ REST                                           server
        │                                                          │
   markdown+frontmatter                              ┌─────────────┴─────────────┐        gated by Cloudflare Access (OTP)
   in component repos                                │  Cloudflare Pages Function │◀───────  Next.js editor (static export)
                                                     │  proxy (holds API key)     │          BlockNote + react-arborist +
                                                     └────────────────────────────┘          cmdk/Fuse + shadcn/ui
```

Both write paths share the **same Cascade REST client** and the **same HTML
normalize/sanitize + path-mapping core**. They diverge only in: input format
(markdown vs BlockNote-HTML), identity source (git author vs Access JWT), and
concurrency model (git-serialized vs optimistic version check).

---

## Repo / project structure

Single **pnpm monorepo** named `docs-platform` (this is also the "central repo" that
hosts the reusable workflow). Consuming component repos stay tiny — just a `docs/`
folder and a few-line caller workflow.

```
docs-platform/
├─ packages/
│  ├─ cascade-client/           # Shared Cascade REST client (SHARED by both paths)
│  │   ├─ auth.ts               #   Bearer API-key auth
│  │   ├─ assets.ts             #   read / create / edit / move / delete / publish
│  │   ├─ structured-data.ts    #   map {title,body,order,tags,editor} ⇄ Cascade structuredData
│  │   ├─ scope.ts              #   assertInScope() path guard (defense-in-depth)
│  │   └─ types.ts
│  ├─ doc-core/                 # Shared domain logic (SHARED by both paths)
│  │   ├─ frontmatter.ts        #   gray-matter parse/validate (id,title,book,chapter,tags,order)
│  │   ├─ markdown.ts           #   remark+remark-gfm → rehype → HTML (git path)
│  │   ├─ html-normalize.ts     #   rehype-sanitize to the ONE allowed schema (both paths)
│  │   ├─ path-map.ts           #   frontmatter/repo-path ⇄ Cascade asset path (deterministic)
│  │   └─ slug.ts
│  └─ cascade-publish/          # Git-path orchestrator (wraps doc-core + cascade-client)
│      └─ index.ts              #   parse → normalize → create-or-update by id → placement → publish
├─ apps/
│  └─ editor/                   # Next.js (output: export) static SPA editor
│      ├─ app/ components/ lib/ #   BlockNote, react-arborist, cmdk+Fuse, shadcn/ui + Tailwind
│      └─ functions/api/[[route]].ts   # Cloudflare Pages Function proxy (uses cascade-client+doc-core)
├─ runtime/                     # tiny published-page client (renders sidebar from nav.json, Cmd+K search)
├─ actions/
│  └─ publish/action.yml        # composite/Node action used by the reusable workflow
├─ .github/workflows/
│  └─ reusable-cascade-publish.yml   # on: workflow_call  ← consuming repos reference THIS
└─ cascade/                     # source-of-truth copies of DD XML + Velocity Formats (docs/versioning)
```

**Consuming component repo** (e.g. `some-cascade-component`):

```
some-cascade-component/
├─ src/ ...                     # the component code
├─ docs/
│  ├─ overview.md               # frontmatter: id, title, book, chapter, tags, order
│  ├─ configuration.md
│  └─ images/diagram.png
└─ .github/workflows/publish-docs.yml   # ~8-line caller (below)
```

Caller workflow in each consuming repo:

```yaml
name: Publish docs
on:
  push:
    branches: [main]
    paths: ['docs/**']
jobs:
  publish:
    uses: your-org/docs-platform/.github/workflows/reusable-cascade-publish.yml@v1
    with:
      docs-dir: docs
    secrets: inherit          # uses org-level CASCADE_API_KEY (see Manual steps)
```

Onboarding a new repo = drop in `docs/` + this file. **Recommendation: org-level
Actions secret** `CASCADE_API_KEY` (scoped via "selected repositories"), so onboarding
needs no per-repo secret. Tradeoff noted in Risks.

---

## Cascade content architecture

### Folder conventions (under the `docs/` site/subtree)
```
docs/
  <book-slug>/
    <chapter-slug>/
      <page-slug>            # Documentation Page asset
  uploads/<book-slug>/...    # File assets (images/attachments)
  _system/
    nav/<book-slug>.json     # derived: recursive sidebar per book
    search-index.json        # derived: {title,path,tags,excerpt} for all pages
    tags.json                # derived: tag → [pages]
```
Shelf→Book→Chapter→Page maps to folder depth. A "Book" is a top-level folder under
`docs/`; a "Chapter" is a sub-folder; a "Page" is the Documentation Page asset. (Chapters
optional — pages may sit directly under a book.)

### Data Definition (sketch)
Cascade DDs have no integer type, so `order` is a numeric text field (zero-padded on
write for lexical sort safety). `tags` is a multiple text field. Provenance
(`editorName`/`authorEmail`/`origin`/`sourceRepoPath`/`docId`) lives in a **Metadata
Set**, keeping content and bookkeeping separate.

```xml
<!-- Documentation Page data definition -->
<system-data-structure>
  <text  identifier="title" label="Title" type="text" required="true"/>
  <text  identifier="order" label="Sort order" type="text" default="500"/>
  <text  identifier="tags"  label="Tags"  type="text" multiple="true"/>
  <text  identifier="body"  label="Body"  type="wysiwyg"/>
</system-data-structure>
```
```
Metadata Set (custom fields):
  docId          text   # immutable identity (UUID) — links git file ⇄ Cascade asset
  origin         text   # "git" | "web"  — ownership guard between the two paths
  sourceRepoPath text   # e.g. some-cascade-component/docs/overview.md
  editorName     text   # human display name of last real editor
  authorEmail    text   # email of last real editor (from Access JWT or git commit author)
```

### Format responsibilities (Velocity)
1. **Page render Format** — attached to the content type; renders `body` into the page
   template shell (header, includes the client runtime `<script>` + a `<div id="sidebar">`
   hydrated from nav.json). Page HTML is self-contained content; chrome hydrates client-side.
2. **Nav Format** — over an **Index Block** on each Book folder (recursive) → walks the
   index XML, sorts children by `order`, emits `_system/nav/<book>.json`.
3. **Search Format** — over an Index Block on `docs/` root → emits `search-index.json`
   ({title, path, tags, excerpt}) — the standard SSG search pattern.
4. **Tags Format** — over the same root Index Block → emits `tags.json` (+ optional
   rendered per-tag index pages).

**Why JSON artifacts instead of nav baked into every page:** it decouples derived
artifacts from page content. A single page edit then only republishes (a) that page,
(b) its book's `nav.json`, (c) `search-index.json`/`tags.json` — three small assets —
instead of fanning out a republish across every sibling page. This directly solves the
"regenerate derived artifacts when any page changes" concern.

### Publish / dependency strategy
- After any write, the orchestrator (proxy or Action) **explicitly publishes**, in order:
  the affected page → the book's `nav.json` → `search-index.json` + `tags.json`.
- **Backstop:** a scheduled **nightly full `docs/` republish** (accepted fallback) catches
  any missed dependency and keeps derived artifacts eventually-consistent.
- Publish destination for the `docs/` subtree points at the existing static web server
  (configured once — see Manual steps).

---

## Proxy API surface → Cascade REST mapping

All endpoints are Cloudflare Pages Functions under `/api/*`, **gated by Cloudflare
Access** (the Function verifies the `Cf-Access-Jwt-Assertion` JWT against the Access JWKS
and extracts `email`). Every write runs `assertInScope()` before touching Cascade; the
service account is *also* Cascade-scoped to `docs/` as defense-in-depth.

| Proxy endpoint | Purpose | Cascade REST op |
|---|---|---|
| `GET /api/tree?path=` | Lazy-load children for react-arborist | `GET /api/v1/read/folder/<site>/<path>` |
| `GET /api/page?path=` | Load a page for editing | `GET /api/v1/read/page/<site>/<path>` |
| `POST /api/page` | Create page (stamps identity) | `POST /api/v1/create` |
| `PUT /api/page` | Edit page (optimistic `expectedVersion`) | `POST /api/v1/edit` |
| `POST /api/page/move` | Reparent and/or reorder | `POST /api/v1/move` and/or `edit` (order field) |
| `DELETE /api/page?path=` | Archive/orphan (default) or hard delete | `edit`(status) + unpublish, or `POST /api/v1/delete` |
| `POST /api/upload` | Upload image/attachment | `POST /api/v1/create` (File asset, base64) |
| `POST /api/publish` | Manual republish page + artifacts | `POST /api/v1/publish/<type>/<path>` |

Representative request/response (edit):
```jsonc
// PUT /api/page
{ "path": "docs/cascade/wysiwyg/callouts",
  "title": "Callout component", "bodyHtml": "<h2>…</h2>",
  "order": 300, "tags": ["wysiwyg","components"],
  "expectedVersion": "2026-07-06T14:02:11Z" }   // last-known lastModifiedDate

// 200 → { "path":"…", "version":"2026-07-06T14:09:03Z", "publishTriggered":true }
// 409 → { "error":"conflict", "currentVersion":"…", "currentBodyHtml":"…" }
```

### Path-scoping validation (shared `cascade-client/scope.ts`)
```ts
const ROOT = "docs";
export function assertInScope(rawPath: string): string {
  const norm = rawPath.replace(/\/+/g, "/").replace(/\/+$/,"");
  const segs = norm.split("/");
  if (segs.includes("..") || segs.includes(".")) throw new Forbidden();
  if (norm !== ROOT && !norm.startsWith(ROOT + "/")) throw new Forbidden();
  return norm;
}
```

### Shared vs. divergent client code
- **Shared (`cascade-client` + `doc-core`):** all REST calls, structured-data mapping,
  `assertInScope`, HTML normalize/sanitize schema, path mapping, publish sequencing.
- **Justified divergence:**
  - *Input:* git path runs `markdown.ts` (md→HTML); editor sends BlockNote-exported HTML.
    Both then pass through the **same** `html-normalize.ts` — one canonical output.
  - *Identity:* git path stamps `authorEmail` from the git commit author / frontmatter;
    proxy stamps from the Access JWT `email`.
  - *Concurrency:* git path is serialized by a GitHub Actions `concurrency:` group keyed
    on `docId`; proxy uses optimistic `expectedVersion` checks.

---

## Concurrency (conflict / race avoidance)

1. **Git path is idempotent by identity.** Each markdown file carries an immutable
   `id:` (UUID) in frontmatter; Cascade asset is looked up by that `docId`, so pushing
   the same file always updates the same page. A workflow `concurrency:` group
   (`group: docs-${{ github.repository }}`, `cancel-in-progress: false`) serializes runs
   within a repo.
2. **Web editor uses optimistic concurrency.** Read returns the asset `lastModifiedDate`
   as `version`; `PUT` sends it as `expectedVersion`. The proxy re-reads the asset,
   compares, and returns **409** on mismatch so the client can surface a
   "changed underneath you" merge/reload prompt. No lock needed for the common case →
   honors the "no database" spirit (fully stateless).
3. **Cross-path ownership guard.** The `origin` metadata field marks each page `git` or
   `web`. The editor renders `git`-owned pages **read-only with a "managed in <repo>"
   banner**, and the Action refuses to overwrite a `web`-owned page without an explicit
   `takeover: true` in frontmatter. This is the primary defense against the two paths
   clobbering each other.
4. **Escalation path (only if needed):** a per-`docId` advisory lock in Cloudflare KV
   (short TTL) or a Durable Object mutex. Deferred — start stateless; add only if
   optimistic checks prove insufficient in practice.

---

## Body format: BlockNote HTML round-trip risks & mitigation

BlockNote's HTML import/export is lossy for anything outside its block schema (custom
components, complex/nested tables, arbitrary attributes/classes, embeds): a
HTML→blocks→HTML round-trip can drop unknown tags/attrs and normalize markup.

Mitigations (converge both paths on one normalized subset):
- **Define one allowed HTML schema** (headings, paragraphs, lists, tables, code, images,
  links, callouts/blockquotes) that maps cleanly to BlockNote blocks; enforce it in
  `html-normalize.ts` (rehype-sanitize) so both write paths emit identical canonical HTML.
- **Raw-HTML passthrough block:** a BlockNote custom block that stores verbatim HTML for
  content that must survive untouched (embeds, special Cascade markup).
- **Server-side normalize is authoritative** — never trust the browser's export blindly;
  the proxy normalizes before `edit`, so a lossy client export can't silently corrupt storage.
- **Fixture round-trip tests in CI:** a corpus of representative pages asserted stable
  across md→HTML→normalize and HTML→BlockNote→HTML→normalize.

---

## Delete / rename semantics (recommended defaults)

- **Identity by `docId`, not path.** Frontmatter carries an immutable UUID (`id:`),
  generated once when a doc is first authored. Path/book/chapter changes are then
  unambiguous *moves*, not new pages.
- **Rename / move a file:** because identity is `docId`, a changed path with the same
  `docId` → Cascade **`move`** (preserves asset + history). A new `docId` → new page.
  (Git rename detection is a secondary signal; `docId` is authoritative.)
- **File removed from repo → orphan + unpublish, NOT hard delete** (default). The Action
  sets `origin`/status to archived and unpublishes the page (reversible). Hard delete is
  **opt-in** via `delete: true` in that file's frontmatter on its final commit (or a
  dedicated tombstone). Rationale: repo file removal is usually a refactor, not intent to
  destroy docs.
- **Image path rewriting:** relative markdown image paths (`./images/x.png`) upload to
  `docs/uploads/<book>/…` and `src` is rewritten to the published URL at publish time.

---

## Phased implementation plan

Ordering puts the **git path first** — it's the user's highest-frequency workflow *and*
the cheapest vertical slice (a Node script + a workflow, no UI, no auth). The web editor
reuses everything the git path builds (`cascade-client`, `doc-core`), so front-loading it
de-risks the shared core against a real Cascade instance before any UI exists.

- **Phase 0 — Foundations & Cascade wiring (enabling milestone).**
  Scaffold the monorepo. Build `cascade-client` (auth + read/create/edit/move/delete/
  publish + `assertInScope` + structured-data mappers) and prove each op against the live
  Cascade Cloud instance with a throwaway page. Complete the **Manual configuration
  steps** (service user, DD, content type, metadata set, factories, Formats, publish
  destination). *Exit:* a script creates, edits, and publishes a real docs page via REST.

- **Phase 1 — Vertical slice #1: git path (highest value).**
  `doc-core` (frontmatter, md→HTML, normalize, path-map) + `cascade-publish` orchestrator
  + `reusable-cascade-publish.yml` + one onboarded component repo. Create-or-update by
  `docId`, set placement/order/tags, publish page + regenerate/publish nav.json &
  search-index.json. *Exit:* `git push` a `.md` → page live on the static site, idempotent
  on re-push.

- **Phase 2 — Vertical slice #2: web editor read + edit.**
  Next.js static export on Pages, Cloudflare Access OTP gating, proxy `GET /api/tree`,
  `GET/PUT /api/page`. BlockNote editor round-tripping normalized HTML; save → publish →
  view; optimistic 409 handling; identity stamped from JWT. Reuses `cascade-client` +
  `doc-core`. *Exit:* an allow-listed editor signs in, edits an existing page, sees it live.

- **Phase 3 — Full editor CRUD & structure ops.**
  Create / move / delete endpoints; react-arborist drag-reorder → `order`/`move`; inline
  rename; image upload to `uploads/`; the `origin` ownership guard between git & web.

- **Phase 4 — Derived artifacts & published-docs experience.**
  `runtime/` client (sidebar from nav.json, Cmd+K over search-index.json via cmdk+Fuse),
  tag index pages, BookStack-like theme/layout, nightly full-republish cron.

- **Phase 5 — Hardening & rollout.**
  Cascade REST retry/backoff + rate-limit handling, structured logging/observability,
  error surfaces, onboarding docs, org secret + repo allow-list finalization. *(Optional/
  deferred: expose `cascade-publish` as a local CLI — not a required deliverable.)*

---

## Manual configuration steps (do these by hand, in order)

**A. Cascade — service account & scope**
1. Create a dedicated Cascade **user** (e.g. `svc-docs-api`) and a **group/role** whose
   start-folder / abilities are restricted to the `docs/` subtree only (read/write/publish
   there; nothing else — **not** an admin key).
2. Generate that user's **API key**; store it (goes into Cloudflare + GitHub secrets).

**B. Cascade — content model**
3. Create the **Metadata Set** (`docId`, `origin`, `sourceRepoPath`, `editorName`,
   `authorEmail`).
4. Create the **Documentation Page data definition** (title, order, tags, body-wysiwyg).
5. Create the **Content Type** binding the DD + Metadata Set + the page-render Format.
6. Create **Asset Factories** for Documentation Page (and Folder) so create-via-API and
   any manual authoring share one shape.

**C. Cascade — rendering & publishing**
7. Create/assign the **Velocity Formats**: page render, nav (per-book Index Block),
   search-index.json (root Index Block), tags.json/tag pages. Create the **Index Blocks**
   they consume.
8. Configure the **publish destination** for the `docs/` subtree pointing at the existing
   static web server (path alongside the main site).
9. Set up the **nightly full `docs/` republish** (Cascade scheduled publish) as the
   derived-artifact backstop.

**D. GitHub**
10. Create the central **`docs-platform`** repo (monorepo + reusable workflow); tag a
    release (`v1`) for the `uses:` reference.
11. Add **`CASCADE_API_KEY` as an org-level Actions secret**, scoped to selected repos
    (recommended over per-repo). Add `CASCADE_BASE_URL`/site as an org variable.
12. Per consuming repo: add `docs/` + the ~8-line caller `publish-docs.yml`; ensure the
    repo is in the org secret's allow-list.

**E. Cloudflare**
13. Create the **Pages project** for `apps/editor` (static export build).
14. Add Function **secrets/vars**: `CASCADE_API_KEY`, `CASCADE_BASE_URL`, site name,
    Access `AUD`/team domain.
15. Create a **Cloudflare Access application** over the editor hostname; policy = **email
    OTP** with the **explicit allow-list** of emails; note the app **AUD** tag for JWT
    verification in the proxy.

**F. DNS / hostnames**
16. Editor app hostname (e.g. `docs-edit.college.edu` on Cloudflare, behind Access).
17. Published static docs hostname/path (served by the existing web server, e.g.
    `college.edu/docs/…`) — this is where Cascade publishes; not behind Access if docs are
    intended to be internally/publicly readable per policy.

**G. Anything else requiring console config**
18. GitHub environment/branch protection on `main` for `docs-platform` (protect the
    reusable workflow).
19. (If escalated later) Cloudflare KV namespace or Durable Object for advisory locks —
    only if optimistic concurrency proves insufficient.

---

## Risks & open questions (each with a recommended default)

| # | Risk / question | Recommended default |
|---|---|---|
| 1 | Derived-artifact fan-out on structural change | JSON artifacts (nav/search/tags) hydrated client-side → publish only page + 2–3 small assets; nightly full republish backstop |
| 2 | Cascade REST rate limits on bulk/nightly publish | Batch + exponential backoff in `cascade-client`; run full republish off-peak |
| 3 | BlockNote HTML fidelity loss | Constrained allowed-HTML schema + server-side normalize + raw-HTML passthrough block + CI round-trip fixtures |
| 4 | Git ⇄ web double-edit clobber | `origin` ownership stamp: git-owned pages read-only in editor; Action refuses web-owned pages without `takeover` |
| 5 | Rename/move ambiguity | Immutable `docId` UUID in frontmatter → path change = Cascade `move` |
| 6 | Repo file deletion intent | Orphan + unpublish by default; hard delete only via explicit `delete: true` |
| 7 | Cascade DD lacks integer type for `order` | Numeric text field, zero-padded on write; nav Format sorts numerically |
| 8 | Git-path human identity (no JWT) | Stamp `authorEmail` from git commit author; allow frontmatter override |
| 9 | Access OTP seat/allow-list scaling | Access free tier covers a small team; revisit domain-wide/groups if other departments join |
| 10 | Org secret exposure to many repos | Scope org secret to "selected repositories"; protect the reusable workflow via branch protection |
| 11 | Next.js on Cloudflare | Use `output: export` (static) — editor is client-heavy (BlockNote/arborist), no SSR needed; proxy is Pages Functions |

---

## Verification

- **Phase 0:** run the `cascade-client` smoke script → confirm a page is created, edited,
  and published to the static server via REST; confirm `assertInScope` rejects
  `../`/out-of-`docs/` paths (unit + live).
- **Phase 1 (git path):** push a markdown file in a test repo → watch the Action → confirm
  the page exists in Cascade with correct placement/order/tags → confirm the published
  static page renders → confirm `nav.json` + `search-index.json` updated. Re-push the same
  file → same page updated (idempotent). Rename the file (same `docId`) → page moves, not
  duplicated. Remove the file → page orphaned/unpublished, not destroyed.
- **Phase 2 (editor):** sign in as an allow-listed email via OTP (and confirm a
  non-listed email is denied). Load the tree, edit a page, save → verify published update
  and `editorName`/`authorEmail` stamped from the JWT. Force a conflict (edit same page in
  two tabs) → verify 409 + reload prompt.
- **Round-trip tests:** CI fixture corpus asserts stable HTML across md→HTML→normalize and
  HTML→BlockNote→HTML→normalize.
- **Derived artifacts:** after an edit, confirm nav/search/tags publish; confirm the
  nightly full republish job runs and reconciles.
