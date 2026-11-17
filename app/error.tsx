"use client";

import { Home, LifeBuoy, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { SiteShell } from "@/components/site-shell";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SiteShell>
      <main className="container-page pb-20 pt-16 sm:pt-24">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
          Something went wrong
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          We hit an unexpected error
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
          The page could not finish loading. Try again, or head back home and
          continue from there.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Home aria-hidden="true" className="size-4" />
            Back to home
          </Link>

          <Link
            href="/contact-support"
            className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <LifeBuoy aria-hidden="true" className="size-4" />
            Contact support
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}
