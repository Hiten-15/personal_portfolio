import type { NavLink } from '@/types/sections';

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
];

export const LOGO = {
  initials: 'HM',
  href: '#top',
} as const;

export const CONTACT_NAV = {
  label: 'Contact',
  href: '#contact',
} as const;
