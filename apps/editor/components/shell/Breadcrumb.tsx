"use client";

import { deriveBookSlug, folderDisplayName, humanizeSlug, type NavTree } from "@docs-platform/doc-shell";

/** React port of runtime/nav.ts's renderBreadcrumb -- same crumb-finding logic (via doc-shell), rendered as JSX instead of innerHTML. */
export function Breadcrumb({ tree, currentPath }: { tree: NavTree | null; currentPath: string | null }) {
  if (!currentPath) return <nav aria-label="Breadcrumb" className="breadcrumb" />;

  const bookSlug = deriveBookSlug(currentPath);
  const chapter = tree?.chapters.find((c) => c.pages.some((p) => p.path === currentPath));
  const page = chapter?.pages.find((p) => p.path === currentPath);

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <span className="crumb">{humanizeSlug(bookSlug)}</span>
      {chapter?.folder && (
        <>
          <Sep />
          <span className="crumb">{folderDisplayName(chapter.folder)}</span>
        </>
      )}
      {page && (
        <>
          <Sep />
          <span className="current">{page.title}</span>
        </>
      )}
    </nav>
  );
}

function Sep() {
  return (
    <span aria-hidden="true">/</span>
  );
}
