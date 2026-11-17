import { ArticleCard, type ArticleCardProps } from "@/components/article-card";
import { cn } from "@/lib/utils";

type ArticleGridProps = {
  articles: ArticleCardProps[];
  className?: string;
};

export function ArticleGrid({ articles, className }: ArticleGridProps) {
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {articles.map((article) => (
        <ArticleCard key={article.href} {...article} />
      ))}
    </div>
  );
}
