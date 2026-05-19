import React from 'react';

const cities = [
  'Manila',
  'Tokyo',
  'San Francisco',
  'London',
  'Berlin',
  'Singapore',
  'Sydney',
  'Toronto',
  'Seoul',
  'Amsterdam',
  'Dubai',
  'New York',
];

const contributors = [
  { handle: '@mikaelmacabali', role: 'Full-Stack Dev' },
  { handle: '@open-source', role: 'Community' },
  { handle: '@design-systems', role: 'UI/UX' },
  { handle: '@typescript', role: 'Language' },
  { handle: '@react', role: 'Frontend' },
  { handle: '@nextjs', role: 'Framework' },
];

function MarqueeRow({
  children,
  reverse = false,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`wire-row${reverse ? 'reverse' : ''}`}
      style={{
        overflow: 'hidden',
        maskImage:
          'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
      }}
    >
      <div className="marquee-track">
        {children}
        {children}
      </div>
    </div>
  );
}

export default function MarqueeTicker() {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--line)',
        padding: '26px 0 28px',
        background: 'var(--paper)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-atelier">
        <div
          className="wire-inner"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 220px) minmax(0, 1fr)',
            gap: 32,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              borderRight: '1px solid var(--line)',
              paddingRight: 24,
              minHeight: 56,
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                border: '1px solid var(--line)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span className="pulse-dot" />
            </span>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                lineHeight: 1.4,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <b
                style={{
                  color: 'var(--ink)',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                Global
              </b>
              <span
                style={{
                  color: 'var(--ink-faint)',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                Connected &middot; Always
              </span>
            </span>
          </div>

          <div style={{ display: 'grid', gap: 8, minWidth: 0 }}>
            <MarqueeRow>
              {cities.map((city) => (
                <span
                  key={city}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    gap: 8,
                    fontFamily: 'var(--sans)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    color: 'var(--ink-mute)',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      color: 'var(--coral)',
                      fontSize: 16,
                      lineHeight: 0,
                      position: 'relative',
                      top: -1,
                      marginRight: 2,
                    }}
                  >
                    &bull;
                  </span>
                  <span
                    style={{
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: 'var(--ink)',
                      fontWeight: 500,
                    }}
                  >
                    {city}
                  </span>
                </span>
              ))}
            </MarqueeRow>
            <MarqueeRow reverse>
              {contributors.map((c) => (
                <span
                  key={c.handle}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    gap: 8,
                    fontFamily: 'var(--sans)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    color: 'var(--ink-mute)',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      color: 'var(--ink)',
                      fontSize: '11.5px',
                      fontWeight: 500,
                    }}
                  >
                    {c.handle}
                  </span>
                  <span
                    style={{
                      textTransform: 'uppercase',
                      letterSpacing: '0.16em',
                      color: 'var(--coral)',
                      fontSize: 10,
                    }}
                  >
                    {c.role}
                  </span>
                </span>
              ))}
            </MarqueeRow>
          </div>
        </div>
      </div>
    </div>
  );
}
