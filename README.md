# docs-platform (aka "wiki-macs")

> **Read this if you are a chat agent (e.g. Claude web) being asked to draft a prompt for Claude Code to execute inside this repo.** This file exists specifically so you have enough standalone context to write a good handoff prompt — you will not have access to this codebase yourself. See "Writing a prompt for Claude Code" at the bottom.

## What this is

A custom, BookStack-like documentation/wiki system built for a community college web team (McHenry County College), backed **entirely by Cascade CMS** — a real, existing enterprise web-CMS product the college already runs its public site on. There is deliberately **no database and no persistent app server**. Every wiki page is a Cascade CMS asset; publishing renders it to static HTML on the college's real web server, same as any other page on the public site.

The point of the project: give non-technical staff (and technical staff) a pleasant, wiki-like authoring experience — books → chapters → pages, tags, search, a table of contents — without standing up any new infrastructure or database, because Cascade CMS is the one platform the college already trusts, licenses, and hosts content on.

## The two write paths

Both paths converge on the same canonical storage: an HTML page body inside a Cascade CMS asset under a `docs/` subtree of the site.

1. **Git path (highest-frequency, most mature)** — contributors write a plain Markdown file with a YAML frontmatter header and push it to a git repo. A GitHub Actions workflow parses it, converts Markdown → HTML, and calls the Cascade REST API to create/update/publish the page (plus regenerate nav/search-index/tags). **This is almost certainly the path relevant to "author a new wiki page" requests** — see "Authoring a wiki page" below.
2. **Web editor path** — a browser-based rich-text editor (`apps/editor`, BlockNote-based) for people who don't want to touch git/Markdown, proxied through a Cloudflare Worker that holds the Cascade API key. Still writes to the exact same Cascade pages.

## Authoring a wiki page via the git path (the part that matters for content requests)

A page is one Markdown file with YAML frontmatter, placed under `docs/` (or `docs/` in whichever consuming repo is being written to — `docs-platform` itself is one such repo and can hold its own content). Schema (enforced by `packages/doc-core/src/frontmatter.ts`):

| field        | required | type              | notes                                                              |
|--------------|----------|-------------------|---------------------------------------------------------------------|
| `id`         | yes      | UUID v4 string    | Stable identity across renames/moves — generate a fresh random UUID |
| `title`      | yes      | string            | Page title                                                          |
| `book`       | yes      | string            | Top-level grouping (like a BookStack "book" / wiki space)           |
| `chapter`    | no       | string            | Optional grouping within a book                                     |
| `tags`       | no       | string[]          | Free-form tags, used by the reader's search                         |
| `order`      | no       | integer (default 500) | Sort position among siblings                                   |
| `slug`       | no       | string            | Explicit URL slug override; otherwise derived from `title`          |
| `takeover`   | no       | boolean (default false) | Allows this git write to overwrite a page currently owned by the web editor |
| `delete`     | no       | boolean (default false) | Hard-deletes on removal instead of the default orphan+unpublish |
| `authorEmail`| no       | string            | Overrides the git-commit-author default                             |

Body = normal Markdown below the `---` frontmatter fence. Example, `docs/hello-world.md`:

```markdown
---
id: 104c4747-8c22-476f-81d6-9738ee2cc566
title: Hello World
book: Docs Platform
chapter: Getting Started
tags: [smoke-test]
order: 100
---

## First live git-publish test

Body content in normal markdown...
```

So a request like *"write me a wiki page representing this governance audit template"* resolves concretely to: **create one (or more) Markdown files under `docs/` with correct frontmatter, whose body reproduces the requested template/SOP structure as Markdown headings/sections/tables/checklists**, ready for the user to commit and push (which triggers `.github/workflows/publish-docs.yml` → Cascade). Claude Code does not need to touch Cascade CMS internals, the editor, or any package code to fulfill this kind of request — it's a content-authoring task, not a platform-engineering task.

## Repo layout

