# Legacy JS Inventory

> Extracted from `cascade-js-files/`. These files are loaded globally on every CMS page. Do not modify them. All observations here are read-only reference for conflict diagnosis.

---

## Load order (presumed, based on dependency chain)

1. `jquery.js` / `jquery-3.3.1.js` — jQuery 3.3.1 loaded globally; `$` and `jQuery` are in global scope
2. `foundation.js` + `foundation.core.js` + `foundation.util.*.js` — Foundation 6 framework
3. `foundation.accordion.js`, `foundation.tabs.js`, `foundation.reveal.js` — Foundation component plugins
4. `app.js` — main CMS application logic (calls `$(document).foundation()` on line 1)
5. `custom-scripts.js` — CMS-editor-maintained scripts; fragile and unpredictable
6. `slick156.js` — Slick carousel jQuery plugin
7. `jquery.nanogallery2.js` — NanoGallery2 (15k-line jQuery plugin)
8. `modalslide.js` / `modalslidebc.js` — Custom lightbox-style slide modals
9. `cfcourse.js` / `cfprofiles.js` — ColdFusion data-rendering scripts
10. `easytimer.js` — Timer utility
11. `cookie-warn.js` — Cookie consent UI helper
12. `rotatediv.js` — Rotating banner div helper

---

## app.js — highest-risk file

**Line 1:** `$(document).foundation()` — initializes ALL Foundation components found anywhere on the page. Any element inside a widget that carries a Foundation data attribute (`data-accordion`, `data-tabs`, `data-reveal`, etc.) will be picked up and initialized by Foundation.

### Global event listeners registered by app.js

| Listener target | Event | What it does |
|---|---|---|
| `$('.overlay')` | `click` | Removes `right-active`/`left-adm-active` from `body`; removes `.show` from `.overlay`. Bound at script parse time, not inside `ready`. |
| `$('.right-nav')` | `click` | Toggles `right-active` on body, toggles `.overlay.show` |
| `$('.admissions-burgermenu')` | `click` | Toggles `left-adm-active` on body, toggles `.overlay.show` |
| `$('li.has-dropdown')` | `click` | Opens/closes nav dropdowns by toggling `.active-bg`/`.active-dropdown`; calls `event.stopPropagation()` |
| `$(document)` | `click` on `#pauseButton` | Controls Splide carousel autoplay |
| `$('.splide')` | `mouseenter`, `mouseleave` | Pauses/resumes Splide autoplay |
| `$(window)` | `load` | Footer accordion collapse for mobile |
| `$(window)` | `resize load` | **Moves DOM nodes**: `insertAfter`/`insertBefore` on `.top-nav-wrap` based on viewport width |
| `$(window)` | `load` | Osano cookie consent accessibility fix (via `setTimeout`) |

### Global variables (pollute window scope)

| Variable | Type | Description |
|---|---|---|
| `splide` | object | Splide carousel instance |
| `firstInteraction` | boolean | One-time flag for carousel pause behavior |
| `userPaused` | boolean | Carousel user-pause state |
| `hoverPaused` | boolean | Carousel hover-pause state |

### MutationObserver in app.js (lines ~304–350)

Watches `document.body` with `{ childList: true, subtree: true }`. Fires on **every DOM insertion** anywhere on the page. Looks for `iframe[src*="wufoo.com"]` nodes. This observer is always active. If a widget inserts many DOM nodes rapidly, this observer will fire repeatedly.

Also has a `setInterval` polling at 200ms for up to 10 seconds watching for Osano cookie consent elements. This is always running on page load.

---

## custom-scripts.js — high fragility

**Critical: contains duplicate global function and variable definitions.** The file concatenates at least three separate scripts without namespacing.

### Duplicate globals that will cause undefined behavior

| Name | Defined times | Risk |
|---|---|---|
| `openModal()` | 2 | Second definition overwrites first; single modal ID `"myModal"` hardcoded in v2 |
| `closeModal()` | 2 | Same — v2 always targets `#myModal` regardless of argument |
| `slideIndex` | 2 | Second declaration resets to `1` at parse time |
| `showSlides()` | 2 | v1 takes `(n, modal)`, v2 takes only `(n)` — second overwrites first |

**The second `showSlides()` calls itself immediately on parse** (`showSlides(slideIndex)`) and will throw if `.mySlides` doesn't exist on the page.

### Other globals from custom-scripts.js

| Name | Risk |
|---|---|
| `tickspeed` | Global ticker speed (ProHTML Ticker script) |
| `enablesubject` | Global flag |
| `selectedDiv`, `totalDivs` | Global ticker state |
| `startscroller()`, `contractall()`, `expandone()` | Global ticker functions |

