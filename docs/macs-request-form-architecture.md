---
id: aa2ce01f-962c-4516-a349-24c5c36a9833
title: MACS Request Form — Architecture & Maintenance
book: Custom Software Projects
chapter: MACS Request Form
tags: [macs, wufoo, asana, cloudflare-worker, secrets, architecture]
order: 100
---

The MACS Request Form is the intake wizard the Marketing and Creative Services team (still internally called OMPR in a few places) uses to collect project requests. It's a hand-built, multi-step HTML/JS wizard — not Wufoo's own embed — that submits through a Cloudflare Worker to two downstream systems: Wufoo (system of record / reporting) and Asana (task creation for the MACS team). This page explains how the pieces fit together, where the secrets live, and what to do when something breaks — written after a Wufoo API key rotation quietly broke submissions because nobody remembered this project depended on it.

Source files referenced below live outside this wiki repo, under `projects-to-document/macs-request-form/` in this checkout — that's a working copy for documentation purposes, not the live deployment. The live deployment is the Cloudflare Worker itself plus whatever HTML is currently pasted into the Cascade page.

## Architecture at a glance

```
Browser (public site, Cascade-hosted page)
  └─ MACS-form-cascade.html  — 5-step wizard, plain JS, no framework
       │  POST multipart/form-data
       ▼
Cloudflare Worker "macs-form-proxy"  (mcc-ompr.workers.dev, account "Mcc.ompr@gmail.com's Account")
       │                                   │
       │ forwards submission                │ creates task directly (pruned fields only)
       ▼                                   ▼
Wufoo REST API                        Asana API
(system of record / reporting)        (MACS team's task queue)
```

The Worker is the only piece with credentials. The browser never talks to Wufoo or Asana directly — it only ever POSTs to the Worker's `workers.dev` URL, and the Worker fans that single submission out to both downstream systems. Wufoo's own native Asana integration is **not** used; the Worker calls the Asana API directly so it can send only the handful of non-empty custom fields instead of all 28 (see "Why Asana is called directly" below).

## Component inventory

| File | Role |
|---|---|
| `MACS-form-cascade.html` | **The production snippet.** This exact markup is what's pasted into the Cascade CMS page/block that renders the live form on the public site. Note the `<style>/*<![CDATA[*/ ... /*]]>*/</style>` wrapping — that's required because Cascade renders page output as XHTML, and raw `<`/`>`/`&` in a `<style>` block otherwise fails Cascade's parser. |
| `MACS-form-v3.html` | A full standalone `<html>` document containing the same wizard, used for local development. **Not what's live** — when the wizard's markup, CSS, or JS changes, the change has to be made in both files (or made in `v3` and manually re-wrapped into the CDATA form for `-cascade`), since there's no build step that generates one from the other. |
| `test-harness.html` | Loads `MACS-form-cascade.html`'s actual CSS/JS files inside a page that mimics the real Cascade host page (same Foundation/app.css/custom-styles.css), so CSS bleed and JS conflicts with the host page can be caught before pasting into Cascade. Must be served over HTTP (`python3 -m http.server`), not opened via `file://`, because it calls `fetch()` against the real Worker endpoint. |
| `worker.js` | The Cloudflare Worker source — all server-side logic: forwarding to Wufoo, direct Asana task creation, signed "view your submission" links, CORS. |
| `wrangler.toml` | Worker deployment config: Worker name (`macs-form-proxy`), the `ASANA_CACHE` KV namespace binding. Deliberately does **not** contain any secret values. |
| `mapping-step/wufoo-field-mapping.md` | The *original* field-ID mapping from when the wizard was first wired to Wufoo. **Now stale** — see "Field ID drift" below before trusting it for current field numbers. |
| `project-management/backlog.md` | Open feature/hardening requests (upload limits, input validation, a "contact us" footer). Check here before assuming a rough edge is a bug rather than a known gap. |

## Request flow, step by step

