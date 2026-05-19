import Bun from '@/components/technologies/Bun';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

export const mySkills = [
  { name: 'React', icon: <ReactIcon key="react" /> },
  { name: 'Bun', icon: <Bun key="bun" /> },
  { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
  { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
  { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
  { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
  { name: 'Prisma', icon: <Prisma key="prisma" /> },
];

export const about = {
  name: 'Mikael Macabali',
  description: `I'm a Full Stack web developer passionate about building interactive and beautiful web experiences. I love turning ideas into real products using modern technologies.`,
};
