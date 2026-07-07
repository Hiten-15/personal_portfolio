import type { TechMarqueeProps } from '@/types/sections';

export function TechMarquee({ items }: TechMarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-surface py-4">
      <div className="flex w-max animate-marquee gap-8">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap text-sm font-medium uppercase tracking-widest text-faint"
          >
            {item}
            <span className="mx-4 text-border">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
