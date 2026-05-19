import { siSocketdotio } from 'simple-icons';

export default function SocketIo({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d={siSocketdotio.path} />
    </svg>
  );
}
