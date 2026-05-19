import { getPublishedBlogPosts } from '@/lib/db/blog';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';

export default async function Blog() {
  const posts = await getPublishedBlogPosts();
  const featured = posts.slice(0, 2);

  return (
    <section className="section-padded" style={{ position: 'relative' }}>
      <Container>
        <div className="sec-rule">
          <span className="roman">XII.</span>
          <span className="meta-grp">
            <span>Blog / Latest Posts</span>
            <span className="dot-mark">&bull;</span>
            <span>Writing & thoughts</span>
          </span>
          <span>-- / --</span>
        </div>

        <div data-reveal>
          <span className="label">
            Blog <span className="ix">&middot; N&ordm; 11</span>
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
            Latest{' '}
            <em
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              writing
            </em>{' '}
            and{' '}
            <em
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              thoughts
            </em>
            <span style={{ color: 'var(--coral)' }}>.</span>
          </h2>
        </div>

        <div
          className="grid-2-col"
          style={{
            gap: 22,
            marginTop: 22,
          }}
        >
          {featured.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              data-reveal
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '28px 26px 32px',
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
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontSize: 22,
                  fontWeight: 500,
                  color: 'var(--coral)',
                  letterSpacing: '0.04em',
                  marginBottom: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                {String(i + 1).padStart(2, '0')}
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '9.5px',
                    color: 'var(--ink-faint)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontStyle: 'normal',
                    fontWeight: 500,
                  }}
                >
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 22,
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.014em',
                  marginBottom: 14,
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: '13.5px',
                  color: 'var(--ink-mute)',
                  lineHeight: 1.55,
                  marginBottom: 18,
                  flex: 1,
                }}
              >
                {post.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginBottom: 14,
                }}
              >
                {post.tags?.slice(0, 3).map((tag: string) => (
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
              </div>
              <span
                style={{
                  width: 28,
                  height: 28,
                  border: '1px solid var(--line)',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink)',
                  alignSelf: 'flex-start',
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M5 19L19 5M19 5H8M19 5v11" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div
          style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}
        >
          <Link href="/blog" className="btn btn-ghost">
            View all blogs
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
