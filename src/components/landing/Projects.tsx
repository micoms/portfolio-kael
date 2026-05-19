import { getFeaturedProjects } from '@/lib/db/projects';
import { iconRegistry } from '@/lib/icons';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';

export default async function Projects() {
  const projects = await getFeaturedProjects(4);

  return (
    <section className="section-padded" style={{ position: 'relative' }}>
      <Container>
        <div className="sec-rule">
          <span className="roman">XI.</span>
          <span className="meta-grp">
            <span>Projects / Featured Work</span>
            <span className="dot-mark">&bull;</span>
            <span>Selected projects</span>
          </span>
          <span>-- / --</span>
        </div>

        <div data-reveal>
          <span className="label">
            Projects <span className="ix">&middot; N&ordm; 10</span>
          </span>
          <h2
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 800,
              letterSpacing: '-0.028em',
              color: 'var(--ink)',
              lineHeight: 1.0,
              fontSize: 'clamp(40px, 4.8vw, 64px)',
              margin: '22px 0 36px',
            }}
          >
            Featured{' '}
            <em
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              projects
            </em>{' '}
            and{' '}
            <em
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              case studies
            </em>
            <span style={{ color: 'var(--coral)' }}>.</span>
          </h2>
        </div>

        <div
          className="grid-2-col"
          style={{
            gap: 22,
            marginTop: 22,
          }}
        >
          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              data-reveal
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '28px 26px 32px',
                background: 'var(--bone)',
                borderRadius: 18,
                boxShadow:
                  'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.2s ease',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontSize: 22,
                  fontWeight: 500,
                  color: 'var(--coral)',
                  letterSpacing: '0.04em',
                  marginBottom: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                {String(i + 1).padStart(2, '0')}
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '9.5px',
                    color: 'var(--ink-faint)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontStyle: 'normal',
                    fontWeight: 500,
                  }}
                >
                  {project.status === 'in-progress'
                    ? 'In Progress'
                    : project.status === 'completed'
                      ? 'Completed'
                      : 'Archived'}
                </span>
              </div>
              <div
                style={{
                  aspectRatio: '16 / 10',
                  background: 'var(--paper-dark)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginBottom: 18,
                }}
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 22,
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.014em',
                  marginBottom: 14,
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: '13.5px',
                  color: 'var(--ink-mute)',
                  lineHeight: 1.55,
                  marginBottom: 18,
                  flex: 1,
                }}
              >
                {project.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginBottom: 14,
                }}
              >
                {project.technologies.slice(0, 4).map((tech) => {
                  const Icon = iconRegistry[tech.iconKey];
                  return (
                    <span
                      key={tech.name}
                      style={{
                        padding: '3px 8px',
                        borderRadius: 999,
                        border: '1px solid var(--line)',
                        fontFamily: 'var(--sans)',
                        fontSize: 10,
                        color: 'var(--ink-faint)',
                        letterSpacing: '0.04em',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {Icon && <Icon className="size-3" />}
                      {tech.name}
                    </span>
                  );
                })}
              </div>
              <span
                style={{
                  width: 28,
                  height: 28,
                  border: '1px solid var(--line)',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink)',
                  alignSelf: 'flex-start',
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M5 19L19 5M19 5H8M19 5v11" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div
          style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}
        >
          <Link href="/projects" className="btn btn-ghost">
            View all projects
            <span className="arrow">
              <svg viewBox="0 0 24 24">
                <path d="M5 19L19 5M19 5H8M19 5v11" />
              </svg>
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
