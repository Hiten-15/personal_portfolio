import type { CardProps } from '@/types/components';

export function Card({ children, className = '', featured = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        featured ? 'border-primary' : 'border-border'
      } ${className}`}
    >
      {children}
    </div>
  );
}
