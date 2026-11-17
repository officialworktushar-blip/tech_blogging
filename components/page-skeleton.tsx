import { cn } from "@/lib/utils";

const bar = "animate-pulse rounded bg-line/80";

export function PageHeadingSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("max-w-3xl", className)}>
      <div className={cn(bar, "h-3 w-24")} />
      <div className={cn(bar, "mt-4 h-9 w-3/4")} />
      <div className={cn(bar, "mt-4 h-4 w-full max-w-xl")} />
      <div className={cn(bar, "mt-2 h-4 w-5/6 max-w-lg")} />
    </div>
  );
}

export function ContentLoadingSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <main
      role="status"
      className={cn("container-page pb-16 pt-8 sm:pt-10 lg:pt-12", className)}
    >
      <span className="sr-only">Loading page…</span>
      <PageHeadingSkeleton />
      <div
        aria-hidden="true"
        className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex flex-col">
            <div className="aspect-[3/2] w-full animate-pulse rounded-md border border-line bg-surface" />
            <div className={cn(bar, "mt-4 h-3 w-20")} />
            <div className={cn(bar, "mt-3 h-5 w-11/12")} />
            <div className={cn(bar, "mt-2 h-5 w-3/4")} />
            <div className={cn(bar, "mt-3 h-3 w-full")} />
            <div className={cn(bar, "mt-1.5 h-3 w-5/6")} />
          </div>
        ))}
      </div>
    </main>
  );
}

export function ArticleDetailSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <main
      role="status"
      className={cn("container-page pb-16 pt-8 sm:pt-10 lg:pt-12", className)}
    >
      <span className="sr-only">Loading article…</span>
      <div aria-hidden="true">
        <div className={cn(bar, "h-3 w-48")} />

        <article className="mx-auto mt-8 max-w-3xl">
          <div className={cn(bar, "h-3 w-28")} />
          <div className={cn(bar, "mt-4 h-10 w-full")} />
          <div className={cn(bar, "mt-2 h-10 w-4/5")} />
          <div className={cn(bar, "mt-5 h-4 w-56 max-w-full")} />
          <div className="mt-8 aspect-[16/9] w-full animate-pulse rounded-lg border border-line bg-surface" />

          <div className="mt-10 space-y-3">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className={cn(
                  bar,
                  "h-4",
                  index % 5 === 4 ? "w-3/5" : "w-full",
                )}
              />
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}

export function AdminPageSkeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      className={cn("mx-auto max-w-5xl", className)}
    >
      <span className="sr-only">Loading admin page…</span>
      <div aria-hidden="true">
        <div className={cn(bar, "h-8 w-52")} />
        <div className={cn(bar, "mt-3 h-4 w-full max-w-md")} />

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="rounded-lg border border-line bg-background p-5"
            >
              <div className={cn(bar, "h-3 w-24")} />
              <div className={cn(bar, "mt-3 h-8 w-16")} />
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="rounded-lg border border-line bg-background p-5"
            >
              <div className={cn(bar, "h-4 w-2/3")} />
              <div className={cn(bar, "mt-3 h-3 w-1/2")} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