1. The visitor fills out the 5-step wizard on the public page. Step 3's fields are swapped dynamically based on the Step 2 "This project is…" dropdown (`new` / `update` / `website` / `business` / `promo`), and Step 5 is a client-built review screen before submit.
2. On submit, the browser POSTs `multipart/form-data` straight to the Worker's `workers.dev` URL (`form.action` in the HTML — see `MACS-form-cascade.html`/`MACS-form-v3.html` around the `<form>` tag). This is a cross-origin request from the college's public domain to `*.workers.dev`, which is why the Worker sends permissive CORS headers (`Access-Control-Allow-Origin: *`) — it has no other way to identify the caller as legitimate, so it isn't relying on origin-checking for security at all.
3. The Worker strips fields Wufoo doesn't understand (`idstamp`, `currentPage`, the wizard's internal `Field50` source tag, a couple of retired field IDs, and `_viewData`), normalizes the website-URL field to always carry a `https://` prefix, and re-encodes the body — URL-encoded for text-only submissions, multipart only when a real file is attached (Wufoo silently drops all but the first file if multiple parts share a field name, so each upload gets routed to its own dedicated file field ID).
4. The Worker calls the Wufoo REST API (`entries.json`) using HTTP Basic Auth: username = the API key, password = the literal string `footastic` (a Wufoo-specific convention, not a placeholder to change).
5. **Independently**, and without blocking the response on Wufoo, the Worker also calls the Asana API directly to create a task — resolving custom field GIDs by name (not hardcoded), caching that field-name→GID map in the `ASANA_CACHE` KV namespace for 24 hours. Asana failure is intentionally non-fatal: if Asana is down or misconfigured, the Wufoo submission still succeeds and the user still sees success. The Asana task URL (or error) is included in the JSON response for debugging but never blocks or fails the user-facing submission.
6. If a `VIEW_SECRET` is configured, the Worker also mints an HMAC-signed, 7-day-expiring "view your submission" token and returns a `/view/{token}` URL — a self-contained, read-only receipt page (no database lookup; the submitted data is embedded in the signed token itself).
7. The Worker returns JSON (`{ success, viewUrl, asanaTaskUrl, asanaError }`) which the wizard uses to show a success screen with the view link, or Wufoo's field-level validation errors if the submission was rejected.

## Secrets — what exists, where, and how to rotate safely

This is the part most likely to bite a future maintainer, because none of these secrets live in this git checkout or in `wrangler.toml` — they only exist as encrypted values on the Cloudflare account, set via `wrangler secret put`. **If you rotate any credential below in its *origin* system (Wufoo, Asana) and forget this Worker also holds a copy, the form keeps accepting submissions from the user's point of view but silently fails to reach that one downstream system** — that's exactly what happened when the Wufoo API key was rotated without updating the Worker.

| Secret | Used for | Where it comes from | Rotation steps |
|---|---|---|---|
| `WUFOO_API_KEY` | HTTP Basic Auth to the Wufoo REST API (username; password is the literal `footastic`) | Wufoo account → **Account > API Information** | 1. Generate/copy the new key from Wufoo. 2. From `projects-to-document/macs-request-form/` (or wherever the real Worker source lives), run `wrangler secret put WUFOO_API_KEY` and paste the new value. 3. Submit a real test entry through the form (or `test-harness.html`) and confirm it lands in Wufoo. |
| `VIEW_SECRET` | HMAC-signs the "view your submission" token; **not** a shared credential with any external system | Generated locally — `openssl rand -hex 32` | Rotating this invalidates every outstanding view link (max 7 days old, by design) immediately — nothing external to update. Run `wrangler secret put VIEW_SECRET` with a freshly generated value. |
| `ASANA_PAT` | Bearer auth for all Asana API calls (fetching custom field metadata, creating tasks, uploading attachments) | An Asana Personal Access Token, tied to whichever Asana account created it | Generate a new PAT in Asana (My Settings → Apps → Manage Developer Apps, or equivalent), then `wrangler secret put ASANA_PAT`. **If the PAT's owning Asana account ever loses access to the target project, task creation fails with a 401/403** — the failure is non-fatal to the user (see step 5 above) but silent unless someone checks Worker logs, so treat "no new Asana tasks showing up" as a signal to check this first. |
| `ASANA_PROJECT_GID` | Which Asana project tasks get created in | Asana project URL / API | Not really a "rotating" secret, but if the MACS team's Asana project is ever recreated or moved, update via `wrangler secret put ASANA_PROJECT_GID`. Also **purge the KV cache** (see below) since it's keyed by the old project's custom field GIDs. |
| `ASANA_CACHE` (KV namespace, binding in `wrangler.toml`) | Not a secret itself, but caches Asana custom-field name→GID resolution for 24h | Created via `wrangler kv:namespace create ASANA_CACHE`, ID pinned in `wrangler.toml` | If Asana custom fields are renamed/added/removed, either wait out the 24h TTL or manually delete the `asana_custom_fields_v2` key from the KV namespace to force immediate re-resolution. |

