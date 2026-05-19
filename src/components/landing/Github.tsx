'use client';

import { githubConfig } from '@/config/Github';
import React, { useEffect, useState } from 'react';

import Container from '../common/Container';

interface Contribution {
  date: string;
  count: number;
  level: number;
}

export default function Github() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${githubConfig.apiUrl}/${githubConfig.username}.json`)
      .then((r) => r.json())
      .then((data) => {
        const now = new Date();
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(now.getFullYear() - 1);

        const days = data.contributions.filter((c: Contribution) => {
          const d = new Date(c.date);
          return d >= oneYearAgo && d <= now;
        });

        setContributions(days);
        setTotal(
          days.reduce((sum: number, c: Contribution) => sum + c.count, 0),
        );
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const colors = [
    'var(--bone)',
    'var(--paper-dark)',
    'var(--olive)',
    'var(--coral-soft)',
    'var(--coral)',
  ];

  return (
    <section style={{ position: 'relative', padding: '130px 0' }}>
      <Container>
        <div className="sec-rule">
          <span className="roman">X.</span>
          <span className="meta-grp">
            <span>GitHub / Activity</span>
            <span className="dot-mark">&bull;</span>
            <span>Open source</span>
          </span>
          <span>-- / --</span>
        </div>

        <div data-reveal>
          <span className="label">
            GitHub <span className="ix">&middot; N&ordm; 09</span>
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
            A year of{' '}
            <em
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              consistent
            </em>{' '}
            building<span style={{ color: 'var(--coral)' }}>.</span>
          </h2>
        </div>

        <div
          data-reveal
          style={{
            padding: '32px 30px',
            background: 'var(--bone)',
            borderRadius: 18,
            boxShadow: 'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
          }}
        >
          {loading ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 120,
                fontFamily: 'var(--sans)',
                fontSize: 13,
                color: 'var(--ink-faint)',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  border: '2px solid var(--line)',
                  borderTopColor: 'var(--coral)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: 12,
                }}
              />
              {githubConfig.loadingState.title}
            </div>
          ) : error ? (
            <div
              style={{
                textAlign: 'center',
                padding: 40,
                fontFamily: 'var(--sans)',
                color: 'var(--ink-mute)',
              }}
            >
              <p style={{ fontSize: 14, marginBottom: 16 }}>
                {githubConfig.errorState.title}
              </p>
              <a
                href={`https://github.com/${githubConfig.username}`}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost"
                style={{ fontSize: 13 }}
              >
                {githubConfig.errorState.buttonText}
              </a>
            </div>
          ) : (
            <>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 13,
                  color: 'var(--ink-mute)',
                  marginBottom: 20,
                }}
              >
                <b style={{ color: 'var(--ink)', fontWeight: 700 }}>
                  {total.toLocaleString()}
                </b>{' '}
                contributions in the last year
              </p>
              <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(52, 1fr)',
                    gap: 3,
                  }}
                >
                  {contributions.map((c, i) => (
                    <div
                      key={i}
                      title={`${c.count} contributions on ${c.date}`}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        borderRadius: 2,
                        background: colors[c.level] || colors[0],
                      }}
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 6,
                  marginTop: 12,
                  fontFamily: 'var(--sans)',
                  fontSize: 10,
                  color: 'var(--ink-faint)',
                }}
              >
                <span>Less</span>
                {colors.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: c,
                    }}
                  />
                ))}
                <span>More</span>
              </div>
            </>
          )}
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </Container>
    </section>
  );
}
