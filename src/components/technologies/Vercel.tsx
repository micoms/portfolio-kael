import { siVercel } from 'simple-icons';

export default function Vercel({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d={siVercel.path} />
    </svg>
  );
}
