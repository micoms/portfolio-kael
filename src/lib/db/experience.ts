import { prisma } from '@/lib/db/prisma';
import { cache } from 'react';

export const getExperiences = cache(async () => {
  return prisma.experience.findMany({
    include: { technologies: true },
    orderBy: { sortOrder: 'asc' },
  });
});

export const getFeaturedExperiences = cache(async (limit = 3) => {
  return prisma.experience.findMany({
    include: { technologies: true },
    orderBy: { sortOrder: 'asc' },
    take: limit,
  });
});
