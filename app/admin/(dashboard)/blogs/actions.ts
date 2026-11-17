"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { BLOG_CACHE_TAG } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { toSlug } from "@/lib/utils";

export type BlogFormState = {
  status: "idle" | "error";
  message?: string;
};

function parsePublishedAt(value: string) {
  if (!value) {
    return null;
  }

  const withZone = /(?:Z|[+-]\d{2}:\d{2})$/.test(value)
    ? value
    : `${value.length === 16 ? `${value}:00` : value}Z`;
  const date = new Date(withZone);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function isUniqueViolation(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "23505"
  );
}

export async function saveBlog(
  _previousState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = toSlug(slugInput || title);
  const description = String(formData.get("description") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const categoryRaw = String(formData.get("category_id") ?? "").trim();
  const coverImageUrl = String(formData.get("cover_image_url") ?? "").trim();
  const coverImageAlt = String(formData.get("cover_image_alt") ?? "").trim();
  const coverImageNote = String(formData.get("cover_image_note") ?? "").trim();
  const authorName = String(formData.get("author_name") ?? "").trim();
  const publishedRaw = String(formData.get("published_at") ?? "").trim();
  const isFeatured = formData.get("is_featured") === "on";
  const status =
    String(formData.get("status") ?? "draft") === "published"
      ? "published"
      : "draft";

  if (!title) {
    return { status: "error", message: "Add a title before saving." };
  }

  if (!slug) {
    return {
      status: "error",
      message: "Add a title or a URL slug using letters and numbers.",
    };
  }

  if (!content) {
    return { status: "error", message: "Add some content before saving." };
  }

  let categoryId: number | null = null;

  if (categoryRaw) {
    const parsed = Number.parseInt(categoryRaw, 10);

    if (!Number.isInteger(parsed) || parsed <= 0) {
      return { status: "error", message: "Choose a valid category." };
    }

    categoryId = parsed;
  }

  const publishedAt = parsePublishedAt(publishedRaw);

  if (publishedRaw && !publishedAt) {
    return { status: "error", message: "Enter a valid publish date and time." };
  }

  const supabase = await createClient().catch(() => null);

  if (!supabase) {
    return {
      status: "error",
      message:
        "Supabase is not configured. Add the environment variables and try again.",
    };
  }

  const payload = {
    title,
    subtitle: subtitle || null,
    slug,
    description: description || null,
    content,
    category_id: categoryId,
    cover_image_url: coverImageUrl || null,
    cover_image_alt: coverImageAlt || null,
    cover_image_note: coverImageNote || null,
    author_name: authorName || null,
    status,
    is_featured: isFeatured,
    published_at:
      status === "published" ? (publishedAt ?? new Date().toISOString()) : null,
  };

  try {
    const { error } = id
      ? await supabase.from("blogs").update(payload).eq("id", id)
      : await supabase.from("blogs").insert(payload);

    if (error) {
      if (isUniqueViolation(error)) {
        return {
          status: "error",
          message: "That URL slug is already in use. Choose another one.",
        };
      }

      console.error("Failed to save blog:", error.message);

      return {
        status: "error",
        message: "The blog could not be saved. Check your admin access and try again.",
      };
    }
  } catch {
    return {
      status: "error",
      message: "The blog could not be saved. Check your connection and try again.",
    };
  }

  revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  redirect("/admin/blogs");
}
