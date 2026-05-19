'use client';

import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { BlogPostPreview } from '@/types/blog';
import { useRouter, useSearchParams } from 'next/navigation';

interface BlogPageClientProps {
  initialPosts: BlogPostPreview[];
  initialTags: string[];
}

const getBlogPostsByTagClient = (
  posts: BlogPostPreview[],
  tag: string,
): BlogPostPreview[] => {
  return posts.filter((post) =>
    post.frontmatter.tags.some(
      (postTag) => postTag.toLowerCase() === tag.toLowerCase(),
    ),
  );
};

export function BlogPageClient({
  initialPosts,
  initialTags,
}: BlogPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { triggerHaptic, isMobile } = useHapticFeedback();

  const selectedTag = searchParams.get('tag');
  const filteredPosts = selectedTag
    ? getBlogPostsByTagClient(initialPosts, selectedTag)
    : initialPosts;

  const handleTagClick = (tag: string) => {
    if (isMobile()) {
      triggerHaptic('light');
    }

    if (selectedTag === tag) {
      router.replace('/blog');
    } else {
      router.replace(`/blog?tag=${encodeURIComponent(tag)}`);
    }
  };

  const getTagPostCount = (tag: string) => {
    return initialPosts.filter((post) =>
      post.frontmatter.tags.some(
        (postTag) => postTag.toLowerCase() === tag.toLowerCase(),
      ),
    ).length;
  };

  return (
    <Container>
      <div style={{ paddingBottom: 80 }}>
        {/* Tags */}
        {initialTags.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  letterSpacing: '0.04em',
                }}
              >
                Popular Tags
              </h2>
              {selectedTag && (
                <button
                  onClick={() => handleTagClick(selectedTag)}
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 12,
                    color: 'var(--coral)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Clear filter
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {initialTags.map((tag) => {
                const postCount = getTagPostCount(tag);
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 999,
                      border: isSelected
                        ? '1px solid var(--coral)'
                        : '1px solid var(--line)',
                      fontFamily: 'var(--sans)',
                      fontSize: 12,
                      color: isSelected ? '#fff' : 'var(--ink-soft)',
                      background: isSelected ? 'var(--coral)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      textTransform: 'capitalize',
                    }}
                  >
                    {tag} ({postCount})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Blog Posts */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: 24,
            }}
          >
            {selectedTag ? `Posts tagged "${selectedTag}"` : 'Latest Posts'}
            {filteredPosts.length > 0 && (
              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 13,
                  color: 'var(--ink-faint)',
                  fontWeight: 400,
                  marginLeft: 8,
                }}
              >
                ({filteredPosts.length}{' '}
                {filteredPosts.length === 1 ? 'post' : 'posts'})
              </span>
            )}
          </h2>
          <BlogList posts={filteredPosts} />
        </div>
      </div>
    </Container>
  );
}
