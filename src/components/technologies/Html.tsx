import { siHtml5 } from 'simple-icons';

export default function Html({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d={siHtml5.path} />
    </svg>
  );
}
