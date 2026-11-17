import type { MetadataRoute } from "next";

import { getCategories, getPublishedBlogs } from "@/lib/data";
import { absoluteUrl } from "@/lib/format";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, blogs] = await Promise.all([
    getCategories(),
    getPublishedBlogs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about-us"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/contact-support"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/${category.slug}`),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: absoluteUrl(`/blog/${blog.slug}`),
    lastModified: blog.published_at ?? blog.created_at ?? undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes];
}
