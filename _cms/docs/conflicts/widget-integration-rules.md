# Widget Integration Rules

> Practical rules for safely building new widgets that embed in the MCC Cascade CMS page. These rules are derived directly from the global CSS and JS files in `cascade-css-files/` and `cascade-js-files/`. Follow these to avoid the conflicts documented in `legacy-conflicts.md`.

---

## CSS rules

### Rule 1: Every widget rule must be scoped to a unique root class

All CSS must live under a root selector that matches the widget's container element. Example for the Catalyst directory widget:

```css
.catalyst-directory {
  /* all rules go here */
}
.catalyst-directory .card { ... }
.catalyst-directory h2 { ... }
```

This is the only reliable protection against the unscoped element selectors in `app.css` (`* { }`, `section { }`, `h2 { }`, `a { }`, etc.).

**Never** write bare element or generic class rules at the top level in a widget stylesheet.

---

### Rule 2: Always override heading styles explicitly inside the widget scope

The global `app.css` sets headings to `font-size: 2.441rem` (h2), `1.953rem` (h3), `1.563rem` (h4), all with `color: #444` and substantial top/bottom margins.

Inside the widget scope, explicitly set:

```css
.catalyst-directory h2,
.catalyst-directory h3,
.catalyst-directory h4 {
  font-size: var(--cd-*); /* use your token */
  color: var(--cd-*);
  margin-top: 0;
  margin-bottom: 0;
}
```

---

### Rule 3: Override link styles explicitly inside the widget scope

`app.css` makes all `<a>` elements purple (`#5639a4`) with a green hover (`#507F2E`). `main a` gets `text-decoration: underline`. Override at all states:

```css
.catalyst-directory a { color: var(--cd-link-color); text-decoration: none; }
.catalyst-directory a:hover,
.catalyst-directory a:focus { color: var(--cd-link-hover-color); text-decoration: none; }
```

---

### Rule 4: Always pair `[hidden]` with an explicit `display: none` companion rule

Foundation's `[hidden]` rule has no `!important`. Any widget rule applying `display: flex/grid/block` to the same element will silently win and keep the element visible.

Every time you write a widget rule like:

```css
.catalyst-directory .my-panel {
  display: flex;
}
```

Also write:

```css
.catalyst-directory .my-panel[hidden] {
  display: none;
}
```

---

### Rule 5: Never use these class names without a scoping ancestor

These names are defined without scope by CMS stylesheets and will collide:

| Avoid | Collision source |
|---|---|
| `.modal` | `app.css` — `display: none; position: fixed; z-index: 1000; width/height: 100%` |
| `.modal-content` | `app.css` — position relative, max-width 900px |
| `.button` | `app.css` — purple background |
| `.accordion-title` | `app.css` + `foundation.css` — visual styles + `::before` pseudo-element |
| `.accordion-content` | `app.css` + `foundation.css` |
| `.accordion` | `foundation.css` |
| `.option-card` | `app.css` + `explore-options.css` + `program-categories.css` |
| `.option-link` | Same three files |
| `.option-cards` | Same three files |
| `.card-content` | `app.css` |
| `.arrow-icon` | `app.css` + `explore-options.css` + `program-categories.css` |
| `.category-header` | Multiple files |
| `.program-category` | Multiple files |
| `.directory` | `app.css` — multiple scoped rules against `.directory` exist |

Use a widget-specific prefix (e.g., `.cd-`, `.catalyst-`) for all internal class names.

---

### Rule 6: Do not place sticky elements inside `<section>`

`app.css` applies `overflow-x: hidden` to all `<section>` elements globally. This silently breaks `position: sticky`. Check the DOM ancestry of the widget container in the CMS page.

If the widget must sit inside a `<section>`, override overflow at the section level using the widget root as a descendant selector context. Do not override globally.

```css
/* Only if truly necessary and no layout breakage results */
section:has(.catalyst-directory) {
  overflow-x: visible;
}
```

---

### Rule 7: Use `position: sticky` over `position: fixed` where possible

`position: fixed` elements:
- Ignore page scroll containers and are always relative to the viewport
- Are subject to z-index contention with the CMS nav (z-index 999–1000) and dropdowns (z-index 1000)
- Are harder to debug when the CMS adds its own fixed chrome

Use `position: sticky` when the sticky element is within the widget's own scroll container. Define the offset as a CSS custom property so other elements can compensate:

```css
.catalyst-directory {
  --cd-sticky-offset: 60px; /* approximate CMS nav height */
}
.catalyst-directory .sticky-toolbar {
  position: sticky;
  top: var(--cd-sticky-offset);
  z-index: 200; /* well below CMS nav at 999, but above widget content */
}
```

---

### Rule 8: Widget z-index must stay in a well-defined range

Reserve internal widget z-index values in a predictable band:

| Layer | Suggested z-index | Notes |
|---|---|---|
| Widget base content | 1–9 | Cards, text, images |
| Widget sticky controls | 10–99 | Sticky filter bar, sticky clarity buttons |
| Widget tray/drawer | 100–199 | My List tray, slide-in panels |
| Widget modal backdrop | 200–399 | Overlay behind modal |
| Widget modal panel | 400–499 | The modal itself |

Stay below 999 to remain under the CMS top nav. Stay below 1000 to remain under the CMS nav dropdown and `.modal` class.

---

### Rule 9: All motion must respect `prefers-reduced-motion`

The CMS global files do not add a global `prefers-reduced-motion` override. Each widget is responsible for its own. Any transition or animation added must have a corresponding override:

