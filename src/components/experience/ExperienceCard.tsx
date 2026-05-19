import { type Experience } from '@/config/Experience';
import { iconRegistry } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Skill from '../common/Skill';
import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import X from '../svgs/X';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ExperienceCardProps {
  experience: Experience;
}

function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*.*?\*)/);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return (
            <b key={i} style={{ color: 'var(--ink)', fontWeight: 600 }}>
              {part.slice(1, -1)}
            </b>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div
      style={{
        padding: '28px 26px',
        background: 'var(--bone)',
        borderRadius: 18,
        boxShadow: 'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
      }}
    >
      {/* Company Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Image
            src={experience.image}
            alt={experience.company}
            width={40}
            height={40}
            style={{ borderRadius: 10, objectFit: 'cover' }}
          />
          <div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}
              >
                {experience.company}
              </h3>
              {experience.website && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.website}
                      target="_blank"
                      style={{
                        width: 14,
                        height: 14,
                        color: 'var(--ink-faint)',
                        transition: 'color 160ms ease',
                      }}
                    >
                      <Website />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Visit Website</TooltipContent>
                </Tooltip>
              )}
              {experience.x && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.x}
                      target="_blank"
                      style={{
                        width: 14,
                        height: 14,
                        color: 'var(--ink-faint)',
                        transition: 'color 160ms ease',
                      }}
                    >
                      <X />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Follow on X</TooltipContent>
                </Tooltip>
              )}
              {experience.linkedin && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.linkedin}
                      target="_blank"
                      style={{
                        width: 14,
                        height: 14,
                        color: 'var(--ink-faint)',
                        transition: 'color 160ms ease',
                      }}
                    >
                      <LinkedIn />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Connect on LinkedIn</TooltipContent>
                </Tooltip>
              )}
              {experience.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.github}
                      target="_blank"
                      style={{
                        width: 14,
                        height: 14,
                        color: 'var(--ink-faint)',
                        transition: 'color 160ms ease',
                      }}
                    >
                      <Github />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>View GitHub</TooltipContent>
                </Tooltip>
              )}
              {experience.isCurrent && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '3px 10px',
                    borderRadius: 999,
                    background: 'var(--olive)',
                    color: '#fff',
                    fontFamily: 'var(--sans)',
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#fff',
                      animation: 'pulse 2.4s ease-in-out infinite',
                    }}
                  />
                  Current
                </span>
              )}
            </div>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 14,
                color: 'var(--coral)',
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              {experience.position}
            </p>
          </div>
        </div>
        <div
          style={{
            textAlign: 'right',
            fontFamily: 'var(--mono)',
            fontSize: 12,
            color: 'var(--ink-faint)',
            whiteSpace: 'nowrap',
          }}
        >
          <div>
            {experience.startDate} &ndash;{' '}
            {experience.isCurrent ? 'Present' : experience.endDate}
          </div>
          <div style={{ fontSize: 11, marginTop: 2 }}>
            {experience.location}
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginBottom: 16,
        }}
      >
        {experience.description.map(
          (description: string, descIndex: number) => (
            <p
              key={descIndex}
              style={{
                fontFamily: 'var(--body)',
                fontSize: '13.5px',
                lineHeight: 1.55,
                color: 'var(--ink-mute)',
                paddingLeft: 16,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 8,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--coral)',
                }}
              />
              <BoldText text={description} />
            </p>
          ),
        )}
      </div>

      {/* Technologies */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {experience.technologies.map((technology, techIndex: number) => {
          const resolvedIcon =
            technology.icon ||
            (technology.iconKey
              ? (() => {
                  const I = iconRegistry[technology.iconKey];
                  return I ? <I className="size-4" /> : null;
                })()
              : null);
          return (
            <Skill
              key={techIndex}
              name={technology.name}
              href={technology.href}
            >
              {resolvedIcon}
            </Skill>
          );
        })}
      </div>
    </div>
  );
}
