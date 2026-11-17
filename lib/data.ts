import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { sanitizeSearchTerm } from "@/lib/format";
import type {
  BlogDetail,
  BlogListItem,
  BlogPage,
  Category,
  CategoryRef,
} from "@/lib/types";

export const BLOG_PAGE_SIZE = 9;
export const HOME_LATEST_LIMIT = 7;
export const HOME_CATEGORY_LIMIT = 4;

export const PUBLIC_CATEGORY_SLUGS = [
  "windows-help",
  "software-help",
  "email-help",
  "internet-help",
  "security-help",
] as const;

export function isPublicCategorySlug(slug: string) {
  return (PUBLIC_CATEGORY_SLUGS as readonly string[]).includes(slug);
}

const BLOG_LIST_COLUMNS =
  "id, title, subtitle, slug, description, cover_image_url, cover_image_alt, cover_image_note, author_name, published_at, created_at, category:categories(id, name, slug)";

const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Windows Help",
    slug: "windows-help",
    description:
      "Step-by-step fixes for Windows updates, settings, and everyday problems.",
    sort_order: 1,
  },
  {
    id: 2,
    name: "Software Help",
    slug: "software-help",
    description: "Install, restore, and troubleshoot the apps you use.",
    sort_order: 2,
  },
  {
    id: 3,
    name: "Email Help",
    slug: "email-help",
    description:
      "Set up accounts and solve sending, receiving, and spam problems.",
    sort_order: 3,
  },
  {
    id: 4,
    name: "Internet Help",
    slug: "internet-help",
    description: "Get connected and fix slow or unreliable home internet.",
    sort_order: 4,
  },
  {
    id: 5,
    name: "Security Help",
    slug: "security-help",
    description:
      "Protect your accounts, devices, and data with practical steps.",
    sort_order: 5,
  },
];

type CategoryJoin = CategoryRef | CategoryRef[] | null | undefined;

type BlogRow = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  cover_image_note: string | null;
  author_name: string | null;
  published_at: string | null;
  created_at: string | null;
  content?: string | null;
  category?: CategoryJoin;
};

function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  try {
    return createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch (error) {
    console.error("[data] Could not create Supabase client", error);
    return null;
  }
}

function logError(scope: string, error: { message: string } | null) {
  if (error) {
    console.error(`[data] ${scope} failed: ${error.message}`);
  }
}

function asRows<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function normalizeCategory(value: CategoryJoin): CategoryRef | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value;
}

function toListItem(row: BlogRow): BlogListItem {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    slug: row.slug,
    description: row.description,
    cover_image_url: row.cover_image_url,
    cover_image_alt: row.cover_image_alt,
    cover_image_note: row.cover_image_note,
    author_name: row.author_name,
    published_at: row.published_at,
    created_at: row.created_at,
    category: normalizeCategory(row.category),
  };
}

async function queryCategories(): Promise<Category[]> {
  const supabase = getClient();

  if (!supabase) {
    return FALLBACK_CATEGORIES;
  }

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, description, sort_order")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    logError("categories", error);

    const rows = asRows<Category>(data).filter((category) =>
      isPublicCategorySlug(category.slug),
    );

    return rows.length > 0 ? rows : FALLBACK_CATEGORIES;
  } catch (error) {
    console.error("[data] categories failed", error);
    return FALLBACK_CATEGORIES;
  }
}

