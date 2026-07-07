export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  headline: string;
  headlineAccent: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  showAvailability: boolean;
  showPhone: boolean;
  cgpa: number;
  interns: number;
  repos: number;
  githubUrl: string;
  linkedinUrl: string;
  profileImage: string;
}

export interface Education {
  school: string;
  degree: string;
  dates: string;
  location: string;
  cgpa: string;
}

export interface Experience {
  dates: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  featured: boolean;
}

export interface Project {
  title: string;
  stack: string;
  githubUrl: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface PortfolioContent {
  site: SiteConfig;
  education: Education;
  experiences: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
  marqueeItems: string[];
}

export interface ApiResponse<T> {
  data: T;
}
