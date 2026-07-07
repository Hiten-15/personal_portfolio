import type { CardProps } from '@/types/components';
import { Card as FlowbiteCard } from 'flowbite-react';

export function Card({ children, className = '', featured = false }: CardProps) {
  return (
    <FlowbiteCard
      className={`rounded-2xl border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        featured ? 'border-primary' : 'border-border'
      } ${className}`}
    >
      {children}
    </FlowbiteCard>
  );
}
