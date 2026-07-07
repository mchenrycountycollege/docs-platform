---
description: Draft a phased implementation plan for a Cascade CMS change (refactor, lockdown, migration, etc.)
argument-hint: <describe the change, e.g. "lock down editor X to only the Y page with approval workflow">
---

> **Scope rule:** Never read, reference, or act on any file inside `_out-of-scope/`. Treat that folder as a hard exclusion zone. If a file path in this plan resolves to `_out-of-scope/`, skip it and note it is excluded.

Draft a phased implementation plan for: $ARGUMENTS

Follow the conventions in CLAUDE.md / `.github/copilot-instructions.md` (naming, architecture decision guide, Velocity best practices). Structure the plan as:

1. **Summary** — what's changing and why, in 2-3 sentences.
2. **What breaks (and what doesn't)** — call out any existing assets, dependencies, or pages affected.
3. **Phases** — numbered, each with concrete file paths to create/edit and the exact Cascade CMS UI steps to wire it up (Data Definition, Block, Format, Configuration, Content Type, Workflow, Roles, Asset Factory — include only the phases that apply).
4. **Open questions** — anything ambiguous that needs a decision before starting.

Write the plan to `_cms/specs/{project-slug}/plan.md` if it's for a specific component, otherwise to `wip/{slug}-plan.md`.
