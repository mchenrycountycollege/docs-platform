export class Forbidden extends Error {
  constructor(rawPath: string) {
    super(`Path is outside the docs/ subtree: ${rawPath}`);
    this.name = "Forbidden";
  }
}

const ROOT = "docs";

/**
 * Defense-in-depth path guard. The Cascade service account is already scoped to
 * docs/ (see Manual configuration steps A), but every proxy/Action write also
 * runs this check before touching Cascade.
 */
export function assertInScope(rawPath: string): string {
  const norm = rawPath.replace(/\/+/g, "/").replace(/\/+$/, "");
  const segs = norm.split("/");
  if (segs.includes("..") || segs.includes(".")) throw new Forbidden(rawPath);
  if (norm !== ROOT && !norm.startsWith(ROOT + "/")) throw new Forbidden(rawPath);
  return norm;
}
