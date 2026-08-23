import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that do not require authentication
const PUBLIC_PATHS = [
  '/',
  '/login',
  '/api/auth/login',
  '/api/auth/logout',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internal files, static assets, and public paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // Check auth cookie (httpOnly, so we can read server-side)
  const authCookie = request.cookies.get('demo-auth');
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Not authenticated – redirect to login page
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    // Match all routes except the public ones defined above and Next.js assets
    '/((?!api/auth|login|_next|static|favicon.ico).*)',
  ],
};
