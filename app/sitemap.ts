import type { MetadataRoute } from "next";

import { isPublicCategorySlug } from "@/lib/data";
import { absoluteUrl } from "@/lib/format";
import { createStaticClient } from "@/lib/supabase/static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  try {
    const supabase = createStaticClient();

    if (!supabase) {
      return staticRoutes;
    }

    const [categoriesResult, blogsResult] = await Promise.all([
      supabase
        .from("categories")
        .select("slug")
        .order("sort_order", { ascending: true }),
      supabase
        .from("blogs")
        .select("slug, published_at, created_at")
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false }),
    ]);

    if (categoriesResult.error) {
      console.error(
        "Failed to load sitemap categories:",
        categoriesResult.error.message,
      );
    }

    if (blogsResult.error) {
      console.error("Failed to load sitemap blogs:", blogsResult.error.message);
    }

    const categories = (categoriesResult.data ?? []) as Array<{
      slug: string;
    }>;
    const blogs = (blogsResult.data ?? []) as Array<{
      slug: string;
      published_at: string | null;
      created_at: string | null;
    }>;

    const categoryRoutes: MetadataRoute.Sitemap = categories
      .filter(
        (category) =>
          category.slug.length > 0 && isPublicCategorySlug(category.slug),
      )
      .map((category) => ({
        url: absoluteUrl(`/${category.slug}`),
        changeFrequency: "weekly",
        priority: 0.7,
      }));

    const blogRoutes: MetadataRoute.Sitemap = blogs
      .filter((blog) => blog.slug.length > 0)
      .map((blog) => ({
        url: absoluteUrl(`/blog/${blog.slug}`),
        lastModified: blog.published_at ?? blog.created_at ?? undefined,
        changeFrequency: "monthly",
        priority: 0.6,
      }));

    return [...staticRoutes, ...categoryRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    return staticRoutes;
  }
}
