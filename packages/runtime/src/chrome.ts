const THEME_KEY = "docs-theme";

export function initChrome(): void {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const shell = document.getElementById("shell");

  function applyTheme(mode: string): void {
    root.setAttribute("data-theme", mode);
    localStorage.setItem(THEME_KEY, mode);
  }

  const saved = localStorage.getItem(THEME_KEY);
  if (saved) applyTheme(saved);

  themeToggle?.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  menuToggle?.addEventListener("click", () => {
    const open = shell?.classList.toggle("nav-open") ?? false;
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}
