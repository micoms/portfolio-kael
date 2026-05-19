import { BlogContent } from '@/components/blog/BlogContent';
import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import FontSizeControls from '@/components/common/FontSizeControls';
import { siteConfig } from '@/config/Meta';
import {
  getBlogPostBySlug,
  getBlogPostSlugs,
  getRelatedPosts,
} from '@/lib/blog';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.isPublished) {
    return { title: 'Post Not Found' };
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.isPublished) {
    notFound();
  }
  const relatedPosts = await getRelatedPosts(slug, 3);

  return (
    <>
      <Container>
        <div style={{ paddingTop: 40, paddingBottom: 80 }}>
          {/* Back Button */}
          <div style={{ marginBottom: 40 }}>
            <Link
              href="/blog"
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
              Back to Blog
            </Link>
          </div>

          {/* Blog Content */}
          <BlogContent
            frontmatter={{
              title: post.title,
              description: post.description,
              image: post.image,
              tags: post.tags,
              date: post.date.toISOString(),
              isPublished: post.isPublished,
            }}
            content={post.content}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: 80 }}>
              <div
                style={{ borderTop: '1px solid var(--line)', paddingTop: 40 }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    marginBottom: 24,
                  }}
                >
                  Related Posts
                </h2>
                <BlogList
                  posts={relatedPosts.map(
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
                />
              </div>
            </div>
          )}

          {/* Back to Blog CTA */}
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <div
              style={{ borderTop: '1px solid var(--line)', marginBottom: 32 }}
            />
            <Link href="/blog" className="btn btn-ghost">
              View All Blogs
              <span className="arrow">
                <svg viewBox="0 0 24 24">
                  <path d="M5 19L19 5M19 5H8M19 5v11" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </Container>
      <FontSizeControls />
    </>
  );
}
