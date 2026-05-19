import Container from '@/components/common/Container';
import { SectionRule } from '@/components/common/SectionRule';
import { ProjectList } from '@/components/projects/ProjectList';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getProjects } from '@/lib/db/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/projects'),
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
  },
};

export default async function ProjectsPage() {
  const dbProjects = await getProjects();

  const projects = dbProjects.map(
    (p: {
      title: string;
      description: string;
      image: string;
      video?: string | null;
      link?: string | null;
      github?: string | null;
      live?: string | null;
      slug: string;
      status: string;
      featured: boolean;
      isPublished: boolean;
      technologies: { name: string; iconKey: string }[];
    }) => ({
      title: p.title,
      description: p.description,
      image: p.image,
      video: p.video || undefined,
      link: p.link || p.live || '#',
      github: p.github || undefined,
      live: p.live || '#',
      details: true,
      projectDetailsPageSlug: `/projects/${p.slug}`,
      isWorking: p.status === 'in-progress',
      technologies: p.technologies.map((t) => ({
        name: t.name,
        iconKey: t.iconKey,
      })),
    }),
  );

  return (
    <main>
      <section style={{ position: 'relative', padding: '80px 0 40px' }}>
        <Container>
          <SectionRule
            roman="P."
            left="Projects / All"
            middle="Selected work"
            right={`${projects.length} projects`}
          />
          <div data-reveal>
            <span className="label">
              Projects <span className="ix">&middot; All</span>
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
              All{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                projects
              </em>{' '}
              and case studies
              <span style={{ color: 'var(--coral)' }}>.</span>
            </h1>
          </div>
        </Container>
      </section>

      <Container>
        <div style={{ paddingBottom: 80 }}>
          <ProjectList projects={projects} />
        </div>
      </Container>
    </main>
  );
}
