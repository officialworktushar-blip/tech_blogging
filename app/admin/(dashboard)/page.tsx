import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const stats = [
  { label: "Published blogs", value: "0" },
  { label: "Drafts", value: "0" },
  { label: "Categories", value: "5" },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted">
          An overview of your help library. Publishing tools are coming next.
        </p>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-line bg-background p-5"
          >
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-subtle">
              {stat.label}
            </p>
            <p className="mt-2 font-serif text-3xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-lg border border-line bg-background p-6">
        <h2 className="font-serif text-xl font-bold text-foreground">
          Getting started
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Write a new article or review the existing blog list. Categories are
          managed separately.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
          >
            Add new blog
          </Link>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            All blogs
          </Link>
        </div>
      </section>
    </div>
  );
}
