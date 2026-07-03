/** True when Vercel KV REST credentials are present in the environment. */
export function isKvConfigured(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL?.trim() &&
      process.env.KV_REST_API_TOKEN?.trim()
  );
}
