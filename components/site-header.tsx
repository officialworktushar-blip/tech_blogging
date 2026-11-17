"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Logo } from "@/components/logo";
import { mainNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isActivePath(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const searchId = useId();
  const searchInputId = useId();

  useEffect(() => {
    if (!mobileOpen && !searchOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }

      if (searchOpen) {
        setSearchOpen(false);
        searchButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileOpen(false);
      }
    };

    desktopQuery.addEventListener("change", handleChange);

    return () => desktopQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleSearch = () => {
    setSearchOpen((open) => !open);
    setMobileOpen(false);
  };

  const toggleMenu = () => {
    setMobileOpen((open) => !open);
    setSearchOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);
  const closeAll = () => {
    setMobileOpen(false);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Logo onClick={closeAll} />

        <div className="flex items-center gap-1">
          <button
            ref={searchButtonRef}
            type="button"
            onClick={toggleSearch}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            aria-controls={searchOpen ? searchId : undefined}
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface hover:text-accent"
          >
            {searchOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Search aria-hidden="true" className="size-5" />
            )}
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMenu}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? menuId : undefined}
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface hover:text-accent lg:hidden"
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div id={searchId} className="border-t border-line bg-background">
          <div className="container-page py-4">
            <form
              role="search"
              action="/search"
              method="get"
              className="flex items-center gap-2"
            >
              <label htmlFor={searchInputId} className="sr-only">
                Search help guides
              </label>
              <input
                id={searchInputId}
                name="q"
                type="search"
                autoFocus
                enterKeyHint="search"
                placeholder="Search help guides"
                className="h-11 w-full rounded-md border border-line bg-surface px-4 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:bg-background"
              />
              <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <nav aria-label="Main navigation" className="hidden border-t border-line lg:block">
        <div className="container-page flex h-12 items-stretch gap-7">
          {mainNavigation.map((item) => {
            const active = isActivePath(item.href, pathname);
            const isSupport = item.href === "/contact-support";

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center border-b-2 border-transparent text-[0.8125rem] font-medium tracking-wide text-foreground/75 transition-colors hover:border-accent/30 hover:text-accent",
                  active && "border-accent text-accent",
                  isSupport && "font-semibold text-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id={menuId}
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-background lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="container-page py-3">
            <ul className="flex flex-col gap-1">
              {mainNavigation.map((item) => {
                const active = isActivePath(item.href, pathname);
                const isSupport = item.href === "/contact-support";

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center rounded-md px-3 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-accent-soft text-accent"
                          : "text-foreground/80 hover:bg-surface hover:text-accent",
                        isSupport && !active && "text-accent",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
