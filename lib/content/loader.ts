import {cache} from 'react';
import {isKvConfigured} from '@/lib/kv/config';
import {
  CONTENT_ALL_KEY,
  type ContentStore,
  type PagesContentData,
  type SiteContentData,
  deepMerge,
  getDefaultContent,
} from '@/lib/content/utils';

// Cloudflare KV client — uses getRequestContext() to access the KV binding
type CloudflareKV = {
  get(key: string, options?: { type?: 'text' | 'json' | 'arrayBuffer' | 'stream' }): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number; metadata?: unknown }): Promise<void>;
};

async function getKV(): Promise<CloudflareKV | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const ctx = getCloudflareContext();
    return ((ctx.env as Record<string, unknown>).KV as CloudflareKV) ?? null;
  } catch {
    return null;
  }
}

async function kvGetJSON<T>(key: string): Promise<T | null> {
  const kv = await getKV();
  if (!kv) return null;
  try {
    const raw = await kv.get(key, { type: 'text' });
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function kvSetJSON(key: string, value: unknown): Promise<void> {
  const kv = await getKV();
  if (!kv) throw new Error('KV not available');
  await kv.put(key, JSON.stringify(value));
}

export const getContentBundle = cache(async (): Promise<{
  site: SiteContentData;
  pages: PagesContentData;
  lastModified: string | null;
}> => {
  const defaults = getDefaultContent();

  if (!(await isKvConfigured())) {
    return {
      site: defaults.site,
      pages: defaults.pages,
      lastModified: null,
    };
  }

  try {
    const stored = await kvGetJSON<ContentStore>(CONTENT_ALL_KEY);
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
  if (!(await isKvConfigured())) return null;

  try {
    return await kvGetJSON<ContentStore>(CONTENT_ALL_KEY);
  } catch {
    return null;
  }
}

export async function saveContentStore(store: ContentStore): Promise<void> {
  if (!(await isKvConfigured())) return;
  await kvSetJSON(CONTENT_ALL_KEY, store);
}
