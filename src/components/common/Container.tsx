import { cn } from '@/lib/utils';
import React from 'react';

export default function Container({
  children,
  className,
  wide = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn('container-atelier', wide && 'wide', className)}
      {...props}
    >
      {children}
    </div>
  );
}
