import "server-only";

import { createClient } from "@/lib/supabase/server";
import type {
  AdminBlog,
  AdminBlogListItem,
  CategoryRef,
} from "@/lib/types";

const ADMIN_BLOG_COLUMNS =
  "id, title, subtitle, slug, description, content, category_id, cover_image_url, cover_image_alt, cover_image_note, author_name, status, is_featured, published_at, created_at, updated_at";

type CategoryJoin = CategoryRef | CategoryRef[] | null | undefined;

function normalizeCategory(value: CategoryJoin): CategoryRef | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value;
}

export async function getAdminBlogs(): Promise<{
  blogs: AdminBlogListItem[];
  failed: boolean;
}> {
  const supabase = await createClient().catch(() => null);

  if (!supabase) {
    return { blogs: [], failed: true };
  }

  const { data, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, status, is_featured, published_at, created_at, category:categories(id, name, slug)",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load admin blogs:", error.message);
    return { blogs: [], failed: true };
  }

  const blogs = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    is_featured: row.is_featured,
    published_at: row.published_at,
    created_at: row.created_at,
    category: normalizeCategory(row.category as CategoryJoin),
  })) as AdminBlogListItem[];

  return { blogs, failed: false };
}

export async function getAdminBlog(id: string): Promise<AdminBlog | null> {
  const supabase = await createClient().catch(() => null);

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("blogs")
    .select(ADMIN_BLOG_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load blog for editing:", error.message);
    return null;
  }

  return (data as AdminBlog | null) ?? null;
}
