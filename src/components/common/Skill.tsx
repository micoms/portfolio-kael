import React from 'react';

interface SkillProps {
  name: string;
  href: string;
  children: React.ReactNode;
}

export default function Skill({ name, href, children }: SkillProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 10px',
        background: 'var(--bone)',
        borderRadius: 6,
        fontFamily: 'var(--sans)',
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--ink-soft)',
        textDecoration: 'none',
        transition: 'background 160ms ease',
      }}
    >
      <span
        style={{
          width: 14,
          height: 14,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </span>
      {name}
    </a>
  );
}
