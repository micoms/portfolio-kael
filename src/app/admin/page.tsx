import { prisma } from '@/lib/db/prisma';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [
    projectCount,
    experienceCount,
    blogCount,
    skillCount,
    gearCount,
    certCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.experience.count(),
    prisma.blogPost.count(),
    prisma.skill.count(),
    prisma.gear.count(),
    prisma.certificate.count(),
  ]);

  const stats = [
    { label: 'Projects', count: projectCount, href: '/admin/projects' },
    { label: 'Experience', count: experienceCount, href: '/admin/experience' },
    { label: 'Blog Posts', count: blogCount, href: '/admin/blog' },
    { label: 'Skills', count: skillCount, href: '/admin/skills' },
    { label: 'Gears', count: gearCount, href: '/admin/gears' },
    { label: 'Certificates', count: certCount, href: '/admin/certificates' },
  ];

  return (
    <div>
      <h1
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 800,
          fontSize: 28,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
          marginBottom: 8,
        }}
      >
        Dashboard
      </h1>
      <p
        style={{
          fontFamily: 'var(--body)',
          fontSize: 14,
          color: 'var(--ink-mute)',
          marginBottom: 32,
        }}
      >
        Manage your portfolio content.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}
        className="admin-stats-grid"
      >
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              background: 'var(--bone)',
              borderRadius: 14,
              boxShadow:
                'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform 0.15s ease',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                color: 'var(--ink-faint)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                fontSize: 36,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
              }}
            >
              {stat.count}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
