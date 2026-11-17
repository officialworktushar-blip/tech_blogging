import Link from "next/link";

import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoryChipsProps = {
  categories: Category[];
  activeSlug?: string | null;
  className?: string;
};

function chipClass(active: boolean) {
  return cn(
    "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
    active
      ? "border-accent bg-accent text-accent-foreground"
      : "border-line bg-background text-muted hover:border-accent hover:text-accent",
  );
}

export function CategoryChips({
  categories,
  activeSlug,
  className,
}: CategoryChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Link href="/blog" className={chipClass(!activeSlug)}>
        All articles
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/blog?category=${category.slug}`}
          className={chipClass(activeSlug === category.slug)}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
