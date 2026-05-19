import { cn } from '@/lib/utils';
import React from 'react';

interface SectionHeadingProps {
  subHeading: string;
  heading: string;
  className?: string;
}

export default function SectionHeading({
  subHeading,
  heading,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(className)}>
      <span className="label">
        {subHeading} <span className="ix">&middot; {heading}</span>
      </span>
      <h2
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 800,
          letterSpacing: '-0.028em',
          color: 'var(--ink)',
          lineHeight: 1.0,
          fontSize: 'clamp(36px, 4vw, 56px)',
          marginTop: 22,
        }}
      >
        {heading}
        <span style={{ color: 'var(--coral)' }}>.</span>
      </h2>
    </div>
  );
}
