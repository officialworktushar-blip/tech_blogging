import Link from "next/link";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

export function EmptyState({
  title,
  message,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-line bg-surface/60 px-6 py-12 text-center",
        className,
      )}
    >
      <h2 className="font-serif text-lg font-bold tracking-tight text-foreground">
        {title}
      </h2>

      {message ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          {message}
        </p>
      ) : null}

      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-5 inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
