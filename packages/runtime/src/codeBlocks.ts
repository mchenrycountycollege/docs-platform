/** How long a code block's "Copy" stays flipped to "Copied!" before reverting. */
const COPIED_RESET_MS = 2000;

/**
 * Wraps every <pre> in .docs-body with a .code-block box and a "Copy" button
 * (same markup as apps/editor's codeBlocks.ts). Must run before initBionic,
 * which snapshots the body's HTML once and restores from that snapshot on
 * every toggle -- running first puts the buttons in the snapshot. The click
 * listener is delegated from .docs-body for the same reason: a restore
 * re-creates the buttons, dropping any listener bound to them directly.
 */
export function initCodeBlocks(): void {
  const body = document.querySelector<HTMLElement>(".docs-body");
  if (!body) return;

  body.querySelectorAll("pre").forEach((pre) => {
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.setAttribute("aria-live", "polite");
    button.textContent = "Copy";
    pre.replaceWith(wrapper);
    wrapper.append(button, pre);
  });

  body.addEventListener("click", (event) => {
    void copyFromButton(event.target);
  });
}

async function copyFromButton(target: EventTarget | null): Promise<void> {
  if (!(target instanceof Element)) return;
  const button = target.closest<HTMLButtonElement>(".code-copy");
  const pre = button?.parentElement?.querySelector("pre");
  if (!button || !pre) return;

  // navigator.clipboard only exists in a secure context. Without it, select
  // the code so the reader can copy it by hand.
  try {
    if (!navigator.clipboard) throw new Error("no clipboard");
    await navigator.clipboard.writeText(pre.textContent ?? "");
    button.textContent = "Copied!";
  } catch {
    window.getSelection()?.selectAllChildren(pre);
    button.textContent = "Selected";
  }
  setTimeout(() => {
    button.textContent = "Copy";
  }, COPIED_RESET_MS);
}
