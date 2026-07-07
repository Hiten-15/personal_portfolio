import { COPY } from '@/constants/copy';
import type { ErrorStateProps } from '@/types/components';

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-muted">{COPY.app.loadError}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-primary px-6 py-2 text-sm text-surface transition-colors duration-200 hover:bg-primary-dark"
      >
        {COPY.app.retry}
      </button>
    </div>
  );
}
