import { BlogPostPreview } from '@/types/blog';

import { BlogCard } from './BlogCard';

interface BlogListProps {
  posts: BlogPostPreview[];
  className?: string;
}

export function BlogList({ posts, className = '' }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div
        style={{
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 16,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--ink)',
          }}
        >
          No blog posts found
        </h2>
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: 14,
            color: 'var(--ink-mute)',
          }}
        >
          Check back later for new content!
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid-2-col ${className || ''}`}
      style={{
        gap: 22,
      }}
    >
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
