import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/db/prisma';
import { skillCreateSchema } from '@/validate/admin-schemas';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET() {
  const skills = await prisma.skill.findMany();
  return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
  const { error: authError } = await requireAdmin(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const data = skillCreateSchema.parse(body);
    const skill = await prisma.skill.create({ data });
    return NextResponse.json(skill, { status: 201 });
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
