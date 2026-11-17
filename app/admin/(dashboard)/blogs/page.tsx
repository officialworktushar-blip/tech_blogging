import { FileText } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

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

      <div className="mt-6 rounded-lg border border-dashed border-line bg-background px-6 py-14 text-center">
        <FileText aria-hidden="true" className="mx-auto size-8 text-subtle" />
        <h2 className="mt-4 font-serif text-lg font-bold text-foreground">
          No articles yet
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          Once the blog editor is connected, your articles will appear here.
        </p>
      </div>
    </div>
  );
}
