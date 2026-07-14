# Seed content brief (hand this to an agent)

Push a batch of dummy markdown files through the **git path** (the mature,
already-verified pipeline — do not use the web editor to seed, that's what
we're about to test) to `mchenrycountycollege/docs-platform` (or another
onboarded consumer repo), under `docs/`, so there's realistic content to click
around in once the web editor is live.

Each file needs YAML frontmatter matching `packages/doc-core/src/frontmatter.ts`:
`id` (a real random UUID v4 — required), `title`, `book`, `chapter` (optional),
`tags` (array of strings, optional), `order` (integer, optional, default 500).
Body is normal markdown below the `---` fence. See `docs/hello-world.md` in
this repo for a working example.

Create:
- **2 books**, one with 2+ nested chapters and several pages per chapter
  (varying `order` so sort is visibly exercised), one flat book with a single
  page and no `chapter` field at all.
- A **long page** (10+ headings) to exercise the ToC and scroll behavior.
- **Two pages with near-duplicate titles** (e.g. "Setting up VPN" and "Setting
  up VPN access") to exercise search ranking/distinction.
- One page with **unicode/special characters** in the title (e.g. accents,
  an emoji, a slash-like character) to exercise slug generation.
- A handful of **shared and distinct tags** across pages so tag-based search
  has something real to filter.
- At least one page **referencing an existing image** under `docs/uploads/...`
  so image rendering can be sanity-checked against what the editor's own
  image upload (E3) produces later.

Push everything as a single PR (or a couple of commits) through the real
reusable workflow, then confirm via a live Cascade read (or just the
published site) that nav/search-index/tags all regenerated correctly before
declaring the seed done.
