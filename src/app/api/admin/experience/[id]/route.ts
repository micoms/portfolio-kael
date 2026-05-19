import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/db/prisma';
import { experienceUpdateSchema } from '@/validate/admin-schemas';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({
    where: { id },
    include: { technologies: true },
  });

  if (!experience) {
    return NextResponse.json(
      { error: 'Experience not found' },
      { status: 404 },
    );
  }

  return NextResponse.json(experience);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error: authError } = await requireAdmin(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const data = experienceUpdateSchema.parse(body);
    const { technologies, ...updateData } = data;

    if (technologies) {
      await prisma.experienceTechnology.deleteMany({
        where: { experienceId: id },
      });
      if (technologies.length > 0) {
        await prisma.experienceTechnology.createMany({
          data: technologies.map((t) => ({
            experienceId: id,
            name: t.name,
            href: t.href,
            iconKey: t.iconKey,
          })),
        });
      }
    }

    const experience = await prisma.experience.update({
      where: { id },
      data: updateData,
      include: { technologies: true },
    });

    return NextResponse.json(experience);
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
  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
