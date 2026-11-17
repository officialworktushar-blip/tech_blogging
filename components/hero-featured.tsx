import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ImagePlaceholder } from "@/components/image-placeholder";
import { cn, toSlug } from "@/lib/utils";

type HeroFeaturedProps = {
  title: string;
  href: string;
  excerpt?: string;
  category?: string;
  categoryHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePlaceholder?: string;
  badge?: string;
  headingLevel?: "h1" | "h2";
  priority?: boolean;
  className?: string;
};

export function HeroFeatured({
  title,
  href,
  excerpt,
  category,
  categoryHref,
  imageSrc,
  imageAlt,
  imagePlaceholder,
  badge = "Featured guide",
  headingLevel = "h2",
  priority = true,
  className,
}: HeroFeaturedProps) {
  const Heading = headingLevel;
  const headingId = `${toSlug(title)}-featured-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12",
        className,
      )}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="group block overflow-hidden rounded-lg"
      >
        {imageSrc ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-surface">
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <ImagePlaceholder
            ratio="wide"
            label={imagePlaceholder ?? `Image: ${title}`}
          />
        )}
      </Link>

      <div className="max-w-xl">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
          {badge}
          {category ? (
            <span className="text-muted">
              <span aria-hidden="true"> · </span>
              {categoryHref ? (
                <Link
                  href={categoryHref}
                  className="transition-colors hover:text-accent"
                >
                  {category}
                </Link>
              ) : (
                category
              )}
            </span>
          ) : null}
        </p>

        <Heading
          id={headingId}
          className="mt-3 font-serif text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          <Link
            href={href}
            className="decoration-accent/50 underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {title}
          </Link>
        </Heading>

        {excerpt ? (
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {excerpt}
          </p>
        ) : null}

        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
        >
          Read the guide
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
