import React from 'react';

export default function Topbar() {
  return (
    <div
      className="border-b"
      style={{
        borderColor: 'var(--line)',
        background: 'var(--paper)',
        position: 'relative',
        zIndex: 4,
      }}
    >
      <div
        className="container-atelier topbar-inner"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
          fontFamily: 'var(--sans)',
          fontSize: '10.5px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-faint)',
          padding: '10px 0',
        }}
      >
        <span>
          <b style={{ color: 'var(--ink)', fontWeight: 600 }}>M / 2026</b>{' '}
          &nbsp;&middot;&nbsp; Portfolio / 2026
        </span>
        <span className="mid" style={{ display: 'inline-flex', gap: 26 }}>
          <span>
            Filed under{' '}
            <b style={{ color: 'var(--coral)' }}>
              Code &middot; Design &middot; Engineering
            </b>
          </span>
          <span>MIT &middot; Made on Earth</span>
        </span>
        <span
          className="right"
          style={{ display: 'inline-flex', gap: 18, alignItems: 'center' }}
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
            <span className="pulse-dot" style={{ marginRight: 6 }} />
            Open &middot; v1.0
          </a>
          <span>
            <b style={{ color: 'var(--ink)', fontWeight: 600 }}>EN</b> &middot;
            PH
          </span>
        </span>
      </div>
    </div>
  );
}
