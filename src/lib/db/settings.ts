import { prisma } from '@/lib/db/prisma';
import { cache } from 'react';

export const getSkills = cache(async () => {
  return prisma.skill.findMany();
});

export const getGears = cache(async () => {
  return prisma.gear.findMany();
});

export const getCertificates = cache(async () => {
  return prisma.certificate.findMany({ orderBy: { date: 'desc' } });
});

export const getSiteConfig = cache(async (key: string) => {
  const config = await prisma.siteConfig.findUnique({ where: { key } });
  return config?.value || null;
});

export const getAllSiteConfigs = cache(async () => {
  const configs = await prisma.siteConfig.findMany();
  const map: Record<string, unknown> = {};
  configs.forEach((c: { key: string; value: unknown }) => {
    map[c.key] = c.value;
  });
  return map;
});
