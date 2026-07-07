import { COPY } from '@/constants/copy';
import { SECTIONS } from '@/constants/sections';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { AboutProps } from '@/types/sections';

export function About({ site, education }: AboutProps) {
  const { about: section } = SECTIONS;

  return (
    <Section id={section.id}>
      <div data-reveal data-reveal-delay="0">
        <SectionHeader number={section.number} title={section.title} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="!p-8">
          <div data-reveal data-reveal-delay="100">
            <h3 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
              {COPY.about.headline}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{site.bio}</p>
          </div>
        </Card>

        <Card className="!p-8">
          <div data-reveal data-reveal-delay="200">
            <p className="text-xs uppercase tracking-widest text-faint">{COPY.about.educationLabel}</p>
            <h3 className="mt-3 font-serif text-xl font-semibold text-ink">{education.school}</h3>
            <p className="mt-2 text-sm text-muted">{education.degree}</p>
            <p className="mt-1 text-sm text-faint">
              {education.dates} · {education.location}
            </p>
            <span className="mt-4 inline-block rounded-full bg-blue-tint px-3 py-1 text-xs font-medium text-primary">
              {education.cgpa}
            </span>
          </div>
        </Card>
      </div>
    </Section>
  );
}
