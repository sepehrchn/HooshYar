import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getToken} from 'next-auth/jwt';

// Must match the auth route — AUTH_TRUST_HOST makes NextAuth's detectOrigin()
// trust Cloudflare's x-forwarded-proto/host headers, which means the server
// detects HTTPS and uses __Secure- prefixed cookies. The middleware needs to
// match: both AUTH_TRUST_HOST and secureCookie:true so getToken() looks for
// the same __Secure-next-auth.session-token cookie the server sets.
process.env.AUTH_TRUST_HOST = 'true';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // Admin route protection
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for valid session.
    // secureCookie:true is critical — the NextAuth server route sets
    // __Secure-next-auth.session-token (because AUTH_TRUST_HOST makes it
    // detect HTTPS via Cloudflare's forwarded headers). Without
    // secureCookie:true, getToken() looks for next-auth.session-token
    // (no __Secure- prefix) and never finds the session cookie.
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: true,
    });

    // Redirect to login if no valid session
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // For all other routes, use next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|fa)/:path*', '/admin/:path*']
};
