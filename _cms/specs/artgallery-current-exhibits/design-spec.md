# Component Design Spec: Art Gallery Current Exhibits

> **Pipeline role**: This document is consumed by the **Cascade Developer** agent.
> To use: open a new chat, switch to the Cascade Developer agent, and say:
> "Build the component from `_cms/specs/artgallery-current-exhibits/design-spec.md`"
> Do not modify this spec — it is the authoritative design decision document.

## Summary

- **Component name (kebab-case):** `artgallery-current-exhibits`
- **Architecture:** Page Data Definition + Format
- **Architecture rationale:** This is a single-purpose page type where all exhibits live on one page, are tightly coupled to the page layout, and are updated by the same gallery editor — separate blocks would overcomplicate the editing experience.
- **Pages it appears on:** The Art Gallery "Current Exhibits" page (one specific page)
- **Edited by:** Non-technical gallery staff (monthly content swaps)
- **Workflow required:** Yes — editor submits, supervisor/web team approves before publish (standard Edit approval workflow)

## Component Purpose

A sophisticated, single-page exhibit showcase for the Art Gallery. The page displays multiple gallery exhibits with a sticky anchor-navigation bar at the top, where each exhibit section features a two-column split layout (info + featured artwork), optional logistics details (dates, artist talk, reception), and expandable accordion sections for the artist statement and biography. Non-technical gallery staff update the exhibits monthly by filling in structured fields — the layout handles the rest.

## Architecture Decision

**Page Data Definition + Format.** Per the Component Architecture Decision Guide (§5): the content is tightly coupled to one page type, will not be reused on other pages, and the same editor manages all exhibit sections on this single page. Wrapping each exhibit as a separate XHTML/DD Block would force editors to navigate between multiple assets for what is conceptually one page of content. A repeating `exhibit` group in the page DD keeps the editing experience clean — one page, one form, all exhibits.

The Format will be a new Velocity script at `/_cms/formats/artgallery/current-exhibits.vm`. It will reuse the existing accessible accordion macro from `/_cms/formats/_shared/accordions-accessible.vm` for the expandable Statement and About sections.

## Content Structure

### Field Inventory

| # | Field Identifier (kebab-case) | Label (editor sees this) | DD Field Type | Required | Repeats | Group Parent | Notes |
|---|---|---|---|---|---|---|---|
| 1 | `page-intro` | Page Introduction | `wysiwyg` | No | No | root | Optional intro text above exhibits (hidden if empty) |
| 2 | `exhibit` | Exhibit | `group` (multiple) | Yes (min 1) | Yes (max 10) | root | Repeating group — one per gallery exhibit section |
| 3 | `gallery-name` | Gallery Name | `text` | Yes | No | `exhibit` | Small label identifying the gallery space (e.g., "Galleries One & Two", "East Gallery") — used as anchor-nav link text |
| 4 | `artist-name` | Artist Name | `text` | Yes | No | `exhibit` | Featured artist's name |
| 5 | `exhibit-title` | Exhibit Title | `text` | Yes | No | `exhibit` | Name of the exhibit |
| 6 | `dates` | Dates | `text` | Yes | No | `exhibit` | Date range as display text (e.g., "January 15 — March 1, 2026") |
| 7 | `artist-talk` | Artist Talk | `text` | No | No | `exhibit` | Date/time of artist talk event (e.g., "February 10, 2026 at 6:00 PM") — entire row hidden if empty |
| 8 | `reception` | Reception | `text` | No | No | `exhibit` | Date/time of reception event — entire row hidden if empty |
| 9 | `main-image` | Featured Artwork Image | `asset (file)` | Yes | No | `exhibit` | Primary artwork image for the exhibit |
| 10 | `image-caption` | Image Caption | `text` | No | No | `exhibit` | Caption text below the featured image (e.g., title, medium, year) |
| 11 | `statement` | Artist Statement | `wysiwyg` | No | No | `exhibit` | Expandable accordion content — hidden entirely if empty |
| 12 | `bio` | About the Artist | `wysiwyg` | No | No | `exhibit` | Expandable accordion content — label renders as "About [Artist Name]"; hidden entirely if empty |

### Data Definition Structure (Outline)

- Root level:
  - `page-intro` (wysiwyg, optional)
  - Group `exhibit` (repeating, min 1, max 10): contains all fields for one gallery exhibit
    - `gallery-name` (text, required) — drives the sticky nav link text and section anchor ID
    - `artist-name` (text, required)
    - `exhibit-title` (text, required)
    - `dates` (text, required)
    - `artist-talk` (text, optional) — conditional display
    - `reception` (text, optional) — conditional display
    - `main-image` (asset/file, required)
    - `image-caption` (text, optional)
    - `statement` (wysiwyg, optional) — accordion
    - `bio` (wysiwyg, optional) — accordion

### Dropdown/Radio Options

None — this component has no dropdown or radio fields. All variants are controlled by conditional empty-field logic.

## Visual Specification

### Layout

