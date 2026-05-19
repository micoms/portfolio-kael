import { BlogPostPreview } from '@/types/blog';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

interface BlogCardProps {
  post: BlogPostPreview;
}

export function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const { title, description, image, tags, date } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bone)',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: 'var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06)',
        transition: 'transform 0.2s ease',
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          background: 'var(--paper-dark)',
        }}
      >
        <Link href={`/blog/${slug}`}>
          <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
        </Link>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '20px 22px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
          <h3
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.15,
              marginBottom: 10,
              transition: 'color 160ms ease',
            }}
          >
            {title}
          </h3>
        </Link>
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: '13.5px',
            color: 'var(--ink-mute)',
            lineHeight: 1.55,
            marginBottom: 16,
            flex: 1,
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            marginBottom: 14,
          }}
        >
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 8px',
                borderRadius: 999,
                border: '1px solid var(--line)',
                fontFamily: 'var(--sans)',
                fontSize: 10,
                color: 'var(--ink-faint)',
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span
              style={{
                padding: '3px 8px',
                borderRadius: 999,
                border: '1px solid var(--line)',
                fontFamily: 'var(--sans)',
                fontSize: 10,
                color: 'var(--ink-faint)',
              }}
            >
              +{tags.length - 3}
            </span>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 12,
            borderTop: '1px solid var(--line)',
          }}
        >
          <time
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--ink-faint)',
            }}
            dateTime={date}
          >
            {formattedDate}
          </time>
          <Link
            href={`/blog/${slug}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--sans)',
              fontSize: 13,
              color: 'var(--ink-mute)',
              textDecoration: 'none',
              transition: 'color 160ms ease',
            }}
          >
            Read
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
