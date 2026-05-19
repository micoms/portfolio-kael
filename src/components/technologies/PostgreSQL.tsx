import { siPostgresql } from 'simple-icons';

export default function PostgreSQL({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d={siPostgresql.path} />
    </svg>
  );
}
