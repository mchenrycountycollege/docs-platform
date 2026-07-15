"use client";

import { useEffect, useRef, useState } from "react";

const WIDTH_KEY = "docs-sidebar-width";
const DEFAULT_WIDTH = 280;
const MIN_WIDTH = 220;
const MAX_WIDTH = 480;

function clamp(width: number): number {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width));
}

export interface SidebarDrag {
  width: number;
  onDragStart: (clientX: number) => void;
  onDragMove: (clientX: number) => void;
  onDragEnd: () => void;
}

/** Persisted, drag-resizable sidebar width -- same localStorage-after-mount pattern as useTheme, to avoid a hydration mismatch against Next's static prerender. */
export function useSidebarWidth(): SidebarDrag {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const dragStart = useRef<{ pointerX: number; startWidth: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(WIDTH_KEY);
    if (saved) setWidth(clamp(parseInt(saved, 10)));
  }, []);

  function onDragStart(clientX: number) {
    dragStart.current = { pointerX: clientX, startWidth: width };
  }

  function onDragMove(clientX: number) {
    if (!dragStart.current) return;
    setWidth(clamp(dragStart.current.startWidth + (clientX - dragStart.current.pointerX)));
  }

  function onDragEnd() {
    dragStart.current = null;
    setWidth((current) => {
      localStorage.setItem(WIDTH_KEY, String(current));
      return current;
    });
  }

  return { width, onDragStart, onDragMove, onDragEnd };
}
