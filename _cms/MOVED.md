# MOVED → ../mcc-web

**Only this `_cms/` directory moved** — the rest of wiki-macs (`apps/`, `packages/`, the pnpm
workspace) is unaffected and still live.

`_cms/` held the newest copy of the two most important stylesheets: `app.css` and
`_refresh/style.css`, both carrying the 255-line Content Cards component that no other repo had.
It also won `formats/two-column/default.vm` and `data-definitions-prod/two-column.xml`, and
contributed the "Known Gotchas" section now in `mcc-web/.claude/agents/cascade-developer.md`.

**Do not edit files here.** This copy is frozen as of 2026-07-29 and is kept only for its
git history. Edits made here will not reach production and will re-create the duplication
problem the move was meant to end.

Canonical locations in `/Users/smattson/Documents/code/mcc-web`:

| Was | Now |
|---|---|
| `_cms/formats` `blocks` `specs` `data-definitions-*` `templates` `base-assets` | `shared/cascade-cms/` |
| `cascade-css-files/` | `shared/cascade-css/` |
| `cascade-js-files/` | `shared/cascade-js/` |
| `cascade-hh-docs/` `_cms/docs/` `cascade_documentation/` | `shared/hh-docs/` |
| `.claude/agents/` | `mcc-web/.claude/agents/` |

The live Cascade instance outranks both. See `mcc-web/shared/cascade-cms/UNRESOLVED.md`.
