"use client";

import { Home, RotateCcw } from "lucide-react";
import { useEffect } from "react";

import { siteConfig } from "@/lib/config";

import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <title>Something went wrong | {siteConfig.name}</title>
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Application error
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Something went wrong
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            The application could not render this page. Try again, or return to
            the home page.
          </p>

          {process.env.NODE_ENV === "development" ? (
            <div className="mt-7 rounded-lg border border-line bg-surface p-4">
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

            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Home aria-hidden="true" className="size-4" />
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
