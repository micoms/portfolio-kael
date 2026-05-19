import React from 'react';

import Container from '../common/Container';

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Understand the problem, the users, and the constraints. Research, interviews, competitor analysis — get the full picture before writing a line of code.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Architecture, wireframes, component tree, data model. Make the hard decisions on paper first so the build phase stays focused.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Iterative development with continuous integration. Frontend, backend, tests — each layer built and validated before the next.',
  },
  {
    num: '04',
    title: 'Ship',
    desc: 'Deploy, monitor, iterate. Production launch is just the beginning — I stay with the product through the first cycles of real-world use.',
  },
];

export default function Method() {
  return (
    <section id="method" style={{ position: 'relative', padding: '130px 0' }}>
      <Container>
        <div className="sec-rule">
          <span className="roman">V.</span>
          <span className="meta-grp">
            <span>Method / Development Loop</span>
            <span className="dot-mark">&bull;</span>
            <span>04 stages, iterative</span>
          </span>
          <span>005 / 008</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 60,
            alignItems: 'start',
            marginBottom: 80,
          }}
        >
          <div data-reveal>
            <span className="label">
              Method <span className="ix">&middot; N&ordm; 05</span>
            </span>
            <h2
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                letterSpacing: '-0.028em',
                color: 'var(--ink)',
                lineHeight: 1.0,
                fontSize: 'clamp(44px, 5.2vw, 76px)',
                marginTop: 30,
              }}
            >
              From{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                requirement
              </em>{' '}
              to{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                deployed
              </em>{' '}
              product<span style={{ color: 'var(--coral)' }}>.</span>
            </h2>
          </div>
          <div
            data-reveal="right"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              paddingTop: 14,
            }}
          >
            <span
              style={{
                color: 'var(--coral)',
                fontSize: 24,
                lineHeight: 1,
                fontFamily: 'var(--sans)',
              }}
            >
              +
            </span>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 13,
                color: 'var(--ink-soft)',
                maxWidth: '22ch',
                lineHeight: 1.55,
              }}
            >
              Every stage is iterative — whiteboard to production, with feedback
              at every turn.
            </p>
          </div>
        </div>

        <div
          className="method-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 50,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: 50,
              right: 50,
              height: 1,
              background: 'var(--line-soft)',
            }}
          />
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="method-step"
              data-reveal
              style={{ position: 'relative' }}
            >
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  fontSize: 78,
                  color: 'var(--coral)',
                  lineHeight: 0.85,
                  marginBottom: 24,
                  letterSpacing: '-0.02em',
                  background: 'var(--paper)',
                  display: 'inline-block',
                  paddingRight: 12,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.num}
              </div>
              <h4
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 30,
                  fontWeight: 800,
                  letterSpacing: '-0.022em',
                  marginBottom: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: 18,
                }}
              >
                {step.title}
                {i < steps.length - 1 && (
                  <span
                    style={{
                      color: 'var(--ink-faint)',
                      fontSize: 22,
                      lineHeight: 1,
                    }}
                  >
                    &rarr;
                  </span>
                )}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: '13.5px',
                  color: 'var(--ink-mute)',
                  lineHeight: 1.55,
                  marginBottom: 24,
                  maxWidth: '24ch',
                }}
              >
                {step.desc}
              </p>
              <div
                style={{
                  aspectRatio: '1 / 1',
                  background: 'var(--bone)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(${135 + i * 30}deg, var(--bone) 0%, var(--paper-dark) 100%)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px dashed var(--line)',
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: 'var(--sans)',
              fontSize: 11,
              color: 'var(--ink-faint)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                border: '1px dashed var(--ink-faint)',
                borderRadius: '50%',
              }}
            />
            <span>Process is never static. Every project refines it.</span>
          </div>
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 11,
              color: 'var(--ink-faint)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <a
              href="https://github.com/mikaelmacabali"
              target="_blank"
              rel="noreferrer noopener"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'color 160ms ease, border-color 160ms ease',
              }}
            >
              <b style={{ color: 'var(--ink)' }}>github.com/mikaelmacabali</b>
            </a>
            &nbsp;&middot;&nbsp; MIT
          </div>
        </div>
      </Container>
    </section>
  );
}
