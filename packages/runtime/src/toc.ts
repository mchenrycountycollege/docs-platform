function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section"
  );
}

// "On this page" outline, built client-side from whatever h2s ended up in
// the rendered body -- page-render.vm's own comment already established
// the precedent that per-page structure like this is "brittle to guess
// correctly in Velocity" and belongs here instead. Leaves the rail box
// hidden (its default state in page-render.vm's markup) when there's
// nothing to show, rather than rendering an empty "On this page" heading.
export function initToc(): void {
  const content = document.querySelector(".docs-body");
  const tocBox = document.getElementById("page-toc-box");
  const tocList = document.getElementById("page-toc");
  if (!content || !tocBox || !tocList) return;

  const headings = Array.from(content.querySelectorAll("h2"));
  if (headings.length === 0) return;

  const used = new Set<string>();
  tocList.innerHTML = "";
  for (const heading of headings) {
    if (!heading.id) {
      const base = slugify(heading.textContent || "section");
      let unique = base;
      let n = 2;
      while (used.has(unique)) {
        unique = `${base}-${n++}`;
      }
      heading.id = unique;
    }
    used.add(heading.id);

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent || "";
    li.appendChild(a);
    tocList.appendChild(li);
  }

  tocBox.style.display = "";
}
