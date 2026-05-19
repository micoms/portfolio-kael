import Container from '@/components/common/Container';
import { SectionRule } from '@/components/common/SectionRule';
import ContactForm from '@/components/contact/ContactForm';
import { contactConfig } from '@/config/Contact';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/contact'),
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

export default function ContactPage() {
  return (
    <main>
      <section style={{ position: 'relative', padding: '80px 0 60px' }}>
        <Container>
          <SectionRule
            roman="C."
            left="Contact / Get in Touch"
            middle="Start a conversation"
            right="-- / --"
          />
          <div data-reveal>
            <span className="label">
              Contact <span className="ix">&middot; N&ordm; 01</span>
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
              {contactConfig.title}
              <span style={{ color: 'var(--coral)' }}>.</span>
            </h1>
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: 16,
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
                maxWidth: '48ch',
              }}
            >
              {contactConfig.description}
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div style={{ maxWidth: 640, margin: '0 auto', paddingBottom: 80 }}>
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
