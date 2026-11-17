import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleGrid } from "@/components/article-grid";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/breadcrumbs";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { ShareBar } from "@/components/share-bar";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/config";
import {
  getBlogBySlug,
  getRelatedBlogs,
} from "@/lib/data";
import { absoluteUrl, formatDate, readingTimeLabel } from "@/lib/format";
import { blogMetaDescription, toArticleCard } from "@/lib/presenters";
import {
  buildArticleJsonLd,
  buildMetadata,
  serializeJsonLd,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: blog.title,
    description: blogMetaDescription(blog),
    path: `/blog/${blog.slug}`,
    image: blog.cover_image_url,
    type: "article",
    publishedTime: blog.published_at,
    authors: blog.author_name ? [blog.author_name] : undefined,
  });
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const related = blog.category
    ? await getRelatedBlogs(blog.category.id, blog.id, 3)
    : [];

  const category = blog.category;
  const publishedAt = blog.published_at ?? blog.created_at;
  const publishedLabel = formatDate(publishedAt);
  const shareUrl = absoluteUrl(`/blog/${blog.slug}`);
  const articleJsonLd = serializeJsonLd(buildArticleJsonLd(blog));

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(category
      ? [{ label: category.name, href: `/${category.slug}` }]
      : []),
    { label: blog.title },
  ];

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <main className="container-page pb-16 pt-8 sm:pt-10 lg:pt-12">
        <Breadcrumbs items={breadcrumbItems} />

        <article className="mx-auto mt-6 max-w-3xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
            {category ? (
              <Link
                href={`/${category.slug}`}
                className="transition-colors hover:text-accent-strong"
              >
                {category.name}
              </Link>
            ) : (
              <span>Blog</span>
            )}
          </p>

          <h1 className="mt-3 font-serif text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          {blog.subtitle ? (
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {blog.subtitle}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="font-medium text-foreground">
              {blog.author_name ?? siteConfig.name}
            </span>

            {publishedLabel ? (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={publishedAt ?? undefined}>
                  {publishedLabel}
                </time>
              </>
            ) : null}

            <span aria-hidden="true">·</span>
            <span>{readingTimeLabel(blog.content)}</span>
          </div>

          <ShareBar url={shareUrl} title={blog.title} className="mt-6" />

          <div className="mt-8">
            {blog.cover_image_url ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-surface">
                <Image
                  src={blog.cover_image_url}
                  alt={blog.cover_image_alt ?? blog.title}
                  fill
                  unoptimized
                  preload
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <ImagePlaceholder
                ratio="wide"
                label={blog.cover_image_note ?? `Image: ${blog.title}`}
              />
            )}
          </div>

          {blog.content ? (
            <div
              className="article-content mt-10"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <p className="mt-10 rounded-lg border border-dashed border-line bg-surface px-6 py-10 text-center text-sm text-muted">
              This article does not have any content yet.
            </p>
          )}
        </article>

        {related.length > 0 ? (
          <section
            aria-labelledby="related-heading"
            className="mx-auto mt-16 max-w-6xl border-t border-line pt-10"
          >
            <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
              <h2
                id="related-heading"
                className="font-serif text-2xl font-bold tracking-tight text-foreground"
              >
                Related articles
              </h2>

              {category ? (
                <Link
                  href={`/${category.slug}`}
                  className="shrink-0 pb-1 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
                >
                  View all
                </Link>
              ) : null}
            </div>

            <ArticleGrid articles={related.map(toArticleCard)} />
          </section>
        ) : null}
      </main>
    </SiteShell>
  );
}
