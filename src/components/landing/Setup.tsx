import { getSiteConfig } from '@/lib/db/settings';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';

const defaultSetupItems = [
  {
    name: 'Gears Used',
    desc: 'Hardware and peripherals in my daily workflow',
    href: '/gears',
  },
  {
    name: 'VS Code / Cursor Setup',
    desc: 'Extensions, themes, and configuration',
    href: '/setup',
  },
];

export default async function Setup() {
  const dbSetup = (await getSiteConfig('setupLinks')) as
    | { name: string; desc: string; href: string }[]
    | null;
  const setupItems = dbSetup || defaultSetupItems;
  return (
    <section style={{ position: 'relative', padding: '130px 0' }}>
      <Container>
        <div className="sec-rule">
          <span className="roman">XIII.</span>
          <span className="meta-grp">
            <span>Setup / Development Environment</span>
            <span className="dot-mark">&bull;</span>
            <span>Tools of the trade</span>
          </span>
          <span>-- / --</span>
        </div>

        <div data-reveal>
          <span className="label">
            Setup <span className="ix">&middot; N&ordm; 12</span>
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
            My{' '}
            <em
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              development
            </em>{' '}
            environment<span style={{ color: 'var(--coral)' }}>.</span>
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            marginTop: 22,
          }}
        >
          {setupItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              data-reveal
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '24px 26px',
                background: 'var(--bone)',
                borderRadius: 18,
                boxShadow:
                  'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.2s ease',
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'var(--paper-dark)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </span>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '-0.014em',
                    color: 'var(--ink)',
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: 13,
                    color: 'var(--ink-mute)',
                    marginTop: 4,
                  }}
                >
                  {item.desc}
                </p>
              </div>
              <span
                style={{
                  color: 'var(--ink-faint)',
                  transition: 'transform 160ms ease',
                }}
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
