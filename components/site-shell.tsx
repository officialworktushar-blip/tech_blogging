import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <SiteHeader />

      <div
        id="main-content"
        tabIndex={-1}
        className="flex-1 scroll-mt-28 outline-none"
      >
        {children}
      </div>

      <SiteFooter />
    </>
  );
}
