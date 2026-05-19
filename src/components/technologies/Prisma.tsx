import { siPrisma } from 'simple-icons';

export default function Prisma({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d={siPrisma.path} />
    </svg>
  );
}
