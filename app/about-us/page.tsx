import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteShell } from "@/components/site-shell";
import { getCategories } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn who writes TechHelp, how our guides are researched, and why readers trust our practical tech support.",
  path: "/about-us",
});

const values = [
  {
    title: "Plain language first",
    description:
      "No jargon walls and no assumptions. If a term matters, we explain it in the same sentence.",
  },
  {
    title: "Steps you can follow",
    description:
      "Every guide is organized around actions, with the expected result at each stage so you know you are on track.",
  },
  {
    title: "Respect for your time",
    description:
      "We put the fix near the top, keep the background short, and tell you when a problem needs a professional.",
  },
];

const editorialSteps = [
  {
    title: "Start with the real problem",
    description:
      "We begin with the symptom people search for, not the feature list. That keeps every guide anchored to the thing that is actually broken.",
  },
  {
    title: "Test on current software",
    description:
      "Steps are checked against recent versions of Windows, common apps, and current security advice before they are published.",
  },
  {
    title: "Revisit when things change",
    description:
      "Menus move and settings get renamed. We review guides when updates make an old answer misleading.",
  },
];

const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Founder & Editor",
    initials: "AM",
    bio: "Sets the editorial standard and keeps every guide focused on the fix, not the theory.",
  },
  {
    name: "Priya Shah",
    role: "Windows & Devices Lead",
    initials: "PS",
    bio: "Turns messy Windows problems into short, repeatable steps that work on real machines.",
  },
  {
    name: "Daniel Kim",
    role: "Security & Accounts Lead",
    initials: "DK",
    bio: "Covers passkeys, account recovery, and the practical side of staying safe online.",
  },
];

const trustPoints = [
  "We try the steps ourselves before a guide goes live.",
  "We revisit articles when Windows, apps, or security advice changes.",
  "We recommend built-in tools before paid software.",
  "We say so when a fix is risky, temporary, or only works in some cases.",
  "We do not accept payment for positive coverage or rankings.",
];

export default async function AboutPage() {
  const categories = await getCategories();

  return (
    <SiteShell>
      <main className="container-page pb-16 pt-8 sm:pt-10 lg:pt-12">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
            About us
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Practical tech help, minus the jargon
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            TechHelp exists for the moment a device, app, or account stops
            behaving the way it should. We write clear, tested guides that take
            you from the error message to a working setup.
          </p>
        </header>

        <section
          aria-labelledby="mission-heading"
          className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
        >
          <div className="rounded-xl border border-line bg-background p-6 sm:p-8">
            <h2
              id="mission-heading"
              className="font-serif text-2xl font-bold tracking-tight text-foreground"
            >
              Our mission
            </h2>
            <div className="mt-3 space-y-3 text-base leading-relaxed text-muted">
              <p>
                Most tech advice is written for people who already know the
                answer. We write for everyone else: the person staring at an
                update that will not finish, a mailbox that stopped receiving
                mail, or a browser that suddenly feels slow.
              </p>
              <p>
                Our goal is simple. Explain what is happening, give you the
                shortest safe path to a fix, and leave you a little more
                confident the next time something breaks.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
              What we believe
            </h2>
            <ul className="mt-4 space-y-4">
              {values.map((value) => (
                <li key={value.title} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {value.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="coverage-heading"
          className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
        >
          <div className="max-w-2xl">
            <h2
              id="coverage-heading"
              className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              What we cover
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Our library is organized around the problems that interrupt
              everyday work, study, and family life.
            </p>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/${category.slug}`}
                  className="flex h-full flex-col rounded-lg border border-line bg-background p-5 transition-colors hover:border-accent"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {category.name}
                  </span>
                  <span className="mt-1 flex-1 text-sm leading-relaxed text-muted">
                    {category.description ??
                      "Practical, step-by-step help for common problems."}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Browse guides
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="editorial-heading"
          className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
        >
          <div className="max-w-2xl">
            <h2
              id="editorial-heading"
              className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              How we write a guide
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              A consistent process keeps our advice useful long after the
              problem that inspired it is solved.
            </p>
          </div>

          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {editorialSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-lg border border-line bg-surface/60 p-5"
              >
                <span className="font-serif text-2xl font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="team-heading"
          className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
        >
          <div className="max-w-2xl">
            <h2
              id="team-heading"
              className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              The team behind the guides
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              We are a small team of writers and support specialists. Every
              guide is edited by someone who has walked a first-time user
              through the same problem.
            </p>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <li
                key={member.name}
                className="rounded-lg border border-line bg-background p-5"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-accent-soft font-serif text-lg font-bold text-accent-strong"
                >
                  {member.initials}
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-accent">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="trust-heading"
          className="mt-14 grid gap-8 border-t border-line pt-10 sm:mt-16 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        >
          <div>
            <h2
              id="trust-heading"
              className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Why trust us
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Trust is earned in the details: accurate steps, honest
              limitations, and no pressure to buy something you do not need.
            </p>
            <Link
              href="/contact-support"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
            >
              Ask us a question
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <ul className="space-y-3 rounded-xl border border-line bg-surface/60 p-6">
            {trustPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check aria-hidden="true" className="size-3.5" />
                </span>
                <span className="text-sm leading-relaxed text-muted">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 rounded-lg border border-line bg-surface px-6 py-10 sm:mt-16 sm:px-10 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
              Still stuck?
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              We are happy to help.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Search the library for a walkthrough, or send us the details and
              we will point you toward the right fix.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex items-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
              >
                Search the guides
              </Link>
              <Link
                href="/contact-support"
                className="inline-flex items-center rounded-md border border-line bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Contact support
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
