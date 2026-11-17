"use client";

import {
  ExternalLink,
  FilePlus2,
  FileText,
  FolderTree,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type ReactNode } from "react";

import { signOut } from "@/app/admin/actions";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/config";
import { adminNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const navIcons: Record<string, LucideIcon> = {
  "/admin": LayoutDashboard,
  "/admin/blogs": FileText,
  "/admin/blogs/new": FilePlus2,
  "/admin/categories": FolderTree,
  "/admin/support-requests": Inbox,
};

function matchesPath(href: string, pathname: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navId = useId();

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const activeHref = adminNavigation.reduce<string | null>((current, item) => {
    if (!matchesPath(item.href, pathname)) {
      return current;
    }

    if (!current || item.href.length > current.length) {
      return item.href;
    }

    return current;
  }, null);

  const activeLabel =
    adminNavigation.find((item) => item.href === activeHref)?.label ?? "Admin";

  return (
    <div className="flex min-h-screen flex-1 bg-surface">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
        />
      ) : null}

      <aside
        id={navId}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line bg-background transition-transform lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Logo />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground lg:hidden"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav
          aria-label="Admin navigation"
          className="flex-1 space-y-1 overflow-y-auto p-3"
        >
          {adminNavigation.map((item) => {
            const Icon = navIcons[item.href] ?? FileText;
            const active = activeHref === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-soft text-accent-strong"
                    : "text-muted hover:bg-surface hover:text-foreground",
                )}
              >
                <Icon aria-hidden="true" className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-line p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            <ExternalLink aria-hidden="true" className="size-4" />
            View site
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-line bg-background/95 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              aria-controls={navId}
              className="inline-flex size-10 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-subtle">
                {siteConfig.name} Admin
              </p>
              <p className="text-sm font-semibold text-foreground">
                {activeLabel}
              </p>
            </div>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <LogOut aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
