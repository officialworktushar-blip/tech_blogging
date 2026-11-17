import type { Metadata } from "next";
import { Suspense } from "react";

import { ArticleGrid } from "@/components/article-grid";
import { BlogResultsSkeleton } from "@/components/article-grid-skeleton";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryChips } from "@/components/category-chips";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { SiteShell } from "@/components/site-shell";
import { getBlogIndexPage } from "@/lib/data";
import { firstParam, parsePage } from "@/lib/format";
import { toArticleCard } from "@/lib/presenters";
import { buildMetadata } from "@/lib/seo";

type BlogSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Every published guide, walkthrough, and fix for Windows, software, email, internet, and security problems.",
  path: "/blog",
});

export default function BlogPage({
  searchParams,
}: {
  searchParams: BlogSearchParams;
}) {
  return (
    <SiteShell>
      <main className="container-page pb-16 pt-8 sm:pt-10 lg:pt-12">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
            All articles
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Blog
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            Practical, step-by-step help for the tech problems that interrupt
            your day. Filter by category or browse everything.
          </p>
        </header>

        <Suspense fallback={<BlogResultsSkeleton />}>
          <BlogResults searchParams={searchParams} />
        </Suspense>
      </main>
    </SiteShell>
  );
}

async function BlogResults({
  searchParams,
}: {
  searchParams: BlogSearchParams;
}) {
  const query = await searchParams;
  const page = parsePage(query.page);
  const categorySlug = firstParam(query.category) || null;
  const result = await getBlogIndexPage(page, categorySlug);
  const articles = result.blogs.map(toArticleCard);

  if (articles.length === 0) {
    if (result.total > 0) {
      return (
        <>
          <CategoryChips
            categories={result.categories}
            activeSlug={result.activeCategory?.slug}
            className="mt-8"
          />
          <EmptyState
            className="mt-8"
            title="This page is empty"
            message="There are no more articles past this page."
            actionLabel="Go to page 1"
            actionHref={
              result.activeCategory
                ? `/blog?category=${result.activeCategory.slug}`
                : "/blog"
            }
          />
        </>
      );
    }

    return (
      <>
        <CategoryChips
          categories={result.categories}
          activeSlug={result.activeCategory?.slug}
          className="mt-8"
        />
        <EmptyState
          className="mt-8"
          title={
            result.activeCategory
              ? `No ${result.activeCategory.name} articles yet`
              : "No articles yet"
          }
          message={
            result.activeCategory
              ? "We are still writing guides for this category. Browse everything else in the meantime."
              : "New step-by-step guides are on the way. Check back soon."
          }
          actionLabel={result.activeCategory ? "View all articles" : undefined}
          actionHref={result.activeCategory ? "/blog" : undefined}
        />
      </>
    );
  }

  return (
    <>
      <CategoryChips
        categories={result.categories}
        activeSlug={result.activeCategory?.slug}
        className="mt-8"
      />

      <p className="mt-5 text-sm text-muted">
        {result.total} article{result.total === 1 ? "" : "s"}
        {result.activeCategory ? ` in ${result.activeCategory.name}` : ""}.
      </p>

      <ArticleGrid articles={articles} className="mt-6" />

      <Pagination
        className="mt-12"
        currentPage={Math.min(page, result.totalPages)}
        totalPages={result.totalPages}
        basePath="/blog"
        query={
          result.activeCategory
            ? { category: result.activeCategory.slug }
            : undefined
        }
      />
    </>
  );
}
