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

- [ ] Navigate to **Manage Site > Configurations**, add a new Configuration
      named `docs-platform`
- [ ] Add one output, e.g. **Name:** `HTML`, **Default Output:** yes,
      **Type of Data:** HTML, **File Extension:** `.html`
- [ ] **Template:** pick whichever existing site Template supplies your
      normal header/footer chrome and a single main-content region — *you'll
      need to choose this one yourself*, since which Template is "the" site
      shell isn't something this checklist can infer. If none fits, a new
      minimal Template with one `default` region is the fallback.
- [ ] In the output's **Regions** section, assign
      [`page-render.vm`](page-render.vm) (Phase 6) as the Format on the
      template's main content region. Leave the Block assignment empty —
      this Format reads directly from `$currentPage`'s Documentation Page
      structured data, no Block needed.
- [ ] Submit

### Phase 4: Content Type (Documentation Page)

- [ ] Navigate to **Manage Site > Content Types**, add a new Content Type
      named `Documentation Page`
- [ ] **Settings tab:** Configuration = `docs-platform` (Phase 3), Metadata
      Set = `docs-platform-metadata` (Phase 2), Type of Content = Data
      Definition = `documentation-page` (Phase 1)
- [ ] **Publish Options tab:** enable the Destination created in Phase 8
- [ ] Submit, then open it again and **copy its asset id** (visible in the
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

For each of the three rows below: create a Configuration (one output, Type
of Data = JSON, File Extension = `.json`, same Template consideration as
Phase 3 or a bare minimal one) with that Format assigned to the main
region, then a Content Type using that Configuration, Metadata Set = same
`docs-platform-metadata` from Phase 2 (or **None** — these pages don't use
`docId`/`origin`, so either works), Type of Content = WYSIWYG:

| Content Type name | Configuration | Format |
|---|---|---|
| `Nav Output` | `docs-platform-nav-output` | `nav-format` (Phase 6) |
| `Search Index Output` | `docs-platform-search-index-output` | `search-index-format` (Phase 6) |
| `Tags Output` | `docs-platform-tags-output` | `tags-format` (Phase 6) |

- [ ] Create `Nav Output` Content Type + Configuration per the table
- [ ] Copy `Nav Output`'s asset id — this is `CASCADE_NAV_CONTENT_TYPE_ID`,
      consumed by `ensureBookNavPage()` in `packages/cascade-client`
- [ ] Create `Search Index Output` Content Type + Configuration per the
      table
- [ ] Create `Tags Output` Content Type + Configuration per the table

### Phase 6: Formats

Create each as **Add Content > Default > Format > Velocity**, paste the
matching file, **Test Format** against a placeholder asset, then Submit.

- [ ] `_cms/formats/docs-platform/_shared` — paste [`_shared.vm`](_shared.vm)
      (macros only; not assigned to any region directly)
- [ ] `_cms/formats/docs-platform/page-render` — paste
      [`page-render.vm`](page-render.vm) (assigned in Phase 3)
- [ ] `_cms/formats/docs-platform/nav-format` — paste
      [`nav-format.vm`](nav-format.vm) (assigned in Phase 5's Nav Output
      Configuration)
- [ ] `_cms/formats/docs-platform/search-index-format` — paste
      [`search-index-format.vm`](search-index-format.vm) (Phase 5)
- [ ] `_cms/formats/docs-platform/tags-format` — paste
      [`tags-format.vm`](tags-format.vm) (Phase 5)
- [ ] **If any Format's actual asset path differs from
      `/_cms/formats/docs-platform/...`**, update the `#import(...)` path at
      the top of `nav-format.vm`, `search-index-format.vm`, and
      `tags-format.vm` to match.

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
