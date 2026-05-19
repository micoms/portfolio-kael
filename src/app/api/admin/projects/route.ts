import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/db/prisma';
import { projectCreateSchema } from '@/validate/admin-schemas';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET() {
  const projects = await prisma.project.findMany({
    include: { technologies: true, caseStudy: true },
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const { error: authError } = await requireAdmin(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const data = projectCreateSchema.parse(body);
    const { technologies, caseStudy, ...projectData } = data;

    const project = await prisma.project.create({
      data: {
        ...projectData,
        technologies: technologies
          ? {
              create: technologies.map((t) => ({
                name: t.name,
                iconKey: t.iconKey,
              })),
            }
          : undefined,
        caseStudy: caseStudy ? { create: caseStudy } : undefined,
      },
      include: { technologies: true, caseStudy: true },
    });

    return NextResponse.json(project, { status: 201 });
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
