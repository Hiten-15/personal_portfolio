import { ANIMATION } from '@/constants/animations';
import { SECTIONS } from '@/constants/sections';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { ExperienceSectionProps } from '@/types/sections';

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { experience: section } = SECTIONS;

  return (
    <Section id={section.id}>
      <div data-reveal>
        <SectionHeader number={section.number} title={section.title} />
      </div>

      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <Card key={exp.company} featured={exp.featured} className="!p-0">
            <div
              data-reveal
              data-reveal-delay={String(i * ANIMATION.revealStagger)}
              className="grid gap-4 p-6 md:grid-cols-[140px_1fr_auto] md:items-start md:gap-8"
            >
              <p className="text-xs uppercase tracking-widest text-faint">{exp.dates}</p>
              <div>
                <h3 className="font-serif text-xl font-semibold text-ink">{exp.title}</h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {exp.company} · {exp.location}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{exp.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {exp.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