### Event listeners in custom-scripts.js

| Target | Event | Notes |
|---|---|---|
| `$('.spotlight-btn')` | `click` | Toggles `.active` on spotlight panels |
| `$("#year")` | `change` | Filters `.incident-table` rows by year; also calls `.data-year` hide/show |
| `window` | `load` | `startscroller()` call via `addEventListener` or `attachEvent` |

### XHR request in custom-scripts.js

Issues a raw `XMLHttpRequest` on `$(document).ready` to fetch alert data (URL is CMS-environment-specific via Cascade template tags). Appends HTML string directly into `#emergency-alert` via `$(alertParent).append(alertContent)`. The appended HTML includes `data.link`, `data.title`, and `data.summary` — these are not sanitized before insertion. Not a widget concern but relevant as a DOM mutation that fires on every page.

---

## Foundation JS — behavioral summary

### foundation.util.triggers.js

Registers **delegated listeners on the document** for all of the following data-attributes. Any element anywhere on the page carrying these attributes will be picked up:

- `[data-open]` → `click.zf.trigger`
- `[data-close]` → `click.zf.trigger`
- `[data-toggle]` → `click.zf.trigger`
- `[data-closeable]` / `[data-closable]` → `close.zf.trigger`
- `[data-toggle-focus]` → `focus.zf.trigger blur.zf.trigger`
- `[data-resize]` → MutationObserver / resize events
- `[data-scroll]` → MutationObserver / scroll events
- `[data-yeti-box]` → closeme events

**Risk:** If a widget uses any of these data-attributes for its own purposes, Foundation will capture those clicks/events and attempt to trigger Foundation plugin open/close logic.

### foundation.reveal.js

- Watches `window.location.hash` on load to auto-open modals matching `#<modal-id>`
- Registers `popstate.zf.reveal:<id>` on `window` for every modal on the page
- On modal open: registers `keydown.zf.reveal` on `window` (for Escape key)
- On modal open: registers `click.zf.reveal` on `body` (for overlay click-to-close)
- Both are removed on modal close via `$(window).off('keydown.zf.reveal')` and `$('body').off('click.zf.reveal')`
- **Risk:** If the widget's own modal opens while a Foundation Reveal modal is open, the Foundation keydown/body-click handlers remain active and may capture widget modal events.

### foundation.tabs.js

- Binds `click.zf.tabs` on `.tab-link` class elements (within Foundation tab containers)
- Binds `keydown.zf.tabs` on Foundation tab title elements
- Listens for `changed.zf.mediaquery` on `window`

### foundation.accordion.js

- Binds `click.zf.accordion` and `keydown.zf.accordion` on `children('a')` of accordion items
- Generic `.accordion-title` and `.accordion-content` class names — same classes used by `app.css` and `custom-styles.css` for CMS accordions

---

## modalslide.js / modalslidebc.js

Short scripts (~40 lines each). Each defines `openModal(id)`/`closeModal(id)` as globals — these names conflict with the same functions in `custom-scripts.js`. The last definition to load wins.

No event listeners registered beyond the called functions. No `keydown` handling — modals opened by these scripts have no Escape-to-close or focus trap.

---

## slick156.js

Attaches the following listeners **on every Slick instance initialization**:

| Target | Events |
|---|---|
| `$(window)` | `orientationchange.slick.*`, `resize.slick.*`, `load.slick.*` |
| `$(document)` | `ready.slick.*`, `visibilitychange` |
| `$list` (slider element) | `touchstart`, `mousedown`, `touchmove`, `mousemove`, `touchend`, `mouseup`, `touchcancel`, `mouseleave`, `click`, `mouseenter`, `keydown` |

All Slick events are namespaced `.slick` so they can be cleaned up, but the `window` and `document` listeners are always active while a carousel exists on the page.

---

## cfcourse.js / cfprofiles.js

ColdFusion-driven scripts that render dynamic content. No global event listeners identified beyond their own DOM-ready blocks. Manipulate the DOM inside their own container elements. Low conflict risk for embedded widgets, but their `$(document).ready` blocks add to the DOM-ready callback queue.

---

## jquery.nanogallery2.js (~16k lines)

Large jQuery plugin. Only active on pages that explicitly call `$(...).nanogallery2(...)`. No passive global side effects identified. If active on the same page as a widget, the gallery's touch/swipe handlers on its container could interfere with widget scroll behavior if the containers overlap.

---

## Files with no global event risk

- `easytimer.js` — utility library, no self-initializing listeners
- `cookie-warn.js` — manages cookie consent banner; does not interfere with widget DOM
- `rotatediv.js` — rotates a specific CMS element; no known intersection
