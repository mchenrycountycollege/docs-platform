# Cascade Implementation Checklist — docs-platform Phase 0

Covers the "Manual configuration steps" (A–C) from
`project-management/implementation-plan.md` that block the live smoke test.
Code deliverables referenced below live in this same folder
(`_cms/specs/docs-platform/`).

**What has real, paste-ready code vs. what is UI-only:** Data Definitions and
Formats support pasting complete XML/Velocity directly into Cascade — those
are provided as files below. Metadata Sets, Content Types, Asset Factories,
Configurations, and Destinations have **no XML import path** in Cascade
(confirmed against `_cms/docs/general/metadata-sets-*.md`,
`content-types-*.md`, and `_cms/docs/asset-factory/*.md`, `general/
configurations-*.md`, `general/destinations-*.md`) — they're click-through
wizards. For those, every field value you need to enter is spelled out below
so there's no ambiguity left to resolve in the UI.

**No Index Blocks:** the three JSON Formats (nav/search-index/tags) use the
Query API (`$_.query()...`) instead of Index Blocks, per current Hannon Hill
guidance to prefer Query API for this kind of listing.

**Onboarding a new book is fully automatic, not a manual step.** The REST
`create` call identifies Content Type by internal id and a Content Type's
Configuration pins exactly one Format per region (confirmed against
`_cms/docs/api/operations-*.md`'s create example, which includes
`contentTypeId`). So instead of hand-creating one Index Block + page per
book, there's a dedicated **Nav Output** Content Type (below) wired to
`nav-format.vm`, and `packages/cascade-client`'s `ensureBookNavPage()`
creates a book's nav container page via that Content Type the first time a
page in that book is published — no console work involved. This was the
one piece of the original design that would have required a recurring
manual step, so it's built into the client rather than left as a checklist
item.

---

### Phase 1: Data Definition

- [ ] Navigate to **Manage Site > Data Definitions**
- [ ] Add a new Data Definition named `documentation-page`
- [ ] Paste the XML from [`data-definition.xml`](data-definition.xml)
- [ ] Submit and verify the form renders: Title (text), Sort order (text,
      default `000500`), Tags (repeatable text), Body (WYSIWYG)
- [ ] Create the `docs-platform-body` WYSIWYG Editor Configuration (Manage
      Site > WYSIWYG Editor Configurations > Create) constraining the Body
      field's toolbar to the allowed-HTML subset — Schema: Custom, Valid
      Elements: `h2,h3,h4,p,strong,em,ul,ol,li,table,thead,tbody,tr,th,td,
      pre,code,img[src|alt|width|height],a[href|title|target],blockquote`,
      Source Code button disabled (otherwise it bypasses every other
      restriction), Allow style attributes off. The DD XML above already
      sets `configuration="docs-platform-body"` on the `body` field, so this
      just needs to exist under that exact name.

### Phase 2: Metadata Set

- [ ] Navigate to **Manage Site > Metadata Sets > Add > Metadata Set**
- [ ] Name: `docs-platform-metadata`
- [ ] **Built-in Fields tab:** set every standard field (Display Name,
      Title, Summary, Teaser, Keywords, Description, Author, Review Date,
      Start Date, End Date, Expiration Folder) to **Hidden** — the DD's
      `title`/`tags` fields are the ones actually used; keeping both visible
      invites confusion about which "title" is authoritative.
- [ ] **Custom Fields tab** — add these five **Text** fields exactly (names
      are read verbatim by `packages/cascade-client/src/structured-data.ts`
      `toMetadata`/`fromMetadata`, so they must match):
  | Name | Field Label | Required |
  |---|---|---|
  | `docId` | Document ID | Yes |
  | `origin` | Origin | Yes |
  | `sourceRepoPath` | Source Repo Path | No |
  | `editorName` | Editor Name | No |
  | `authorEmail` | Author Email | No |
- [ ] Submit

### Phase 3: Configuration (Documentation Page)

