import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ArticleGrid } from "@/components/article-grid";
import { ArticleGridSkeleton } from "@/components/article-grid-skeleton";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { SiteShell } from "@/components/site-shell";
import {
  BLOG_PAGE_SIZE,
  getCategories,
  getCategoryBySlug,
  getCategoryPage,
} from "@/lib/data";
import { parsePage } from "@/lib/format";
import { toArticleCard } from "@/lib/presenters";
import { buildMetadata } from "@/lib/seo";
import type { Category } from "@/lib/types";

export const instant = false;

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: Pick<CategoryPageProps, "params">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category not found",
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: category.name,
    description:
      category.description ??
      `Practical ${category.name.toLowerCase()} guides and step-by-step fixes.`,
    path: `/${category.slug}`,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <SiteShell>
      <main className="container-page pb-16 pt-8 sm:pt-10 lg:pt-12">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: category.name }]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Help category
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {category.name}
          </h1>
          {category.description ? (
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
              {category.description}
            </p>
          ) : null}
        </header>

        <Suspense
          fallback={
            <ArticleGridSkeleton count={BLOG_PAGE_SIZE} className="mt-10" />
          }
        >
          <CategoryArticles category={category} searchParams={searchParams} />
        </Suspense>
      </main>
    </SiteShell>
  );
}

async function CategoryArticles({
  category,
  searchParams,
}: {
  category: Category;
  searchParams: CategoryPageProps["searchParams"];
}) {
  const query = await searchParams;
  const page = parsePage(query.page);
  const result = await getCategoryPage(category.slug, page);
  const articles = result.blogs.map(toArticleCard);

  if (result.total === 0) {
    return (
      <EmptyState
        className="mt-10"
        title="No guides here yet"
        message={`We are still writing ${category.name} walkthroughs. Try the full blog in the meantime.`}
        actionLabel="Browse all articles"
        actionHref="/blog"
      />
    );
  }

  if (articles.length === 0) {
    return (
      <EmptyState
        className="mt-10"
        title="This page is empty"
        message="There are no more articles past this page."
        actionLabel="Back to page 1"
        actionHref={`/${category.slug}`}
      />
    );
  }

  return (
    <>
      <ArticleGrid articles={articles} className="mt-10" />
      <Pagination
        className="mt-12"
        currentPage={Math.min(page, result.totalPages)}
        totalPages={result.totalPages}
        basePath={`/${category.slug}`}
      />
    </>
  );
}
