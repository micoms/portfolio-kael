import Container from '@/components/common/Container';
import { SectionRule } from '@/components/common/SectionRule';
import { ExperienceList } from '@/components/experience/ExperienceList';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getExperiences } from '@/lib/db/experience';
import { Metadata } from 'next';
import { Robots } from 'next/dist/lib/metadata/types/metadata-types';

export const metadata: Metadata = {
  ...getMetadata('/work-experience'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  } as Robots,
};

export default async function WorkExperiencePage() {
  const dbExperiences = await getExperiences();

  const experiences = dbExperiences.map(
    (exp: {
      company: string;
      position: string;
      location: string;
      image: string;
      description: string[];
      startDate: string;
      endDate: string;
      website?: string | null;
      x?: string | null;
      linkedin?: string | null;
      github?: string | null;
      isCurrent: boolean;
      technologies: { name: string; iconKey: string; href: string }[];
    }) => ({
      company: exp.company,
      position: exp.position,
      location: exp.location,
      image: exp.image,
      description: exp.description,
      startDate: exp.startDate,
      endDate: exp.endDate,
      website: exp.website || '',
      x: exp.x || undefined,
      linkedin: exp.linkedin || undefined,
      github: exp.github || undefined,
      isCurrent: exp.isCurrent,
      technologies: exp.technologies.map((t) => ({
        name: t.name,
        href: t.href,
        iconKey: t.iconKey,
      })),
    }),
  );

  return (
    <main>
      <section style={{ position: 'relative', padding: '80px 0 40px' }}>
        <Container>
          <SectionRule
            roman="E."
            left="Experience / Career"
            middle="Professional journey"
            right={`${experiences.length} roles`}
          />
          <div data-reveal>
            <span className="label">
              Experience <span className="ix">&middot; All</span>
            </span>
            <h1
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                letterSpacing: '-0.028em',
                color: 'var(--ink)',
                lineHeight: 1.0,
                fontSize: 'clamp(40px, 5vw, 66px)',
                margin: '22px 0 20px',
              }}
            >
              Work{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                experience
              </em>{' '}
              and roles<span style={{ color: 'var(--coral)' }}>.</span>
            </h1>
          </div>
        </Container>
      </section>

      <Container>
        <div style={{ paddingBottom: 80 }}>
          <ExperienceList experiences={experiences} />
        </div>
      </Container>
    </main>
  );
}
