import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';

const journeyItems = [
  {
    name: 'My Journey',
    desc: 'The path from first line of code to professional development',
    href: '/journey',
  },
  {
    name: 'Certificates & Achievements',
    desc: 'Professional certifications and milestones',
    href: '/journey/certificates',
  },
];

export default function Journey() {
  return (
    <section style={{ position: 'relative', padding: '130px 0' }}>
      <Container>
        <div className="sec-rule">
          <span className="roman">XIV.</span>
          <span className="meta-grp">
            <span>Journey / Growth</span>
            <span className="dot-mark">&bull;</span>
            <span>Learning path</span>
          </span>
          <span>-- / --</span>
        </div>

        <div data-reveal>
          <span className="label">
            Journey <span className="ix">&middot; N&ordm; 13</span>
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
              learning
            </em>{' '}
            path and{' '}
            <em
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              growth
            </em>
            <span style={{ color: 'var(--coral)' }}>.</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 22,
            marginTop: 22,
          }}
        >
          {journeyItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'var(--paper-dark)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </span>
                <span
                  style={{
                    color: 'var(--ink-faint)',
                    transition: 'transform 160ms ease',
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M5 19L19 5M19 5H8M19 5v11" />
                  </svg>
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 22,
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.014em',
                  marginBottom: 10,
                  color: 'var(--ink)',
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: '13.5px',
                  color: 'var(--ink-mute)',
                  lineHeight: 1.55,
                }}
              >
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
