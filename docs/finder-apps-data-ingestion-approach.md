---
id: c7843411-a121-4b8a-9179-f6d3d93c390c
title: Student finder apps — data ingestion & normalization approach
book: Student Finder Apps
tags: [finder-apps, architecture, etl, data-pipeline, cascade]
---

## Purpose

This doc captures the intended architecture for a family of lightweight
"finder" apps (student-facing search/browse UIs over a modest dataset —
roughly hundreds of rows, not thousands). It's written after concluding that
a Directus-style custom admin/CRUD tool is overkill for this scale and this
editor headcount (one). The real recurring problem across these apps isn't
"a nice UI to edit rows" — it's normalizing a handful of messy, disparate
source formats into one clean shape per app. This doc is the reference
approach for that problem, so it doesn't get re-litigated for every new
finder app.

Currently in scope: **Transfer Guide Finder** and **Non-Credit Course
Finder**. Written generally so future finder apps can reuse the same
pattern.

## Why not a custom admin panel

Considered and rejected for v1. Reasoning:

- At this row count and with a single editor, Cascade's native
  Data-Definition-driven forms editor already is an adequate admin UI —
  building a parallel one duplicates it.
- A truly static, serverless custom admin can't safely hold Cascade REST
  credentials in the browser; a real one would need a credentialed backend
  (e.g. a Cloudflare Worker broker), which reintroduces the hosting cost and
  complexity this whole approach is trying to avoid.
- The actual pain point isn't editing individual rows — it's turning messy
  source data (PDFs, a third-party REST API, CSV exports) into something
  clean in the first place. A CRUD UI doesn't solve that; an ingestion
  pipeline does.

Revisit only if Cascade's editor genuinely becomes unworkable for a
specific dataset — and even then, prefer a small targeted tool over a
general admin.

## The core pattern

For each finder app:

```
source adapter(s) → canonical schema (per app) → validate → git diff/review → publish
```

- **Canonical schema** — one normalized record shape per app, independent
  of where the data came from. Defined once, designed carefully; this is
  the contract everything else adapts into.
- **Source adapters** — one small, disposable transform per source type
  that maps raw input into the canonical schema. Adapters are cheap to
  replace; the schema is not.
- **Validate** — a lightweight script checking required fields, parseable
  dates, no duplicate IDs, etc. This is the stand-in for GUI form
  validation, without building a GUI.
- **Review via git diff** — normalized records are stored as versioned
  JSON/YAML files in git (same spirit as this repo's docs content). Re-run
  an adapter, see exactly which records changed in the diff, merge when it
  looks right. No custom review UI needed.
- **Publish** — either push normalized records into Cascade as content via
  `packages/cascade-client` (same path this repo already uses for git-based
  publishing), or — simpler, and preferred unless there's a reason to want
  these records individually browsable/editable inside Cascade itself —
  publish the normalized JSON straight as a Cascade asset for the finder UI
  to fetch and search client-side.

## Handling the specific source types seen so far

- **PDFs with irregular formatting** (e.g. ~100 transfer guides authored by
  different people over time): don't hand-write per-format parsers. Feed
  extracted PDF text to an LLM with a strict output schema/tool definition
  matching the canonical schema, and let it absorb the formatting variance.
  Spot-check the output, not the source PDFs.
- **Third-party REST API** (e.g. Modern Campus Acalog, for guides that
  happen to live there instead of as PDFs): a straightforward deterministic
  field-mapping adapter, no LLM needed.
- **CSV exports with many irrelevant columns** (e.g. non-credit course
  list): a straightforward column-select/rename adapter that keeps only
  what a given finder's UX needs and drops the rest.

All three converge on the same canonical shape for their app, so the finder
frontend never has to know or care which source a given record came from.

## Frontend / delivery

Out of scope for this doc's ingestion focus, but the paired decision: each
finder is a static asset (HTML/JS) that fetches the published JSON and does
client-side faceted search — no server, no runtime hosting cost. This holds
comfortably at the dataset sizes in play here (~500 rows total across
apps). See the two app-specific docs (once written) for facet/UX design per
app.

## Cadence

Sources here don't change continuously — a term, a semester, whenever
someone updates a CSV. Prefer a manually-triggered regeneration (local
script, or a `workflow_dispatch` GitHub Action mirroring the existing
publish workflow under `actions/publish`) that regenerates normalized data
and opens a PR for review, over any kind of scheduled/continuous sync.
Re-evaluate only if a source starts changing often enough that manual
triggering becomes a bottleneck.

## Reusability for future finder apps

The reusable asset is the *pattern*, not a shared codebase written up
front: canonical schema + adapter(s) + validate + git review + publish.
Each new finder app should mean writing a new schema and new adapter(s),
not new infrastructure. Extract shared tooling (e.g. a common validation
helper, a common Cascade-asset publish step) opportunistically once a
second or third app makes the duplication obvious — not speculatively now.

## Open items (fill in per app)

| App | Canonical schema defined? | Sources | Adapters written? | Publish target |
|---|---|---|---|---|
| Transfer Guide Finder | [ ] | PDFs + Acalog REST | [ ] | [ TODO ] |
| Non-Credit Course Finder | [ ] | CSV | [ ] | [ TODO ] |