```
docs/                    Wiki content itself (Markdown+frontmatter pages) — this is where new pages go
_cms/                    Cascade CMS platform artifacts: Velocity formats, Data Definitions, Block XML,
                          scraped Cascade product docs (_cms/docs), design specs (_cms/specs)
packages/
  doc-core/              Frontmatter parsing, Markdown→HTML normalization, slug/path-map logic
  cascade-client/        Cascade REST API client (read/create/edit/move/delete/publish primitives)
  cascade-publish/       Orchestrates a git diff → Cascade publish (manifest tracking, conflict resolution)
  doc-shell/             Framework-agnostic nav/search/ToC logic shared by the reader and editor UIs
  runtime/               Public reader's client-side JS (sidebar, breadcrumb, ⌘K search, ToC, theme)
apps/editor/             Next.js (static export) web editor SPA + Cloudflare Pages Function proxy
actions/publish/         The bundled GitHub Action (JS) that consuming repos actually call
.github/workflows/       ci.yml (this repo's own checks) + publish-docs.yml (this repo's OWN content
                          pipeline, calling reusable-cascade-publish.yml) — the template other repos copy
project-management/      Planning docs, phased implementation plans, test checklists
.claude/agents/          cascade-developer (default persona for this workspace) + component-designer
```

## Stack & settled decisions (do not relitigate without reason)

- **Cascade CMS Cloud** via its REST API (`/api/v1/`) is the sole backend/persistence layer — no database.
- **All-in Cloudflare** for the editor: static Next.js on Cloudflare Pages + a Pages Function/Worker as the sole trust boundary (holds the Cascade API key, verifies auth).
- **Auth** for the editor: Cloudflare Access with email OTP + an explicit allow-list (no Microsoft/IT-managed SSO).
- **GitHub org**: `mchenrycountycollege`; this repo is `mchenrycountycollege/docs-platform`, public, versioned `v1.x.y` with a floating `v1` tag other repos pin to.
- Any repo can *consume* the publish pipeline by adding its own `docs/` folder + a `.github/workflows/publish-docs.yml` like this repo's, plus repo-level secrets (`CASCADE_API_KEY`, `CASCADE_BASE_URL`, `CASCADE_SITE_NAME`, `CASCADE_DOC_CONTENT_TYPE_ID`, `CASCADE_NAV_CONTENT_TYPE_ID`).

## Current status (high level — see `project-management/` and git history for detail)

- Git-publish pipeline (packages `doc-core`, `cascade-client`, `cascade-publish`, `actions/publish`): **complete, live-verified**, in production use across two consuming repos.
- Public reader runtime (`packages/runtime`): **complete, live** — sidebar/nav, breadcrumb, search, ToC, theme toggle.
- Web editor (`apps/editor`): in progress (build phases E0–E4; core save/edit/delete/upload flows built as of mid-July 2026), being recast to visually match the public reader via a shared `packages/doc-shell` package.

## Working with Claude Code in this repo

This workspace's `CLAUDE.md` makes **cascade-developer** (`.claude/agents/cascade-developer.md`) the default persona for every session — a senior Cascade CMS developer, oriented around building Cascade components (Velocity formats, Data Definitions, Block XML) and this platform's own code. That persona is compatible with plain content-authoring requests (writing a Markdown wiki page) — it doesn't need to be overridden, just given a clear content spec.

### Writing a prompt for Claude Code

If you (another chat agent) are drafting a prompt for the user to paste into Claude Code in this repo, the highest-leverage thing you can specify is **the target Markdown document**, not the platform mechanics (Claude Code already knows those from this README/repo). Concretely, give it:

- **Book / chapter placement** — an existing book name to slot into, or a new one, plus optional chapter.
- **Title(s)** and, if this is a multi-page template (e.g. an audit checklist + an SOP + a template), how many separate pages vs. one page with sections.
- **Tags** if relevant to how this should be found later.
- **The structural skeleton to reproduce** — headings, subsections, tables, checklists, fill-in-the-blank placeholders — as close to verbatim as you can make it, since Claude Code will translate that structure fairly literally into Markdown. Say explicitly that placeholders/blanks the user will fill in later should be preserved as visible `[ ]` / `TODO` / bracketed placeholders in the body, not invented content.
- Whether it should just **write the file(s) to `docs/`** and stop (recommended default — the user reviews and commits/pushes themselves) versus also committing/pushing (a git action Claude Code will otherwise ask before doing).

Do not re-explain Cascade CMS, the two write paths, or the frontmatter schema in your prompt — Claude Code already has all of that from this file. Focus your prompt entirely on the *content* to produce.
