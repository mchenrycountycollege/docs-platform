"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "docs-theme";

/** React port of runtime/chrome.ts's theme toggle -- same localStorage key, same fallback to the OS preference, so a user's choice on the public reader and the editor agree if they ever share a browser. */
export function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }

  return [theme, toggle];
}
