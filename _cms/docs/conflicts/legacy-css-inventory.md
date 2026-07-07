# Legacy CSS Inventory

> Extracted from `cascade-css-files/`. All files are loaded globally on every CMS page. Widget styles must be scoped to avoid these selectors. Do not modify these files.

---

## File overview

| File | Lines | Risk level | Notes |
|---|---|---|---|
| `app.css` | 4054 | **Critical** | Main site stylesheet; unscoped element, class, and ID selectors throughout |
| `foundation.css` | 4245 | **Critical** | Foundation 6 reset + utilities; defines `[hidden]`, button, input, and form resets globally |
| `custom-styles.css` | 379 | **High** | CMS-editor-maintained overrides; unpredictable specificity; check here when a style is wrong in production only |
| `explore-options.css` | 240 | **High** | Duplicate of `program-categories.css` patterns; unscoped card/link selectors |
| `program-categories.css` | 198 | **High** | Unscoped `.option-card`, `.option-link`, `.card-content`, `.arrow-icon` selectors |
| `accordion-accessible.css` | 177 | Medium | Scoped to `.accordion-accessible` root class — relatively safe |
| `app-dev.css` | 4020 | **High** | Dev variant of `app.css`; may differ from production — symptoms in staging only may trace here |
| `splide.css` | 351 | Low-Medium | Carousel styles; z-index stacking can affect fixed/sticky elements |
| `splide.min.css` / `splide-default.min.css` | 0 | N/A | Empty files |

---

## app.css — globally dangerous selectors

### Universal and element selectors (bleed into everything)

| Selector | Property | Risk |
|---|---|---|
| `* { font-family: 'Source Sans Pro' }` | Resets font on ALL elements | Any widget element will inherit unless the widget explicitly overrides `font-family` |
| `section { overflow-x: hidden }` | **Breaks `position: sticky`** inside any `<section>` | This is line 10–11. If the widget renders inside a `<section>`, sticky positioning will silently fail |
| `body { font-family, color: #444, font-size: 16px }` | Base typography | Inherited by widget unless overridden |
| `h1, h2, h3, h4 { font-family, color: #444 }` | Heading styles | Widget headings will be colored #444 unless overridden in widget scope |
| `h2 { font-size: 2.441rem; margin-top: 1.75rem; margin-bottom: 1.25rem }` | Heading sizing | Widget `<h2>` elements will be oversized |
| `h3 { font-size: 1.953rem }` | | Widget `<h3>` affected |
| `h4 { font-size: 1.563rem }` | | Widget `<h4>` affected |
| `p { font-size: 1em; margin-top: 1em }` | Paragraph spacing | Adds top margin to every `<p>` in the widget |
| `a { color: #5639a4 }` | Link color (purple) | All widget links will be purple unless scoped |
| `a:hover, a:focus { color: #507F2E }` | Link hover (green) | |
| `main a { text-decoration: underline }` | Link underline | If widget is inside `<main>`, all links get underline |
| `ul, ol { margin-left: 25px; padding-left: 25px }` | List indent | Widget lists will be indented |
| `figure { margin: 0 }` | Figure reset | |
| `small { font-size: 110% }` | | Counterintuitive size increase |

### Class selectors that collide with common widget names

| Selector | File | Notes |
|---|---|---|
| `.button { background-color: #4b3190 }` | app.css:75 | Any element with class `button` gets purple background |
| `a.button { color: #fff; text-decoration: none }` | app.css:70 | Link buttons get white text |
| `.modal { display: none; position: fixed; z-index: 1000; width: 100%; height: 100% }` | app.css:2488 | Generic class — will hide any element with class `modal` |
| `.modal-content { position: relative; background: #fefefe; width: 90%; max-width: 900px }` | app.css:2501 | Generic class |
| `.accordion-title { ... }` | app.css:2261 | Styles any `.accordion-title` element globally |
| `.accordion-content { ... }` | app.css:2261+ | Styles any `.accordion-content` element globally |
| `.accordion { ... }` | app.css:2255 | Styles any `ul.accordion` |
| `.card-content h3 { ... }` | app.css:3928 | Unscoped — targets any h3 inside any `.card-content` |
| `.option-card { ... }` | app.css:3914 | Unscoped card styles |
| `.option-cards { ... }` | app.css:3909 | Unscoped card container |
| `.option-link { ... }` | app.css:3932 | Unscoped link style |
| `.arrow-icon { ... }` | app.css:3955 | Unscoped icon style |
| `.category-header h2 { ... }` | app.css:3893 | Any h2 inside `.category-header` |
| `.category-description p { ... }` | app.css:3900 | Any p inside `.category-description` |
| `.directory { ... }` | app.css | Multiple rules for `.directory` class — high collision risk for any "directory" widget |

### z-index values in use (stacking context map)

