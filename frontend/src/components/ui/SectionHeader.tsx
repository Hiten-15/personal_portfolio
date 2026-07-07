import type { SectionHeaderProps } from '@/types/components';

export function SectionHeader({ number, title, action }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 className="font-serif text-3xl font-semibold text-ink md:text-4xl">
        <span className="text-faint">{number} – </span>
        {title}
      </h2>
      {action}
    </div>
  );
}
