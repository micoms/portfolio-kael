import React from 'react';

interface TopbarProps {
  version?: string;
  categories?: string;
  license?: string;
  githubUrl?: string;
  statusText?: string;
  languages?: string;
}

export default function Topbar({
  version = 'M / 2026',
  categories = 'Code \u00b7 Design \u00b7 Engineering',
  license = 'MIT \u00b7 Made on Earth',
  githubUrl = 'https://github.com/mikaelmacabali',
  statusText = 'Open \u00b7 v1.0',
  languages = 'EN \u00b7 PH',
}: TopbarProps) {
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
          <b style={{ color: 'var(--ink)', fontWeight: 600 }}>{version}</b>{' '}
          &nbsp;&middot;&nbsp; Portfolio / 2026
        </span>
        <span className="mid" style={{ display: 'inline-flex', gap: 26 }}>
          <span>
            Filed under <b style={{ color: 'var(--coral)' }}>{categories}</b>
          </span>
          <span>{license}</span>
        </span>
        <span
          className="right"
          style={{ display: 'inline-flex', gap: 18, alignItems: 'center' }}
        >
          <a
            href={githubUrl}
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
            {statusText}
          </a>
          <span>
            <b style={{ color: 'var(--ink)', fontWeight: 600 }}>
              {languages.split(' \u00b7 ')[0]}
            </b>{' '}
            &middot;
            {languages.split(' \u00b7 ')[1] || ''}
          </span>
        </span>
      </div>
    </div>
  );
}
