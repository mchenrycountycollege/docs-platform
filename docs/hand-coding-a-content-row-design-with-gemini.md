---
id: 9729553d-6223-4467-9cd0-610ffce0642c
title: Hand-Coding a One-Off Content Row Design with Gemini
book: Design System
chapter: Content Authoring
tags: [wysiwyg, content-row, gemini, ai-prompting, refresh, css, cascade]
order: 100
---

A step-by-step process for building a one-off page design by hand-coding HTML/CSS into a **Content Row → Content Editor** field, using Gemini to write the code. This is a stopgap: it works without needing a Data Definition field, a Format, or any of the "real" Cascade component machinery — but it only works if the code you paste in follows a few rules Cascade enforces silently. Skip a rule and Cascade's parser will quietly strip or mangle what you pasted, which is the "it ate my code" problem this page exists to prevent.

If you build the same design more than two or three times, ask a developer to turn it into a proper reusable Cascade component instead of copy-pasting this each time — see "When to stop hand-coding" at the bottom.

## The short version

1. Copy the design tokens block out of `style.css` (the refresh stylesheet).
2. Paste the tokens + the prompt template below into Gemini, describing the design you want.
3. Open the **Content Editor** content row field, switch it to **Source Code** view.
4. Paste Gemini's *entire* answer in — style block and markup together — nothing else.
5. Switch back out of Source Code view and check nothing visibly broke.
6. Submit, preview, publish.

The rest of this page fills in the detail behind each step, plus what to do when step 5 looks wrong.

## Why this needs special handling at all

Cascade renders every page as XHTML, not regular HTML. XHTML is stricter than the HTML you're used to seeing in tutorials: every tag must be closed, `<style>`/`<script>` content has to be specially wrapped, and a handful of other things (below) have to be exactly right or Cascade's parser will either throw an error on save or silently rewrite/strip the offending part. Gemini doesn't know it's writing for an XHTML parser unless you tell it — its default output (plain HTML) will look completely correct and still fail. That's the whole reason for the prompt template in step 2: it front-loads the rules Gemini needs so you don't have to fix its output by hand afterward.

## Step 1 — Grab the current design tokens

The refresh redesign's colors, fonts, spacing, and sizing all live as CSS custom properties (`--purple-primary`, `--space-6`, `--h2`, etc.) in one block at the very top of `style.css` — the `:root { ... }` block in roughly the first 160 lines. That block is the **source of truth** for the redesign's look. Gemini can't see this file on its own, so you have to paste it in yourself.

- Open `_cms/cascade-css-files/_refresh/style.css`.
- Select and copy everything from the top of the file down through the closing `}` of the first `:root { ... }` block (right before the `normalize.css` comment starts) — that's the design-tokens section, roughly lines 1–160.
- Keep that copied text handy; it goes straight into the Gemini prompt in Step 2.

You don't need to understand every token to do this — you're handing Gemini the vocabulary so it reuses existing colors/spacing/type instead of inventing new ones that clash with the redesign.

## Step 2 — Prompt Gemini

Copy the template below into Gemini, fill in the two bracketed sections, and paste your copied tokens where indicated. Everything else in the template is boilerplate that keeps Gemini's output Cascade-safe — don't remove any of it.

```
I need a single, self-contained HTML fragment to paste into a rich-text field
inside Cascade CMS (a WYSIWYG "Content Editor" field). Follow every rule below
exactly — this fragment will be parsed as XHTML, not regular HTML, and Cascade
will silently strip or corrupt anything that breaks these rules.

DESIGN TOKENS (use these CSS custom properties for every color, font, and
spacing value instead of inventing new hex codes or pixel numbers — only use a
hardcoded value if nothing here is close):

[PASTE THE :root TOKEN BLOCK YOU COPIED FROM style.css HERE]

WHAT I WANT:
[Describe the design in plain language — what sections, what content, what it
should look like, any images/links/buttons it needs, roughly how it should lay
out on mobile vs. desktop.]

HARD RULES — the fragment must:
1. Contain ONLY the fragment itself — no <!DOCTYPE>, <html>, <head>, or <body>
   tags. Start directly with the outermost <div> (or a <style> tag if the CSS
   comes first).
2. Put all CSS in one single <style> block, and wrap its contents in the CSS
   comment form of CDATA, exactly like this:
   <style>
   /*<![CDATA[*/
   ...css rules here...
   /*]]>*/
   </style>
3. If any inline <script> is needed, wrap its contents like this instead
   (JS comment form, not the CSS one):
   <script>
   //<![CDATA[
   ...js here...
   //]]>
   </script>
4. Self-close every void element: <img />, <br />, <hr />, <input />, <meta />,
   <link /> — never <img> without the trailing slash.
5. Every tag must be explicitly and correctly closed and properly nested. No
   tag soup, no relying on the browser to auto-close anything.
6. Prefix every custom class name with a unique namespace so it can't collide
   with the site's existing CSS (which already defines things like .callout,
   .card, .button, .row, .column) — e.g. use classes like
   .cms-[shortname]__heading rather than plain .heading or .callout.
7. Use the site's existing Foundation grid classes (.row, .column, .large-6,
   etc.) for layout structure instead of writing new grid/flex CSS from
   scratch, unless the layout genuinely can't be done that way.
8. Be responsive — check it works from narrow mobile widths up through
   desktop.
9. Include basic accessibility: alt text on every image, real heading tags
   (not styled <div>s pretending to be headings), and a visible focus state
   on any link or button.
10. No <link> to an external stylesheet and no <script src="...">  pointing
    at an external file — everything must be inline in this one fragment,
    since it's the only thing I can paste into the field.

Give me the complete fragment as one code block, ready to paste as-is.
```

