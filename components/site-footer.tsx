import Link from "next/link";

import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/config";
import { footerNavigation, type NavItem } from "@/lib/navigation";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly NavItem[];
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {siteConfig.tagline}.
            </p>
          </div>

          <FooterColumn
            title="Categories"
            links={footerNavigation.categories}
          />
          <FooterColumn title="Company" links={footerNavigation.company} />
          <FooterColumn title="Legal" links={footerNavigation.legal} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs">
            Independent tech support guides, written for real people.
          </p>
        </div>
      </div>
    </footer>
  );
}
