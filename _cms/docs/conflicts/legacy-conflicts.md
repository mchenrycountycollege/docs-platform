# Legacy Conflicts Reference

> Specific, confirmed conflicts between the CMS global files and embedded widgets. Each entry states the symptom, the root cause file and line, and the minimum fix.

---

## CSS Conflicts

### 1. `position: sticky` silently fails inside `<section>`

**Symptom:** A sticky filter bar, sticky header, or sticky CTA that works in local preview (`python3 -m http.server`) does not stick when deployed to the CMS page.

**Cause:** `app.css` line 10–11:
```css
section {
    overflow-x: hidden;
}
```
`overflow-x: hidden` on an ancestor element creates a new block formatting context that breaks `position: sticky` containment. The browser silently falls back to `position: relative`.

**Fix:** Do not place a sticky element inside a `<section>` ancestor, OR apply `overflow-x: visible` on the wrapping `<section>` using a scoped widget rule. Because you cannot modify `app.css`, the only reliable option is to keep sticky elements outside of `<section>` ancestors, or override the overflow on the specific section via the widget's scoped CSS:
```css
.catalyst-directory section,
section:has(.catalyst-directory) {
  overflow-x: visible;
}
```
Use `overflow: clip` as an alternative if horizontal scroll containment is still needed on the section.

---

### 2. Inline `<style>` blocks: CSS not applied in browser when using bare CDATA

**Symptom:** Component styles defined in an inline `<style>` block inside a Velocity macro appear completely absent in the browser — no layout, no colors, no font overrides.

**Cause:** Cascade CMS validates format output as XHTML. A bare `<![CDATA[` inside a `<style>` element is valid XML (CDATA section), which satisfies Cascade. But when the browser receives the page as `text/html`, the CSS parser encounters the literal text `<![CDATA[` as an unknown token and fails to parse the entire style block.

**Fix:** Wrap CDATA markers in CSS comments so the CSS parser ignores them while the XML parser still sees a valid CDATA section:
```html
<style>
/*<![CDATA[*/
  /* your CSS here */
/*]]>*/
</style>
```
For `<script>` blocks, use JS comment form (already correct): `//<![CDATA[` and `//]]>`.

**Never use:**
```html
<style>
<![CDATA[
  /* this breaks browser CSS parsing */
]]>
</style>
```

---

### 3. `[hidden]` attribute overridden by widget display rules

**Symptom:** An element marked with the `[hidden]` attribute remains visible, or appears briefly before JS hides it.

**Cause:** `foundation.css` line 76:
```css
[hidden],
template {
  display: none;
}
```
No `!important`. A widget rule targeting the same element at equal-or-higher specificity with `display: flex` or `display: grid` will win, keeping the element visible despite `[hidden]`.

**Fix:** For every widget element that uses `display: flex/grid/block` and may also carry `[hidden]`, add a companion rule at the same specificity level:
```css
.catalyst-directory .your-element[hidden] {
  display: none;
}
```

---

### 4. Widget `<h2>`, `<h3>`, `<h4>` are oversized and colored

**Symptom:** Headings inside the widget are larger than intended, have extra margin, and are colored `#444` even if the widget defines no heading color.

**Cause:** `app.css` lines 18–44:
```css
h1, h2, h3, h4 { font-family: 'Source Sans Pro', sans-serif; color: #444; }
h2 { font-size: 2.441rem; margin-top: 1.75rem; margin-bottom: 1.25rem; }
h3 { font-size: 1.953rem; margin-top: 1.5rem; margin-bottom: 1.25rem; }
h4 { font-size: 1.563rem; margin-top: 2.0rem; margin-bottom: 1.5rem; }
```
These are bare element selectors — they apply to every heading on the page.

**Fix:** Widget must explicitly override heading sizes and colors using scoped selectors:
```css
.catalyst-directory h2 { font-size: var(--cd-heading-size); color: var(--cd-text-color); margin-top: 0; margin-bottom: 0; }
```
Use design tokens from `.catalyst-directory { }` root block. Never rely on inherited heading styles.

---

### 5. Widget `<a>` elements are purple and underlined unexpectedly

**Symptom:** Links inside the widget inherit the CMS link color (`#5639a4` purple) or the hover color (`#507F2E` green), or get `text-decoration: underline` if the widget is inside `<main>`.

**Cause:** `app.css` lines 53–68:
```css
a { color: #5639a4; }
a:hover, a:focus { color: #507F2E; }
main a { text-decoration: underline; }
```

**Fix:** Explicitly set link colors within the widget scope on all states:
```css
.catalyst-directory a { color: var(--cd-link-color); text-decoration: none; }
.catalyst-directory a:hover, .catalyst-directory a:focus { color: var(--cd-link-hover-color); }
```

---