```css
@media (prefers-reduced-motion: reduce) {
  .catalyst-directory .your-animated-element {
    transition: none;
    animation: none;
  }
}
```

---

### Rule 10: All design values must use CSS custom properties

Define tokens in the widget root block:

```css
.catalyst-directory {
  --cd-color-primary: #4b3190;
  --cd-color-accent: #507F2E;
  --cd-font-size-base: 1rem;
  /* etc. */
}
```

Never hardcode hex values or pixel values that have a corresponding token. This ensures that when the CMS global stylesheet changes a baseline (e.g., body font-size), the widget can be updated in one place.

---

## JS rules

### Rule 11: Do not use Foundation's reserved data-attributes

The following data-attributes are captured by Foundation's global trigger system (`foundation.util.triggers.js`) and will cause Foundation to respond to clicks/events on those elements:

```
data-open, data-close, data-toggle, data-closeable, data-closable,
data-toggle-focus, data-yeti-box, data-resize, data-scroll, data-mutate,
data-accordion, data-tabs, data-reveal, data-dropdown
```

Use widget-prefixed data-attributes instead: `data-cd-open`, `data-cd-key`, etc.

---

### Rule 12: Widget event listeners must stop propagation at the widget boundary

Global JS files (Slick, Foundation Reveal, app.js nav handlers) listen for `click`, `keydown`, and `touchstart` at `document`, `window`, or `body` level. Widget events can bubble up and trigger these handlers.

For any keyboard or click interaction that is fully handled by the widget, call `event.stopPropagation()` to prevent it from reaching global handlers.

Particularly important for:
- Escape key (Foundation Reveal captures this on `window` while a Foundation modal is open)
- Arrow keys (Slick captures left/right on its `$list keydown`)
- Click on overlay/backdrop (Foundation Reveal captures body click while open)

---

### Rule 13: Do not call global `openModal()` or `closeModal()`

`custom-scripts.js` defines these functions twice with incompatible signatures. The live version hardcodes `#myModal` and ignores the `id` argument. The widget must manage its own modal state internally using element references, never by calling these globals.

---

### Rule 14: Do not set `window.location.hash` to a value that matches a CMS element ID

Foundation Reveal (`foundation.reveal.js` line 87) auto-opens any element whose ID matches `window.location.hash` on page load. If the widget uses `history.pushState` to encode state in the URL hash, those hash values must not collide with Foundation Reveal element IDs on the page.

Use a hash prefix that will never match a CMS ID. Example: `#cd-` prefix for all Catalyst widget hash states.

---

### Rule 15: Batch DOM insertions to reduce MutationObserver overhead

`app.js` runs a `MutationObserver` on `document.body` with `subtree: true`. It fires on every node insertion. When the widget renders many cards (e.g., 200+ program cards), use `DocumentFragment` to batch the insertions into a single DOM operation:

```js
const fragment = document.createDocumentFragment();
programs.forEach(p => fragment.appendChild(buildCard(p)));
container.appendChild(fragment); // one DOM mutation, not 200
```

---

### Rule 16: Do not use `$` or call jQuery methods in widget code

jQuery is loaded globally, but the widget should not depend on it. If the widget uses vanilla JS and jQuery is later updated or removed from the CMS, the widget will break. Use vanilla DOM APIs throughout the widget.

If interoperability is needed (e.g., listening for Foundation's jQuery-namespaced events), isolate that code explicitly and document the jQuery dependency.

---

### Rule 17: Widget modal focus trap must be self-managing

Foundation Reveal manages its own focus trap while a Foundation modal is open. If a widget modal opens at the same time:

1. The widget must run its own `focusin`/`keydown` Tab handler — do not rely on the Foundation one
2. The widget must call its own `removeFocusTrap()` cleanup explicitly on every close path (Escape key, backdrop click, close button)
3. Do not attach the widget's focus trap to `document` or `window` — attach to the modal element itself

Leaking a `document` keydown listener breaks keyboard globally for the rest of the page session.

---

## Debugging checklist for "works locally, broken in CMS"

When a bug only appears in the Cascade CMS environment and not in local `python3 -m http.server` preview, work through this list before reading more code:

1. **CSS: Is it a sticky element that stopped sticking?** → Check for `<section>` ancestor with `overflow-x: hidden` from `app.css`. See conflict #1.
2. **CSS: Is an element with `[hidden]` visible when it should be hidden?** → Missing paired `[hidden]` companion rule. See conflict #2.
3. **CSS: Is a class name styled unexpectedly?** → Check `legacy-css-inventory.md` for the class name. It may be in `app.css`, `explore-options.css`, or `program-categories.css`.
4. **JS: Did a click handler not fire on mobile?** → Add `console.log('[CD] handler entry')` at the top of the handler. If it doesn't appear, a global handler is swallowing the event. Check `app.js` overlay click and nav dropdown click handlers.
5. **JS: Did pressing Escape do nothing or close the wrong thing?** → Foundation Reveal may be capturing it. Check if any Foundation modal was previously opened on the page.
6. **JS: Did a Foundation toggle/open/close fire on a widget element?** → Widget element is using a Foundation reserved data-attribute. See rule #11.
7. **JS: Is behavior intermittent or environment-specific only?** → Check `custom-scripts.js` for conflicting global variables or duplicate function definitions.
8. **CSS: Is a style wrong in staging but not in production, or vice versa?** → `app-dev.css` vs `app.css` differ. Inspect which stylesheet the winning rule comes from in DevTools.
