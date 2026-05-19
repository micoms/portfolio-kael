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
      value: { text: 'Built with Next.js, Tailwind CSS, and a lot of ☕' },
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
