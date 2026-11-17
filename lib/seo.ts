import type { Metadata } from "next";

import { siteConfig } from "@/lib/config";

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
  const images = [{ url: imageUrl, alt: title }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
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
            url: path,
            siteName: siteConfig.name,
            images,
            publishedTime: publishedTime ?? undefined,
            authors,
          }
        : {
            type: "website",
            title,
            description,
            url: path,
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
