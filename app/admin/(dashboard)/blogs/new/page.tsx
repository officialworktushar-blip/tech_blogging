import { PenLine } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Blog",
};

export default function AdminNewBlogPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <header>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Add New Blog
        </h1>
        <p className="mt-1 text-sm text-muted">
          Create a new article for the help library.
        </p>
      </header>

      <div className="mt-6 rounded-lg border border-line bg-background p-6">
        <div className="flex items-start gap-3">
          <PenLine aria-hidden="true" className="mt-0.5 size-5 text-accent" />
          <div>
            <h2 className="font-serif text-lg font-bold text-foreground">
              Editor coming next
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              This page will host the title, slug, category, status, excerpt,
              and rich-text content fields.
            </p>
          </div>
        </div>
        <Link
          href="/admin/blogs"
          className="mt-5 inline-flex items-center rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Back to all blogs
        </Link>
      </div>
    </div>
  );
}
