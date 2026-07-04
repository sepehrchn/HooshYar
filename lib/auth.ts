import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// On Cloudflare Workers, the NextAuth server route sets AUTH_TRUST_HOST=true
// which makes it detect HTTPS via x-forwarded-proto and use __Secure- prefixed
// cookies. Every getToken() call must match: secureCookie:true so it looks for
// __Secure-next-auth.session-token (the same cookie the server sets).
// Without this, getToken() looks for next-auth.session-token (no prefix),
// never finds the session cookie, and returns null → 401 on every admin API.
process.env.AUTH_TRUST_HOST = 'true';

/**
 * Shared auth check for admin API routes.
 * Returns the JWT token if authenticated, null otherwise.
 */
export async function getAdminToken(req: NextRequest) {
  return getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: true,
  });
}
