import { FileText, Star } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";

import { formatDate } from "@/lib/format";

import { getAdminBlogs } from "./data";

export const metadata: Metadata = {
  title: "All Blogs",
};

export default function AdminBlogsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            All Blogs
          </h1>
          <p className="mt-1 text-sm text-muted">
            Every article in the library, published or draft.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
        >
          Add new blog
        </Link>
      </header>

      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList />
      </Suspense>
    </div>
  );
}

async function BlogList() {
  const { blogs, failed } = await getAdminBlogs();

  if (failed) {
    return (
      <div className="mt-6 rounded-lg border border-line bg-background p-6">
        <h2 className="font-serif text-lg font-bold text-foreground">
          Could not load blogs
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Check that Supabase is configured and that you are signed in as an
          administrator, then refresh this page.
        </p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-dashed border-line bg-background px-6 py-14 text-center">
        <FileText aria-hidden="true" className="mx-auto size-8 text-subtle" />
        <h2 className="mt-4 font-serif text-lg font-bold text-foreground">
          No articles yet
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          Add your first article, or run the seed SQL to load the starter
          library.
        </p>
        <Link
          href="/admin/blogs/new"
          className="mt-5 inline-flex items-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
        >
          Add new blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mt-6 text-sm text-muted">
        {blogs.length} article{blogs.length === 1 ? "" : "s"}.
      </p>

      <ul className="mt-4 divide-y divide-line rounded-lg border border-line bg-background">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="flex flex-wrap items-start justify-between gap-4 px-5 py-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/blogs/${blog.id}`}
                  className="truncate font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {blog.title}
                </Link>

                <span
                  className={
                    blog.status === "published"
                      ? "rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-strong"
                      : "rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-semibold text-muted"
                  }
                >
                  {blog.status === "published" ? "Published" : "Draft"}
                </span>

                {blog.is_featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-0.5 text-xs font-semibold text-muted">
                    <Star aria-hidden="true" className="size-3" />
                    Featured
                  </span>
                ) : null}
              </div>

              <p className="mt-1 truncate text-xs text-muted">
                /blog/{blog.slug} · {blog.category?.name ?? "Uncategorized"}
                {formatDate(blog.published_at ?? blog.created_at)
                  ? ` · ${formatDate(blog.published_at ?? blog.created_at)}`
                  : ""}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              {blog.status === "published" ? (
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-sm font-medium text-muted transition-colors hover:text-accent"
                >
                  View
                </Link>
              ) : null}
              <Link
                href={`/admin/blogs/${blog.id}`}
                className="inline-flex items-center rounded-md border border-line px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function BlogListSkeleton() {
  return (
    <div role="status" className="mt-6 space-y-3">
      <span className="sr-only">Loading blogs…</span>
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="animate-pulse rounded-lg border border-line bg-background p-5"
        >
          <div className="h-4 w-2/3 rounded bg-surface" />
          <div className="mt-3 h-3 w-1/2 rounded bg-surface" />
        </div>
      ))}
    </div>
  );
}
