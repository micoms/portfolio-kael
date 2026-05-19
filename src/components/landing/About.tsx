import { getSiteConfig } from '@/lib/db/settings';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';

export default async function About() {
  const aboutData = await getSiteConfig('about');
  const name =
    ((aboutData as Record<string, unknown>)?.name as string) ||
    'Mikael Macabali';
  const description =
    ((aboutData as Record<string, unknown>)?.description as string) || '';

  return (
    <section style={{ position: 'relative', padding: '130px 0' }}>
      <Container>
        <div className="sec-rule">
          <span className="roman">II.</span>
          <span className="meta-grp">
            <span>About / The developer</span>
            <span className="dot-mark">&bull;</span>
            <span>{name} / Volume 01</span>
          </span>
          <span>002 / 008</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          <div data-reveal>
            <span className="label">
              About me <span className="ix">&middot; N&ordm; 02</span>
            </span>
            <h2
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                letterSpacing: '-0.028em',
                color: 'var(--ink)',
                lineHeight: 1.0,
                fontSize: 'clamp(44px, 5.4vw, 78px)',
                margin: '30px 0 36px',
              }}
            >
              Every project starts with a{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  letterSpacing: '-0.018em',
                }}
              >
                conversation,
              </em>{' '}
              not a{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  letterSpacing: '-0.018em',
                }}
              >
                ticket
              </em>
              <span style={{ color: 'var(--coral)' }}>.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: 17,
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
                maxWidth: '42ch',
                marginBottom: 36,
              }}
            >
              {description}
            </p>
            <a
              className="btn btn-ghost"
              href="#contact"
              style={{ marginBottom: 0 }}
            >
              Read my story
              <span className="arrow">
                <svg viewBox="0 0 24 24">
                  <path d="M5 19L19 5M19 5H8M19 5v11" />
                </svg>
              </span>
            </a>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginTop: 56,
                color: 'var(--ink-faint)',
                fontFamily: 'var(--sans)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: '1px solid var(--ink)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontSize: 14,
                  color: 'var(--ink)',
                }}
              >
                M
              </span>
              <span>
                TypeScript &middot; React &middot; Node &middot; PostgreSQL
                &middot; Always learning
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: 'var(--coral)' }}>Manila-based</span>
                <span style={{ color: 'var(--ink)' }}>Remote-friendly</span>
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
            <Image
              src="/assets/logo.png"
              alt=""
              fill
              style={{ objectFit: 'contain' }}
            />
            <div
              style={{
                position: 'absolute',
                right: -8,
                top: 26,
                textAlign: 'right',
                fontFamily: 'var(--sans)',
                fontSize: '10.5px',
                lineHeight: 1.55,
                color: 'var(--ink-faint)',
                letterSpacing: '0.04em',
                maxWidth: '16ch',
              }}
            >
              <b
                style={{
                  display: 'block',
                  color: 'var(--coral)',
                  width: 36,
                  height: 1,
                  background: 'var(--coral)',
                  margin: '0 0 10px auto',
                }}
              />
              From database schema
              <br />
              to pixel-perfect UI,
              <br />I work across the
              <br />
              full stack of modern
              <br />
              web development.
            </div>
            <div
              style={{
                position: 'absolute',
                right: 18,
                bottom: 4,
                fontFamily: 'var(--sans)',
                fontSize: '9.5px',
                color: 'var(--ink-faint)',
                textAlign: 'right',
                letterSpacing: '0.06em',
                lineHeight: 1.45,
              }}
            >
              <b style={{ color: 'var(--ink)', display: 'block' }}>
                Studies in form &middot; function &middot; machine elegance.
              </b>
              ({name}, MMXXVI)
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
