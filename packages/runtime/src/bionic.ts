const BIONIC_KEY = "docs-bionic";
const SKIP_SELECTOR = "code, pre, script, style, svg";
const WORD_RE = /[A-Za-z]+(?:['’][A-Za-z]+)*/g;

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

function applyBionic(body: HTMLElement, originalHtml: string): void {
  body.innerHTML = originalHtml;

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

export function initBionic(): void {
  const root = document.documentElement;
  const body = document.querySelector<HTMLElement>(".docs-body");
  const bionicToggle = document.getElementById("bionicToggle");
  if (!body || !bionicToggle) return;

  const originalHtml = body.innerHTML;

  function setBionic(on: boolean): void {
    if (!body) return;
    if (on) {
      applyBionic(body, originalHtml);
    } else {
      body.innerHTML = originalHtml;
    }
    root.setAttribute("data-bionic", on ? "on" : "off");
    localStorage.setItem(BIONIC_KEY, on ? "on" : "off");
    bionicToggle?.setAttribute("aria-pressed", String(on));
  }

  const saved = localStorage.getItem(BIONIC_KEY);
  if (saved === "on") setBionic(true);

  bionicToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-bionic") === "on";
    setBionic(!current);
  });
}
