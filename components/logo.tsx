import Link from "next/link";

import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  onClick?: () => void;
};

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-baseline font-serif text-2xl font-bold tracking-tight text-foreground",
        className,
      )}
    >
      {siteConfig.name}
      <span aria-hidden="true" className="text-accent">
        .
      </span>
    </Link>
  );
}
