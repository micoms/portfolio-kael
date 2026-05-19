import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export interface AdminSession {
  user: { id: string; email: string; name: string };
  session: { id: string; token: string };
}

/**
 * Validates the session from request cookies/headers.
 * Returns the session if valid, or null.
 */
async function getSession(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    return session;
  } catch {
    return null;
  }
}

/**
 * Middleware-style guard for admin API routes.
 * Returns the authenticated session or a 401 response.
 */
export async function requireAdmin(req: NextRequest) {
  const session = await getSession(req);

  if (!session) {
    return {
      session: null,
      error: NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 },
      ),
    };
  }

  return { session: session as unknown as AdminSession, error: null };
}
