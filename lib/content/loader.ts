import {cache} from 'react';
import {kv} from '@vercel/kv';
import {isKvConfigured} from '@/lib/kv/config';
import {
  CONTENT_ALL_KEY,
  type ContentStore,
  type PagesContentData,
  type SiteContentData,
  deepMerge,
  getDefaultContent,
} from '@/lib/content/utils';

export const getContentBundle = cache(async (): Promise<{
  site: SiteContentData;
  pages: PagesContentData;
  lastModified: string | null;
}> => {
  const defaults = getDefaultContent();

  if (!isKvConfigured()) {
    return {
      site: defaults.site,
      pages: defaults.pages,
      lastModified: null,
    };
  }

  try {
    const stored = await kv.get<ContentStore>(CONTENT_ALL_KEY);
    if (stored?.site || stored?.pages) {
      return {
        site: deepMerge(defaults.site, (stored.site ?? {}) as Partial<SiteContentData>),
        pages: deepMerge(defaults.pages, (stored.pages ?? {}) as Partial<PagesContentData>),
        lastModified: stored.lastModified ?? null,
      };
    }
  } catch (error) {
    console.error('Error loading content from KV:', error);
  }

  return {
    site: defaults.site,
    pages: defaults.pages,
    lastModified: null,
  };
});

export async function getStoredContentStore(): Promise<ContentStore | null> {
  if (!isKvConfigured()) return null;

  try {
    return await kv.get<ContentStore>(CONTENT_ALL_KEY);
  } catch {
    return null;
  }
}

export async function saveContentStore(store: ContentStore): Promise<void> {
  if (!isKvConfigured()) return;
  await kv.set(CONTENT_ALL_KEY, store);
}