### 6. `.button` class gets purple background from app.css

**Symptom:** Any widget element with `class="button"` has a purple background (`#4b3190`) regardless of widget styles.

**Cause:** `app.css` line 75:
```css
.button {
    background-color: #4b3190;
}
```

**Fix:** Avoid the class name `button` on widget elements. Use prefixed class names (e.g., `.cd-button`).

---

### 7. `.modal` and `.modal-content` collide with widget modal elements

**Symptom:** A widget modal element is hidden on page load (`display: none`), positioned fixed over the full viewport, or styled with an unwanted semi-transparent black background.

**Cause:** `app.css` lines 2488–2520 define `.modal` as:
```css
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    padding-top: 100px;
    width: 100%;
    height: 100%;
    background-color: black;
}
```
And `.modal-content`:
```css
.modal-content {
    position: relative;
    background-color: #fefefe;
    width: 90%;
    max-width: 900px;
}
```

**Fix:** Do not use `.modal` or `.modal-content` as class names on widget elements. Use prefixed alternatives (e.g., `.cd-modal`, `.cd-modal-panel`).

---

### 8. `.accordion-title` and `.accordion-content` are styled globally

**Symptom:** Widget accordion trigger buttons have unexpected styling (colors, borders, `::before` pseudo-elements with arrow icons).

**Cause:** `app.css` (line 2261+) and `foundation.css` (line 2092) both define `.accordion-title` and `.accordion-content` styles. `custom-styles.css` adds `span.accordion-title::before`.

**Fix:** Use scoped class names in the widget. `.cd-accordion-trigger`, `.cd-accordion-panel` etc. are safe.

---

### 9. Foundation auto-initializes elements with Foundation data-attributes

**Symptom:** A widget element with `data-accordion`, `data-tabs`, `data-reveal`, `data-toggle`, `data-open`, or `data-close` attributes behaves unexpectedly — it may open/close in response to Foundation's own event system, or Foundation may attempt to initialize a plugin on it.

**Cause:** `app.js` line 1 — `$(document).foundation()` — scans the entire document and initializes Foundation on every matching element. `foundation.util.triggers.js` registers delegated `click.zf.trigger` listeners on any `[data-open]`, `[data-close]`, `[data-toggle]`, `[data-closeable]`, `[data-toggle-focus]` element anywhere on the page.

**Fix:** Do not use Foundation's reserved data-attributes (`data-open`, `data-close`, `data-toggle`, `data-reveal`, `data-accordion`, `data-tabs`, `data-closeable`, `data-closable`, `data-toggle-focus`, `data-yeti-box`, `data-resize`, `data-scroll`, `data-mutate`) on widget elements.

---

### 10. Foundation Reveal `keydown` and `body click` handlers interfere with widget modal

**Symptom:** When a Foundation Reveal modal is open (or was recently open), pressing Escape or clicking outside a widget modal triggers the wrong behavior — possibly closing the Foundation modal instead of the widget modal, or vice versa.

**Cause:** `foundation.reveal.js` lines 333 and 324: On modal open, Foundation attaches:
- `$(window).on('keydown.zf.reveal', ...)` — captures Escape key globally
- `$('body').on('click.zf.reveal', ...)` — captures outside clicks globally

These are namespaced but only removed when the Foundation modal closes. If a widget modal opens while a Foundation modal is open, both handlers are active.

**Fix:** The widget's focus trap and modal close logic must call `event.stopPropagation()` on Escape keydown events originating inside the widget modal. Ensure the widget's `keydown` listener is attached to the modal element itself, not `window` or `document`, to maintain correct specificity in the event chain.

---

### 10. Foundation Reveal intercepts `window.location.hash`

**Symptom:** On page load, if the URL contains a hash that matches a Foundation Reveal modal ID, Foundation opens that modal automatically. This can interfere with widget URL-state management (e.g., `history.pushState`-based filter state).

**Cause:** `foundation.reveal.js` line 87:
```js
if (this.options.deepLink && window.location.hash === '#' + this.id) {
    $(window).one('load.zf.reveal', this.open.bind(this));
}
```
Also: `$(window).on('popstate.zf.reveal:' + this.id, ...)` is registered for each modal.

**Fix:** Widget URL hash values must not match any Foundation Reveal element ID on the page. Use a prefixed hash format (e.g., `#cd-program-slug`) that won't collide with CMS modal IDs.

---

### 11. app.js `$(window).on('resize load', ...)` moves DOM nodes

**Symptom:** On mobile viewport or orientation change, certain CMS page elements move (`.top-nav-wrap` is `insertAfter`/`insertBefore` other elements). This causes layout reflow that can affect widget sticky element positioning if the widget is close to the nav.

