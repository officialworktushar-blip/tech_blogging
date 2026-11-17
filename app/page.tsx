import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { CategorySection } from "@/components/category-section";
import { EmptyState } from "@/components/empty-state";
import { HeroFeatured } from "@/components/hero-featured";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/config";
import { getHomeData } from "@/lib/data";
import { toArticleCard } from "@/lib/presenters";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  const { categories, featured, latest, byCategory } = await getHomeData();

  const hero = featured ?? latest[0] ?? null;
  const heroCard = hero ? toArticleCard(hero) : null;
  const latestArticles = latest
    .filter((article) => article.slug !== hero?.slug)
    .slice(0, 6)
    .map(toArticleCard);

  const categorySections = categories
    .map((category) => ({
      category,
      articles: (byCategory[category.slug] ?? []).map(toArticleCard),
    }))
    .filter((section) => section.articles.length > 0);

  return (
    <SiteShell>
      <main className="container-page pb-16 pt-8 sm:pt-10 lg:pt-12">
        {heroCard ? (
          <HeroFeatured headingLevel="h1" badge="Featured guide" {...heroCard} />
        ) : (
          <EmptyState
            title="No guides published yet"
            message="New step-by-step help articles are on the way. Check back soon."
          />
        )}

        {latestArticles.length > 0 ? (
          <section
            aria-labelledby="latest-heading"
            className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
          >
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-3 sm:mb-8">
              <h2
                id="latest-heading"
                className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Latest Articles
              </h2>
              <Link
                href="/blog"
                className="inline-flex shrink-0 items-center gap-1.5 pb-1 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
              >
                View all
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <ArticleCard key={article.href} {...article} />
              ))}
            </div>
          </section>
        ) : null}

        {categorySections.map(({ category, articles }) => (
          <CategorySection
            key={category.id}
            title={category.name}
            href={`/${category.slug}`}
            description={category.description ?? undefined}
            articles={articles}
            emptyMessage={`No ${category.name} guides have been published yet.`}
            className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
          />
        ))}

        <section className="mt-14 rounded-lg border border-line bg-surface px-6 py-10 sm:mt-16 sm:px-10 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
              Still stuck?
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Search the guides.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Type in the error message, the app you are using, or what you are
              trying to fix. We will point you to the right walkthrough.
            </p>
            <Link
              href="/search"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
            >
              Search help articles
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
