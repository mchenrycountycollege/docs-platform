import { buildTree, deriveBookSlug, fetchNav, renderBreadcrumb, renderSidebar } from "./nav.js";
import { initSearch } from "./search.js";
import { initChrome } from "./chrome.js";
import { initToc } from "./toc.js";
import type { RuntimeConfig } from "./types.js";

function readConfig(): RuntimeConfig | null {
  const el = document.getElementById("docs-runtime-config");
  if (!el?.textContent) return null;
  // page-render.vm wraps this script's body in a `//<![CDATA[ ... //]]>`
  // guard so a title containing `&`/`<` still serializes as valid XHTML.
  // That's a JS-comment idiom -- meaningless for a type="application/json"
  // tag, which is never parsed as JS -- so the markers are still literally
  // in textContent and have to be stripped before JSON.parse will succeed.
  const raw = el.textContent
    .replace(/^\s*\/\/<!\[CDATA\[/, "")
    .replace(/\/\/\]\]>\s*$/, "")
    .trim();
  try {
    return JSON.parse(raw) as RuntimeConfig;
  } catch {
    return null;
  }
}

function boot(): void {
  initChrome();

  const config = readConfig();
  if (!config) return;

  // The DD's `title` field is the only place the real title lives -- the
  // built-in Cascade Title metadata field is deliberately left unset (see
  // implementation-checklist.md Phase 2), so <system-page-title/> in the
  // Template would render blank. Setting it here from the config the
  // Format already emits avoids adding that coupling to the write path.
  document.title = `${config.title} · MCC Docs`;

  const sidebarEl = document.getElementById("docs-sidebar");
  const breadcrumbEl = document.getElementById("breadcrumb");
  if (sidebarEl) {
    const bookSlug = deriveBookSlug(config.path);
    fetchNav(bookSlug)
      .then((nav) => {
        const tree = buildTree(nav);
        renderSidebar(sidebarEl, tree, config.path);
        if (breadcrumbEl) renderBreadcrumb(breadcrumbEl, tree, bookSlug, config.path);
      })
      .catch((err) => {
        console.error("docs-runtime: failed to load navigation", err);
      });
  }

  initSearch({ searchUrl: config.searchUrl });
  initToc();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