**Cause:** `app.js` lines 155–168:
```js
$(window).on('resize load', function () {
    if ($(window).width() < 1022) {
        $(".top-nav-wrap").insertAfter(".primary-nav .menu-centered");
    } else {
        $(".top-nav-wrap").insertBefore(".search-top");
    }
});
```
**Fix:** Not directly actionable in the widget, but know that page reflow happens on every resize. If sticky offsets appear to be wrong after resize, this DOM movement may have changed ancestor element heights. Use `scroll-margin-top` relative to a CSS custom property that accounts for nav height.

---

### 12. Global font override via `*` selector

**Symptom:** Widget elements have `font-family: 'Source Sans Pro'` even if no font is defined in widget CSS.

**Cause:** `app.css` line 7:
```css
* {
    font-family: 'Source Sans Pro', sans-serif;
}
```

**Fix:** This is inherited — it actually works in the widget's favor if Source Sans Pro is the intended font. If you need a different font for any widget element, that element must explicitly override `font-family`.

---

### 13. Duplicate global functions in custom-scripts.js

**Symptom:** Calling `openModal(id)` or `closeModal(id)` from a widget opens the wrong modal or throws an error.

**Cause:** `custom-scripts.js` defines `openModal` and `closeModal` twice. The second definition (which is always the live one) hardcodes `#myModal` as the target — the `id` argument is read but the function calls `document.getElementById("myModal")`, ignoring the argument entirely.

**Fix:** Never call `openModal()` or `closeModal()` globally. Widget modal logic must be entirely self-contained, using references captured at construction time, not global function calls.

---

### 14. `.option-card`, `.option-link`, etc. defined in three stylesheets

**Symptom:** Style applied to `.option-card` in the widget's own CSS is partially overridden by an unexpected rule from a different stylesheet.

**Cause:** The selectors `.option-card`, `.option-cards`, `.option-link`, `.option-link:focus`, `.arrow-icon`, `.card-content h3`, `.card-content p`, `.category-header h2`, `.category-description`, `.program-category`, `.program-category.purple` are defined without any scoping ancestor in **all three of**:
- `app.css` (lines 3872–4047)
- `explore-options.css`
- `program-categories.css`

Last-loaded stylesheet wins for equal specificity. Cascade order is not guaranteed to stay stable.

**Fix:** Do not use these class names in widgets. If a widget happens to use `.option-card`, add `.catalyst-directory .option-card` rules with sufficient specificity to override all three global definitions.

---

## JS Conflicts

### 15. MutationObserver in app.js fires on every widget DOM insertion

**Symptom:** Sluggish DOM performance during rapid widget renders (e.g., filtering 200+ program cards); or unexpected behavior after widget inserts many nodes at once.

**Cause:** `app.js` lines 304–350 attaches a `MutationObserver` on `document.body` with `{ childList: true, subtree: true }`. It fires on every node insertion anywhere in the document, including all widget DOM mutations.

**Fix:** Batch DOM insertions using `DocumentFragment` in the widget to reduce observer callback frequency. The observer only looks for `iframe[src*="wufoo.com"]` nodes, so it's low-impact per callback, but it does fire.

---

### 17. `accordion-accessible.css` overrides button layout — icon not right-aligned

**Symptom:** The `+` / `−` icon inside an `.accordion-trigger-accessible` button sits inline after the label text instead of being pinned to the right edge of the button.

**Cause:** `accordion-accessible.css` is loaded globally on every page. Its `.accordion-trigger-accessible` rule does not use flex layout — the button renders as an inline/block box, so the icon just flows inline after the label. Any widget scoped style that adds the icon via `::before` or a child `<span>` inherits this non-flex layout unless it explicitly overrides `display`.

Foundation's global `button` reset also touches `padding`, `border`, and appearance, and may set `display: inline-block` depending on version.

**Fix:** The widget's scoped trigger rule must explicitly declare all layout properties needed to place the icon. Do not assume the button is flex by default:
```css
.widget-scope .accordion-trigger-accessible {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
}
```
**Confirmed fix location:** `_cms/formats/artgallery/current-exhibits.vm` — `.exhibit-accordion-wrap .accordion-trigger-accessible`.

---

### 16. Slick `keydown` handler intercepts arrow keys

**Symptom:** On pages with a Slick carousel, pressing left/right arrow keys inside a widget input or focused card may advance the carousel instead of (or in addition to) the widget's intended behavior.

**Cause:** Slick's `keyHandler` on `$list keydown` checks `a.keyCode === 37/39` and only skips the handler if `a.target.tagName.match("TEXTAREA|INPUT|SELECT")`. Other focusable elements (buttons, divs with tabindex, custom components) do not get this exclusion.

**Fix:** Widget keyboard handlers for arrow keys should call `event.stopPropagation()` to prevent Slick from receiving the event when focus is inside the widget.
