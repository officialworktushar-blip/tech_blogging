import type { Metadata } from "next";
import { Suspense } from "react";

import { BlogEditor } from "@/components/admin/blog-editor";
import { getCategories } from "@/lib/data";

import { getAdminBlog } from "../data";

export const metadata: Metadata = {
  title: "Edit Blog",
};

type EditBlogPageProps = {
  params: Promise<{ id: string }>;
};

export default function EditBlogPage({ params }: EditBlogPageProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Edit Blog
        </h1>
        <p className="mt-1 text-sm text-muted">
          Update the article, its metadata, or publishing status.
        </p>
      </header>

      <Suspense fallback={<EditorSkeleton />}>
        <EditBlogContent params={params} />
      </Suspense>
    </div>
  );
}

async function EditBlogContent({ params }: EditBlogPageProps) {
  const { id } = await params;
  const [blog, categories] = await Promise.all([
    getAdminBlog(id),
    getCategories(),
  ]);

  if (!blog) {
    return (
      <div className="mt-6 rounded-lg border border-line bg-background p-6">
        <h2 className="font-serif text-lg font-bold text-foreground">
          Article not found
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          This article may have been removed, or it could not be loaded. Return
          to the blog list and try again.
        </p>
      </div>
    );
  }

  return <BlogEditor blog={blog} categories={categories} />;
}

function EditorSkeleton() {
  return (
    <div role="status" className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <span className="sr-only">Loading editor…</span>
      <div aria-hidden="true" className="space-y-6">
        <div className="animate-pulse rounded-lg border border-line bg-background p-6">
          <div className="h-5 w-32 rounded bg-surface" />
          <div className="mt-5 h-11 w-full rounded bg-surface" />
          <div className="mt-4 h-11 w-full rounded bg-surface" />
          <div className="mt-4 h-24 w-full rounded bg-surface" />
        </div>
        <div className="animate-pulse rounded-lg border border-line bg-background p-6">
          <div className="h-5 w-24 rounded bg-surface" />
          <div className="mt-5 h-64 w-full rounded bg-surface" />
        </div>
      </div>
      <div aria-hidden="true" className="space-y-5">
        <div className="animate-pulse rounded-lg border border-line bg-background p-5">
          <div className="h-5 w-24 rounded bg-surface" />
          <div className="mt-4 h-11 w-full rounded bg-surface" />
          <div className="mt-4 h-11 w-full rounded bg-surface" />
        </div>
      </div>
    </div>
  );
}
