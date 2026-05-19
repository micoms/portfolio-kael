import React from 'react';

interface SideRailsProps {
  rightText?: string;
  leftText?: string;
}

export default function SideRails({
  rightText = 'Mikael Macabali \u2014 Portfolio \u00b7 2026 \u00b7 MIT',
  leftText = 'Full-Stack \u00b7 Design \u00b7 Engineering \u00b7 Manila',
}: SideRailsProps) {
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
          {rightText}
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
          {leftText}
        </span>
      </div>
    </>
  );
}
