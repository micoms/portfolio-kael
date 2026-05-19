import CertificatesGallery from '@/components/CertificatesGallery';
import Container from '@/components/common/Container';
import { SectionRule } from '@/components/common/SectionRule';
import { certificates as configuredCertificates } from '@/config/Achievements';
import { generateMetadata as getMetadata } from '@/config/Meta';
import fs from 'fs';
import { Metadata } from 'next';
import path from 'path';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/journey/certificates'),
  robots: { index: true, follow: true },
};

export default function CertificatesPage() {
  const certDir = path.join(process.cwd(), 'public', 'certificates');
  let discovered: {
    file: string;
    title?: string;
    issuer?: string;
    date?: string;
  }[] = [];
  try {
    if (fs.existsSync(certDir)) {
      const files = fs.readdirSync(certDir);
      discovered = files
        .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
        .map((f) => ({
          file: `/certificates/${f}`,
          title: undefined,
          issuer: undefined,
          date: undefined,
        }));
    }
  } catch {
    discovered = [];
  }

  const configured = Array.isArray(configuredCertificates)
    ? configuredCertificates
    : [];
  const map = new Map<
    string,
    { file: string; title?: string; issuer?: string; date?: string }
  >();
  configured.forEach(
    (c: { file: string; title?: string; issuer?: string; date?: string }) =>
      map.set(c.file, c),
  );
  discovered.forEach((d) => {
    if (!map.has(d.file)) map.set(d.file, d);
  });

  const allCertificates = Array.from(map.values());

  return (
    <main>
      <section style={{ position: 'relative', padding: '80px 0 40px' }}>
        <Container>
          <SectionRule
            roman="C."
            left="Certificates / Achievements"
            middle="Professional milestones"
            right={`${allCertificates.length} certs`}
          />
          <div data-reveal>
            <span className="label">
              Certificates <span className="ix">&middot; N&ordm; 01</span>
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
              Certificates &{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                achievements
              </em>
              <span style={{ color: 'var(--coral)' }}>.</span>
            </h1>
          </div>
        </Container>
      </section>

      <Container>
        <div style={{ paddingBottom: 80 }}>
          <CertificatesGallery certificates={allCertificates} />
        </div>
      </Container>
    </main>
  );
}
