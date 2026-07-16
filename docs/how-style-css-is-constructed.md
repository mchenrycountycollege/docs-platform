---
id: 2b743eae-3578-4e54-88cd-7015f916a689
title: How style.css Is Constructed
book: Design System
chapter: Code Patterns
tags: [css, style-guide, design-system, cascade]
---

A tour of `_cms/cascade-css-files/_refresh/style.css` — what's in it, why it's arranged the way it is, and how to add to it without fighting the vendor's own conventions. Written for anyone touching this file, whether you write CSS every day or just need to make a safe, small change.

## What this file actually is

This one file does the job that, everywhere else in `_cms/cascade-css-files/`, is split across several files — `foundation.css`, `splide.css`, `app.css`, `custom-styles.css`, and so on live separately at the top level. Inside `_refresh/`, all of that has been bundled into one stylesheet that drives the CMS's live preview pane for the redesigned template.

That's worth knowing going in: this file isn't hand-organized by topic so much as it's **stacked in the order pieces were added** — a browser reset at the bottom of the cascade, a UI framework on top of that, a couple of plugin libraries on top of *that*, and this site's own components on top of everything. Once you can see the stack, the file stops feeling like 15,000+ lines of noise and starts feeling like four or five much shorter files that happen to share a tab.

## The shape of the file

Roughly, by share of the file (line numbers are approximate — a couple of these layers interleave rather than sitting in one clean block):

| Layer | Approx. lines | Share |
| --- | --- | --- |
| Design tokens (`:root`) | 1–160 | ~1% |
| normalize.css reset | 160–340 | ~1% |
| Foundation for Sites 6 + base layout | 340–9,300 | ~56% |
| Third-party plugins (Splide, nanoGallery2) | 9,300–13,200 | ~24% |
| This site's own components | 13,200–15,630 | ~15% |
| Late patches & one-offs | 15,630–15,904 | ~2% |

## 1. Design tokens

**The `:root` block, lines 1–160.**

The file opens with a wall of `--custom-properties`: color ramps (`--purple-primary`, `--gray-dark`…), a type scale, a spacing scale, and some layout math. This is the vendor's design system in variable form — everything downstream is supposed to reference these instead of writing new values.

Two choices here explain a lot of what shows up later:

**Headings are single tokens, not four properties.** Instead of setting `font-family`, `font-weight`, `font-size`, and `line-height` separately every time an `h2` shows up, they packed all four into one [font shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/font) token:

```css
--h2: 700 clamp(1.5rem, 0.9375rem + 1.5vw, 2.25rem) / 1.2 var(--font-primary);
```

