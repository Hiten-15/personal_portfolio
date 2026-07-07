import { COPY } from '@/constants/copy';
import { getHeroStats } from '@/constants/stats';
import { SECTIONS } from '@/constants/sections';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { StatItem } from '@/components/ui/StatItem';
import type { HeroProps } from '@/types/sections';

export function Hero({ site }: HeroProps) {
  const stats = getHeroStats(site);

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-12 md:px-10 md:pt-16">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/5" />

      <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="animate-fade-up space-y-6" style={{ animationDelay: '0.1s' }}>
          {site.showAvailability && (
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-tint px-4 py-1.5 text-xs font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
              {COPY.hero.availability}
            </div>
          )}

          <p className="text-xs uppercase tracking-[0.18em] text-faint">{site.tagline}</p>

          <h1 className="font-serif text-4xl font-semibold leading-tight text-ink md:text-5xl lg:text-[58px]">
            {site.headline}{' '}
            <span className="text-primary">{site.headlineAccent}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted">{site.bio}</p>

          <div className="flex flex-wrap gap-3">
            <Button href={`#${SECTIONS.projects.id}`}>{COPY.hero.cta.projects}</Button>
            <Button href={`#${SECTIONS.contact.id}`} variant="outline">
              {COPY.hero.cta.contact}
            </Button>
          </div>

          <div className="flex flex-wrap gap-8 pt-4">
            {stats.map((stat) => (
              <StatItem
                key={stat.key}
                value={stat.value}
                label={stat.label}
                decimals={stat.decimals}
              />
            ))}
          </div>

          <SocialLinks githubUrl={site.githubUrl} linkedinUrl={site.linkedinUrl} />
        </div>

        <div className="animate-fade-up flex justify-center lg:justify-end" style={{ animationDelay: '0.3s' }}>
          <div className="animate-floaty relative">
            <div className="rounded-2xl border-2 border-border-blue bg-surface p-3 shadow-md transition-transform duration-300 hover:rotate-0">
              <img
                src={site.profileImage}
                alt={site.name}
                className="h-72 w-64 rounded-xl object-cover md:h-80 md:w-72"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
