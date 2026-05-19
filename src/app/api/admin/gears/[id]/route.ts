import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/db/prisma';
import { gearUpdateSchema } from '@/validate/admin-schemas';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error: authError } = await requireAdmin(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const data = gearUpdateSchema.parse(body);
    const gear = await prisma.gear.update({ where: { id }, data });
    return NextResponse.json(gear);
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error: authError } = await requireAdmin(req);
  if (authError) return authError;

  const { id } = await params;
  await prisma.gear.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
