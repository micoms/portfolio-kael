import { getFeaturedExperiences } from '@/lib/db/experience';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';

export default async function ExperienceSection() {
  const experiences = await getFeaturedExperiences(3);

  return (
    <section style={{ position: 'relative', padding: '130px 0' }}>
      <Container>
        <div className="sec-rule">
          <span className="roman">IX.</span>
          <span className="meta-grp">
            <span>Experience / Career</span>
            <span className="dot-mark">&bull;</span>
            <span>Professional journey</span>
          </span>
          <span>-- / --</span>
        </div>

        <div data-reveal>
          <span className="label">
            Experience <span className="ix">&middot; N&ordm; 08</span>
          </span>
          <h2
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 800,
              letterSpacing: '-0.028em',
              color: 'var(--ink)',
              lineHeight: 1.0,
              fontSize: 'clamp(40px, 4.8vw, 64px)',
              margin: '22px 0 36px',
            }}
          >
            Building products across{' '}
            <em
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              startups
            </em>{' '}
            and{' '}
            <em
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              teams
            </em>
            <span style={{ color: 'var(--coral)' }}>.</span>
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
            marginTop: 40,
          }}
        >
          {experiences.map(
            (
              exp: {
                id: string;
                company: string;
                position: string;
                location: string;
                image: string;
                description: string[];
                startDate: string;
                endDate: string;
                technologies: { name: string }[];
              },
              i: number,
            ) => (
              <div
                key={exp.id}
                data-reveal
                style={{
                  padding: '32px 30px',
                  background: 'var(--bone)',
                  borderRadius: 18,
                  boxShadow:
                    'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: 40,
                  alignItems: 'start',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      marginBottom: 16,
                    }}
                  >
                    {exp.image && (
                      <Image
                        src={exp.image}
                        alt={exp.company}
                        width={40}
                        height={40}
                        style={{ borderRadius: 8, objectFit: 'cover' }}
                      />
                    )}
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: 18,
                          fontWeight: 700,
                          letterSpacing: '-0.014em',
                          color: 'var(--ink)',
                        }}
                      >
                        {exp.position}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: 13,
                          color: 'var(--coral)',
                          fontWeight: 600,
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: 11,
                      color: 'var(--ink-faint)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {exp.location}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      color: 'var(--ink-faint)',
                      marginTop: 4,
                    }}
                  >
                    {exp.startDate} &mdash; {exp.endDate}
                  </p>
                </div>
                <div>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      marginBottom: 20,
                    }}
                  >
                    {exp.description.slice(0, 3).map((desc, j) => (
                      <li
                        key={j}
                        style={{
                          fontFamily: 'var(--body)',
                          fontSize: 13.5,
                          color: 'var(--ink-mute)',
                          lineHeight: 1.55,
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
                        {desc}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {exp.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech.name}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 999,
                          border: '1px solid var(--line)',
                          fontFamily: 'var(--sans)',
                          fontSize: 11,
                          color: 'var(--ink-mute)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        <div
          style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}
        >
          <Link href="/work-experience" className="btn btn-ghost">
            View all experience
            <span className="arrow">
              <svg viewBox="0 0 24 24">
                <path d="M5 19L19 5M19 5H8M19 5v11" />
              </svg>
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
