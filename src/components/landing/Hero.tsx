import { getSiteConfig } from '@/lib/db/settings';
import { parseTemplate } from '@/lib/hero';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';

const skillComponents: Record<string, React.ComponentType> = {};

async function loadSkillComponents() {
  const modules = await Promise.all([
    import('@/components/technologies/TypeScript'),
    import('@/components/technologies/ReactIcon'),
    import('@/components/technologies/NextJs'),
    import('@/components/technologies/Bun'),
    import('@/components/technologies/PostgreSQL'),
    import('@/components/technologies/NodeJs'),
    import('@/components/technologies/MongoDB'),
    import('@/components/technologies/Prisma'),
    import('@/components/technologies/JavaScript'),
  ]);
  return {
    TypeScript: modules[0].default,
    ReactIcon: modules[1].default,
    NextJs: modules[2].default,
    Bun: modules[3].default,
    PostgreSQL: modules[4].default,
    NodeJs: modules[5].default,
    MongoDB: modules[6].default,
    Prisma: modules[7].default,
    JavaScript: modules[8].default,
  };
}

export default async function Hero() {
  const heroData = await getSiteConfig('hero');
  const components = await loadSkillComponents();

  const name =
    ((heroData as Record<string, unknown>)?.name as string) || 'Mikael';
  const avatar =
    ((heroData as Record<string, unknown>)?.avatar as string) ||
    '/assets/logo.png';
  const skills =
    ((heroData as Record<string, unknown>)?.skills as Array<{
      name: string;
      href: string;
      component: string;
    }>) || [];
  const descriptionTemplate =
    ((heroData as Record<string, unknown>)?.descriptionTemplate as string) ||
    '';

  const renderDescription = () => {
    if (!descriptionTemplate) return null;
    const parts = parseTemplate(descriptionTemplate, skills);
    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          components[part.skill.component as keyof typeof components];
        if (!SkillComponent) return null;
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} style={{ color: 'var(--ink)', fontWeight: 600 }}>
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key} style={{ whiteSpace: 'pre-wrap' }}>
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <section
      className="hero"
      id="top"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <Container>
        <div className="sec-rule">
          <span className="roman">I.</span>
          <span className="meta-grp">
            <span>Hero / Cover Plate</span>
            <span className="dot-mark">&bull;</span>
            <span>{name} / Volume 01</span>
          </span>
          <span>001 / 008</span>
        </div>
      </Container>
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.78fr) minmax(0, 1.22fr)',
            gap: 36,
            alignItems: 'stretch',
            width: '100%',
          }}
        >
          <div
            className="hero-copy"
            style={{
              padding: '4vh 0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span className="label" data-reveal>
              Full-stack developer{' '}
              <span className="ix">&middot; N&ordm; 01</span>
            </span>

            <h1
              data-reveal
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                letterSpacing: '-0.028em',
                color: 'var(--ink)',
                lineHeight: 1.0,
                fontSize: 'clamp(44px, 5vw, 78px)',
                marginBottom: 28,
                marginTop: 28,
              }}
            >
              Building the web with{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  letterSpacing: '-0.018em',
                }}
              >
                clarity,
              </em>{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  letterSpacing: '-0.018em',
                }}
              >
                purpose,
              </em>{' '}
              and carefully considered{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  letterSpacing: '-0.018em',
                }}
              >
                craft
              </em>
              <span style={{ color: 'var(--coral)' }}>.</span>
            </h1>

            <p
              className="lead"
              data-reveal
              style={{ marginBottom: 30, maxWidth: '38ch' }}
            >
              {renderDescription() ||
                'I design and develop full-stack applications that balance thoughtful user experience with clean, maintainable code.'}
            </p>

            <div
              data-reveal
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 38,
              }}
            >
              <a className="btn btn-primary" href="#work">
                View selected work
                <span className="arrow">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 19L19 5M19 5H8M19 5v11" />
                  </svg>
                </span>
              </a>
              <a className="btn btn-ghost" href="#contact">
                Get in touch
                <span className="arrow">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 12h6M12 9v6" />
                  </svg>
                </span>
              </a>
            </div>

            <div
              data-reveal
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                marginBottom: 28,
              }}
            >
              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    border: '1px solid var(--ink)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--sans)',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  06
                </span>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 11,
                    lineHeight: 1.25,
                    color: 'var(--ink-soft)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  <b
                    style={{
                      display: 'block',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      fontSize: 12,
                    }}
                  >
                    projects
                  </b>
                  shipped
                </span>
              </div>
              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    border: '1px dashed var(--ink)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--sans)',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  08
                </span>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 11,
                    lineHeight: 1.25,
                    color: 'var(--ink-soft)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  <b
                    style={{
                      display: 'block',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      fontSize: 12,
                    }}
                  >
                    technologies
                  </b>
                  in daily use
                </span>
              </div>
              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    border: '1px solid var(--coral)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--sans)',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                    color: 'var(--coral)',
                  }}
                >
                  03
                </span>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 11,
                    lineHeight: 1.25,
                    color: 'var(--ink-soft)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  <b
                    style={{
                      display: 'block',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      fontSize: 12,
                    }}
                  >
                    years
                  </b>
                  building
                </span>
              </div>
            </div>

            <div
              data-reveal
              style={{
                marginTop: 'auto',
                paddingTop: 22,
                borderTop: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
              }}
            >
              <span className="meta" style={{ lineHeight: 1.4 }}>
                &#8627; &nbsp; Full-Stack &middot; TypeScript &middot; React
                &middot; Node &nbsp;&middot;&nbsp; Always shipping
              </span>
              <span className="coord">14.55&deg; N &middot; 121.02&deg; E</span>
            </div>
          </div>

          <div
            data-reveal="scale"
            style={{
              position: 'relative',
              height: 'calc(100vh - 160px)',
              maxHeight: 860,
              marginLeft: 'auto',
              marginRight: -12,
              width: '100%',
              overflow: 'visible',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 22,
                height: 22,
                borderTop: '1px solid var(--ink-faint)',
                borderLeft: '1px solid var(--ink-faint)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 22,
                height: 22,
                borderTop: '1px solid var(--ink-faint)',
                borderRight: '1px solid var(--ink-faint)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 22,
                height: 22,
                borderBottom: '1px solid var(--ink-faint)',
                borderLeft: '1px solid var(--ink-faint)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 22,
                height: 22,
                borderBottom: '1px solid var(--ink-faint)',
                borderRight: '1px solid var(--ink-faint)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                fontFamily: 'var(--mono)',
                fontSize: 10,
                letterSpacing: '0.04em',
                color: 'var(--ink-faint)',
              }}
            >
              FIG. 01 / MK-26
            </span>
            <span
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                fontFamily: 'var(--sans)',
                fontSize: '10.5px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
              }}
            >
              Plate N&ordm; 01
            </span>
            <span
              style={{
                position: 'absolute',
                bottom: 14,
                left: 14,
                fontFamily: 'var(--mono)',
                fontSize: 10,
                letterSpacing: '0.04em',
                color: 'var(--ink-faint)',
              }}
            >
              SHA &middot; a1b2c3d
            </span>
            <span
              style={{
                position: 'absolute',
                bottom: 14,
                right: 14,
                fontFamily: 'var(--sans)',
                fontSize: '10.5px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
              }}
            >
              Composed in&nbsp;
              <span style={{ color: 'var(--coral)' }}>Manila</span>
            </span>
            <Image
              src={avatar}
              alt={name as string}
              fill
              style={{ objectFit: 'contain', objectPosition: 'right center' }}
              priority
            />
            <div
              style={{
                position: 'absolute',
                right: 12,
                top: '36%',
                fontFamily: 'var(--sans)',
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                color: 'var(--ink-faint)',
                textTransform: 'uppercase',
                background: 'rgba(239, 231, 210, 0.7)',
                padding: '10px 12px',
                border: '1px solid var(--line-soft)',
                borderRadius: 6,
                backdropFilter: 'blur(2px)',
              }}
            >
              <span style={{ display: 'block', lineHeight: 1.6 }}>
                <span
                  style={{
                    color: 'var(--coral)',
                    marginRight: 6,
                    fontWeight: 700,
                  }}
                >
                  01
                </span>
                Understand
              </span>
              <span
                style={{
                  display: 'block',
                  lineHeight: 1.6,
                  color: 'var(--ink)',
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    color: 'var(--coral)',
                    marginRight: 6,
                    fontWeight: 700,
                  }}
                >
                  02
                </span>
                Design
              </span>
              <span style={{ display: 'block', lineHeight: 1.6 }}>
                <span
                  style={{
                    color: 'var(--coral)',
                    marginRight: 6,
                    fontWeight: 700,
                  }}
                >
                  03
                </span>
                Build
              </span>
              <span style={{ display: 'block', lineHeight: 1.6 }}>
                <span
                  style={{
                    color: 'var(--coral)',
                    marginRight: 6,
                    fontWeight: 700,
                  }}
                >
                  04
                </span>
                Ship
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
