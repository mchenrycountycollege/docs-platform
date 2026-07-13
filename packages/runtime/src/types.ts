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

export interface RuntimeConfig {
  path: string;
  title: string;
  searchUrl: string;
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
