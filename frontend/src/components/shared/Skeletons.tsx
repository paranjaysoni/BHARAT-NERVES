import clsx from "clsx";

interface SkeletonBlockProps {
  className?: string;
}

function SkeletonBlock({ className }: SkeletonBlockProps) {
  return (
    <div
      className={clsx(
        "skeleton-shimmer rounded-md bg-secondary/80",
        className
      )}
      aria-hidden="true"
    />
  );
}

function SkeletonBar({ height }: { height: number }) {
  return (
    <div
      className="skeleton-shimmer w-full rounded-md bg-secondary/80"
      style={{ height: `${height}%` }}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton({ className }: SkeletonBlockProps) {
  return (
    <div className={clsx("surface-card rounded-md p-4", className)}>
      <SkeletonBlock className="h-4 w-28" />
      <SkeletonBlock className="mt-4 h-8 w-36" />
      <SkeletonBlock className="mt-3 h-3 w-full" />
      <SkeletonBlock className="mt-2 h-3 w-4/5" />
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="surface-card overflow-hidden rounded-md p-4">
      <div className="grid grid-cols-4 gap-3 border-b border-border pb-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-3" />
        ))}
      </div>
      <div className="divide-y divide-border/70">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="grid grid-cols-4 gap-3 py-3">
            <SkeletonBlock className="h-8" />
            <SkeletonBlock className="h-8" />
            <SkeletonBlock className="h-8" />
            <SkeletonBlock className="h-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton({ className }: SkeletonBlockProps) {
  return (
    <div className={clsx("surface-card rounded-md p-4", className)}>
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="h-8 w-20" />
      </div>
      <div className="mt-5 h-52 rounded-md border border-border bg-background/60 p-4">
        <div className="flex h-full items-end gap-3">
          {[38, 62, 48, 74, 56, 88, 70].map((height, index) => (
            <SkeletonBar key={index} height={height} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function MapSkeleton({ className }: SkeletonBlockProps) {
  return (
    <div className={clsx("surface-card rounded-md p-4", className)}>
      <div className="mb-3 flex items-center justify-between">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="h-8 w-24" />
      </div>
      <div className="relative h-72 overflow-hidden rounded-md border border-border bg-background">
        <SkeletonBlock className="absolute left-[22%] top-[18%] h-32 w-36 rounded-full opacity-80" />
        <SkeletonBlock className="absolute left-[38%] top-[34%] h-40 w-44 rounded-full opacity-70" />
        <SkeletonBlock className="absolute left-[54%] top-[24%] h-28 w-32 rounded-full opacity-60" />
        <SkeletonBlock className="absolute bottom-4 left-4 h-10 w-56" />
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="surface-card rounded-md p-4">
      <SkeletonBlock className="h-4 w-32" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="grid grid-cols-[36px_1fr_auto] gap-3">
            <SkeletonBlock className="h-9 w-9" />
            <div>
              <SkeletonBlock className="h-3 w-40" />
              <SkeletonBlock className="mt-2 h-3 w-56" />
            </div>
            <SkeletonBlock className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="animate-page-enter space-y-4" aria-label="Loading dashboard">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <MapSkeleton />
        <ListSkeleton />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <ChartSkeleton />
        <TableSkeleton rows={4} />
        <ListSkeleton rows={4} />
      </div>
    </div>
  );
}
