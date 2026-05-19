import { getSiteConfig } from '@/lib/db/settings';
import React from 'react';

import Container from '../common/Container';

export default async function CTA() {
  const dbCta = (await getSiteConfig('cta')) as {
    email?: string;
    title?: string;
    description?: string;
  } | null;
  const email = dbCta?.email || 'mikaelmacabali@gmail.com';
  return (
    <section
      id="contact"
      className="section-padded"
      style={{ position: 'relative' }}
    >
      <Container>
        <div className="sec-rule">
          <span className="roman">VIII.</span>
          <span className="meta-grp">
            <span>Contact / Start a conversation</span>
            <span className="dot-mark">&bull;</span>
            <span>Let&apos;s build something</span>
          </span>
          <span>008 / 008</span>
        </div>

        <div
          className="grid-cta"
          style={{
            gap: 50,
            alignItems: 'center',
          }}
        >
          <div data-reveal>
            <span className="label">
              Start a conversation{' '}
              <span className="ix">&middot; N&ordm; 07</span>
            </span>
            <h2
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                letterSpacing: '-0.028em',
                color: 'var(--ink)',
                lineHeight: 1.0,
                fontSize: 'clamp(54px, 6.6vw, 100px)',
                margin: '32px 0',
              }}
            >
              Have a project in{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                mind
              </em>
              ? Let&apos;s build something{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                great
              </em>{' '}
              together<span style={{ color: 'var(--coral)' }}>.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: 16,
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
                maxWidth: '36ch',
                marginBottom: 36,
              }}
            >
              Whether you need a full product built, a team member for a
              specific project, or just want to chat about technology &mdash;
              I&apos;d love to hear from you.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 32,
              }}
            >
              <a
                className="btn btn-primary"
                href={`mailto:${email}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                Send a message
                <span className="arrow">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 19L19 5M19 5H8M19 5v11" />
                  </svg>
                </span>
              </a>
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noreferrer noopener"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 18px 14px 22px',
                  borderRadius: 999,
                  border: '1px solid var(--line)',
                  fontFamily: 'var(--sans)',
                  fontSize: 14,
                  color: 'var(--ink)',
                  textDecoration: 'none',
                }}
              >
                {email}
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'var(--ink)',
                    color: 'var(--paper)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                  }}
                >
                  &rarr;
                </span>
              </a>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 28,
                alignItems: 'center',
                marginTop: 32,
                paddingTop: 22,
                borderTop: '1px solid var(--line)',
                fontFamily: 'var(--sans)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
              }}
            >
              <span style={{ color: 'var(--coral)', fontWeight: 600 }}>
                &bull; Live
              </span>
              <span>v1.0 / MIT</span>
              <span style={{ marginLeft: 'auto' }}>
                14.55&deg; N &middot; 121.02&deg; E
              </span>
            </div>
          </div>

          <div
            data-reveal="right"
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              maxWidth: 620,
              marginLeft: 'auto',
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
                viewBox="0 0 200 200"
                fill="none"
                style={{ width: '60%', height: '60%' }}
              >
                <rect
                  x="40"
                  y="60"
                  width="120"
                  height="80"
                  rx="8"
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                />
                <path
                  d="M40 68l60 40 60-40"
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="15"
                  stroke="var(--coral)"
                  strokeWidth="1.5"
                />
                <path
                  d="M95 100l3 3 7-7"
                  stroke="var(--coral)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div
              style={{
                position: 'absolute',
                right: 8,
                top: 24,
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 28,
                color: 'var(--ink-faint)',
              }}
            >
              N&ordm; 08
            </div>
            <div
              style={{
                position: 'absolute',
                left: -32,
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
              MIKAEL MACABALI &nbsp;&middot;&nbsp; FIN.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