General rotation checklist, regardless of which secret:

1. Confirm which Cloudflare account owns this Worker before running any `wrangler` command — it is **`Mcc.ompr@gmail.com's Account`**, not the same Cloudflare account used for the docs-platform/wiki-macs project. Run `wrangler whoami` and check you're authenticated against the right one before `wrangler secret put`.
2. `wrangler secret put <NAME>` targets whatever Worker `wrangler.toml` in the current directory declares (`macs-form-proxy`) — there is no separate "deploy" step needed for a secret change to take effect; unlike a Cloudflare Pages project, a plain Worker's secret update applies immediately to the live Worker.
3. After rotating, do a real end-to-end test submission — a 200 response from the Worker does not by itself prove Wufoo or Asana accepted the data, since Asana failures are swallowed by design and Wufoo field errors only show up in the response body, not the HTTP status alone.
4. If something does fail, `wufooStatus`, `apiKey` (partially masked), and the exact field list sent are all included in the Worker's error JSON response and in its `console.log` — check `wrangler tail` for a live submission rather than guessing.

## Why Asana is called directly (not via Wufoo's native integration)

Wufoo has a built-in Asana integration, but it pushed all ~28 form fields into Asana as custom fields on every task, most of them empty depending on which of the 5 project-type branches the submitter used — cluttering the MACS team's Asana board. The Worker replaced that with its own direct Asana call that:

- Resolves only 4 real Asana **custom fields** (Department, Name, Project Type, Primary Audience) dynamically by name via the Asana API, cached in KV — so the mapping survives an Asana field being recreated with a new GID.
- Folds everything else (goal, key message, description, budget, billing, audiences, etc.) into a single formatted plain-text **task description**, omitting any section where every field in it was empty.
- Uploads any attached files to the created task afterward, non-fatally (an upload failure doesn't roll back or fail the task).

If the MACS team ever asks for a field to show up as a real filterable Asana custom field again, that means adding an entry to `FIELD_TO_ASANA_NAME` in `worker.js` and confirming the Asana custom field's display name matches exactly (name-based lookup, not GID-based) — and separately, in Asana itself, changing that field's type in Asana forces a fresh cache miss on next lookup either way, well within its 24h TTL.

## Field ID drift — don't trust the mapping doc blindly

`mapping-step/wufoo-field-mapping.md` documents the wizard's *original* Wufoo field IDs (Field1–Field27, one file-upload field). The form has grown since then — `worker.js` references file fields up to `Field38`, a website-URL field at `Field41`, accessibility flags at `Field44`/`Field45`, and template-only fields (`Field28b`, `Field13b`) that exist in the HTML/Asana description but are deliberately stripped before reaching Wufoo. **Treat `worker.js`'s `FILE_FIELD_IDS` array and the `SKIP_FIELDS`/`ASANA_ONLY_FIELDS` sets as the current source of truth for field IDs, not the mapping doc.** If you're adding a new form field, you need a real Wufoo field ID from the live Wufoo form's admin UI — don't infer one by extending the mapping doc's sequence, since the two have already diverged once.

## Known rough edges / open backlog

Tracked in `project-management/backlog.md` — worth checking before treating any of these as a surprise bug:

- No client- or server-side limits yet on file count/size or input format validation (budget, phone, email, dates are all free-text).
- No "contact us" footer on the form itself (MACS phone/email do already appear on the live `MACS-form-cascade.html`, at the bottom of the widget).

## If the form breaks — quick triage

1. **Submissions fail entirely (error shown to user):** `wrangler tail` while reproducing, or check the Worker's error JSON — it echoes `wufooStatus` and a masked `apiKey` preview, which will immediately tell you if the Wufoo key is the problem (e.g. a 401).
2. **Submissions succeed but nothing shows up in Asana:** non-fatal by design — check `asanaError` in the success response, or `wrangler tail`. Usually `ASANA_PAT` losing project access.
3. **"View your submission" links are broken/expired:** links are only ever valid 7 days by design (`VIEW_TOKEN_TTL_MS`); if they're failing *immediately*, `VIEW_SECRET` may have been rotated or is unset.
4. **Form loads but won't POST / CORS error in console:** confirm the `action` URL in `MACS-form-cascade.html` still matches the Worker's live `workers.dev` URL, and that `workers_dev = true` is still set in `wrangler.toml` — this Worker has no custom domain/route configured, so it depends entirely on the `workers.dev` subdomain staying enabled.
