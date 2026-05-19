import Container from '@/components/common/Container';
import { ProjectContent } from '@/components/projects/ProjectContent';
import { ProjectNavigation } from '@/components/projects/ProjectNavigation';
import { siteConfig } from '@/config/Meta';
import {
  getProjectCaseStudyBySlug,
  getProjectCaseStudySlugs,
  getProjectNavigation,
  getRelatedProjectCaseStudies,
} from '@/lib/project';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface ProjectCaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectCaseStudyBySlug(slug);

  if (!project || !project.isPublished) {
    return { title: 'Project Not Found' };
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${project.title} - Project Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Project Case Study`,
      description: project.description,
      images: [project.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Project Case Study`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const project = await getProjectCaseStudyBySlug(slug);

  if (!project || !project.isPublished) {
    notFound();
  }

  const navigation = await getProjectNavigation(slug);
  const relatedProjects = await getRelatedProjectCaseStudies(slug, 2);

  const caseStudy = project.caseStudy;

  return (
    <Container>
      <div style={{ paddingTop: 40, paddingBottom: 80 }}>
        {/* Back Button */}
        <div style={{ marginBottom: 40 }}>
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--sans)',
              fontSize: 13,
              color: 'var(--ink-mute)',
              textDecoration: 'none',
              transition: 'color 160ms ease',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>

        {/* Project Content */}
        <ProjectContent
          frontmatter={{
            title: project.title,
            description: project.description,
            image: project.image,
            technologies: project.technologies.map(
              (t: { name: string }) => t.name,
            ),
            github: project.github || '',
            live: project.live || '',
            timeline: caseStudy?.timeline || '',
            role: caseStudy?.role || '',
            team: caseStudy?.team || '',
            status: project.status as 'completed' | 'in-progress' | 'archived',
            featured: project.featured,
            challenges: caseStudy?.challenges || [],
            learnings: caseStudy?.learnings || [],
            isPublished: project.isPublished,
          }}
          content={caseStudy?.content || ''}
        />

        {/* Project Navigation */}
        <ProjectNavigation previous={navigation.prev} next={navigation.next} />

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 40 }}>
              <h2
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: 24,
                }}
              >
                Related Projects
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 22,
                }}
              >
                {relatedProjects.map(
                  (project: {
                    slug: string;
                    title: string;
                    description: string;
                    status: string;
                    technologies: { name: string }[];
                  }) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '24px',
                        background: 'var(--bone)',
                        borderRadius: 18,
                        boxShadow:
                          'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          marginBottom: 12,
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
                          {project.title}
                        </h3>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: 999,
                            background:
                              project.status === 'completed'
                                ? 'var(--olive)'
                                : 'var(--coral)',
                            color: '#fff',
                            fontFamily: 'var(--sans)',
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {project.status.charAt(0).toUpperCase() +
                            project.status.slice(1)}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--body)',
                          fontSize: 13,
                          color: 'var(--ink-mute)',
                          lineHeight: 1.55,
                          marginBottom: 16,
                          flex: 1,
                        }}
                      >
                        {project.description}
                      </p>
                      <div
                        style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}
                      >
                        {project.technologies
                          .slice(0, 3)
                          .map((tech: { name: string }) => (
                            <span
                              key={tech.name}
                              style={{
                                padding: '3px 8px',
                                borderRadius: 999,
                                border: '1px solid var(--line)',
                                fontFamily: 'var(--sans)',
                                fontSize: 10,
                                color: 'var(--ink-faint)',
                              }}
                            >
                              {tech.name}
                            </span>
                          ))}
                      </div>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        )}

        {/* Back to Projects CTA */}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <div
            style={{ borderTop: '1px solid var(--line)', marginBottom: 32 }}
          />
          <Link href="/projects" className="btn btn-ghost">
            View All Projects
            <span className="arrow">
              <svg viewBox="0 0 24 24">
                <path d="M5 19L19 5M19 5H8M19 5v11" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
