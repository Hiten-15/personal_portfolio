import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { ANIMATION } from '@/constants/animations';
import { COPY } from '@/constants/copy';
import { SECTIONS } from '@/constants/sections';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { ProjectsProps } from '@/types/sections';

export function Projects({ projects, githubUrl, repos }: ProjectsProps) {
  const { projects: section } = SECTIONS;

  return (
    <Section id={section.id}>
      <div data-reveal>
        <SectionHeader
          number={section.number}
          title={section.title}
          action={
            <a
              href={`${githubUrl}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary transition-colors duration-200 hover:text-primary-dark"
            >
              {COPY.projects.allRepos(repos)}
              <HiArrowTopRightOnSquare className="h-4 w-4" />
            </a>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <a
            key={project.title}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card>
              <div data-reveal data-reveal-delay={String(i * ANIMATION.projectRevealStagger)}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-semibold text-ink">{project.title}</h3>
                  <HiArrowTopRightOnSquare className="h-4 w-4 shrink-0 text-faint" />
                </div>
                {project.description && (
                  <p className="mt-2 text-sm text-muted">{project.description}</p>
                )}
                <div className="mt-4">
                  <Pill>{project.stack}</Pill>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </Section>
  );
}
