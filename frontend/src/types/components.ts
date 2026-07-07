import type { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}

export interface SectionHeaderProps {
  number: string;
  title: string;
  action?: ReactNode;
}

export interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export interface StatItemProps {
  value: number;
  label: string;
  decimals?: number;
}

export type SocialLinksVariant = 'default' | 'inverse';

export interface SocialLinksProps {
  githubUrl: string;
  linkedinUrl: string;
  variant?: SocialLinksVariant;
}

export interface ErrorStateProps {
  onRetry: () => void;
}
