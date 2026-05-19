import { BlogComponents } from '@/components/blog/BlogComponents';
import Container from '@/components/common/Container';
import { SectionRule } from '@/components/common/SectionRule';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getJourneyContent } from '@/lib/journey';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/journey'),
  robots: { index: true, follow: true },
};

export default function JourneyPage() {
  const data = getJourneyContent();

  if (!data) {
    return (
      <main>
        <section style={{ position: 'relative', padding: '80px 0 40px' }}>
          <Container>
            <SectionRule
              roman="J."
              left="Journey / Timeline"
              middle="Learning path"
              right="-- / --"
            />
            <div data-reveal>
              <span className="label">
                Journey <span className="ix">&middot; N&ordm; 01</span>
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
                My{' '}
                <em
                  style={{
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontWeight: 500,
                  }}
                >
                  journey
                </em>
                <span style={{ color: 'var(--coral)' }}>.</span>
              </h1>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 16,
                  color: 'var(--ink-mute)',
                }}
              >
                No journey content found. Add `src/data/journey/journey.mdx` to
                display content here.
              </p>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section style={{ position: 'relative', padding: '80px 0 40px' }}>
        <Container>
          <SectionRule
            roman="J."
            left="Journey / Timeline"
            middle="Learning path"
            right="-- / --"
          />
          <div data-reveal>
            <span className="label">
              Journey <span className="ix">&middot; N&ordm; 01</span>
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
              A timeline of my{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                learning
              </em>{' '}
              and milestones<span style={{ color: 'var(--coral)' }}>.</span>
            </h1>
          </div>
        </Container>
      </section>

      <Container>
        <div className="prose" style={{ maxWidth: 'none', paddingBottom: 80 }}>
          <MDXRemote source={data.content} components={BlogComponents} />
        </div>
      </Container>
    </main>
  );
}
