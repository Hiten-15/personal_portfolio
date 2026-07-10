import { COPY } from '@/constants/copy';
import { Button } from 'flowbite-react';
import type { ErrorStateProps } from '@/types/components';

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-muted">{COPY.app.loadError}</p>
      <Button
        color="blue"
        onClick={onRetry}
        className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-on-accent hover:!bg-primary-dark focus:ring-primary"
      >
        {COPY.app.retry}
      </Button>
    </div>
  );
}
