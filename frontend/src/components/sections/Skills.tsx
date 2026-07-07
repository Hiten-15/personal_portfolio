import { ANIMATION } from '@/constants/animations';
import { SECTIONS } from '@/constants/sections';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { SkillsProps } from '@/types/sections';

export function Skills({ skillCategories }: SkillsProps) {
  const { skills: section } = SECTIONS;

  return (
    <Section id={section.id}>
      <div data-reveal>
        <SectionHeader number={section.number} title={section.title} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((cat, i) => (
          <Card key={cat.category}>
            <div data-reveal data-reveal-delay={String(i * ANIMATION.skillRevealStagger)}>
              <h3 className="font-serif text-lg font-semibold text-ink">{cat.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
