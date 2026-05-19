import { getSiteConfig } from '@/lib/db/settings';
import React from 'react';

import Container from '../common/Container';

const defaultPartners = [
  { name: 'TypeScript', category: 'Language', icon: 'TS' },
  { name: 'React', category: 'Frontend', icon: 'Re' },
  { name: 'Next.js', category: 'Framework', icon: 'Nx' },
  { name: 'Node.js', category: 'Runtime', icon: 'No' },
  { name: 'PostgreSQL', category: 'Database', icon: 'Pg' },
  { name: 'Docker', category: 'DevOps', icon: 'Dk' },
];

export default async function Testimonial() {
  const dbTestimonial = (await getSiteConfig('testimonial')) as {
    quote?: string;
    author?: string;
    role?: string;
    partners?: { name: string; category: string; icon?: string }[];
  } | null;
  const partners = dbTestimonial?.partners || defaultPartners;
  return (
    <section className="section-padded" style={{ position: 'relative' }}>
      <Container>
        <div className="sec-rule">
          <span className="roman">VII.</span>
          <span className="meta-grp">
            <span>Collaborators / Clients</span>
            <span className="dot-mark">&bull;</span>
            <span>Building together</span>
          </span>
          <span>007 / 008</span>
        </div>

        <div
          className="grid-testimonial"
          style={{
            gap: 80,
            alignItems: 'center',
          }}
        >
          <div data-reveal>
            <span className="label">
              Testimonials <span className="ix">&middot; N&ordm; 06</span>
            </span>
            <h2
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 700,
                letterSpacing: '-0.022em',
                lineHeight: 1.12,
                marginBottom: 36,
                marginTop: 30,
                color: 'var(--ink)',
              }}
            >
              &ldquo;Mikael has a rare ability to take a vague{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                product idea
              </em>{' '}
              and turn it into a{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                shippable, well-architected
              </em>{' '}
              application &mdash; fast, communicative, and a genuine pleasure to
              work with.&rdquo;
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                marginTop: 22,
              }}
            >
              <span
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'var(--ink)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--paper)',
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontSize: 24,
                }}
              >
                s
              </span>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 14,
                  color: 'var(--ink)',
                  fontWeight: 600,
                }}
              >
                Sofia Reyes
                <span
                  style={{
                    display: 'block',
                    color: 'var(--ink-mute)',
                    fontWeight: 400,
                  }}
                >
                  Product Lead &middot; Northstar Studio
                </span>
              </p>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--line)',
                margin: '60px 0 32px',
              }}
            />

            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: 14,
                color: 'var(--ink-mute)',
                marginBottom: 26,
                maxWidth: '38ch',
              }}
            >
              Technologies and tools I work with daily &mdash; the stack that
              powers every project.
            </p>

            <div
              className="partners grid-6-col"
              style={{
                gap: 22,
                alignItems: 'end',
              }}
            >
              {partners.map((p) => (
                <div
                  key={p.name}
                  className="partner"
                  data-reveal
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    cursor: 'pointer',
                    transition: 'transform 220ms ease',
                  }}
                >
                  <div
                    style={{
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--ink)',
                      transition: 'color 220ms ease',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 18,
                        fontWeight: 500,
                      }}
                    >
                      {p.icon}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: 13,
                      color: 'var(--ink)',
                      letterSpacing: '-0.005em',
                      fontWeight: 600,
                      transition: 'color 220ms ease',
                    }}
                  >
                    {p.name}
                  </span>
                  <small
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: 10,
                      color: 'var(--ink-faint)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {p.category}
                  </small>
                </div>
              ))}
            </div>

            <a
              href="#"
              style={{
                marginTop: 56,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--sans)',
                fontSize: 13,
                color: 'var(--ink)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                borderBottom: '1px solid var(--coral)',
                paddingBottom: 6,
              }}
            >
              Read more recommendations
              <span style={{ color: 'var(--coral)' }}>&rarr;</span>
            </a>
          </div>

          <div
            data-reveal="right"
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              maxWidth: 560,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'var(--bone)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                viewBox="0 0 120 120"
                fill="none"
                style={{ width: '50%', height: '50%' }}
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="var(--line)"
                  strokeWidth="1"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="35"
                  stroke="var(--line)"
                  strokeWidth="1"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="20"
                  stroke="var(--coral)"
                  strokeWidth="1"
                />
                <circle cx="60" cy="60" r="5" fill="var(--coral)" />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
