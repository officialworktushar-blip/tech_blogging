import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  paramName?: string;
  query?: Record<string, string | undefined>;
  className?: string;
};

type PageItem = number | "ellipsis-start" | "ellipsis-end";

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];

  if (currentPage > 3) {
    items.push("ellipsis-start");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (currentPage < totalPages - 2) {
    items.push("ellipsis-end");
  }

  items.push(totalPages);

  return items;
}

const itemBaseClass =
  "inline-flex h-11 min-w-11 items-center justify-center rounded-md border px-2 text-sm font-medium transition-colors";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  paramName = "page",
  query,
  className,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const hrefForPage = (page: number) => {
    const params = new URLSearchParams();

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value) {
          params.set(key, value);
        }
      }
    }

    if (page > 1) {
      params.set(paramName, String(page));
    }

    const search = params.toString();

    return search ? `${basePath}?${search}` : basePath;
  };

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center justify-center gap-1.5", className)}
    >
      {hasPrevious ? (
        <Link
          href={hrefForPage(currentPage - 1)}
          aria-label="Previous page"
          className={cn(
            itemBaseClass,
            "border-line bg-background text-foreground hover:border-accent hover:text-accent",
          )}
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={cn(
            itemBaseClass,
            "border-line/60 text-subtle",
          )}
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          <span className="sr-only">Previous page</span>
        </span>
      )}

      {getPageItems(currentPage, totalPages).map((item) => {
        if (typeof item !== "number") {
          return (
            <span
              key={item}
              aria-hidden="true"
              className="inline-flex h-11 min-w-8 items-center justify-center text-sm text-subtle"
            >
              &hellip;
            </span>
          );
        }

        const isCurrent = item === currentPage;

        if (isCurrent) {
          return (
            <span
              key={item}
              aria-current="page"
              className={cn(
                itemBaseClass,
                "border-accent bg-accent font-semibold text-accent-foreground",
              )}
            >
              {item}
            </span>
          );
        }

        return (
          <Link
            key={item}
            href={hrefForPage(item)}
            aria-label={`Page ${item}`}
            className={cn(
              itemBaseClass,
              "border-line bg-background text-foreground hover:border-accent hover:text-accent",
            )}
          >
            {item}
          </Link>
        );
      })}

      {hasNext ? (
        <Link
          href={hrefForPage(currentPage + 1)}
          aria-label="Next page"
          className={cn(
            itemBaseClass,
            "border-line bg-background text-foreground hover:border-accent hover:text-accent",
          )}
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={cn(
            itemBaseClass,
            "border-line/60 text-subtle",
          )}
        >
          <ChevronRight aria-hidden="true" className="size-4" />
          <span className="sr-only">Next page</span>
        </span>
      )}
    </nav>
  );
}
