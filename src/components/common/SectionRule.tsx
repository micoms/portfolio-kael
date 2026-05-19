import React from 'react';

interface SectionRuleProps {
  roman: string;
  left: string;
  middle: string;
  right: string;
}

export function SectionRule({ roman, left, middle, right }: SectionRuleProps) {
  return (
    <div className="sec-rule">
      <span className="roman">{roman}</span>
      <span className="meta-grp">
        <span>{left}</span>
        <span className="dot-mark">&bull;</span>
        <span>{middle}</span>
      </span>
      <span>{right}</span>
    </div>
  );
}
