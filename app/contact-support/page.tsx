import { ArrowRight, Clock, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteShell } from "@/components/site-shell";
import { SupportForm } from "@/components/support-form";
import { supportConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Support",
  description:
    "Ask the TechHelp team for help with Windows, software, email, internet, or security problems.",
  path: "/contact-support",
});

export default function ContactSupportPage() {
  return (
    <SiteShell>
      <main className="container-page pb-16 pt-8 sm:pt-10 lg:pt-12">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Contact Support" }]}
        />

        <header className="mt-6 max-w-2xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Support
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact Support+
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            Tell us what is going wrong and we will point you in the right
            direction. Real people read every message.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
          <section
            aria-labelledby="support-form-heading"
            className="rounded-xl border border-line bg-background p-5 shadow-sm sm:p-6 lg:p-8"
          >
            <h2
              id="support-form-heading"
              className="font-serif text-2xl font-bold tracking-tight text-foreground"
            >
              Send us a message
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Share as much detail as you can: the device or app, what you were
              trying to do, and the exact error text if there is one.
            </p>

            <div className="mt-6">
              <SupportForm />
            </div>
          </section>

          <aside className="space-y-5">
            <section
              aria-labelledby="contact-details-heading"
              className="rounded-xl border border-line bg-surface p-5 sm:p-6"
            >
              <h2
                id="contact-details-heading"
                className="font-serif text-lg font-bold tracking-tight text-foreground"
              >
                Contact details
              </h2>

              <ul className="mt-5 space-y-5">
                <li className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Mail aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-subtle">
                      Email
                    </p>
                    <a
                      href={`mailto:${supportConfig.email}`}
                      className="mt-1 block break-all text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
                    >
                      {supportConfig.email}
                    </a>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Phone aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-subtle">
                      Phone
                    </p>
                    <a
                      href={supportConfig.phoneHref}
                      className="mt-1 block text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
                    >
                      {supportConfig.phone}
                    </a>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Clock aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-subtle">
                      Hours
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground">
                      {supportConfig.hours}
                    </p>
                  </div>
                </li>
              </ul>

              <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                {supportConfig.responseNote}
              </p>
            </section>

            <section className="rounded-xl border border-line bg-background p-5 sm:p-6">
              <h2 className="font-serif text-lg font-bold tracking-tight text-foreground">
                Looking for a quick answer?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Many common problems already have a step-by-step guide. Search
                the library before you write to us.
              </p>
              <div className="mt-4 space-y-2">
                <Link
                  href="/search"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
                >
                  Search the help library
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
                >
                  Browse all articles
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </SiteShell>
  );
}
