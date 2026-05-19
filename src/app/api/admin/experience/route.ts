import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/db/prisma';
import { experienceCreateSchema } from '@/validate/admin-schemas';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET() {
  const experiences = await prisma.experience.findMany({
    include: { technologies: true },
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json(experiences);
}

export async function POST(req: NextRequest) {
  const { error: authError } = await requireAdmin(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const data = experienceCreateSchema.parse(body);
    const { technologies, ...experienceData } = data;

    const experience = await prisma.experience.create({
      data: {
        ...experienceData,
        technologies: technologies
          ? {
              create: technologies.map((t) => ({
                name: t.name,
                href: t.href,
                iconKey: t.iconKey,
              })),
            }
          : undefined,
      },
      include: { technologies: true },
    });

    return NextResponse.json(experience, { status: 201 });
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
