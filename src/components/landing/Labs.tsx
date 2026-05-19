import { getSiteConfig } from '@/lib/db/settings';

import LabsClient from './LabsClient';

const defaultLabs = [
  {
    num: '01',
    year: '2026',
    badge: 'Web App',
    title: 'Project Atlas',
    desc: 'A full-stack project management dashboard built with Next.js, tRPC, and PostgreSQL. Real-time collaboration with WebSockets.',
    category: 'Web App',
  },
  {
    num: '02',
    year: '2025',
    badge: 'Web App',
    title: 'Pulse Monitor',
    desc: 'Real-time uptime monitoring dashboard with alerting, status pages, and incident logging — built with React and Go.',
    category: 'Web App',
  },
  {
    num: '03',
    year: '2025',
    badge: 'CLI',
    title: 'Scaffold CLI',
    desc: 'A scaffolding tool for bootstrapping full-stack projects with opinionated defaults — TypeScript, testing, CI/CD included out of the box.',
    category: 'CLI',
  },
  {
    num: '04',
    year: '2024',
    badge: 'Design',
    title: 'Token Studio',
    desc: 'A visual design token editor for creating and exporting design system tokens to CSS, JSON, and Tailwind config.',
    category: 'Design',
  },
  {
    num: '05',
    year: '2024',
    badge: 'Web App',
    title: 'Logbook',
    desc: 'A lightweight journaling app with markdown support, tags, and a calendar view — PWA-first, offline-capable.',
    category: 'Web App',
  },
];

export default async function Labs() {
  const dbLabs = (await getSiteConfig('labs')) as
    | {
        num: string;
        year: string;
        badge: string;
        title: string;
        desc: string;
        category: string;
      }[]
    | null;
  const labs = dbLabs || defaultLabs;

  return <LabsClient labs={labs} />;
}
