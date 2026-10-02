/** How long a code block's "Copy" stays flipped to "Copied!" before reverting. */
const COPIED_RESET_MS = 2000;

/**
 * Wraps every <pre> in a read-only body with a .code-block box and a "Copy"
 * button. Runs before PageView captures its pristine HTML, so the buttons
 * survive a Bionic on/off restore. Clicks are handled by handleCodeCopyClick,
 * delegated from .docs-body, because a restore re-creates the buttons and
 * would drop any listener bound to them directly.
 */
export function addCodeCopyButtons(body: HTMLElement): void {
  for (const pre of body.querySelectorAll("pre")) {
    if (pre.parentElement?.classList.contains("code-block")) continue;
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.setAttribute("aria-live", "polite");
    button.textContent = "Copy";
    pre.replaceWith(wrapper);
    wrapper.append(button, pre);
  }
}

export async function handleCodeCopyClick(target: EventTarget): Promise<void> {
  if (!(target instanceof Element)) return;
  const button = target.closest<HTMLButtonElement>(".code-copy");
  const pre = button?.parentElement?.querySelector("pre");
  if (!button || !pre) return;

  // navigator.clipboard only exists in a secure context. Without it, select
  // the code so the reader can copy it by hand -- a prompt() like Copy link
  // uses would flatten a multi-line block onto one line.
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
