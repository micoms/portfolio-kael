import { siJavascript } from 'simple-icons';

export default function JavaScript({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d={siJavascript.path} />
    </svg>
  );
}
