import type { Metadata } from "next";
import Link from "next/link";

import { ArticleGrid } from "@/components/article-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EmptyState } from "@/components/empty-state";
import { SearchForm } from "@/components/search-form";
import { SiteShell } from "@/components/site-shell";
import { getCategories, searchBlogs } from "@/lib/data";
import { firstParam, sanitizeSearchTerm } from "@/lib/format";
import { toArticleCard } from "@/lib/presenters";
import { buildMetadata } from "@/lib/seo";
import type { BlogListItem } from "@/lib/types";

export const dynamic = "force-dynamic";

type SearchSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description:
    "Search every TechHelp guide, walkthrough, and fix by error message, app, or topic.",
  path: "/search",
  noindex: true,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchSearchParams;
}) {
  const query = await searchParams;
  const rawTerm = firstParam(query.q);
  const term = sanitizeSearchTerm(rawTerm);

  const [results, categories] = await Promise.all([
    term ? searchBlogs(term) : Promise.resolve<BlogListItem[]>([]),
    getCategories(),
  ]);

  return (
    <SiteShell>
      <main className="container-page pb-16 pt-8 sm:pt-10 lg:pt-12">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Search" }]}
        />

        <header className="mt-6 max-w-2xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Search
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find an answer
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            Search by error message, app name, or the task you are trying to
            finish.
          </p>

          <SearchForm defaultQuery={rawTerm} />
        </header>

        {!term ? (
          <EmptyState
            className="mt-10"
            title="Start with a search"
            message="Enter a few words above, or browse the categories below to find your guide."
          />
        ) : results.length === 0 ? (
          <EmptyState
            className="mt-10"
            title={`No results for "${term}"`}
            message="Try a shorter phrase, a different spelling, or browse the categories below."
            actionLabel="Browse all articles"
            actionHref="/blog"
          />
        ) : (
          <>
            <p className="mt-8 text-sm text-muted">
              {results.length} result{results.length === 1 ? "" : "s"} for
              &nbsp;&ldquo;{term}&rdquo;.
            </p>
            <ArticleGrid
              articles={results.map(toArticleCard)}
              className="mt-6"
            />
          </>
        )}

        {!term ? (
          <section className="mt-12 border-t border-line pt-8">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Browse categories
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/${category.slug}`}
                    className="flex flex-col rounded-lg border border-line bg-surface/60 px-5 py-4 transition-colors hover:border-accent"
                  >
                    <span className="text-sm font-semibold text-foreground">
                      {category.name}
                    </span>
                    {category.description ? (
                      <span className="mt-1 text-sm leading-relaxed text-muted">
                        {category.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </SiteShell>
  );
}
