import Container from '@/components/common/Container';
import { SectionRule } from '@/components/common/SectionRule';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getSiteConfig } from '@/lib/db/settings';
import { Download } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/resume'),
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

export default async function ResumePage() {
  const config = (await getSiteConfig('resume')) as { url?: string } | null;
  const resumeUrl =
    config?.url ||
    'https://drive.google.com/file/d/1ormIiMVpWGAMOZ3FZVj_XrKPkEmPlPQj/preview';

  const driveFileId = resumeUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
  const downloadUrl = driveFileId
    ? `https://drive.google.com/uc?export=download&id=${driveFileId}`
    : null;

  return (
    <main>
      <section style={{ position: 'relative', padding: '80px 0 40px' }}>
        <Container>
          <SectionRule
            roman="R."
            left="Resume / CV"
            middle="Professional qualifications"
            right="-- / --"
          />
          <div data-reveal>
            <span className="label">
              Resume <span className="ix">&middot; N&ordm; 01</span>
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
              My professional{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                resume
              </em>{' '}
              and qualifications
              <span style={{ color: 'var(--coral)' }}>.</span>
            </h1>
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                className="btn btn-ghost"
                style={{ marginTop: 12 }}
              >
                <Download style={{ width: 16, height: 16 }} />
                Download PDF
              </a>
            )}
          </div>
        </Container>
      </section>

      <Container>
        <div
          style={{
            maxWidth: 860,
            margin: '0 auto',
            paddingBottom: 80,
            borderRadius: 18,
            overflow: 'hidden',
            border: '1px solid var(--line)',
          }}
        >
          <iframe
            src={resumeUrl}
            style={{ width: '100%', minHeight: '80vh', border: 'none' }}
            title="Resume"
            loading="lazy"
          />
        </div>
      </Container>
    </main>
  );
}