async function queryBlogList(options: {
  page?: number;
  pageSize?: number;
  categoryId?: number;
  featuredOnly?: boolean;
  excludeId?: string;
  searchTerm?: string;
  withCount?: boolean;
}): Promise<{ blogs: BlogListItem[]; total: number }> {
  const supabase = getClient();

  if (!supabase) {
    return { blogs: [], total: 0 };
  }

  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? BLOG_PAGE_SIZE;
  const from = (page - 1) * pageSize;

  let builder = supabase
    .from("blogs")
    .select(
      BLOG_LIST_COLUMNS,
      options.withCount ? { count: "exact" as const } : undefined,
    )
    .eq("status", "published");

  if (options.categoryId !== undefined) {
    builder = builder.eq("category_id", options.categoryId);
  }

  if (options.featuredOnly) {
    builder = builder.eq("is_featured", true);
  }

  if (options.excludeId) {
    builder = builder.neq("id", options.excludeId);
  }

  if (options.searchTerm) {
    const term = options.searchTerm;
    builder = builder.or(
      `title.ilike.%${term}%,description.ilike.%${term}%`,
    );
  }

  try {
    const { data, count, error } = await builder
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);

    logError("blogs", error);

    return {
      blogs: asRows<BlogRow>(data).map(toListItem),
      total: count ?? 0,
    };
  } catch (error) {
    console.error("[data] blogs failed", error);
    return { blogs: [], total: 0 };
  }
}

export async function getCategories(): Promise<Category[]> {
  return queryCategories();
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const categories = await queryCategories();

  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getHomeData(): Promise<{
  categories: Category[];
  featured: BlogListItem | null;
  latest: BlogListItem[];
  byCategory: Record<string, BlogListItem[]>;
}> {
  const categories = await queryCategories();

  const [featuredResult, latestResult, ...categoryResults] = await Promise.all(
    [
      queryBlogList({ pageSize: 1, featuredOnly: true }),
      queryBlogList({ pageSize: HOME_LATEST_LIMIT }),
      ...categories.map((category) =>
        queryBlogList({
          categoryId: category.id,
          pageSize: HOME_CATEGORY_LIMIT,
        }),
      ),
    ],
  );

  const byCategory = categories.reduce<Record<string, BlogListItem[]>>(
    (result, category, index) => {
      result[category.slug] = categoryResults[index]?.blogs ?? [];
      return result;
    },
    {},
  );

  return {
    categories,
    featured: featuredResult.blogs[0] ?? null,
    latest: latestResult.blogs,
    byCategory,
  };
}

export async function getCategoryPage(
  slug: string,
  page: number,
): Promise<{ category: Category | null } & BlogPage> {
  const categories = await queryCategories();
  const category = categories.find((item) => item.slug === slug) ?? null;

  if (!category) {
    return {
      category: null,
      blogs: [],
      total: 0,
      page: 1,
      totalPages: 1,
    };
  }

  const { blogs, total } = await queryBlogList({
    categoryId: category.id,
    page,
    withCount: true,
  });

  return {
    category,
    blogs,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE)),
  };
}

export async function getBlogIndexPage(
  page: number,
  categorySlug: string | null,
): Promise<
  {
    categories: Category[];
    activeCategory: Category | null;
  } & BlogPage
> {
  const categories = await queryCategories();
  const activeCategory = categorySlug
    ? (categories.find((category) => category.slug === categorySlug) ?? null)
    : null;

  const { blogs, total } = await queryBlogList({
    categoryId: activeCategory?.id,
    page,
    withCount: true,
  });

  return {
    categories,
    activeCategory,
    blogs,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE)),
  };
}

export async function getBlogBySlug(slug: string): Promise<BlogDetail | null> {
  const supabase = getClient();

  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("blogs")
      .select(`${BLOG_LIST_COLUMNS}, content`)
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();

    logError("blog", error);

    if (!data) {
      return null;
    }

    const row = data as BlogRow;

    return {
      ...toListItem(row),
      content: row.content ?? null,
    };
  } catch (error) {
    console.error("[data] blog failed", error);
    return null;
  }
}

export async function getRelatedBlogs(
  categoryId: number,
  excludeId: string,
  limit = 3,
): Promise<BlogListItem[]> {
  const { blogs } = await queryBlogList({
    categoryId,
    excludeId,
    pageSize: limit,
  });

  return blogs;
}

export async function searchBlogs(term: string): Promise<BlogListItem[]> {
  const cleanTerm = sanitizeSearchTerm(term);

  if (!cleanTerm) {
    return [];
  }

  const { blogs } = await queryBlogList({
    searchTerm: cleanTerm,
    pageSize: 30,
  });

  return blogs;
}
