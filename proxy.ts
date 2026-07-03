import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getToken} from 'next-auth/jwt';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // Admin route protection
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for valid session
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
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
