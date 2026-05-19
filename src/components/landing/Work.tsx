import { getFeaturedProjects } from '@/lib/db/projects';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function Work() {
  const dbProjects = await getFeaturedProjects(2);

  const featured = dbProjects.map(
    (p: {
      title: string;
      description: string;
      image: string;
      link?: string | null;
      live?: string | null;
      slug: string;
      status: string;
      technologies: { name: string; iconKey: string }[];
    }) => ({
      title: p.title,
      description: p.description,
      image: p.image,
      link: p.link || p.live || '#',
      slug: p.slug,
      status: p.status,
    }),
  );

  return (
    <section className="section-padded" style={{ position: 'relative' }}>
      <div
        style={{
          background: '#15140f',
          color: 'var(--paper)',
          borderRadius: 32,
          margin: '0 64px',
          overflow: 'hidden',
          position: 'relative',
          padding: '110px 64px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n2'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.85  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n2)'/></svg>\")",
            backgroundSize: '240px 240px',
            opacity: 0.6,
            mixBlendMode: 'screen',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(247, 241, 222, 0.16)',
            paddingTop: 16,
            marginBottom: 60,
            fontFamily: 'var(--sans)',
            fontSize: '10.5px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(247, 241, 222, 0.55)',
          }}
        >
          <span
            style={{
              color: 'var(--coral)',
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: 14,
              letterSpacing: '0.04em',
              textTransform: 'none',
            }}
          >
            VI.
          </span>
          <span style={{ display: 'inline-flex', gap: 24 }}>
            <span>Selected Work &middot; 2026</span>
            <span style={{ color: 'var(--coral)' }}>&bull;</span>
            <span>Edited by Mikael Macabali</span>
          </span>
          <span>006 / 008</span>
        </div>

        <div
          className="grid-work"
          style={{
            gap: 48,
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div data-reveal>
            <span className="label" style={{ color: 'var(--coral)' }}>
              Selected work
            </span>
            <h2
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                fontSize: 'clamp(40px, 5vw, 66px)',
                lineHeight: 1.0,
                letterSpacing: '-0.024em',
                margin: '28px 0 36px',
                color: 'var(--paper)',
              }}
            >
              Projects that balance{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                function
              </em>{' '}
              with{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                intention,
              </em>{' '}
              code with{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                craft
              </em>
              <span style={{ color: 'var(--coral)' }}>.</span>
            </h2>
            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 18,
                color: 'var(--paper)',
                fontFamily: 'var(--sans)',
                fontSize: 14,
                textDecoration: 'none',
                borderBottom: '2px solid var(--coral)',
                paddingBottom: 12,
                width: 'fit-content',
              }}
            >
              View all projects
              <span style={{ color: 'var(--coral)' }}>&nearrow;</span>
            </Link>
          </div>

          {featured.map((project, i) => (
            <a
              key={project.title}
              href={project.link || '#'}
              data-reveal
              style={{
                background: 'var(--paper)',
                color: 'var(--ink)',
                borderRadius: 18,
                padding: i === 1 ? '28px 26px' : '32px 30px',
                position: 'relative',
                transform:
                  i === 1
                    ? 'rotate(2.4deg) translateY(20px)'
                    : 'rotate(-1.2deg)',
                textDecoration: 'none',
                display: 'block',
                transition: 'transform 280ms ease, box-shadow 280ms ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 22,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '10.5px',
                    color: 'var(--coral)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {i === 0 ? 'Featured project' : 'Case study'}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: 'var(--ink-faint)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')} /{' '}
                  {String(featured.length).padStart(2, '0')}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 'clamp(26px, 2.4vw, 38px)',
                  fontWeight: 800,
                  letterSpacing: '-0.022em',
                  lineHeight: 1.05,
                  marginBottom: 14,
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 14,
                  color: 'var(--ink-mute)',
                  lineHeight: 1.55,
                  marginBottom: 22,
                  maxWidth: '28ch',
                }}
              >
                {project.description}
              </p>
              <div
                style={{
                  aspectRatio: '4 / 3',
                  background: 'var(--bone)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginBottom: 22,
                }}
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={450}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: 'var(--ink-faint)',
                  fontFamily: 'var(--sans)',
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  borderTop: '1px solid var(--line)',
                  paddingTop: 14,
                }}
              >
                <span style={{ color: 'var(--coral)', fontWeight: 600 }}>
                  2026 &middot; FULL-STACK
                </span>
                <span>{i === 0 ? 'FEATURED' : 'PRODUCTION'}</span>
              </div>
            </a>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            right: 64,
            bottom: 64,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <button
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              border: '1px solid rgba(247, 241, 222, 0.2)',
              background: 'transparent',
              color: 'var(--paper)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M14 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              border: '1px solid var(--coral)',
              background: 'var(--coral)',
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M10 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
