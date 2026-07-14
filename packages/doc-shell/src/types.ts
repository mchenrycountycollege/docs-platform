// Framework-agnostic nav + search types shared by every renderer (the public
// reader in `packages/runtime`, the editor front-door in `apps/editor`). These
// describe the shape of the already-fetched `nav.json` / `search-index.json`
// artifacts Cascade publishes; nothing here fetches or touches the DOM.

export interface NavFolder {
  type: "folder";
  path: string;
  // Not always present -- see folderDisplayName() in nav.ts.
  displayName?: string;
}

export interface NavPage {
  type: "page";
  path: string;
  title: string;
  order: string;
  tags: string[];
}

export interface NavResponse {
  folders: NavFolder[];
  pages: NavPage[];
}

export interface SearchEntry {
  title: string;
  path: string;
  tags: string[];
  excerpt: string;
}

export interface SearchResponse {
  pages: SearchEntry[];
}

// One sidebar section: a real chapter folder, or `folder: null` for pages
// that sit directly under the book root (no chapter).
export interface NavChapter {
  folder: NavFolder | null;
  pages: NavPage[];
}

export interface NavTree {
  chapters: NavChapter[];
}
