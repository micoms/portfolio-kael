import { siAppwrite } from 'simple-icons';

export default function Appwrite({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d={siAppwrite.path} />
    </svg>
  );
}
