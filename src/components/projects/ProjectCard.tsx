'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import Github from '../svgs/Github';
import PlayCircle from '../svgs/PlayCircle';
import Website from '../svgs/Website';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bone)',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: 'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
        transition: 'transform 0.2s ease',
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          background: 'var(--paper-dark)',
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          width={1920}
          height={1080}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {project.video && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.1)',
                  opacity: 0,
                  transition: 'opacity 300ms',
                }}
              >
                <button
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <PlayCircle />
                </button>
              </div>
            </DialogTrigger>
            <DialogContent
              style={{
                width: '100%',
                maxWidth: 896,
                border: 'none',
                padding: 0,
              }}
            >
              <div style={{ aspectRatio: '16 / 9', width: '100%' }}>
                <video
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 12,
                    objectFit: 'cover',
                  }}
                  src={project.video}
                  autoPlay
                  loop
                  controls
                />
              </div>
              <DialogTitle className="sr-only">{project.title}</DialogTitle>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: '20px 22px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 10,
          }}
        >
          <Link
            href={project.projectDetailsPageSlug || '#'}
            style={{ textDecoration: 'none' }}
          >
            <h3
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1.1,
                transition: 'color 160ms ease',
              }}
            >
              {project.title}
            </h3>
          </Link>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexShrink: 0,
            }}
          >
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={project.link}
                  target="_blank"
                  style={{
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                    color: 'var(--ink-faint)',
                    transition: 'color 160ms ease',
                  }}
                >
                  <Website />
                </Link>
              </TooltipTrigger>
              <TooltipContent>View Website</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    style={{
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 6,
                      color: 'var(--ink-faint)',
                      transition: 'color 160ms ease',
                    }}
                  >
                    <Github />
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent>View GitHub</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: '13.5px',
            color: 'var(--ink-mute)',
            lineHeight: 1.55,
            marginBottom: 14,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 14,
          }}
        >
          {project.technologies.slice(0, 5).map((technology, index) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    transition: 'transform 200ms',
                  }}
                >
                  {technology.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{technology.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {project.details && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 12,
              borderTop: '1px solid var(--line)',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '3px 10px',
                borderRadius: 999,
                background: project.isWorking
                  ? 'var(--olive)'
                  : 'var(--mustard)',
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
              {project.isWorking ? 'Live' : 'In Progress'}
            </span>
            <Link
              href={project.projectDetailsPageSlug || '#'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--sans)',
                fontSize: 13,
                color: 'var(--ink-mute)',
                textDecoration: 'none',
                transition: 'color 160ms ease',
              }}
            >
              Details
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
