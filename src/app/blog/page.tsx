import Container from '@/components/common/Container';
import { SectionRule } from '@/components/common/SectionRule';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getAllTags, getPublishedBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { Robots } from 'next/dist/lib/metadata/types/metadata-types';
import { Suspense } from 'react';

import { BlogPageClient } from './BlogPageClient';

export const generateMetadata = (): Metadata => {
  const metadata = getMetadata('/blog');
  return {
    ...metadata,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      } as Robots['googleBot'],
    },
  };
};

function BlogPageLoading() {
  return (
    <Container className="py-16">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
          fontFamily: 'var(--sans)',
          fontSize: 13,
          color: 'var(--ink-faint)',
        }}
      >
        Loading...
      </div>
    </Container>
  );
}

export default async function BlogPage() {
  const allPosts = await getPublishedBlogPosts();
  const allTags = await getAllTags();

  return (
    <main>
      <section style={{ position: 'relative', padding: '80px 0 40px' }}>
        <Container>
          <SectionRule
            roman="B."
            left="Blog / All Posts"
            middle="Writing & thoughts"
            right="-- / --"
          />
          <div data-reveal>
            <span className="label">
              Blog <span className="ix">&middot; All</span>
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
              Thoughts, tutorials, and{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                insights
              </em>
              <span style={{ color: 'var(--coral)' }}>.</span>
            </h1>
          </div>
        </Container>
      </section>
      <Suspense fallback={<BlogPageLoading />}>
        <BlogPageClient
          initialPosts={allPosts.map(
            (p: {
              slug: string;
              title: string;
              description: string;
              image: string;
              tags: string[];
              date: Date;
              isPublished: boolean;
            }) => ({
              slug: p.slug,
              frontmatter: {
                title: p.title,
                description: p.description,
                image: p.image,
                tags: p.tags,
                date: p.date.toISOString(),
                isPublished: p.isPublished,
              },
            }),
          )}
          initialTags={allTags}
        />
      </Suspense>
    </main>
  );
}
