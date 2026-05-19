'use client';

import { footerConfig } from '@/config/Footer';
import { socialLinks } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from './Container';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        padding: '60px 0 30px',
        marginTop: 60,
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: 40,
            marginBottom: 60,
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="brand"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--ink)',
                textDecoration: 'none',
                fontSize: 18,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid var(--ink)',
                  borderRadius: '50%',
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontSize: 17,
                  color: 'var(--ink)',
                }}
              >
                M
              </span>
              <span>Mikael Macabali</span>
            </Link>
            <p
              style={{
                marginTop: 18,
                fontFamily: 'var(--body)',
                fontSize: '13.5px',
                color: 'var(--ink-mute)',
                lineHeight: 1.55,
                maxWidth: '38ch',
              }}
            >
              Full-stack developer building thoughtful applications with modern
              web technologies. Based in Manila, working remotely with teams
              worldwide.
            </p>
          </div>

          {/* Work */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                color: 'var(--ink)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 18,
                fontWeight: 700,
              }}
            >
              Work
            </h5>
            <ul style={{ listStyle: 'none' }}>
              {navbarConfig.navItems.map((item) => (
                <li key={item.label} style={{ marginBottom: 10 }}>
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: '13.5px',
                      color: 'var(--ink-soft)',
                      textDecoration: 'none',
                      transition: 'color 160ms ease',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li style={{ marginBottom: 10 }}>
                <Link
                  href="/contact"
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: '13.5px',
                    color: 'var(--ink-soft)',
                    textDecoration: 'none',
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Stack */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                color: 'var(--ink)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 18,
                fontWeight: 700,
              }}
            >
              Stack
            </h5>
            <ul style={{ listStyle: 'none' }}>
              {['TypeScript', 'React', 'Next.js', 'Node.js'].map((tech) => (
                <li key={tech} style={{ marginBottom: 10 }}>
                  <span
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: '13.5px',
                      color: 'var(--ink-soft)',
                    }}
                  >
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                color: 'var(--ink)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 18,
                fontWeight: 700,
              }}
            >
              Connect
            </h5>
            <ul style={{ listStyle: 'none' }}>
              {socialLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: 10 }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: '13.5px',
                      color: 'var(--ink-soft)',
                      textDecoration: 'none',
                      transition: 'color 160ms ease',
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Meta */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                color: 'var(--ink)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 18,
                fontWeight: 700,
              }}
            >
              Meta
            </h5>
            <ul style={{ listStyle: 'none' }}>
              {['Colophon', 'License', 'Source'].map((item) => (
                <li key={item} style={{ marginBottom: 10 }}>
                  <span
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: '13.5px',
                      color: 'var(--ink-soft)',
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--line)',
            paddingTop: 22,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--sans)',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--ink-faint)',
          }}
        >
          <span>
            <span className="pulse-dot" style={{ marginRight: 6 }} />
            <b style={{ color: 'var(--ink)' }}>Mikael Macabali</b> &middot; MIT
            &middot; 2026 / Portfolio / 2026
          </span>
          <span
            style={{ display: 'inline-flex', gap: 24, alignItems: 'center' }}
          >
            <span>Manila / Remote</span>
            <span>14.55&deg; N &middot; 121.02&deg; E</span>
            <span style={{ color: 'var(--coral)' }}>&hearts; MMXXVI</span>
          </span>
        </div>

        {/* Mega text */}
        <div
          style={{
            marginTop: 60,
            paddingTop: 0,
            paddingBottom: 12,
            borderTop: '1px solid var(--line)',
            overflowX: 'hidden',
            overflowY: 'visible',
          }}
        >
          <div
            data-reveal="rise-lg"
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 900,
              fontSize: 'clamp(70px, 13vw, 200px)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--ink)',
              whiteSpace: 'nowrap',
              marginTop: 30,
              paddingBottom: '0.18em',
            }}
          >
            Mikael{' '}
            <em
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 500,
                color: 'var(--coral)',
              }}
            >
              Macabali
            </em>
            .
          </div>
        </div>
      </Container>
    </footer>
  );
}
