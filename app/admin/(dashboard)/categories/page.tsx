import { FolderTree } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default function AdminCategoriesPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <header>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Categories
        </h1>
        <p className="mt-1 text-sm text-muted">
          Windows Help, Software Help, Email Help, Internet Help, and Security
          Help are seeded in Supabase.
        </p>
      </header>

      <div className="mt-6 rounded-lg border border-line bg-background p-6">
        <div className="flex items-start gap-3">
          <FolderTree aria-hidden="true" className="mt-0.5 size-5 text-accent" />
          <div>
            <h2 className="font-serif text-lg font-bold text-foreground">
              Category management coming next
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Create, rename, and reorder categories once the blog tools are
              wired up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
