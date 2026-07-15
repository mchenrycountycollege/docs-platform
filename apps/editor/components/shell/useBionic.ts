"use client";

import { useEffect, useState } from "react";

const BIONIC_KEY = "docs-bionic";
const SKIP_SELECTOR = "code, pre, script, style, svg";
const WORD_RE = /[A-Za-z]+(?:['’][A-Za-z]+)*/g;

/**
 * React port of runtime/bionic.ts's preference half (localStorage + <html>
 * data attribute, same key/shape as useTheme). The DOM transform itself is
 * applied separately and scoped to PageView's read-only .docs-body -- see
 * applyBionic below -- since inserting <b> tags into DocEditor's editable
 * BlockNote canvas would corrupt the document that gets saved.
 */
export function useBionicPreference(): [boolean, () => void] {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(BIONIC_KEY) === "on";
    setOn(saved);
    document.documentElement.setAttribute("data-bionic", saved ? "on" : "off");
  }, []);

  function toggle() {
    setOn((current) => {
      const next = !current;
      document.documentElement.setAttribute("data-bionic", next ? "on" : "off");
      localStorage.setItem(BIONIC_KEY, next ? "on" : "off");
      return next;
    });
  }

  return [on, toggle];
}

export function bionicSplit(word: string): [bold: string, rest: string] {
  const boldLen = Math.max(1, Math.round(word.length * 0.45));
  return [word.slice(0, boldLen), word.slice(boldLen)];
}

function bionicFragmentForText(text: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  let lastIndex = 0;
  for (const match of text.matchAll(WORD_RE)) {
    const word = match[0];
    const index = match.index ?? 0;
    if (index > lastIndex) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex, index)));
    }
    const [bold, rest] = bionicSplit(word);
    const b = document.createElement("b");
    b.textContent = bold;
    fragment.appendChild(b);
    if (rest) fragment.appendChild(document.createTextNode(rest));
    lastIndex = index + word.length;
  }
  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
  return fragment;
}

/**
 * Walks a read-only body's text nodes and bolds each word's leading ~45%,
 * matching runtime/bionic.ts exactly. Caller owns pristine-HTML capture and
 * restore (see PageView's bodyHtml effect) -- this only ever applies forward.
 */
export function applyBionic(body: HTMLElement): void {
  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_SKIP;
      if (node.parentElement?.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) nodes.push(n as Text);

  for (const node of nodes) {
    node.replaceWith(bionicFragmentForText(node.textContent ?? ""));
  }
}
