import { hashPassword } from '@better-auth/utils/password';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import * as fs from 'fs';
import matter from 'gray-matter';
import * as path from 'path';
import pg from 'pg';

import { PrismaClient } from '../src/generated/prisma/client';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: true }
      : false,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create admin user with better-auth compatible schema
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error(
      '❌ ADMIN_PASSWORD environment variable is required. Aborting seed.',
    );
    process.exit(1);
  }
  const passwordHash = await hashPassword(adminPassword);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      emailVerified: true,
    },
  });

  // Create credential account for email/password login
  await prisma.account.upsert({
    where: {
      providerId_accountId: {
        providerId: 'credential',
        accountId: adminEmail,
      },
    },
    update: {
      password: passwordHash,
    },
    create: {
      userId: adminUser.id,
      providerId: 'credential',
      accountId: adminEmail,
      password: passwordHash,
    },
  });

  console.log('Admin user created:', adminEmail);

  // Seed Hero config
  await prisma.siteConfig.upsert({
    where: { key: 'hero' },
    update: {},
    create: {
      key: 'hero',
      value: {
        name: 'Mikael',
        title: 'A Full Stack Web Developer.',
        avatar: '/assets/logo.png',
        skills: [
          {
            name: 'Typescript',
            href: 'https://www.typescriptlang.org/',
            component: 'TypeScript',
          },
          { name: 'React', href: 'https://react.dev/', component: 'ReactIcon' },
          { name: 'Next.js', href: 'https://nextjs.org/', component: 'NextJs' },
          { name: 'Bun', href: 'https://bun.sh/', component: 'Bun' },
          {
            name: 'PostgreSQL',
            href: 'https://www.postgresql.org/',
            component: 'PostgreSQL',
          },
        ],
        descriptionTemplate:
          'I build interactive web apps using {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4}. With a focus on <b>UI</b> design. Enthusiastic about <b>Three.js</b>, driven by a keen eye for design.',
        buttons: [
          {
            variant: 'outline',
            text: 'Resume / CV',
            href: '/resume',
            icon: 'CV',
          },
          {
            variant: 'default',
            text: 'Get in touch',
            href: '/contact',
            icon: 'Chat',
          },
        ],
      },
    },
  });

  // Seed About config
  await prisma.siteConfig.upsert({
    where: { key: 'about' },
    update: {},
    create: {
      key: 'about',
      value: {
        name: 'Mikael Macabali',
        description:
          "I'm a Full Stack web developer passionate about building interactive and beautiful web experiences. I love turning ideas into real products using modern technologies.",
      },
    },
  });

  // Seed Social Links
  await prisma.siteConfig.upsert({
    where: { key: 'socialLinks' },
    update: {},
    create: {
      key: 'socialLinks',
      value: [
        { name: 'X', href: 'https://x.com/mikaelmacabali', iconKey: 'X' },
        {
          name: 'LinkedIn',
          href: 'https://www.linkedin.com/in/mikaelmacabali/',
          iconKey: 'LinkedIn',
        },
        {
          name: 'Github',
          href: 'https://github.com/mikaelmacabali',
          iconKey: 'Github',
        },
        {
          name: 'Email',
          href: 'mailto:mikaelmacabali@gmail.com',
          iconKey: 'Mail',
        },
      ],
    },
  });

  // Seed CTA config
  await prisma.siteConfig.upsert({
    where: { key: 'cta' },
    update: {},
    create: {
      key: 'cta',
      value: {
        title: "Let's build something together",
        description:
          "Have a project in mind? I'd love to hear about it. Let's chat and see how I can help.",
        calLink: 'https://cal.com/mikaelmacabali',
      },
    },
  });

  // Seed Footer config
  await prisma.siteConfig.upsert({
    where: { key: 'footer' },
    update: {},
    create: {
      key: 'footer',
      value: {
        brandName: 'Mikael Macabali',
        description:
          'Full-stack developer building thoughtful applications with modern web technologies. Based in Manila, working remotely with teams worldwide.',
        navItems: [
          { label: 'Work', href: '/work-experience' },
          { label: 'Blogs', href: '/blog' },
          { label: 'Projects', href: '/projects' },
        ],
        socialLinks: [
          { name: 'GitHub', href: 'https://github.com/mikaelmacabali' },
          { name: 'LinkedIn', href: 'https://linkedin.com/in/mikaelmacabali' },
          { name: 'X / Twitter', href: 'https://x.com/mikaelmacabali' },
        ],
        stackItems: ['TypeScript', 'React', 'Next.js', 'Node.js'],
        metaItems: ['Colophon', 'License', 'Source'],
        location: 'Manila / Remote',
        coordinates: '14.55\u00b0 N \u00b7 121.02\u00b0 E',
      },
    },
  });

  // Seed Navbar config
  await prisma.siteConfig.upsert({
    where: { key: 'navbar' },
    update: {},
    create: {
      key: 'navbar',
      value: {
        brandName: 'Mikael Macabali',
        title: 'Full-Stack Developer',
        location: 'Manila / Remote',
        githubUrl: 'https://github.com/mikaelmacabali',
        navItems: [
          { label: 'Work', href: '/work-experience' },
          { label: 'Blogs', href: '/blog' },
          { label: 'Projects', href: '/projects' },
        ],
      },
    },
  });

  // Seed Topbar config
  await prisma.siteConfig.upsert({
    where: { key: 'topbar' },
    update: {},
    create: {
      key: 'topbar',
      value: {
        version: 'M / 2026',
        categories: 'Code \u00b7 Design \u00b7 Engineering',
        license: 'MIT \u00b7 Made on Earth',
        githubUrl: 'https://github.com/mikaelmacabali',
        statusText: 'Open \u00b7 v1.0',
        languages: 'EN \u00b7 PH',
      },
    },
  });

  // Seed SideRails config
  await prisma.siteConfig.upsert({
    where: { key: 'siderails' },
    update: {},
    create: {
      key: 'siderails',
      value: {
        rightText: 'Mikael Macabali \u2014 Portfolio \u00b7 2026 \u00b7 MIT',
        leftText: 'Full-Stack \u00b7 Design \u00b7 Engineering \u00b7 Manila',
      },
    },
  });

  // Seed Resume config
  await prisma.siteConfig.upsert({
    where: { key: 'resume' },
    update: {},
    create: {
      key: 'resume',
      value: {
        url: 'https://drive.google.com/file/d/1ormIiMVpWGAMOZ3FZVj_XrKPkEmPlPQj/preview',
      },
    },
  });

  // Seed Contact config
  await prisma.siteConfig.upsert({
    where: { key: 'contact' },
    update: {},
    create: {
      key: 'contact',
      value: {
        title: 'Contact',
        description:
          'Get in touch with me. I will get back to you as soon as possible.',
      },
    },
  });

  // Seed Testimonial config
  await prisma.siteConfig.upsert({
    where: { key: 'testimonial' },
    update: {},
    create: {
      key: 'testimonial',
      value: {
        quote:
          'Mikael has a rare ability to take a vague product idea and turn it into a shippable, well-architected application \u2014 fast, communicative, and a genuine pleasure to work with.',
        author: 'Sofia Reyes',
        role: 'Product Lead \u00b7 Northstar Studio',
        partners: [
          { name: 'TypeScript', category: 'Language' },
          { name: 'React', category: 'Frontend' },
          { name: 'Next.js', category: 'Framework' },
          { name: 'Node.js', category: 'Runtime' },
          { name: 'PostgreSQL', category: 'Database' },
          { name: 'Docker', category: 'DevOps' },
        ],
      },
    },
  });

  // Seed Capabilities config
  await prisma.siteConfig.upsert({
    where: { key: 'capabilities' },
    update: {},
    create: {
      key: 'capabilities',
      value: [
        {
          num: '01',
          tag: 'Frontend',
          title: 'Frontend Engineering',
          desc: 'Building performant, accessible UIs with React, Next.js, and modern CSS. Pixel-perfect implementations from design files.',
        },
        {
          num: '02',
          tag: 'Backend',
          title: 'API & Backend',
          desc: 'Designing RESTful and GraphQL APIs, database schemas, and server-side logic with Node.js, Express, and PostgreSQL.',
        },
        {
          num: '03',
          tag: 'Design',
          title: 'UI/UX & Design Systems',
          desc: 'Creating cohesive design systems, component libraries, and user flows that scale across products.',
        },
        {
          num: '04',
          tag: 'DevOps',
          title: 'DevOps & Deployment',
          desc: 'CI/CD pipelines, Docker containerization, cloud deployments on Vercel, AWS, and Netlify.',
        },
      ],
    },
  });

  // Seed Method config
  await prisma.siteConfig.upsert({
    where: { key: 'method' },
    update: {},
    create: {
      key: 'method',
      value: [
        {
          num: '01',
          title: 'Discover',
          desc: 'Understanding requirements, user needs, and technical constraints through research and stakeholder interviews.',
        },
        {
          num: '02',
          title: 'Design',
          desc: 'Translating requirements into wireframes, prototypes, and system architecture before writing code.',
        },
        {
          num: '03',
          title: 'Build',
          desc: 'Iterative development with regular check-ins, code reviews, and incremental deliveries.',
        },
        {
          num: '04',
          title: 'Ship',
          desc: 'Deployment, monitoring, and post-launch support with a focus on reliability and performance.',
        },
      ],
    },
  });

  // Seed Labs config
  await prisma.siteConfig.upsert({
    where: { key: 'labs' },
    update: {},
    create: {
      key: 'labs',
      value: [
        {
          num: '01',
          year: '2024',
          badge: 'Web App',
          title: 'Portfolio v2',
          desc: 'A complete rebuild of my portfolio using Next.js, Tailwind, and a custom CMS.',
          category: 'Web App',
        },
        {
          num: '02',
          year: '2024',
          badge: 'CLI',
          title: 'Dev CLI',
          desc: 'A command-line tool for automating common development workflows.',
          category: 'CLI',
        },
        {
          num: '03',
          year: '2023',
          badge: 'Design',
          title: 'Design System',
          desc: 'A comprehensive design system with tokens, components, and documentation.',
          category: 'Design',
        },
        {
          num: '04',
          year: '2023',
          badge: 'Web App',
          title: 'Chat Widget',
          desc: 'An embeddable AI chat widget for portfolio websites.',
          category: 'Web App',
        },
        {
          num: '05',
          year: '2023',
          badge: 'CLI',
          title: 'Icon Generator',
          desc: 'A tool for generating icon components from SVG files.',
          category: 'CLI',
        },
      ],
    },
  });

  // Seed Journey config
  await prisma.siteConfig.upsert({
    where: { key: 'journey' },
    update: {},
    create: {
      key: 'journey',
      value: [
        {
          name: 'My Journey',
          desc: 'Overview of my learning and career journey.',
          href: '/journey',
        },
        {
          name: 'Certificates & Achievements',
          desc: 'A curated list of certificates and achievements.',
          href: '/journey/certificates',
        },
      ],
    },
  });

  // Seed Setup Links config
  await prisma.siteConfig.upsert({
    where: { key: 'setupLinks' },
    update: {},
    create: {
      key: 'setupLinks',
      value: [
        {
          name: 'Gears Used',
          desc: 'Devices, extensions, and software I use daily.',
          href: '/gears',
        },
        {
          name: 'VS Code / Cursor Setup',
          desc: 'My complete editor configuration and extensions.',
          href: '/setup',
        },
      ],
    },
  });

  // Seed Marquee config
  await prisma.siteConfig.upsert({
    where: { key: 'marquee' },
    update: {},
    create: {
      key: 'marquee',
      value: {
        cities: [
          'Manila',
          'Tokyo',
          'San Francisco',
          'London',
          'Berlin',
          'Singapore',
          'Sydney',
          'Toronto',
          'Seoul',
          'Amsterdam',
          'Dubai',
          'New York',
        ],
        contributors: [
          { handle: '@mikaelmacabali', role: 'Full-Stack Dev' },
          { handle: '@open-source', role: 'Community' },
          { handle: '@design-systems', role: 'UI/UX' },
          { handle: '@typescript', role: 'Language' },
          { handle: '@react', role: 'Frontend' },
          { handle: '@nextjs', role: 'Framework' },
        ],
      },
    },
  });

  // Seed GitHub config
  await prisma.siteConfig.upsert({
    where: { key: 'github' },
    update: {},
    create: {
      key: 'github',
      value: {
        username: 'micoms',
        apiUrl: 'https://github-contributions-api.deno.dev',
      },
    },
  });

  // Seed Chat config
  await prisma.siteConfig.upsert({
    where: { key: 'chat' },
    update: {},
    create: {
      key: 'chat',
      value: {
        greeting:
          "Hello! I'm Mikael's Portfolio Assistant. How can I help you?",
        placeholder: 'Ask me about my work and experience...',
        suggestions: [
          'What technologies do you work with?',
          'Tell me about your recent projects',
          'How can I contact you for work?',
        ],
      },
    },
  });

  // Seed Cat config
  await prisma.siteConfig.upsert({
    where: { key: 'cat' },
    update: {},
    create: {
      key: 'cat',
      value: { enabled: true },
    },
  });

  console.log('Site configs seeded');

  // Seed Skills
  const skills = [
    { name: 'React', iconKey: 'ReactIcon', href: 'https://react.dev/' },
    { name: 'Bun', iconKey: 'Bun', href: 'https://bun.sh/' },
    {
      name: 'JavaScript',
      iconKey: 'JavaScript',
      href: 'https://javascript.com/',
    },
    {
      name: 'TypeScript',
      iconKey: 'TypeScript',
      href: 'https://typescriptlang.org/',
    },
    { name: 'MongoDB', iconKey: 'MongoDB', href: 'https://mongodb.com/' },
    { name: 'Next.js', iconKey: 'NextJs', href: 'https://nextjs.org/' },
    { name: 'Node.js', iconKey: 'NodeJs', href: 'https://nodejs.org/' },
    {
      name: 'PostgreSQL',
      iconKey: 'PostgreSQL',
      href: 'https://postgresql.org/',
    },
    { name: 'Prisma', iconKey: 'Prisma', href: 'https://prisma.io/' },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log('Skills seeded');

  // Seed Gears
  const gears = [
    {
      name: 'Apple MacBook Pro 16"in M4 48GB 512GB',
      iconKey: 'Laptop',
      category: 'device',
    },
    {
      name: 'LG Ultragear 27GN650 (27 inch, 68.5 cm)',
      iconKey: 'Monitor',
      category: 'device',
    },
    { name: 'Magic Keyboard', iconKey: 'Keyboard', category: 'device' },
    {
      name: 'Logitech MX Master 3S Mouse',
      iconKey: 'Mouse',
      category: 'device',
    },
    {
      name: 'Crossbeats Roar 2.0 (Special Addition)',
      iconKey: 'Headphones',
      category: 'device',
    },
    { name: 'Samsung S23 (256 GB)', iconKey: 'Phone', category: 'device' },
    { name: 'Unhook', href: 'https://unhook.app/', category: 'extension' },
    {
      name: 'uBlock Origin',
      href: 'https://ublockorigin.com/',
      category: 'extension',
    },
    {
      name: 'React Developer Tools',
      href: 'https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en',
      category: 'extension',
    },
    { name: 'daily.dev', href: 'https://daily.dev/', category: 'extension' },
    {
      name: 'Grammarly',
      href: 'https://www.grammarly.com/',
      category: 'extension',
    },
    {
      name: 'Wappalyzer',
      href: 'https://www.wappalyzer.com/',
      category: 'extension',
    },
    {
      name: 'ColorZilla',
      href: 'https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en',
      category: 'extension',
    },
    { name: 'Dia', href: 'https://www.diabrowser.com/', category: 'software' },
    {
      name: 'Notion',
      href: 'https://www.notion.so/desktop',
      category: 'software',
    },
    {
      name: 'TickTick',
      href: 'https://ticktick.com/download',
      category: 'software',
    },
    {
      name: 'OBS Studio',
      href: 'https://obsproject.com/',
      category: 'software',
    },
    {
      name: 'VLC',
      href: 'https://www.videolan.org/vlc/',
      category: 'software',
    },
    { name: 'Ghostty', href: 'https://ghostty.org/', category: 'software' },
  ];

  for (const gear of gears) {
    await prisma.gear.create({ data: gear });
  }
  console.log('Gears seeded');

  // Seed Certificates
  const certs = [
    {
      title: 'SSoC Certificate',
      issuer: 'Summer of Code (SSoC)',
      date: new Date('2025-10-10'),
      imageUrl: '/blog/frontend-part-1.png',
    },
    {
      title: 'Example Certificate 1',
      issuer: 'Example Issuer',
      date: new Date('2024-01-01'),
      imageUrl: '/blog/how-to-be-me.png',
    },
    {
      title: 'Example Certificate 2',
      issuer: 'Example Issuer',
      date: new Date('2023-08-01'),
      imageUrl: '/blog/frontend-part-1.png',
    },
    {
      title: 'SSoC Participation Certificate',
      issuer: 'SSoC',
      date: new Date('2025-10-10'),
      imageUrl: '/blog/how-to-be-me.png',
    },
  ];

  for (const cert of certs) {
    await prisma.certificate.create({ data: cert });
  }
  console.log('Certificates seeded');

  // Seed Projects
  const projectsData = [
    {
      title: 'NotesBuddy',
      description:
        'A comprehensive study platform with notes, flashcards, quizzes, AI chatbot, and interactive learning tools',
      image: '/project/notesbuddy.png',
      video: 'https://ik.imagekit.io/hokb3mrdr/notesbuddy.mp4?tr=orig',
      link: 'https://notesbuddy.in',
      github: 'https://github.com/ramxcodes/notesbuddy',
      live: 'https://notesbuddy.in',
      slug: 'notesbuddy',
      status: 'in-progress',
      featured: true,
      isPublished: true,
      sortOrder: 1,
      technologies: [
        { name: 'Next.js', iconKey: 'nextjs' },
        { name: 'TypeScript', iconKey: 'typescript' },
        { name: 'React', iconKey: 'react' },
        { name: 'Vercel', iconKey: 'vercel' },
        { name: 'MongoDB', iconKey: 'mongodb' },
        { name: 'Tailwind CSS', iconKey: 'tailwindcss' },
        { name: 'shadcn/ui', iconKey: 'shadcn' },
        { name: 'MDX', iconKey: 'mdx' },
      ],
    },
    {
      title: 'Appwrite MCP Server',
      description:
        'Model Context Protocol server for seamless Appwrite database operations with 7 powerful tools and 99.9% success rate',
      image: '/project/appwrite.png',
      video: 'https://ik.imagekit.io/hokb3mrdr/appwrite.mp4',
      link: 'https://mcp.ramx.in/',
      github: 'https://github.com/ramxcodes/mcp-server',
      live: 'https://mcp.ramx.in/',
      slug: 'appwrite-mcp-server',
      status: 'in-progress',
      featured: true,
      isPublished: true,
      sortOrder: 2,
      technologies: [
        { name: 'TypeScript', iconKey: 'typescript' },
        { name: 'Bun', iconKey: 'bun' },
        { name: 'Vercel', iconKey: 'vercel' },
        { name: 'Appwrite', iconKey: 'appwrite' },
      ],
    },
    {
      title: 'Syncify',
      description:
        'Real-time music streaming platform with synchronized playback, live chat, and social listening features',
      image: '/project/syncify.png',
      video: 'https://ik.imagekit.io/hokb3mrdr/syncify.mp4',
      link: 'https://syncify.rocks',
      github: 'https://github.com/ramxcodes/syncify',
      live: 'https://syncify.rocks',
      slug: 'syncify',
      status: 'in-progress',
      featured: true,
      isPublished: true,
      sortOrder: 3,
      technologies: [
        { name: 'React', iconKey: 'react' },
        { name: 'Node.js', iconKey: 'nodejs' },
        { name: 'MongoDB', iconKey: 'mongodb' },
        { name: 'Vercel', iconKey: 'vercel' },
        { name: 'Tailwind CSS', iconKey: 'tailwindcss' },
        { name: 'shadcn/ui', iconKey: 'shadcn' },
        { name: 'Socket.io', iconKey: 'socketio' },
      ],
    },
  ];

  for (const proj of projectsData) {
    const { technologies, ...data } = proj;
    await prisma.project.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        technologies: { create: technologies },
      },
    });
  }
  console.log('Projects seeded');

  // Seed Experience
  const experiencesData = [
    {
      company: 'good day :3',
      position: 'Founding Frontend Engineer',
      location: 'United States (Remote)',
      image: '/company/promote.png',
      description: [
        'Architected and developed the complete frontend infrastructure for the platform, a comprehensive solution for creating and managing promotional campaigns.',
        'Led a comprehensive codebase refactoring initiative that improved maintainability, scalability, and development velocity across the entire platform.',
        'Integrated and optimized backend API connections, implementing efficient data fetching strategies and error handling mechanisms.',
      ],
      startDate: 'August 2025',
      endDate: 'Present',
      website: '#',
      isCurrent: true,
      isBlur: true,
      sortOrder: 1,
      technologies: [
        { name: 'Next.js', href: 'https://nextjs.org/', iconKey: 'nextjs' },
        {
          name: 'Tailwind CSS',
          href: 'https://tailwindcss.com/',
          iconKey: 'tailwindcss',
        },
        {
          name: 'TypeScript',
          href: 'https://typescriptlang.org/',
          iconKey: 'typescript',
        },
        { name: 'React', href: 'https://react.dev/', iconKey: 'react' },
      ],
    },
    {
      company: 'Upsurge Labs',
      position: 'Backend Developer Intern',
      location: 'Bangalore, India (On-Site)',
      image: '/company/upsurge.png',
      description: [
        'Backend development for Bhindi.io, a flagship product of Upsurge Labs, focusing on core infrastructure and agent development.',
        'Engineered and deployed multiple high-performance agents, enhancing product capabilities and user experience.',
      ],
      startDate: 'June 2025',
      endDate: 'July 2025',
      website: 'https://bhindi.io',
      isCurrent: false,
      isBlur: false,
      sortOrder: 2,
      technologies: [
        { name: 'NestJS', href: 'https://nestjs.com/', iconKey: 'nestjs' },
        {
          name: 'TypeScript',
          href: 'https://www.typescriptlang.org/',
          iconKey: 'typescript',
        },
        {
          name: 'Express',
          href: 'https://expressjs.com/',
          iconKey: 'expressjs',
        },
      ],
    },
  ];

  for (const exp of experiencesData) {
    const { technologies, ...data } = exp;
    const existing = await prisma.experience.findFirst({
      where: { company: data.company, position: data.position },
    });
    if (!existing) {
      await prisma.experience.create({
        data: {
          ...data,
          technologies: { create: technologies },
        },
      });
    }
  }
  console.log('Experience seeded');

  // Seed Blog Posts from MDX files
  const blogDir = path.join(process.cwd(), 'src/data/blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'));
    for (const file of blogFiles) {
      const filePath = path.join(blogDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data: fm, content } = matter(raw);

      const slug = fm.slug || file.replace('.mdx', '');
      await prisma.blogPost.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          title: fm.title || 'Untitled',
          description: fm.description || '',
          image: fm.image || '',
          tags: fm.tags || [],
          date: new Date(fm.date || Date.now()),
          content,
          isPublished: fm.isPublished !== false,
        },
      });
    }
    console.log('Blog posts seeded');
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
