import React from 'react';

import Container from '../common/Container';

const capabilities = [
  {
    num: '01',
    tag: 'Frontend',
    title: 'Frontend\nEngineering',
    desc: 'React, Next.js, TypeScript. Responsive, accessible, performant interfaces with modern tooling and component-driven architecture.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ width: 28, height: 28 }}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: '02',
    tag: 'Backend',
    title: 'API &\nBackend',
    desc: 'Node.js, Python, PostgreSQL, REST & GraphQL APIs. Clean architecture, proper testing, and thoughtful data modeling.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ width: 28, height: 28 }}
      >
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 12h6M9 17h4" />
      </svg>
    ),
  },
  {
    num: '03',
    tag: 'Design',
    title: 'UI/UX &\nDesign Systems',
    desc: 'Figma to code. Design tokens, component libraries, design-to-development handoff. Systems thinking for product teams.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ width: 28, height: 28 }}
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
  },
  {
    num: '04',
    tag: 'DevOps',
    title: 'DevOps &\nDeployment',
    desc: 'Docker, CI/CD pipelines, cloud infrastructure (AWS, Vercel). From local dev to production — smooth and repeatable.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ width: 28, height: 28 }}
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      style={{ position: 'relative', padding: '130px 0' }}
    >
      <Container>
        <div className="sec-rule">
          <span className="roman">III.</span>
          <span className="meta-grp">
            <span>Capabilities &middot; Full-Stack &middot; Services</span>
            <span className="dot-mark">&bull;</span>
            <span>4 domains / 1 stack</span>
          </span>
          <span>003 / 008</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 70,
            alignItems: 'center',
          }}
        >
          <div
            data-reveal="left"
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              maxWidth: 600,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 22,
                height: 22,
                borderTop: '1px solid var(--ink-faint)',
                borderLeft: '1px solid var(--ink-faint)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 22,
                height: 22,
                borderBottom: '1px solid var(--ink-faint)',
                borderRight: '1px solid var(--ink-faint)',
              }}
            />
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
                viewBox="0 0 200 200"
                fill="none"
                stroke="var(--line)"
                strokeWidth="0.5"
                style={{ width: '80%', height: '80%' }}
              >
                <circle cx="100" cy="100" r="80" />
                <circle cx="100" cy="100" r="60" />
                <circle cx="100" cy="100" r="40" />
                <circle cx="100" cy="100" r="20" />
                <line x1="20" y1="100" x2="180" y2="100" />
                <line x1="100" y1="20" x2="100" y2="180" />
              </svg>
            </div>
            <div
              style={{
                position: 'absolute',
                right: -42,
                top: '50%',
                fontFamily: 'var(--sans)',
                fontSize: '10.5px',
                letterSpacing: '0.42em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              <b style={{ color: 'var(--coral)' }}>MIKAEL MACABALI</b>{' '}
              &nbsp;&middot;&nbsp; CAPABILITIES MATRIX &nbsp;&middot;&nbsp; 2026
            </div>
          </div>

          <div data-reveal>
            <span className="label">
              Capabilities <span className="ix">&middot; N&ordm; 03</span>
            </span>
            <h2
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                letterSpacing: '-0.028em',
                color: 'var(--ink)',
                lineHeight: 1.0,
                fontSize: 'clamp(40px, 4.8vw, 64px)',
                margin: '22px 0 30px',
              }}
            >
              Full-stack services for{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                modern
              </em>{' '}
              product teams<span style={{ color: 'var(--coral)' }}>.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: 16,
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
                maxWidth: '36ch',
                marginBottom: 22,
              }}
            >
              I blend product thinking with technical execution — shipping
              interfaces, APIs, and infrastructure that feel intentional,
              performant, and maintainable.
            </p>

            <div
              className="cards"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 18,
                marginTop: 22,
              }}
            >
              {capabilities.map((cap) => (
                <div key={cap.num} className="card-atelier" data-reveal>
                  <div className="num">
                    {cap.num}
                    <span className="tag">{cap.tag}</span>
                  </div>
                  {cap.icon}
                  <h3>
                    {cap.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </h3>
                  <p>{cap.desc}</p>
                  <span className="arrow-mark">
                    <svg viewBox="0 0 24 24">
                      <path d="M5 19L19 5M19 5H8M19 5v11" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
