import Image from "next/image";
import Link from "next/link";

import { ImagePlaceholder } from "@/components/image-placeholder";
import { cn } from "@/lib/utils";

export type ArticleCardProps = {
  title: string;
  href: string;
  excerpt?: string;
  category?: string;
  categoryHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePlaceholder?: string;
  preload?: boolean;
  className?: string;
};

export function ArticleCard({
  title,
  href,
  excerpt,
  category,
  categoryHref,
  imageSrc,
  imageAlt,
  imagePlaceholder,
  preload = false,
  className,
}: ArticleCardProps) {
  return (
    <article className={cn("group flex h-full flex-col", className)}>
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden rounded-md"
      >
        {imageSrc ? (
          <div className="relative aspect-[3/2] overflow-hidden rounded-md border border-line bg-surface">
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              preload={preload}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <ImagePlaceholder
            label={imagePlaceholder ?? `Image: ${title}`}
          />
        )}
      </Link>

      <div className="mt-4 flex flex-1 flex-col items-start">
        {category ? (
          categoryHref ? (
            <Link
              href={categoryHref}
              className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-strong"
            >
              {category}
            </Link>
          ) : (
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent">
              {category}
            </span>
          )
        ) : null}

        <h3 className="mt-2 font-serif text-xl font-bold leading-snug tracking-tight text-foreground">
          <Link
            href={href}
            className="decoration-accent/50 underline-offset-4 transition-colors group-hover:text-accent group-hover:underline"
          >
            {title}
          </Link>
        </h3>

        {excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
            {excerpt}
          </p>
        ) : null}
      </div>
    </article>
  );
}
