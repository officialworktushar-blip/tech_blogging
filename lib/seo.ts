import type { Metadata } from "next";

import { siteConfig } from "@/lib/config";
import { absoluteUrl } from "@/lib/format";
import type { BlogDetail } from "@/lib/types";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string | null;
  authors?: string[];
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  authors,
  noindex = false,
}: BuildMetadataOptions): Metadata {
  const imageUrl = image || "/opengraph-image";
  const canonicalUrl = absoluteUrl(path);
  const images = [{ url: imageUrl, alt: title }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph:
      type === "article"
        ? {
            type: "article",
            title,
            description,
            url: canonicalUrl,
            siteName: siteConfig.name,
            images,
            publishedTime: publishedTime ?? undefined,
            authors,
          }
        : {
            type: "website",
            title,
            description,
            url: canonicalUrl,
            siteName: siteConfig.name,
            images,
          },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildArticleJsonLd(blog: BlogDetail) {
  const url = absoluteUrl(`/blog/${blog.slug}`);
  const image = absoluteUrl(blog.cover_image_url ?? "/opengraph-image");
  const publishedAt = blog.published_at ?? blog.created_at;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: blog.title,
    description: blog.description ?? blog.subtitle ?? siteConfig.description,
    image: [image],
    datePublished: publishedAt ?? undefined,
    author: {
      "@type": blog.author_name ? "Person" : "Organization",
      name: blog.author_name ?? siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    articleSection: blog.category?.name,
    url,
    inLanguage: "en",
  };
}

export function serializeJsonLd(value: unknown) {
  return (JSON.stringify(value) ?? "")
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
