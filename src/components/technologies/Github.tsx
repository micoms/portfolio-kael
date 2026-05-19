import { siGithub } from 'simple-icons';

export default function Github({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d={siGithub.path} />
    </svg>
  );
}
