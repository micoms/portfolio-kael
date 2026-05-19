import * as z from 'zod';

// ─── Project ──────────────────────────────────────────────────────

export const projectCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  image: z.string().min(1),
  video: z.string().nullable().optional(),
  link: z.string().url().nullable().optional().or(z.literal('')),
  github: z.string().url().nullable().optional().or(z.literal('')),
  live: z.string().url().nullable().optional().or(z.literal('')),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  status: z.enum(['completed', 'in-progress', 'archived']).default('completed'),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  technologies: z
    .array(
      z.object({
        name: z.string().min(1).max(100),
        iconKey: z.string().min(1).max(100),
      }),
    )
    .optional(),
  caseStudy: z
    .object({
      content: z.string().min(1),
      timeline: z.string().nullable().optional(),
      role: z.string().nullable().optional(),
      team: z.string().nullable().optional(),
      challenges: z.array(z.string()).default([]),
      learnings: z.array(z.string()).default([]),
    })
    .optional(),
});

export const projectUpdateSchema = projectCreateSchema.partial();

// ─── Experience ───────────────────────────────────────────────────

export const experienceCreateSchema = z.object({
  company: z.string().min(1).max(200),
  position: z.string().min(1).max(200),
  location: z.string().min(1).max(200),
  image: z.string().min(1),
  description: z.array(z.string().min(1)).min(1),
  startDate: z.string().min(1).max(50),
  endDate: z.string().min(1).max(50),
  website: z.string().url().nullable().optional().or(z.literal('')),
  x: z.string().nullable().optional(),
  linkedin: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
  isCurrent: z.boolean().default(false),
  isBlur: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  technologies: z
    .array(
      z.object({
        name: z.string().min(1).max(100),
        href: z.string().url(),
        iconKey: z.string().min(1).max(100),
      }),
    )
    .optional(),
});

export const experienceUpdateSchema = experienceCreateSchema.partial();

// ─── Blog Post ────────────────────────────────────────────────────

export const blogCreateSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(2000),
  image: z.string().min(1),
  tags: z.array(z.string().min(1).max(50)).default([]),
  date: z.coerce.date(),
  content: z.string().min(1),
  isPublished: z.boolean().default(true),
});

export const blogUpdateSchema = blogCreateSchema.partial();

// ─── Skill ────────────────────────────────────────────────────────

export const skillCreateSchema = z.object({
  name: z.string().min(1).max(100),
  iconKey: z.string().min(1).max(100),
  href: z.string().url().nullable().optional(),
});

export const skillUpdateSchema = skillCreateSchema.partial();

// ─── Gear ─────────────────────────────────────────────────────────

export const gearCreateSchema = z.object({
  name: z.string().min(1).max(200),
  iconKey: z.string().max(100).nullable().optional(),
  href: z.string().url().nullable().optional(),
  category: z.string().min(1).max(50),
});

export const gearUpdateSchema = gearCreateSchema.partial();

// ─── Certificate ──────────────────────────────────────────────────

export const certificateCreateSchema = z.object({
  title: z.string().min(1).max(200),
  issuer: z.string().min(1).max(200),
  date: z.coerce.date(),
  imageUrl: z.string().min(1),
});

export const certificateUpdateSchema = certificateCreateSchema.partial();

// ─── Settings ─────────────────────────────────────────────────────

const ALLOWED_SETTINGS_KEYS = [
  'hero',
  'about',
  'socialLinks',
  'cta',
  'footer',
] as const;

export const settingsUpdateSchema = z.record(
  z.enum(ALLOWED_SETTINGS_KEYS),
  z.unknown(),
);
