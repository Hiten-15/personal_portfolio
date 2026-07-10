import { HiEnvelope, HiMapPin, HiPhone } from 'react-icons/hi2';
import { COPY } from '@/constants/copy';
import { SECTIONS } from '@/constants/sections';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SocialLinks } from '@/components/ui/SocialLinks';
import type { ContactProps } from '@/types/sections';

export function Contact({ site }: ContactProps) {
  const { contact: section } = SECTIONS;

  return (
    <Section id={section.id}>
      <div data-reveal>
        <SectionHeader number={section.number} title={section.title} />
      </div>

      <div
        data-reveal
        data-reveal-delay="100"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-dark to-primary p-8 text-on-accent md:p-12"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-white/5" />

        <h3 className="font-serif text-3xl font-semibold md:text-4xl">
          {COPY.contact.headline}
        </h3>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 text-sm transition-opacity duration-200 hover:opacity-80"
          >
            <HiEnvelope className="h-5 w-5" />
            {site.email}
          </a>
          {site.showPhone && (
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 text-sm transition-opacity duration-200 hover:opacity-80"
            >
              <HiPhone className="h-5 w-5" />
              {site.phone}
            </a>
          )}
          <span className="inline-flex items-center gap-2 text-sm text-blue-tint">
            <HiMapPin className="h-5 w-5" />
            {site.location}
          </span>
        </div>

        <div className="mt-8">
          <SocialLinks
            githubUrl={site.githubUrl}
            linkedinUrl={site.linkedinUrl}
            variant="inverse"
          />
        </div>
      </div>
    </Section>
  );
}
