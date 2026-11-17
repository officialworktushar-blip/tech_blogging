import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <main className="container-page pb-20 pt-16 sm:pt-24">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
          404 error
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          We could not find that page
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
          The link may be outdated, or the article may have moved. Head back
          home, browse the blog, or search for the fix you need.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to home
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Browse the blog
          </Link>

          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Search aria-hidden="true" className="size-4" />
            Search
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}