| Selector | z-index | Notes |
|---|---|---|
| `.overlay` | 40 | Hamburger menu overlay |
| `.logo a` | 10 | |
| `.dropdown` (nav) | 1000 | Primary nav dropdowns |
| `.social-sec a` | 9 | |
| `.top-nav` (fixed) | 999 | Fixed top navigation bar |
| `.modal` | 1000 | Generic modal class |
| `.left-sidebar` related | 999 | Sidebar on mobile |
| Primary nav mobile | 50 | Mobile nav layer |
| Mobile menu icon | 100 | |

**Implication:** A widget using `z-index` needs to go above 1000 to layer over nav dropdowns and modals. Fixed/sticky widget elements at z-index < 50 will appear behind the mobile nav.

### overflow rules that break position:sticky

| Selector | Rule | Implication |
|---|---|---|
| `section` | `overflow-x: hidden` | **Any sticky element inside a `<section>` will not stick.** This is a site-wide rule. |
| `.overlay` | `overflow: hidden` | |

---

## foundation.css — globally dangerous selectors

### The [hidden] rule

```css
[hidden],
template {
  display: none;
}
```

This rule has **no `!important`**. It lives at line 76. **Any widget rule with a display value (flex, grid, block) that shares the same specificity tier as this rule will win and override it**, causing elements with the `[hidden]` attribute to remain visible. Always write companion rules: `.your-scoped-class[hidden] { display: none; }`.

### Button and form resets

Foundation globally resets `button`, `input`, `select`, `textarea` appearance. Key ones:

| Selector | Property |
|---|---|
| `button` | Resets `-webkit-appearance`, `cursor`, `padding`, `border` |
| `html input[type="button"]`, `input[type="submit"]` | Same as above |
| `button[disabled]` | Cursor pointer removed |
| `[type='button']` (line 776) | Additional reset |
| `.input-group-label, .input-group-field, .input-group-button` | Input group layout |

### Foundation !important rules

Foundation uses `!important` sparingly but in high-impact places:

| Selector | Rule |
|---|---|
| `[data-whatinput='mouse'] button` (line 422) | Removes focus outline — may affect widget button accessibility |
| Print styles | Several `display: block !important`, `display: none !important` |
| `.show-for-*` / `.hide-for-*` | Responsive visibility utilities with `!important` |
| `float: left !important`, `float: right !important` | Float utilities |

---

## program-categories.css and explore-options.css — duplicate unscoped selectors

Both files define **the same class names** without any scoping ancestor. They will conflict with each other and with any widget that uses these names.

**Shared unscoped selectors across both files:**

- `.program-categories-container`
- `.program-category`
- `.program-category.purple`
- `.category-header`
- `.category-header h2`
- `.category-description`
- `.category-description p`
- `.option-cards`
- `.option-card`
- `.option-card:hover`
- `.card-content h3`
- `.option-link`
- `.option-link:focus`
- `.arrow-icon`
- `.card-content p`

These names also appear in `app.css` (appended at the bottom, lines 3872–4047). That means **three separate stylesheets** define the same selectors. Last-to-load wins for equal specificity.

---

## custom-styles.css — notable selectors

| Selector | Risk |
|---|---|
| `.breadcrumb { ... }` | Generic breadcrumb class |
| `#emergency-alert { ... }` | ID-specific; low collision risk |
| `ul.accordion li.accordion-item` | Styles Foundation accordion items globally |
| `span.accordion-title::before` | Pseudo-element on any `.accordion-title` `<span>` |
| `#cc-widget-careers .cc-card` | Scoped to `#cc-widget-careers` — safe |
| `.isOr { ... }` | Generic utility class |
| `.course-list .accordion-title` | Scoped within `.course-list` |
| `.gallery .row .columns img` | Any img inside `.gallery` rows |
| `.responsive-embed` | Generic responsive embed class |

---

## accordion-accessible.css — relatively safe

Uses its own root class `.accordion-accessible` as a scope. Internal classes are:

- `.accordion-item-accessible`
- `.accordion-header-accessible`
- `.accordion-trigger-accessible`
- `.accordion-title-accessible`
- `.accordion-icon-accessible`
- `.accordion-panel-accessible`
- `.accordion-content-accessible`

These are distinct from Foundation's `.accordion-title` / `.accordion-content` and from app.css's accordion rules. Safe to use alongside as long as the widget does not also use these exact names.

---

## Splide CSS

`splide.css` defines `.splide`, `.splide__slide`, `.splide__track`, `.splide__list`, `.splide__arrow` etc. — all scoped under `.splide`. Low collision risk unless a widget also uses a `.splide` root class.

Global z-index interference is the main concern: Splide's arrow and overlay elements at certain z-indexes can clip sticky/fixed widget elements on pages where both are present.
