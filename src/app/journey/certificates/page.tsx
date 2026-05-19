import CertificatesGallery from '@/components/CertificatesGallery';
import Container from '@/components/common/Container';
import { SectionRule } from '@/components/common/SectionRule';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getCertificates } from '@/lib/db/settings';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/journey/certificates'),
  robots: { index: true, follow: true },
};

export default async function CertificatesPage() {
  const dbCertificates = await getCertificates();

  const certificates = dbCertificates.map(
    (c: { title: string; issuer: string; date: Date; imageUrl: string }) => ({
      file: c.imageUrl,
      title: c.title,
      issuer: c.issuer,
      date: c.date.toISOString(),
    }),
  );

  return (
    <main>
      <section style={{ position: 'relative', padding: '80px 0 40px' }}>
        <Container>
          <SectionRule
            roman="C."
            left="Certificates / Achievements"
            middle="Professional milestones"
            right={`${certificates.length} certs`}
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
          <CertificatesGallery certificates={certificates} />
        </div>
      </Container>
    </main>
  );
}
