import { prisma } from '@/lib/db/prisma';
import { cache } from 'react';

export const getProjects = cache(async () => {
  return prisma.project.findMany({
    where: { isPublished: true },
    include: { technologies: true },
    orderBy: { sortOrder: 'asc' },
  });
});

export const getFeaturedProjects = cache(async (limit = 4) => {
  return prisma.project.findMany({
    where: { isPublished: true, featured: true },
    include: { technologies: true },
    orderBy: { sortOrder: 'asc' },
    take: limit,
  });
});

export const getProjectBySlug = cache(async (slug: string) => {
  return prisma.project.findUnique({
    where: { slug },
    include: { technologies: true, caseStudy: true },
  });
});

export const getProjectSlugs = cache(async () => {
  const projects = await prisma.project.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  return projects.map((p: { slug: string }) => p.slug);
});

export const getProjectCaseStudyBySlug = getProjectBySlug;
export const getProjectCaseStudySlugs = getProjectSlugs;

export const getProjectNavigation = cache(async (slug: string) => {
  const projects = await prisma.project.findMany({
    where: { isPublished: true },
    select: { slug: true, title: true },
    orderBy: { sortOrder: 'asc' },
  });

  const index = projects.findIndex((p: { slug: string }) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
});

export const getRelatedProjectCaseStudies = cache(
  async (slug: string, limit = 3) => {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: { technologies: true },
    });

    if (!project) return [];

    const techNames = project.technologies.map((t: { name: string }) => t.name);

    return prisma.project.findMany({
      where: {
        isPublished: true,
        slug: { not: slug },
        technologies: { some: { name: { in: techNames } } },
      },
      include: { technologies: true },
      take: limit,
    });
  },
);