Reuse this exact template every time — swap only the two bracketed parts.

## Step 3 — Paste it into Cascade

1. Open the page, find the **Content Row** you want to add the design to, and set its **Type** dropdown to **Content Editor**.
2. In that field's toolbar, click the **Source Code** button (the `</>` icon). This switches the field from the rich-text view into a raw-code box — this is the *only* place you can paste raw HTML/CSS; pasting it directly into the rich-text view will get reformatted and broken.
3. Paste Gemini's entire answer into that box — the `<style>` block and the markup together, exactly as Gemini gave it to you. Don't split them up or paste just the markup.
4. Click OK/Save on the source code dialog to return to the normal view.

## Step 4 — Check it, then publish

Right after you exit Source Code view, look at the field's preview:

- If it looks roughly like what you asked for (even unstyled-looking previews in the editor are normal — full styling often only shows in real preview), you're good.
- If the `<style>` block is missing, or big chunks of markup vanished, or everything's been squashed into plain text — something in the pasted code broke a rule above. See Troubleshooting below before trying again.

Then continue as normal: Submit → **Preview** the page to see it fully styled → Publish once it looks right.

## Troubleshooting: "it ate my code"

| What you see | Likely cause | Fix |
|---|---|---|
| The whole `<style>` block disappeared, or its content shows up as visible text on the page | The CSS wasn't wrapped in `/*<![CDATA[*/ ... /*]]>*/` | Tell Gemini it forgot rule 2 and paste the fragment back in for it to fix, or wrap it yourself |
| Part of the markup is missing, cut off mid-tag | An unclosed tag, or a `<div>` opened but never closed | Ask Gemini to double-check every tag is closed and properly nested |
| Cascade shows a save/submit error mentioning "well-formed" or "must be terminated by matching end-tag" | A void element wasn't self-closed (`<img>` instead of `<img />`), or an `&` appears outside CDATA without being written as `&amp;` | Ask Gemini to self-close every void element and escape any bare `&` |
| Your new component's styling looks fine alone but something else on the page changed color/spacing/size | A class name wasn't namespaced and collided with an existing site-wide class (`.callout`, `.card`, `.button`, etc.) | Ask Gemini to rename every class with a unique prefix (rule 6) |
| Layout looks fine on desktop but breaks on mobile | Gemini wrote custom grid CSS instead of using Foundation's `.row`/`.column` classes, or didn't test narrow widths | Ask Gemini to rebuild the layout using `.row`/`.column`/`.large-*` classes |
| An image, icon, or script never loads | Gemini linked to an external file (`<link href="...">` or `<script src="...">`) | Ask for everything inlined instead — no external references are allowed in this field |

In every case, the fix is the same move: paste the broken fragment back to Gemini along with which numbered rule it missed, and ask for a corrected version — don't hand-patch the HTML yourself unless it's a one-character fix, since it's easy to reintroduce the same problem.

## When to stop hand-coding

This workflow is meant for genuine one-offs. If you notice yourself building the same layout for a third time, or a design starts needing content that isn't just "some text and an image" (a repeating list of items with several fields each, for example), flag it — that's a sign it should become a real Cascade component (a proper structured-data field with its own reusable design) instead of copy-pasted markup living inside a text field. That's a quick ask for whoever maintains the Cascade build; you don't need to know anything about how that side works to ask for it.
