import AWS from '@/components/technologies/AWS';
import Appwrite from '@/components/technologies/Appwrite';
import BootStrap from '@/components/technologies/BootStrap';
import Bun from '@/components/technologies/Bun';
import CSS from '@/components/technologies/CSS';
import ExpressJs from '@/components/technologies/ExpressJs';
import Figma from '@/components/technologies/Figma';
import Github from '@/components/technologies/Github';
import Html from '@/components/technologies/Html';
import JavaScript from '@/components/technologies/JavaScript';
import MDXIcon from '@/components/technologies/MDXIcon';
import MongoDB from '@/components/technologies/MongoDB';
import Motion from '@/components/technologies/Motion';
import NestJs from '@/components/technologies/NestJs';
import Netlify from '@/components/technologies/Netlify';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import Sanity from '@/components/technologies/Sanity';
import Shadcn from '@/components/technologies/Shadcn';
import SocketIo from '@/components/technologies/SocketIo';
import TailwindCss from '@/components/technologies/TailwindCss';
import ThreeJs from '@/components/technologies/ThreeJs';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import type { ComponentType } from 'react';

export const iconRegistry: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  Appwrite,
  AWS,
  BootStrap,
  Bun,
  CSS,
  ExpressJs,
  Figma,
  Github,
  Html,
  JavaScript,
  MDXIcon,
  MongoDB,
  Motion,
  NestJs,
  Netlify,
  NextJs,
  NodeJs,
  PostgreSQL,
  Postman,
  Prisma,
  ReactIcon,
  Sanity,
  Shadcn,
  SocketIo,
  TailwindCss,
  ThreeJs,
  TypeScript,
  Vercel,
};

export const iconKeys = Object.keys(iconRegistry);
