import Container from '@/components/common/Container';
import { SectionRule } from '@/components/common/SectionRule';
import Monitor from '@/components/svgs/devices/Monitor';
import { devices, software, webExtensions } from '@/config/Gears';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { ArrowUpRight, Puzzle } from 'lucide-react';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/gears'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function GearsPage() {
  return (
    <main>
      <section style={{ position: 'relative', padding: '80px 0 40px' }}>
        <Container>
          <SectionRule
            roman="G."
            left="Gears / Setup"
            middle="Tools of the trade"
            right="-- / --"
          />
          <div data-reveal>
            <span className="label">
              Gears <span className="ix">&middot; N&ordm; 01</span>
            </span>
            <h1
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                letterSpacing: '-0.028em',
                color: 'var(--ink)',
                lineHeight: 1.0,
                fontSize: 'clamp(40px, 5vw, 66px)',
                margin: '22px 0 20px',
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
                gears
              </em>{' '}
              and tools<span style={{ color: 'var(--coral)' }}>.</span>
            </h1>
          </div>
        </Container>
      </section>

      <Container>
        <div style={{ paddingBottom: 80 }}>
          {/* Devices */}
          <div style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: 20,
              }}
            >
              Devices
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 12,
              }}
            >
              {devices.map((device) => (
                <div
                  key={device.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 20px',
                    background: 'var(--bone)',
                    borderRadius: 18,
                    boxShadow:
                      'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'var(--paper-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--ink)',
                    }}
                  >
                    {device.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    {device.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Web Extensions */}
          <div style={{ marginBottom: 48 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'var(--bone)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink)',
                }}
              >
                <Puzzle size={16} />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}
              >
                Web Extensions
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 8,
              }}
            >
              {webExtensions.map((ext) => (
                <Link
                  key={ext.name}
                  href={ext.href}
                  target="_blank"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'var(--bone)',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: 'var(--ink-soft)',
                    fontFamily: 'var(--sans)',
                    fontSize: 13,
                    transition: 'color 160ms ease',
                  }}
                >
                  <span>{ext.name}</span>
                  <ArrowUpRight
                    size={14}
                    style={{ color: 'var(--ink-faint)' }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Software */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'var(--bone)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink)',
                }}
              >
                <Monitor className="size-4" />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}
              >
                Software
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 8,
              }}
            >
              {software.map((app) => (
                <Link
                  key={app.name}
                  href={app.href}
                  target="_blank"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'var(--bone)',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: 'var(--ink-soft)',
                    fontFamily: 'var(--sans)',
                    fontSize: 13,
                    transition: 'color 160ms ease',
                  }}
                >
                  <span>{app.name}</span>
                  <ArrowUpRight
                    size={14}
                    style={{ color: 'var(--ink-faint)' }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
