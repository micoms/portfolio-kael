import { NextRequest, NextResponse } from 'next/server';

/**
 * Edge middleware for admin route protection.
 *
 * This provides a first layer of defense at the edge.
 * Full session validation happens server-side in each API route via requireAdmin().
 *
 * The admin layout (client-side) also redirects unauthenticated users,
 * but this middleware catches direct API calls and page loads before they hit the app.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin API routes (write operations)
  // Public GET reads for admin pages are fine; the API routes themselves enforce auth
  if (pathname.startsWith('/api/admin/')) {
    const sessionCookie =
      request.cookies.get('better-auth.session_token') ||
      request.cookies.get('__Secure-better-auth.session_token');

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*'],
};