**Live-verified bug (2026-07-07): before doing anything else here, know that
without a real Template assigned, Cascade does not omit the wrapper — it
publishes the literal text `<system-region name="DEFAULT">...</system-region>`
around the region's actual output.** This was confirmed by curling the live
`hello-world.html` and `_system/nav/docs-platform.json` — both showed this
literal wrapper text, meaning neither the page nor the JSON artifacts were
valid output. The steps below (and the passthrough Template added to Phase 5)
fix this.

- [x] Navigate to **Manage Site > Configurations**, add a new Configuration
      named `docs-platform`
- [x] Add one output, e.g. **Name:** `HTML`, **Default Output:** yes,
      **Type of Data:** HTML, **File Extension:** `.html`
- [x] **Template:** create a new Template named `docs-platform-page`, paste
      the content of
      [`docs-platform-page-template.html`](docs-platform-page-template.html)
      into its code editor (Add Content > Default > Template, then use the
      code editor rather than uploading a file). This is the full page shell
      — the BookStack-style chrome (topbar, sidebar mount, search overlay),
      inlined CSS, and a `<script src="/docs/_system/docs-runtime.js">` tag
      pulling in the bundled `packages/runtime` JS (see Phase 6b, pushed as
      a separate File asset — don't paste the bundle into this Template) all
      live here; `page-render.vm` only fills the `DEFAULT` region.
      - The `<title>MCC Docs</title>` in the `<head>` is a static fallback,
        not per-page — the runtime JS sets `document.title` from the real DD
        title at load time (see `packages/runtime/src/index.ts`'s comment
        for why `<system-page-title/>` doesn't work here: the built-in
        Cascade Title metadata field is deliberately left unset per Phase 2
        above, so that system tag would render blank).
- [x] In the output's **Regions** section, assign
      [`page-render.vm`](page-render.vm) (Phase 6) as the Format on the
      `DEFAULT` region. Leave the Block assignment empty — this Format reads
      directly from `$currentPage`'s Documentation Page structured data, no
      Block needed.
- [x] Submit

### Phase 4: Content Type (Documentation Page)

- [x] Navigate to **Manage Site > Content Types**, add a new Content Type
      named `Documentation Page`
- [x] **Settings tab:** Configuration = `docs-platform` (Phase 3), Metadata
      Set = `docs-platform-metadata` (Phase 2), Type of Content = Data
      Definition = `documentation-page` (Phase 1)
- [x] **Publish Options tab:** enable the Destination created in Phase 8
- [x] Submit, then open it again and **copy its asset id** (visible in the
      URL or via **More > Properties**) — this is `CASCADE_DOC_CONTENT_TYPE_ID`
      in `.env` / the GitHub Action's secrets. The REST API identifies
      Content Type by id, not name, so there's no way to skip this.

### Phase 5: System artifact Content Types (nav/search-index/tags)

Each of the three derived JSON artifacts gets its own minimal Content Type,
so that creating a page of that Content Type automatically gets the right
Format applied — no page-level Format override needed (and none is exposed
via the REST API anyway, per `_cms/docs/api/*`). All three are **Type of
Content: WYSIWYG** (they carry no real content; all output comes from
`$_.query()` in the Format, not from the page body).

- [x] Create a Template named `docs-platform-json-passthrough`, content is
      *exactly* the single line in
      [`docs-platform-json-passthrough-template.html`](docs-platform-json-passthrough-template.html)
      — no `<html>`/`<head>`/`<body>`, nothing else, since anything extra
      becomes part of the "JSON" these Configurations publish. If Cascade's
      Template editor refuses a document with no `<html>` root when you
      submit, fall back to the smallest wrapper it will accept and confirm
      with Phase 10's curl check that no visible tag text leaks into the
      published `.json` output either way.

For each of the three rows below: create a Configuration (one output, Type
of Data = JSON, File Extension = `.json`, **Template = `docs-platform-json-
passthrough`, just created above** — this is what's missing today and is
why the live JSON artifacts currently publish with literal `<system-region>`
wrapper text instead of valid JSON) with that Format assigned to the
`DEFAULT` region, then a Content Type using that Configuration, Metadata Set
= same `docs-platform-metadata` from Phase 2 (or **None** — these pages
don't use `docId`/`origin`, so either works), Type of Content = WYSIWYG:

| Content Type name | Configuration | Format |
|---|---|---|
| `Nav Output` | `docs-platform-nav-output` | `nav-format` (Phase 6) |
| `Search Index Output` | `docs-platform-search-index-output` | `search-index-format` (Phase 6) |
| `Tags Output` | `docs-platform-tags-output` | `tags-format` (Phase 6) |

- [x] Create `Nav Output` Content Type + Configuration per the table
- [x] Copy `Nav Output`'s asset id — this is `CASCADE_NAV_CONTENT_TYPE_ID`,
      consumed by `ensureBookNavPage()` in `packages/cascade-client`
- [x] Create `Search Index Output` Content Type + Configuration per the
      table
- [x] Create `Tags Output` Content Type + Configuration per the table
- [x] If any of these three Configurations already existed with a Template
      unset (true today on the live instance — see Phase 3's note), edit it
      now to assign `docs-platform-json-passthrough` and republish its page
      (Phase 7) to confirm the wrapper text is gone.
      **Root cause found and fixed 2026-07-13: the `<system-region>` wrapper
      leak was never a Template problem. Cascade's HTML-aware output
      serializer was trying to tidy/parse each Format's raw JSON as if it
      were HTML; since JSON isn't valid markup, it fell back to emitting the
      literal `<system-region name="DEFAULT">...</system-region>` wrapper
      (or, once the passthrough Template's self-closing tag was swapped for
      an open/close pair, to empty output instead). Neither the Template's
      exact `<system-region>` syntax nor the self-closing-vs-open/close form
      was the issue — confirmed by a working pattern from another app in
      this same Cascade environment, which wraps its Format's JSON output in
      `<!--#protect-top ... #protect-top-->`. That directive tells Cascade
      to emit the enclosed block verbatim, skipping HTML tidy entirely. Added
      the same wrapper around the final `$_SerializerTool.toJson(...)` call
      in `nav-format.vm`, `search-index-format.vm`, and
      `tags-format.vm` (Phase 6) — after pasting the updated Formats into
      Cascade and republishing, all three endpoints
      (`nav/docs-platform.json`, `search-index.json`, `tags.json`) now
      return valid, unwrapped JSON, live-verified via curl +
      `python3 -m json.tool`. The `docs-platform-json-passthrough` Template
      itself can stay as either form of `<system-region name="DEFAULT"/>` —
      it was never the actual fix.**
- [x] **Separately fixed and live-verified 2026-07-13: the Nav Output
      Configuration's Format was not actually assigned to the DEFAULT
      region** — before the fix, `nav/<book>.json` published the raw
      placeholder body (`<div></div>`) instead of running `nav-format.vm`,
      with no `<system-region>` wrapper leak (meaning its Template *was*
      correctly wired, unlike the other two above). After the user
      reassigned the Format, a republish showed the real folder/page JSON
      from `nav-format.vm`.

### Phase 6: Formats

Create each as **Add Content > Default > Format > Velocity**, paste the
matching file, **Test Format** against a placeholder asset, then Submit.

- [x] `_cms/formats/docs-platform/_shared` — paste [`_shared.vm`](_shared.vm)
      (macros only; not assigned to any region directly)
- [x] `_cms/formats/docs-platform/page-render` — paste
      [`page-render.vm`](page-render.vm) (assigned in Phase 3)
- [x] `_cms/formats/docs-platform/nav-format` — paste
      [`nav-format.vm`](nav-format.vm) (assigned in Phase 5's Nav Output
      Configuration). **Wraps its final `$_SerializerTool.toJson(...)` call
      in `<!--#protect-top ... #protect-top-->` — see Phase 5's note.**
- [x] `_cms/formats/docs-platform/search-index-format` — paste
      [`search-index-format.vm`](search-index-format.vm) (Phase 5). **Same
      `#protect-top` wrapper as nav-format.**
- [x] `_cms/formats/docs-platform/tags-format` — paste
      [`tags-format.vm`](tags-format.vm) (Phase 5). **Same `#protect-top`
      wrapper as nav-format.**
- [ ] **If any Format's actual asset path differs from
      `/_cms/formats/docs-platform/...`**, update the `#import(...)` path at
      the top of `nav-format.vm`, `search-index-format.vm`, and
      `tags-format.vm` to match.

### Phase 6b: Runtime build (sidebar hydration + Cmd+K search)

`packages/runtime` is the client JS that hydrates `#docs-sidebar` from
`_system/nav/<book>.json`, builds the breadcrumb, and runs the search
modal over `_system/search-index.json`. It ships as an **external File
asset** at `docs/_system/docs-runtime.js`, referenced from the
`docs-platform-page` Template via a static
`<script src="/docs/_system/docs-runtime.js"></script>` (Phase 3).

It used to ship inlined in the Template's `<script>` block instead — that
was abandoned after a live incident where hand-pasting the minified bundle
into Cascade's Template editor silently decoded its ASCII `\uXXXX` escapes
(Fuse.js's diacritics table) into raw UTF-8 bytes on save, which then
rendered as literal `?` characters once served (the page's
`content-type: text/html` has no charset param). `cascade-client` now has
File-asset support (`createFile`/`editFile`/`readFile`/`upsertFile` in
`assets.ts`) specifically so the bundle can be pushed as bytes over the
REST API instead of pasted through a UI text field.

- [x] `pnpm --filter @docs-platform/runtime typecheck && pnpm --filter
      @docs-platform/runtime test`
- [x] `pnpm --filter @docs-platform/runtime build` — produces
      `packages/runtime/dist/docs-runtime.js`
- [x] `pnpm --filter @docs-platform/cascade-client push:runtime` (needs the
      same `CASCADE_*` env as the Phase 0 smoke test) — upserts + publishes
      that file to `docs/_system/docs-runtime.js` via `upsertFile()`
- [ ] **Repeat the build + push whenever anything in `packages/runtime/src`
      changes** — unlike the Formats (edited directly as `.vm` source), the
      runtime has a build step between source and what's live. The Template
      itself only needs editing/resubmitting once, to add the `<script src>`
      tag — it doesn't change again as the runtime evolves.
- [x] The File asset's REST create/edit payload shape (`assets.ts`'s
      `readFile`/`createFile`/`editFile`) is unverified against a live
      instance — the only source is a one-line note in the Cascade docs that
      File assets use a byte-array format over REST (vs. base64 over SOAP).
      Run `push:runtime` once against a real instance and fix the field
      name/shape in `assets.ts` if the call fails.
      **Verified 2026-07-13: `upsertFile`/`readFile` round-tripped the
      33020-byte bundle byte-for-byte on the live instance
      (`DEV-Sean`/`docs/_system/docs-runtime.js`, asset id
      `5c463287ac1e006c28e5e49e85999ce3`) — no shape fix needed.**

### Phase 7: One-time search-index.json / tags.json pages

Unlike nav (one per book, created automatically — see the note at the top),
these two are single global artifacts, created once by hand:

- [ ] Create page `docs/_system/search-index.json`, Content Type =
      `Search Index Output` (Phase 5)
- [ ] Create page `docs/_system/tags.json`, Content Type = `Tags Output`
      (Phase 5)
- [ ] Publish both once to confirm they render valid JSON before wiring up
      the live smoke test

### Phase 8: Destination

- [ ] Navigate to **Manage Site > Destinations > Add > Destination**
- [ ] Name: `docs-platform`
- [ ] Transport: the existing Transport your main site already publishes
      through (reuse it — don't create a new server connection)
- [ ] Directory: whatever subpath places output alongside the existing site,
      e.g. `docs` if the Transport's own directory is the web root
- [ ] Applicable Groups: the service account's group only (Phase 9, below)
- [ ] **Scheduled Publishing tab:** set up the nightly full-`docs/`
      republish backstop from the plan (derived-artifact reconciliation)
- [ ] Submit, then **More > Test Connectivity** to confirm the Transport is
      reachable before wiring up the live smoke test
- [ ] Enable this Destination in the **Publish Options** tab of all four
      Content Types (Documentation Page from Phase 4, and the three system
      artifact Content Types from Phase 5) — easy to miss one and wonder
      later why a book's nav.json never publishes

### Phase 9: Service account & Role (the actual `docs/`-only scoping)

This is the real security boundary — Content Types control what *shape* of
content gets created, but **read/write access** to specific paths is
Access Rights, separate from all of the above.

- [ ] Create a new Cascade **user** `svc-docs-api` (not tied to a human)
- [ ] Create a new **group** `docs-platform-service`, add `svc-docs-api` to it
- [ ] Create a new **Site Role** `docs-platform-api` with only:
      Access the Manage Site Area = **off**, **Bypass workflow = on**
      (confirmed against a live instance: Cascade requires the *role* to
      have this ability for unattended `create`/`edit` to succeed at all —
      without it every write fails with "Your role requires that you
      specify a WorkflowConfiguration for this operation", regardless of
      whether any Workflow Definition is actually assigned to `docs/`),
      Move or Rename assets = **on**, Publish readable Home area
      assets = **on**, Publish writeable Home area assets = **on**, View
      the publish queue = **on**
- [ ] Assign the `docs-platform-api` Site Role to the `docs-platform-service`
      group for this site
- [ ] On the `docs/` folder itself (not the site root): **Edit Access
      Rights**, add the `docs-platform-service` group with **Read + Write**
      access, recursive to all children. Do **not** grant this group any
      access above `docs/`.
- [ ] Generate the API key for `svc-docs-api`; store it as `CASCADE_API_KEY`
      (goes into GitHub org secret + Cloudflare Function secret per the
      plan's Manual steps D/E — out of scope for this checklist)

### Phase 10: Verification (Phase 0 exit criterion)

- [ ] `CASCADE_BASE_URL=... CASCADE_API_KEY=... CASCADE_SITE_NAME=...
      CASCADE_DOC_CONTENT_TYPE_ID=... CASCADE_NAV_CONTENT_TYPE_ID=...
      pnpm --filter @docs-platform/cascade-client smoke` from the
      docs-platform repo — creates, edits, and publishes a throwaway
      Documentation Page under `docs/_smoke-test/`; calls
      `ensureBookNavPage()` twice to confirm it creates the per-book nav
      container page and is a no-op the second time; then hard-deletes both
- [ ] Confirm the page rendered via `page-render.vm` looks right (sidebar
      mount point present, body HTML intact, tags list correct)
- [ ] Manually create one real book/chapter/page structure, publish, and
      confirm `_system/nav/<book>.json` (auto-created by the smoke test /
      future `cascade-publish` calls to `ensureBookNavPage`),
      `_system/search-index.json`, and `_system/tags.json` all render
      valid, non-empty JSON
- [ ] Confirm a page NOT carrying the `docs-platform-service` group's write
      access (i.e. try from a non-scoped account) cannot write outside
      `docs/` — sanity-checks that Access Rights are actually scoped, not
      just `assertInScope()` in application code

### Phase 11: Viewer verification (this round's work — Templates + runtime)

- [x] `curl https://<publish-host>/docs/_system/nav/docs-platform.json` and
      the `search-index.json`/`tags.json` equivalents — confirm valid JSON
      (`| python3 -m json.tool` or similar), no `<system-region>` wrapper
      text. **Verified 2026-07-13 after the Phase 5/6 `#protect-top` Format
      fix — all three return valid JSON.**
- [ ] `curl https://<publish-host>/docs/docs-platform/getting-started/
      hello-world.html` — confirm a real `<!DOCTYPE html><html>...<head>`
      with the inlined `<style>`/`<script>` present, not bare region markup.
- [ ] Open the live URL in a browser: sidebar hydrates from the real
      `nav.json` and highlights `Hello World` as active; breadcrumb shows
      "Docs Platform / Getting Started / Hello World"; ⌘K (or Ctrl+K) opens
      the search modal and filters over the real `search-index.json`;
      clicking/Enter on a result navigates there; theme toggle persists
      across reload; narrowing the viewport collapses the sidebar to an
      off-canvas drawer behind the menu button.
- [ ] Add a second heading to a test page's body and republish — confirm
      the "On this page" box appears with a working anchor link, and stays
      hidden on pages with only one or zero `h2`s (`hello-world` today).
