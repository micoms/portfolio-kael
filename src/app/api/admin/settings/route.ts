import { Prisma } from '@/generated/prisma/client';
import { requireAdmin } from '@/lib/auth-guard';
import { prisma } from '@/lib/db/prisma';
import { settingsUpdateSchema } from '@/validate/admin-schemas';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET() {
  const configs = await prisma.siteConfig.findMany();
  const map: Record<string, unknown> = {};
  configs.forEach((c: { key: string; value: unknown }) => {
    map[c.key] = c.value;
  });
  return NextResponse.json(map);
}

export async function PUT(req: NextRequest) {
  const { error: authError } = await requireAdmin(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const data = settingsUpdateSchema.parse(body);

    for (const [key, value] of Object.entries(data)) {
      await prisma.siteConfig.upsert({
        where: { key },
        update: { value: value as Prisma.InputJsonValue },
        create: { key, value: value as Prisma.InputJsonValue },
      });
    }

    return NextResponse.json({ success: true });
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
