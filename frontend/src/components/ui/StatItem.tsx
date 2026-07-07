import { ANIMATION } from '@/constants/animations';
import { useCountUp } from '@/hooks/useCountUp';
import type { StatItemProps } from '@/types/components';

export function StatItem({ value, label, decimals = 0 }: StatItemProps) {
  const count = useCountUp(value, ANIMATION.countUpDuration, decimals);

  return (
    <div>
      <p className="font-serif text-3xl font-semibold tabular-nums text-primary-dark md:text-4xl">
        {decimals > 0 ? count.toFixed(decimals) : count}
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest text-faint">{label}</p>
    </div>
  );
}
