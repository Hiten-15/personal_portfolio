import type { SiteConfig } from '@portfolio/shared/types/portfolio';
import type { StatConfig } from '@/types/sections';

export function getHeroStats(site: SiteConfig): StatConfig[] {
  return [
    { key: 'cgpa', value: site.cgpa, label: 'CGPA · B.Tech ICT', decimals: 2 },
    { key: 'interns', value: site.interns, label: 'Internships' },
    { key: 'repos', value: site.repos, label: 'Public repos' },
  ];
}
