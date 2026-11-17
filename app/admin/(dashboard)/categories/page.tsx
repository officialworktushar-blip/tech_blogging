import { FolderTree } from "lucide-react";
import type { Metadata } from "next";

import { getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-3xl">
      <header>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Categories
        </h1>
        <p className="mt-1 text-sm text-muted">
          Categories organize the public help library and keep article URLs
          stable.
        </p>
      </header>

      <div className="mt-6 rounded-lg border border-line bg-background p-6">
        <div className="flex items-start gap-3">
          <FolderTree aria-hidden="true" className="mt-0.5 size-5 text-accent" />
          <div>
            <h2 className="font-serif text-lg font-bold text-foreground">
              Managed in Supabase
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Category names and slugs are edited directly in the Supabase
              Table Editor. Changing a slug changes its public URL, so update
              internal links if you rename one.
            </p>
          </div>
        </div>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="rounded-lg border border-line bg-background p-5"
          >
            <p className="font-semibold text-foreground">{category.name}</p>
            <p className="mt-1 text-xs font-medium text-accent">
              /{category.slug}
            </p>
            {category.description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {category.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      {categories.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-line bg-surface px-5 py-8 text-center text-sm text-muted">
          No categories found. Add them in the Supabase Table Editor, then
          reload this page.
        </p>
      ) : null}
    </div>
  );
}
