import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ArticleCard, type ArticleCardProps } from "@/components/article-card";
import { cn, toSlug } from "@/lib/utils";

type CategorySectionProps = {
  title: string;
  href?: string;
  description?: string;
  articles: ArticleCardProps[];
  className?: string;
};

export function CategorySection({
  title,
  href,
  description,
  articles,
  className,
}: CategorySectionProps) {
  const headingId = `${toSlug(title)}-heading`;

  return (
    <section aria-labelledby={headingId} className={cn(className)}>
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-3 sm:mb-8">
        <div>
          <h2
            id={headingId}
            className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-1.5 pb-1 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
          >
            View all
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        ) : null}
      </div>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.href} {...article} />
        ))}
      </div>
    </section>
  );
}
