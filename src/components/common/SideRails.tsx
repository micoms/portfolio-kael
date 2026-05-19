import React from 'react';

export default function SideRails() {
  return (
    <>
      <div
        className="side-rail"
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          width: 36,
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          right: 0,
          borderLeft: '1px solid var(--line-faint)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'var(--ink-faint)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            whiteSpace: 'nowrap',
          }}
        >
          Mikael Macabali &mdash; Portfolio &middot; 2026 &middot; MIT
        </span>
      </div>
      <div
        className="side-rail"
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          width: 36,
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          borderRight: '1px solid var(--line-faint)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'var(--ink-faint)',
            writingMode: 'vertical-rl',
            whiteSpace: 'nowrap',
          }}
        >
          Full-Stack &middot; Design &middot; Engineering &middot; Manila
        </span>
      </div>
    </>
  );
}
