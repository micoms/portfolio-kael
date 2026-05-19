import { prisma } from '@/lib/db/prisma';
import { cache } from 'react';

export const getPublishedBlogPosts = cache(async () => {
  return prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { date: 'desc' },
  });
});

export const getBlogPostBySlug = cache(async (slug: string) => {
  return prisma.blogPost.findUnique({
    where: { slug },
  });
});

export const getBlogSlugs = cache(async () => {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  return posts.map((p: { slug: string }) => p.slug);
});

export const getBlogPostSlugs = getBlogSlugs;

export const getAllTags = cache(async () => {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: { tags: true },
  });
  const tags = new Set<string>();
  posts.forEach((p: { tags: string[] }) =>
    p.tags.forEach((t: string) => tags.add(t)),
  );
  return Array.from(tags).sort();
});

export const getRelatedPosts = cache(async (slug: string, limit = 3) => {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return [];

  return prisma.blogPost.findMany({
    where: {
      isPublished: true,
      slug: { not: slug },
      tags: { hasSome: post.tags },
    },
    take: limit,
    orderBy: { date: 'desc' },
  });
});
