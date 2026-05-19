import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/db/prisma';
import { certificateCreateSchema } from '@/validate/admin-schemas';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET() {
  const certs = await prisma.certificate.findMany({
    orderBy: { date: 'desc' },
  });
  return NextResponse.json(certs);
}

export async function POST(req: NextRequest) {
  const { error: authError } = await requireAdmin(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const data = certificateCreateSchema.parse(body);
    const cert = await prisma.certificate.create({ data });
    return NextResponse.json(cert, { status: 201 });
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
