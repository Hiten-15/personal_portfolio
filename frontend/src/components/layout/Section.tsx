import type { SectionProps } from '@/types/components';

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`px-6 py-16 md:px-10 ${className}`}>
      <div className="mx-auto max-w-content">{children}</div>
    </section>
  );
}
