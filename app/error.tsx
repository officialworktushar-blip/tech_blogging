"use client";

import { Home, LifeBuoy, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { SiteShell } from "@/components/site-shell";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
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

        {process.env.NODE_ENV === "development" ? (
          <div className="mt-7 max-w-2xl rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
              Development error details
            </p>
            <p className="mt-2 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-foreground">
              {error.message || "Unknown error"}
            </p>
            {error.digest ? (
              <p className="mt-2 break-words font-mono text-xs text-muted">
                Digest: {error.digest}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
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
