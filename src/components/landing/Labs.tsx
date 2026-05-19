'use client';

import React, { useState } from 'react';

import Container from '../common/Container';

const labs = [
  {
    num: '01',
    year: '2026',
    badge: 'Web App',
    title: 'Project Atlas',
    desc: 'A full-stack project management dashboard built with Next.js, tRPC, and PostgreSQL. Real-time collaboration with WebSockets.',
    category: 'Web App',
  },
  {
    num: '02',
    year: '2025',
    badge: 'Web App',
    title: 'Pulse Monitor',
    desc: 'Real-time uptime monitoring dashboard with alerting, status pages, and incident logging — built with React and Go.',
    category: 'Web App',
  },
  {
    num: '03',
    year: '2025',
    badge: 'CLI',
    title: 'Scaffold CLI',
    desc: 'A scaffolding tool for bootstrapping full-stack projects with opinionated defaults — TypeScript, testing, CI/CD included out of the box.',
    category: 'CLI',
  },
  {
    num: '04',
    year: '2024',
    badge: 'Design',
    title: 'Token Studio',
    desc: 'A visual design token editor for creating and exporting design system tokens to CSS, JSON, and Tailwind config.',
    category: 'Design',
  },
  {
    num: '05',
    year: '2024',
    badge: 'Web App',
    title: 'Logbook',
    desc: 'A lightweight journaling app with markdown support, tags, and a calendar view — PWA-first, offline-capable.',
    category: 'Web App',
  },
];

const categories = ['All', 'Web App', 'CLI', 'Design'];

export default function Labs() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All' ? labs : labs.filter((l) => l.category === active);
  const counts: Record<string, number> = {
    All: labs.length,
    'Web App': labs.filter((l) => l.category === 'Web App').length,
    CLI: labs.filter((l) => l.category === 'CLI').length,
    Design: labs.filter((l) => l.category === 'Design').length,
  };

  return (
    <section
      id="labs"
      className="section-padded"
      style={{ position: 'relative' }}
    >
      <Container>
        <div className="sec-rule">
          <span className="roman">IV.</span>
          <span className="meta-grp">
            <span>Labs / Experiments & Tools</span>
            <span className="dot-mark">&bull;</span>
            <span>05 of many ongoing</span>
          </span>
          <span>004 / 008</span>
        </div>

        <div
          className="grid-2-col-asym"
          style={{
            gap: 60,
            alignItems: 'end',
            marginBottom: 48,
          }}
        >
          <div data-reveal>
            <span className="label">
              Labs <span className="ix">&middot; N&ordm; 04</span>
            </span>
            <h2
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                letterSpacing: '-0.028em',
                color: 'var(--ink)',
                lineHeight: 1.0,
                fontSize: 'clamp(40px, 4.8vw, 68px)',
                marginTop: 30,
              }}
            >
              A living archive of{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                experiments,
              </em>{' '}
              tools, and side{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                projects
              </em>
              <span style={{ color: 'var(--coral)' }}>.</span>
            </h2>
          </div>
          <div
            data-reveal="right"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'flex-end',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 999,
                  border:
                    active === cat
                      ? '1px solid var(--coral)'
                      : '1px solid var(--line)',
                  fontFamily: 'var(--sans)',
                  fontSize: 13,
                  color: active === cat ? '#fff' : 'var(--ink-soft)',
                  background: active === cat ? 'var(--coral)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {cat}
                <span
                  style={{
                    fontSize: 10,
                    color:
                      active === cat
                        ? 'rgba(255,255,255,0.7)'
                        : 'var(--ink-faint)',
                    borderLeft:
                      active === cat
                        ? '1px solid rgba(255,255,255,0.3)'
                        : '1px solid var(--line)',
                    paddingLeft: 8,
                  }}
                >
                  {counts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            gap: 22,
            marginBottom: 30,
          }}
        >
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1px dashed var(--ink)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--sans)',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            05
          </span>
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '10.5px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              lineHeight: 1.55,
              color: 'var(--ink-faint)',
              maxWidth: '28ch',
            }}
          >
            <b style={{ display: 'block', color: 'var(--ink)' }}>
              Ongoing experiments
            </b>
            Side projects
            <br />
            exploring ideas
            <br />
            and new techniques
          </div>
        </div>

        <div
          className="labs-grid grid-5-col"
          style={{
            gap: 22,
          }}
        >
          {filtered.map((lab) => (
            <div
              key={lab.num}
              className="lab"
              data-reveal
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div
                style={{
                  aspectRatio: '4 / 5',
                  background: 'var(--bone)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  marginBottom: 18,
                  boxShadow: 'var(--shadow)',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(239, 231, 210, 0.9)',
                    color: 'var(--ink)',
                    padding: '4px 9px',
                    borderRadius: 4,
                    fontFamily: 'var(--sans)',
                    fontSize: '9.5px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  {lab.badge}
                </span>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(135deg, var(--bone) 0%, var(--paper-dark) 100%)',
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '10.5px',
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.14em',
                  marginBottom: 8,
                  display: 'flex',
                  justifyContent: 'space-between',
                  textTransform: 'uppercase',
                }}
              >
                <span>N&ordm; {lab.num}</span>
                <span>{lab.year}</span>
              </div>
              <h4
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '-0.014em',
                  marginBottom: 8,
                }}
              >
                {lab.title}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 13,
                  color: 'var(--ink-mute)',
                  lineHeight: 1.55,
                  marginBottom: 14,
                }}
              >
                {lab.desc}
              </p>
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
                  marginTop: 'auto',
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
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 50,
            borderTop: '1px dashed var(--line)',
            paddingTop: 22,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 26,
                height: 2,
                background: 'var(--coral)',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 26,
                height: 2,
                background: 'var(--coral)',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 26,
                height: 2,
                background: 'var(--coral)',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 26,
                height: 2,
                background: 'var(--coral)',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 26,
                height: 2,
                background: 'var(--coral)',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 26,
                height: 2,
                background: 'var(--line)',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 26,
                height: 2,
                background: 'var(--line)',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 26,
                height: 2,
                background: 'var(--line)',
                borderRadius: 2,
              }}
            />
          </div>
          <span className="meta">
            05 / &infin; PROJECTS &nbsp;&middot;&nbsp;{' '}
            <a
              href="#"
              style={{ color: 'var(--coral)', textDecoration: 'none' }}
            >
              VIEW ALL &rarr;
            </a>
          </span>
        </div>
      </Container>
    </section>
  );
}
