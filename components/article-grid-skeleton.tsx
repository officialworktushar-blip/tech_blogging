import { cn } from "@/lib/utils";

const skeletonBar = "rounded bg-line/80";

export function ArticleGridSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div role="status" className={cn(className)}>
      <span className="sr-only">Loading articles…</span>
      <div
        aria-hidden="true"
        className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="flex flex-col">
            <div className="aspect-[3/2] w-full rounded-md border border-line bg-surface" />
            <div className={cn(skeletonBar, "mt-4 h-3 w-20")} />
            <div className={cn(skeletonBar, "mt-3 h-5 w-11/12")} />
            <div className={cn(skeletonBar, "mt-2 h-5 w-3/4")} />
            <div className={cn(skeletonBar, "mt-3 h-3 w-full")} />
            <div className={cn(skeletonBar, "mt-1.5 h-3 w-5/6")} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogResultsSkeleton() {
  return (
    <div className="mt-8">
      <div aria-hidden="true" className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className={cn(skeletonBar, "h-9 w-24 rounded-full")}
          />
        ))}
      </div>
      <ArticleGridSkeleton count={6} className="mt-8" />
    </div>
  );
}
