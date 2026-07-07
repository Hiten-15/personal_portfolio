import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary to-primary-light transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
