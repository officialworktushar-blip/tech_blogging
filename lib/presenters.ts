import type { ArticleCardProps } from "@/components/article-card";
import { siteConfig } from "@/lib/config";
import { stripHtml, truncate } from "@/lib/format";
import type { BlogListItem } from "@/lib/types";

export function toArticleCard(blog: BlogListItem): ArticleCardProps {
  const category = blog.category;

  return {
    title: blog.title,
    href: `/blog/${blog.slug}`,
    excerpt: blog.description ?? blog.subtitle ?? undefined,
    category: category?.name,
    categoryHref: category ? `/${category.slug}` : undefined,
    imageSrc: blog.cover_image_url ?? undefined,
    imageAlt: blog.cover_image_alt ?? undefined,
    imagePlaceholder: blog.cover_image_note ?? `Image: ${blog.title}`,
  };
}

export function blogMetaDescription(blog: {
  title: string;
  description: string | null;
  subtitle?: string | null;
  content?: string | null;
}) {
  const text = stripHtml(
    blog.description ?? blog.subtitle ?? blog.content ?? "",
  );

  return truncate(text || `${blog.title} — ${siteConfig.description}`, 160);
}