- **Foundation CSS pattern:** This site uses Foundation 5/6-style classes (`large-X medium-Y small-12 columns`). The component uses the existing site grid:
  - **Sticky sub-nav:** Full-width bar with centered anchor links, thin bottom border. Uses `data-sticky` from Foundation.
  - **Each exhibit section:** Two-column split using `large-6 medium-6 small-12 columns` per side
    - **Left column (info):** Gallery label (small uppercase text), artist name + exhibit title (large heading), logistics list (dates, optional artist talk, optional reception) with inline icons
    - **Right column (artwork):** Fixed 4:3 aspect ratio container with the featured image using `object-fit: contain` and a light neutral background. Caption below.
  - **Accordion section:** Full-width below the split layout, within a contained max-width for readability (`max-width: 70ch`)

- **Responsive behavior:**
  - Below 1024px (medium breakpoint): split hero stacks vertically — image above info
  - Sticky nav: remains sticky; links wrap naturally or scroll horizontally if many exhibits
  - Accordion sections remain full-width stacked

- **Container:** Rendered within the existing page template's main content region

### Brand & Style Overrides (vs. Stitch Spec)

> **Important for the developer:** The Stitch UI spec proposes custom colors (#F8F8F8, #1A1A1A, #757575) and typography (Playfair Display, Inter). **Do NOT use these.** Instead:
>
> - **Typography:** Use the site's existing heading and body font families from the site-wide CSS. Do not import or reference Playfair Display, Inter, or Helvetica Neue. Apply standard heading classes already in the site stylesheet.
> - **Colors:** Use the site's existing color palette and CSS classes. Any neutral background for the image container should use the site's existing light gray or off-white utility class rather than a hardcoded hex value.
> - **Gallery labels:** The all-caps, letter-spaced treatment is acceptable as a CSS class (`.exhibit-gallery-label`) using `text-transform: uppercase` and `letter-spacing`, but should inherit the site body font — not a separate serif face.
> - **General principle:** This component should look like it belongs on the existing McHenry County College site, not like a standalone art gallery microsite. Lean on existing site styles; only add component-scoped CSS where the site doesn't already provide what's needed (e.g., aspect ratio container, sticky nav, exhibit-specific spacing).

### Interactive Behavior

- **Sticky sub-navigation:**
  - Uses Foundation's `data-sticky` or equivalent sticky positioning (`position: sticky; top: 0`)
  - Renders anchor links dynamically from each `exhibit` group's `gallery-name` field
  - Links scroll to the corresponding exhibit section via anchor IDs
  - Subtle hover state: underline or opacity shift
  - Thin bottom border separates nav from content

- **Expandable accordions (Statement / About):**
  - Reuse the existing accessible accordion macro from `/_cms/formats/_shared/accordions-accessible.vm`
  - Two items per exhibit: "Statement" and "About [Artist Name]" (dynamically populated label)
  - Only one accordion open at a time per exhibit (recommended, not required)
  - Expand/collapse with `+`/`−` or chevron icon
  - Full ARIA support: `aria-expanded`, `aria-controls`, `role="region"`
  - Generous vertical padding when expanded; body text constrained to `max-width: 70ch` with `line-height: 1.6` for readability

### Variants

No explicit visual variants. All visual variation is driven by conditional field logic (optional fields show/hide).

### Edge Cases & Fallbacks

| Scenario | Behavior |
|---|---|
| `page-intro` is empty | Hide the intro section entirely — no empty whitespace |
| `artist-talk` is empty | Hide the entire Artist Talk row (icon + label) — do not show an empty row |
| `reception` is empty | Hide the entire Reception row (icon + label) — do not show an empty row |
| `image-caption` is empty | Hide the caption element — image container renders without caption below it |
| `statement` is empty | Hide the "Statement" accordion item entirely — do not render an empty accordion |
| `bio` is empty | Hide the "About [Artist Name]" accordion item entirely |
| Both `statement` and `bio` are empty | Hide the entire accordion container for that exhibit |
| Only 1 exhibit in the repeating group | Render normally; sticky nav still shows with a single link (consider hiding nav if only 1 exhibit — developer's call) |
| `main-image` uses non-standard aspect ratio | `object-fit: contain` ensures artwork is fully visible without cropping; neutral background fills remaining space in the 4:3 container |
| Very long artist name or exhibit title | Allow text to wrap naturally; do not truncate |

## Editor Experience

- **Who edits:** Non-technical gallery staff — comfortable filling in form fields, uploading images, writing in the WYSIWYG editor, but not familiar with HTML or CMS internals
- **Editing frequency:** Monthly (exhibits rotate on a regular cycle)
- **Workflow:** Standard Edit approval workflow — editor submits changes, web team or supervisor reviews and publishes
- **Editor-facing labels:** Use the "Label" column from the Field Inventory — these are the form labels editors see in Cascade. Keep them plain-language and jargon-free. The repeating `exhibit` group should clearly show "Exhibit 1", "Exhibit 2", etc. in the Cascade UI.
- **Editing UX notes:**
  - Collapsing default for `exhibit` groups: each group should be collapsed by default after the first one, so the form isn't overwhelming with multiple exhibits open
  - Optional fields (`artist-talk`, `reception`, `image-caption`, `statement`, `bio`) should be clearly marked as optional via their labels or help text so editors don't feel pressured to fill them all in

## Accessibility

- **Target level:** WCAG 2.1 AA (standard for higher ed)
- **Component-specific concerns:**
  - **Sticky nav:** Must be a `<nav>` element with `aria-label="Exhibit Navigation"`. Anchor links must use `href="#section-id"` for keyboard-accessible scroll.
  - **Accordion sections:** Reuse the existing accessible accordion pattern (`accordions-accessible.vm`) which already implements `aria-expanded`, `aria-controls`, `role="region"`, and keyboard navigation (Enter/Space to toggle, proper focus management).
  - **Images:** `main-image` must output an `alt` attribute. Since this is artwork, the alt text should be the `image-caption` value (or the exhibit title if caption is empty). The developer should pull alt from the Cascade file asset's metadata title or from the caption field.
  - **Heading hierarchy:** Each exhibit section uses `<h2>` for the artist name / exhibit title. Accordion headings use `<h3>`. The page `<h1>` remains the page title rendered by the template.
  - **Color contrast:** By using existing site CSS (rather than Stitch's custom palette), contrast ratios are already validated. Any new component CSS (e.g., gallery label, logistics icons) must maintain 4.5:1 contrast minimum.
  - **Sticky nav keyboard accessibility:** Nav must be reachable via Tab key and links must be focusable. Consider a skip-nav pattern if the sticky bar obscures content on keyboard navigation.

## Existing Assets to Reference

The developer should review and reuse these existing workspace assets:

- **`/_cms/formats/_shared/accordions-accessible.vm`** — Reuse this accessible accordion macro for the Statement and About sections. The macro expects child elements with `label`, `content`, and optional `anchor` fields. The developer will need to construct the accordion data structure to match this interface (dynamically setting the label to "Statement" or "About [Artist Name]").
- **`/_cms/formats/_shared/accordions.vm`** — The simpler Foundation accordion (non-accessible). Reference for Foundation accordion markup patterns, but prefer the accessible version.
- **`/_cms/formats/two-column-gallery/default.vm`** — Reference for the existing two-column layout pattern (`large-8 medium-7 small-12 columns` for main, `large-4 medium-5` for sidebar). The exhibit page uses a different split (6/6 for the exhibit hero), but this shows the site's standard Foundation column conventions.
- **`/_cms/formats/_shared/metadata.vm`** — Shows the site's metadata handling and confirms the site name is "McHenry County College" for any cross-site references.
- **`/_cms/formats/banner.vm`** — Reference for how the site handles image banners and orbit sliders. Shows `[system-asset]` tag usage and image asset caching patterns.

## Custom CSS Requirements

This component will require a small scoped CSS block (or a dedicated stylesheet added to the template). The developer should create the following CSS classes:

| Class | Purpose |
|---|---|
| `.exhibit-nav` | Sticky sub-navigation bar — `position: sticky; top: 0; z-index: 10; background: white; border-bottom: 1px solid` using site border color |
| `.exhibit-nav a` | Anchor links — site body font, subtle hover underline effect |
| `.exhibit-section` | Each exhibit `<section>` — vertical padding/margin between sections, scroll-margin-top to account for sticky nav height |
| `.exhibit-gallery-label` | Gallery name label — `text-transform: uppercase; letter-spacing: 0.1em; font-size: small` using site body font |
| `.exhibit-image-container` | Artwork container — `aspect-ratio: 4/3; background-color:` (site light gray); centers image with `object-fit: contain` |
| `.exhibit-accordion-content` | Readable body text inside accordions — `max-width: 70ch; line-height: 1.6` |
| `.exhibit-logistics` | Logistics list — icon + text rows, clean vertical spacing |

## Open Questions

- [ ] **Sticky nav behavior on mobile:** Should the nav collapse into a dropdown/hamburger on small screens, or remain as a horizontally scrollable bar? (Recommended: horizontally scrollable bar for simplicity — flag for client review during prototype phase)
- [ ] **Number of simultaneous open accordions:** Should only one accordion per exhibit be open at a time, or can multiple be open? (Recommended: one at a time for cleaner appearance, but the existing accessible accordion pattern supports `data-allow-all-closed` — developer should make this configurable)
- [ ] **Logistics icons:** What icon set is available on the site? Font Awesome is referenced in the gallery format (`fa fa-times`, `fa fa-angle-left`). If FA is available site-wide, use calendar/clock/people icons for the logistics rows. If not, use simple text labels or Unicode symbols.
- [ ] **Alt text strategy for artwork images:** Should the alt text be derived from the `image-caption` field, the Cascade file asset's metadata title field, or a dedicated alt text field in the DD? (Recommended: use the Cascade file asset metadata title — this is the standard pattern in existing formats and avoids duplicating content entry)
