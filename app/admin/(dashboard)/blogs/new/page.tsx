import type { Metadata } from "next";

import { BlogEditor } from "@/components/admin/blog-editor";
import { getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Add New Blog",
};

export default async function AdminNewBlogPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Add New Blog
        </h1>
        <p className="mt-1 text-sm text-muted">
          Create a new article for the help library.
        </p>
      </header>

      <BlogEditor categories={categories} />
    </div>
  );
}
