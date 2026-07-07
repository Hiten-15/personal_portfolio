import type { PillProps } from '@/types/components';

export function Pill({ children, className = '' }: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted ${className}`}
    >
      {children}
    </span>
  );
}
