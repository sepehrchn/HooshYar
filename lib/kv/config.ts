/**
 * Cloudflare Workers KV binding configuration.
 *
 * On Cloudflare Workers, KV is accessed via a binding (ctx.env.KV)
 * rather than Vercel KV REST API credentials. The binding must be
 * configured in wrangler.jsonc under "kv_namespaces".
 */

let cachedKvAvailable: boolean | null = null;

/**
 * True when the Cloudflare KV binding is accessible.
 * Uses a lightweight runtime check — cached after first call.
 */
export async function isKvConfigured(): Promise<boolean> {
  if (cachedKvAvailable !== null) return cachedKvAvailable;

  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const ctx = getCloudflareContext();
    cachedKvAvailable = Boolean((ctx.env as Record<string, unknown>).KV);
  } catch {
    cachedKvAvailable = false;
  }
  return cachedKvAvailable;
}

/**
 * Synchronous version for code paths that can't await.
 * Returns true optimistically — the actual KV call will fail gracefully
 * if the binding is missing.
 */
export function isKvConfiguredSync(): boolean {
  return true; // On Cloudflare Workers, the binding is always present if configured
}
