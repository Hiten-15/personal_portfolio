import type {
  Education,
  Experience,
  Project,
  SiteConfig,
  SkillCategory,
} from '@portfolio/shared/types/portfolio';

export interface HeroProps {
  site: SiteConfig;
}

export interface AboutProps {
  site: SiteConfig;
  education: Education;
}

export interface ExperienceSectionProps {
  experiences: Experience[];
}

export interface ProjectsProps {
  projects: Project[];
  githubUrl: string;
  repos: number;
}

export interface SkillsProps {
  skillCategories: SkillCategory[];
}

export interface ContactProps {
  site: SiteConfig;
}

export interface TechMarqueeProps {
  items: string[];
}

export interface FooterProps {
  name: string;
}

export interface StatConfig {
  key: string;
  value: number;
  label: string;
  decimals?: number;
}

export interface SectionConfig {
  id: string;
  number: string;
  title: string;
}

export interface NavLink {
  label: string;
  href: string;
}
