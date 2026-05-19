import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import ClientShell from '@/components/common/ClientShell';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import ScrollReveal from '@/components/common/ScrollReveal';
import SideRails from '@/components/common/SideRails';
import Topbar from '@/components/common/Topbar';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getSiteConfig } from '@/lib/db/settings';
import ReactLenis from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';

import './globals.css';

export const metadata = getMetadata('/');

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarConfig = (await getSiteConfig('navbar')) as {
    brandName?: string;
    title?: string;
    location?: string;
    githubUrl?: string;
    navItems?: { label: string; href: string }[];
  } | null;

  const footerConfig = (await getSiteConfig('footer')) as {
    brandName?: string;
    description?: string;
    navItems?: { label: string; href: string }[];
    socialLinks?: { name: string; href: string }[];
    stackItems?: string[];
    metaItems?: string[];
    location?: string;
    coordinates?: string;
  } | null;

  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500;1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style={{
            fontFamily: 'var(--body)',
            background: 'var(--paper)',
            color: 'var(--ink)',
          }}
        >
          <ReactLenis root>
            <div className="shell">
              <SideRails />
              <Topbar />
              <Navbar
                brandName={navbarConfig?.brandName}
                title={navbarConfig?.title}
                location={navbarConfig?.location}
                githubUrl={navbarConfig?.githubUrl}
                navItems={navbarConfig?.navItems}
              />
              {children}
              <Footer
                brandName={footerConfig?.brandName}
                description={footerConfig?.description}
                navItems={footerConfig?.navItems}
                socialLinks={footerConfig?.socialLinks}
                stackItems={footerConfig?.stackItems}
                metaItems={footerConfig?.metaItems}
                location={footerConfig?.location}
                coordinates={footerConfig?.coordinates}
              />
            </div>
            <ClientShell />
            <UmamiAnalytics />
          </ReactLenis>
          <ScrollReveal />
        </body>
      </html>
    </ViewTransitions>
  );
}
