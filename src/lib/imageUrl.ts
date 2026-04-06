import { env } from '@/env';

const ABSOLUTE_URL_PATTERN = /^(https?:)?\/\//i;

function toContentPath(path: string) {
  const normalizedPath = path.replace(/^\/+/, '');
  return normalizedPath.startsWith('content/')
    ? `/${normalizedPath}`
    : `/content/${normalizedPath}`;
}

export function resolveProductImageUrl(path?: string | null) {
  if (!path) return undefined;
  if (path.startsWith('data:')) return path;

  if (ABSOLUTE_URL_PATTERN.test(path)) {
    if (path.includes('/content/')) return path;

    const apiBaseUrl = env.apiBaseUrl?.trim();
    if (!apiBaseUrl) return path;

    const apiOrigin = new URL(apiBaseUrl).origin;
    const sourceUrl = new URL(path, apiOrigin);

    if (sourceUrl.origin !== apiOrigin) return path;

    sourceUrl.pathname = toContentPath(sourceUrl.pathname);
    return sourceUrl.toString();
  }

  const normalizedBaseUrl = env.apiBaseUrl.replace(/\/+$/, '');
  if (!normalizedBaseUrl) return path;

  return `${normalizedBaseUrl}${toContentPath(path)}`;
}
