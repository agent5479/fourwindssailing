/** Prefix public asset paths with Vite `base` (needed for GitHub Pages project sites). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const clean = path.replace(/^\//, '');
  return `${base}${clean}`;
}
