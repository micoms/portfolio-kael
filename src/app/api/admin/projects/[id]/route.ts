import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/db/prisma';
import { projectUpdateSchema } from '@/validate/admin-schemas';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { technologies: true, caseStudy: true },
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
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
    const data = projectUpdateSchema.parse(body);
    const { technologies, caseStudy, ...updateData } = data;

    if (technologies) {
      await prisma.projectTechnology.deleteMany({ where: { projectId: id } });
      if (technologies.length > 0) {
        await prisma.projectTechnology.createMany({
          data: technologies.map((t) => ({
            projectId: id,
            name: t.name,
            iconKey: t.iconKey,
          })),
        });
      }
    }

    if (caseStudy) {
      await prisma.projectCaseStudy.upsert({
        where: { projectId: id },
        update: caseStudy,
        create: { projectId: id, ...caseStudy },
      });
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: { technologies: true, caseStudy: true },
    });

    return NextResponse.json(project);
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
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
