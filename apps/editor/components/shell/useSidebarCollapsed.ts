"use client";

import { useEffect, useState } from "react";

const COLLAPSED_KEY = "docs-sidebar-collapsed";

/** Persisted desktop sidebar collapse -- same localStorage-after-mount pattern as useSidebarWidth, to avoid a hydration mismatch against Next's static prerender. */
export function useSidebarCollapsed(): [boolean, () => void] {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSED_KEY) === "1");
  }, []);

  function toggle() {
    setCollapsed((current) => {
      const next = !current;
      localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
      return next;
    });
  }

  return [collapsed, toggle];
}
