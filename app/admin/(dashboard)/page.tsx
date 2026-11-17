import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";

import { getCategories } from "@/lib/data";

import { getAdminBlogs } from "./blogs/data";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted">
          Manage articles, categories, and incoming support requests from the
          sidebar.
        </p>
      </header>

      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      <section className="mt-6 rounded-lg border border-line bg-background p-6">
        <h2 className="font-serif text-xl font-bold text-foreground">
          Getting started
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Write a new article or review the existing blog list. Published
          articles appear on the public site immediately; drafts stay private.
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

async function DashboardStats() {
  const [{ blogs, failed }, categories] = await Promise.all([
    getAdminBlogs(),
    getCategories(),
  ]);

  const stats = [
    {
      label: "Published blogs",
      value: failed
        ? "—"
        : String(blogs.filter((blog) => blog.status === "published").length),
    },
    {
      label: "Drafts",
      value: failed
        ? "—"
        : String(blogs.filter((blog) => blog.status === "draft").length),
    },
    {
      label: "Categories",
      value: String(categories.length),
    },
  ];

  return (
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
  );
}

function DashboardStatsSkeleton() {
  return (
    <div role="status" className="mt-6 grid gap-4 sm:grid-cols-3">
      <span className="sr-only">Loading dashboard stats…</span>
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="animate-pulse rounded-lg border border-line bg-background p-5"
        >
          <div className="h-3 w-24 rounded bg-surface" />
          <div className="mt-3 h-8 w-16 rounded bg-surface" />
        </div>
      ))}
    </div>
  );
}
