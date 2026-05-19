'use client';

import { Menu } from 'lucide-react';
import { Link } from 'next-view-transitions';
import React, { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import Container from './Container';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  brandName?: string;
  title?: string;
  location?: string;
  githubUrl?: string;
  navItems?: NavItem[];
}

export default function Navbar({
  brandName = 'Mikael Macabali',
  title = 'Full-Stack Developer',
  location = 'Manila / Remote',
  githubUrl = 'https://github.com/mikaelmacabali',
  navItems = [
    { label: 'Work', href: '/work-experience' },
    { label: 'Blogs', href: '/blog' },
    { label: 'Projects', href: '/projects' },
  ],
}: NavbarProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const SHOW_TOP = 100;
    const DELTA = 6;
    let prevY = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const d = y - prevY;
      if (y <= SHOW_TOP) {
        setIsHidden(false);
      } else if (d > DELTA) {
        setIsHidden(true);
      } else if (d < -DELTA) {
        setIsHidden(false);
      }
      prevY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav-headroom${isHidden ? 'is-hidden' : ''}`}>
      <Container>
        <div
          className="nav-inner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
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
            }}
          >
            <span
              className="brand-mark"
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
                background: 'transparent',
              }}
            >
              M
            </span>
            <span>{brandName}</span>
            <span
              className="brand-meta"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                lineHeight: 1.3,
                marginLeft: 4,
                borderLeft: '1px solid var(--line)',
                paddingLeft: 14,
              }}
            >
              <b
                style={{
                  display: 'block',
                  color: 'var(--ink)',
                  fontWeight: 600,
                }}
              >
                {title}
              </b>
              {location}
            </span>
          </Link>

          <nav>
            <ul
              className="nav-links"
              style={{ display: 'flex', gap: 38, listStyle: 'none' }}
            >
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      color: 'var(--ink)',
                      textDecoration: 'none',
                      fontFamily: 'var(--sans)',
                      fontSize: 14,
                      fontWeight: 500,
                      transition: 'color 0.18s ease',
                      position: 'relative',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  style={{
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    fontFamily: 'var(--sans)',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'color 0.18s ease',
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div
            className="nav-side"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}
          >
            <a
              className="nav-cta"
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 16px',
                borderRadius: 999,
                background: 'var(--ink)',
                color: 'var(--paper)',
                fontFamily: 'var(--sans)',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              GitHub
            </a>
            <span
              className="status-dot"
              aria-hidden="true"
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: '1px solid var(--line)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--coral)',
                }}
              />
            </span>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 sm:hidden"
                  aria-label="Open menu"
                  style={{ color: 'var(--ink)' }}
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px]"
                style={{
                  background: 'var(--paper)',
                  borderLeft: '1px solid var(--line)',
                }}
              >
                <SheetHeader>
                  <SheetTitle
                    style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: 'var(--ink)',
                    }}
                  >
                    {brandName}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href}
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: 14,
                          fontWeight: 500,
                          color: 'var(--ink-soft)',
                          padding: '10px 12px',
                          borderRadius: 8,
                          textDecoration: 'none',
                          transition: 'color 160ms ease',
                        }}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <div
                    style={{
                      borderTop: '1px solid var(--line)',
                      margin: '8px 0',
                    }}
                  />
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--ink-soft)',
                        padding: '10px 12px',
                        borderRadius: 8,
                        textDecoration: 'none',
                      }}
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
