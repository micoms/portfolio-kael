import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/db/prisma';
import { blogCreateSchema } from '@/validate/admin-schemas';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { date: 'desc' },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { error: authError } = await requireAdmin(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const data = blogCreateSchema.parse(body);

    const post = await prisma.blogPost.create({ data });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: err.issues },
        { status: 400 },
      );
    }
    throw err;
  }
}