...then applied it in one line: `font: var(--h2);`. The [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) in the middle is what makes the heading scale smoothly between a minimum size, a fluid size tied to viewport width, and a maximum — so it resizes across screen widths without a separate rule inside a media query. This is a fairly established technique (sometimes called "fluid type"; [Utopia](https://utopia.fyi/) is the best-known reference for the math behind it), and it's why you'll almost never see a font-size media query for body copy or headings in this file — the token is already doing that work.

**The spacing and text-size scales are numbered, not named.** `--space-1` through `--space-20`, `--text-xs` through `--text-5xl` — this is the same naming shape used by [Tailwind's default scale](https://tailwindcss.com/docs/theme#default-theme-variable-reference), even though this project isn't using Tailwind. It's a sign the author wanted a predictable, finite set of sizes rather than one-off values — which is also why, deeper in the file, you'll still find plenty of hand-picked pixel values that don't map to any token. The scale is a convention to lean on, not a hard rule that was universally followed.

## 2. The reset

**normalize.css v3.0.3, ~line 160–340.**

Right after the tokens, the file drops in a copy of [normalize.css](https://necolas.github.io/normalize.css/), credited in its own comment (`/*! normalize.css v3.0.3 | MIT License */`). Its job is boring on purpose — it just makes headings, lists, form controls, and the like start from the same baseline across browsers, before any real design is applied. You won't need to touch this section; if a browser-default quirk needs fixing, it almost always belongs further down, closer to the component it affects.

## 3. The framework & base layout

**Foundation for Sites 6, ~line 340–9,300.**

The bulk of the file — buttons, the grid, dropdowns, accordions, off-canvas menus, tooltips, badges, tabs, the modal ("reveal") system — is [Foundation for Sites](https://get.foundation/sites/docs/), a CSS framework. Two tells repeat throughout it:

- `.foundation-mq` — a marker element Foundation's own JavaScript uses to detect the current breakpoint. Harmless, don't remove it.
- **`is-*` and `has-*` classes** — `is-active`, `is-open`, `is-dropdown-menu`, `has-tip`. These are Foundation's state classes: JavaScript toggles them, CSS reacts. If you see one of these in the markup and go looking for where it's *set*, it's usually a script, not a click handler in this file.

Two grid systems live in this layer, from different Foundation eras: a percentage/float grid (`.large-4`, `.large-push-2`, `.large-offset-1`) and a newer flex-based one built on `.row` / `.column`. Both still work — match whichever one is already used in the section of markup you're editing rather than mixing them.

This layer isn't *purely* Foundation, either. Site-specific layout classes are interleaved with it — things like `.inner-mid-main` and `.left-sidebar` sit right alongside Foundation's own grid rules, because that's structurally where they were needed. Treat "framework" as the dominant flavor of this stretch of the file, not an exclusive one.

## 4. Third-party plugins

**Splide & nanoGallery2, ~line 9,300–13,200.**

Two JavaScript widgets ship their companion CSS straight into this file: [Splide](https://splidejs.com/) (the `.splide__*` classes — a carousel/slider) and [nanoGallery2](https://nanogallery2.nanostudio.org/) (the `.nGY2*` classes — an image gallery/lightbox). Both are pasted in close to verbatim from the library's own release, which is why their class naming looks nothing like the rest of the file — different author, different conventions, and it should stay that way so future updates from upstream stay a clean drop-in rather than a merge conflict with hand edits.

If a carousel or gallery looks broken, check whether the fix belongs here (a genuine library bug) or in the site's own override rules nearby — don't edit inside a `.splide__` or `.nGY2` block unless you're intentionally patching the vendor's CSS.

## 5. This site's own components

**Header, Finder, Program, Metric…, ~line 13,200–15,630.**

Past the plugins, the file settles into hand-built, site-specific components: `.Header__`, `.UtilityHeader__`, `.Finder__`, `.Program__`, `.Metric__`. These use [BEM](https://getbem.com/) naming — **B**lock, **E**lement, **M**odifier — where a double underscore marks a part of the component (`Header__nav` is the nav *inside* Header) and a double dash marks a variant (`Header__sticky-cta--mobile` is the mobile version of that CTA). It's a convention worth learning once — it tells you, just from the class name, exactly how a piece relates to its parent and whether you're looking at the default or a variant.

Note the capitalization split: these newer components use `PascalCase__block`, while an older custom component like `.cms-callout` (up in the framework layer) uses all-lowercase BEM. Both are valid BEM, just from different points in the file's history — match the case style already used by whatever you're editing.

## 6. Late patches & one-offs

**The tail of the file, ~line 15,630–15,904.**

The last stretch is smaller, more specific fixes — a sponsor-logo grid, a golf-invitational-specific sponsor grid, and a block literally headed `/*reskin fixes - FB HH*/` (a Hannon Hill developer's initials, from a visual "reskin" pass). This is the part of the file that looks the least like a design system and the most like triage: selectors reach directly into specific page markup (`.info-block-main div a`) rather than using a namespaced, reusable class.

That's not a criticism so much as a pattern to recognize — deadline-driven fixes tend to land at the end of the file, scoped as tightly as possible so they can't leak into anything else. It's a reasonable way to patch something fast. It's *not* the pattern to copy when you're building something new and have the time to do it properly — for that, see the next section.

## The house style, in one component

If you want a single example of "how this team builds a component when there's no deadline pressure," look at `.cms-callout`. It sits up in the framework layer, right next to Foundation's own legacy `.callout`, and its own header comment explains exactly why:

```css
/* =========================================================================
   COMPONENT: .cms-callout
   Refresh-era "Callout" component (_cms/specs/callout/design-spec.md).
   Deliberately namespaced to avoid colliding with the legacy `.callout` /
   `.callout.primary` / `.callout.small` rules directly above — those are
   untouched by this block. Card background stays white/near-white for
   every variant; color is carried entirely by an accent value (icon badge,
   heading text, CTA button fill) via the --cms-callout-accent /
   --cms-callout-accent-dark custom properties set per color modifier.
========================================================================= */
```

A few decisions in that block are worth borrowing whenever you add something new:

1. **It's namespaced.** `cms-callout` rather than plain `callout`, specifically so it can't collide with a name Foundation already owns. Two rules both matching `.callout` means whichever comes later in the file quietly wins — a namespace prefix sidesteps that entirely.
2. **Color lives in two custom properties, not repeated per element.** Each modifier (`--primary`, `--alert`, `--success`…) sets only `--cms-callout-accent` and `--cms-callout-accent-dark`; every child element — icon border, heading color, button fill — just reads those two variables. Adding a new color variant becomes a two-line addition, not a hunt through six child selectors.
3. **Every value is a token.** `var(--space-6)`, `var(--gray-light)`, `var(--border-radius-lg)` — no hand-typed hex codes or pixel values anywhere in the block, so it stays visually consistent with the rest of the site automatically.
4. **It has a visible focus state.** `.cms-callout__cta-link:focus-visible` gets its own outline, in the accent color, distinct from hover — keyboard and screen-reader users need to see where focus is.
5. **No `!important` anywhere in it.** The component is specific enough (namespaced classes, no id or inline-style competition) that it never needs to force its way over something else. `!important` shows up hundreds of times elsewhere in the file — almost entirely inside Foundation's own show/hide utility classes, where it's genuinely necessary. It's a flag you're fighting the cascade, not a routine tool.

## Ground rules before you edit anything

- **Reach for an existing token before writing a new value.** Check the `:root` block for a color, size, or spacing value that already matches before typing a new hex code or pixel number. The file already mixes hundreds of token references with hundreds of hand-typed hex colors — every hardcoded value you add makes a future "let's adjust the palette" pass that much harder.
- **Match the breakpoint style already in use nearby.** This file has three coexisting conventions — pixel-based (`max-width: 768px`), em-based (Foundation's own `min-width: 40em`), and a newer rem-based pair (`min-width: 75rem` / `max-width: 74.999rem`). Don't introduce a fourth; use whichever one the surrounding rules already use.
- **New, unrelated components go at the end of the file, not wherever feels tidy.** That's how `.Header__`, `.Finder__`, and the sponsor-logo blocks all got there. If you're extending something that already exists elsewhere (like a Foundation component), it's fine — even preferable — to add your override right next to it instead, the way `.cms-callout` sits beside `.callout`.
- **Check whether the same class is also styled somewhere else before changing it.** One comment at the very end of the file spells this out directly:

  ```css
  /* Divider lines between sidebar-detail sections (Details/Contact/Share/Save) on the
     events page — refresh preview only. hh-events.css sets margin-bottom: 20px on these
     rows for production too, so this stays here rather than in hh-events.css. */
  ```

  This file is the CMS *preview* stylesheet — the live site pulls in some of the same classes from separate files, like `hh-events.css`, sitting alongside this one. A change that looks complete here can still miss production.

## Quick reference

| You want to… | Look for |
| --- | --- |
| Add a new color variant to an existing `cms-` component | Its `--*-accent` / `--*-accent-dark` modifier block — copy the pattern, don't add new child-element rules |
| Change a brand color everywhere | The matching `--purple-*` / `--gray-*` etc. token in `:root`, lines 1–160 |
| Adjust heading size or line spacing | The `--h1`…`--h6` font-shorthand tokens in `:root` |
| Fix the mobile nav / sticky header | `.Header__` and `.UtilityHeader__`, ~line 13,232 onward |
| Fix a carousel or image gallery visual bug | First check it isn't a Splide/nanoGallery library default — patch nearby, not inside their blocks |
| Add a brand-new, page-specific component | End of the file, following the `.cms-callout` pattern (namespace, tokens, focus states, no `!important`) |

## Further reading

- [BEM naming](https://getbem.com/) — Block\_\_Element--Modifier, explained from scratch
- [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) — how the `--token` variables work
- [clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) — the fluid-sizing function behind the type scale
- [Utopia fluid scales](https://utopia.fyi/) — background on the clamp()-based approach
- [Foundation for Sites](https://get.foundation/sites/docs/) — the framework underneath almost everything
- [normalize.css](https://necolas.github.io/normalize.css/) — the browser-default reset up top
- [Splide](https://splidejs.com/) — the carousel/slider plugin
- [nanoGallery2](https://nanogallery2.nanostudio.org/) — the image gallery/lightbox plugin
