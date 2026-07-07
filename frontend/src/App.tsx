import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPortfolio } from '@/api/portfolio';
import { QUERY_KEYS } from '@/constants/query';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { ExperienceSection } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div id="top">
      <ScrollProgressBar />
      <Navbar />
      {children}
    </div>
  );
}

function PortfolioPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.portfolio,
    queryFn: fetchPortfolio,
  });

  useRevealOnScroll(!!data);

  if (isLoading) {
    return (
      <PageShell>
        <LoadingSkeleton />
      </PageShell>
    );
  }

  if (isError || !data) {
    return (
      <PageShell>
        <ErrorState onRetry={() => refetch()} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <main>
        <Hero site={data.site} />
        <TechMarquee items={data.marqueeItems} />
        <About site={data.site} education={data.education} />
        <ExperienceSection experiences={data.experiences} />
        <Projects
          projects={data.projects}
          githubUrl={data.site.githubUrl}
          repos={data.site.repos}
        />
        <Skills skillCategories={data.skillCategories} />
        <Contact site={data.site} />
      </main>
      <Footer name={data.site.name} />
    </PageShell>
  );
}

export default function App() {
  return <PortfolioPage />;
}
