import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}

export interface PillProps {
  children: ReactNode;
  className?: string;
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
