export function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-content px-6 py-16 md:px-10">
      <div className="h-6 w-48 animate-pulse rounded bg-border" />
      <div className="mt-6 h-16 w-full max-w-2xl animate-pulse rounded bg-border" />
      <div className="mt-4 h-24 w-full max-w-xl animate-pulse rounded bg-border" />
    </div>
  );
}
