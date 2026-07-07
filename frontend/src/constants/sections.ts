import type { SectionConfig } from '@/types/sections';

export const SECTIONS = {
  about: { id: 'about', number: '01', title: 'About' },
  experience: { id: 'experience', number: '02', title: 'Experience' },
  projects: { id: 'projects', number: '03', title: 'Projects' },
  skills: { id: 'skills', number: '04', title: 'Skills' },
  contact: { id: 'contact', number: '05', title: 'Contact' },
} as const satisfies Record<string, SectionConfig>;

export type SectionKey = keyof typeof SECTIONS;
