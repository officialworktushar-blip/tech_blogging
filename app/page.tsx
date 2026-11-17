import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { type ArticleCardProps } from "@/components/article-card";
import { CategorySection } from "@/components/category-section";
import { HeroFeatured } from "@/components/hero-featured";

const windowsArticles: ArticleCardProps[] = [
  {
    title: "Windows Update is stuck? Get it moving again",
    href: "/windows-help/windows-update-stuck",
    excerpt:
      "A practical fix for stalled downloads, failed installs, and errors that keep coming back.",
    category: "Windows Help",
    categoryHref: "/windows-help",
    imagePlaceholder:
      "Image: Screenshot of Windows 11 Settings > Windows Update showing a stalled progress bar.",
  },
  {
    title: "Free up disk space in Windows 11 without deleting your files",
    href: "/windows-help/free-up-disk-space",
    excerpt:
      "Use Storage Sense, built-in cleanup tools, and a few safe manual checks to reclaim space.",
    category: "Windows Help",
    categoryHref: "/windows-help",
    imagePlaceholder:
      "Image: Screenshot of Windows 11 Storage settings with the cleanup recommendations panel visible.",
  },
  {
    title: "Set up a new Windows PC the right way",
    href: "/windows-help/new-pc-setup",
    excerpt:
      "A short checklist for updates, accounts, backups, and privacy settings before you install anything else.",
    category: "Windows Help",
    categoryHref: "/windows-help",
    imagePlaceholder:
      "Image: Photo-style mockup of a new laptop on a desk beside a setup checklist.",
  },
];

const securityArticles: ArticleCardProps[] = [
  {
    title: "Create a passkey and stop typing passwords",
    href: "/security-help/create-a-passkey",
    excerpt:
      "Passkeys are faster and safer than passwords. Here is how to set one up on the accounts you use most.",
    category: "Security Help",
    categoryHref: "/security-help",
    imagePlaceholder:
      "Image: Screenshot of a browser passkey setup prompt with the fingerprint icon highlighted.",
  },
  {
    title: "The two-factor methods worth using in 2026",
    href: "/security-help/two-factor-methods",
    excerpt:
      "Not every second factor is equally strong. Compare authenticator apps, security keys, and text codes.",
    category: "Security Help",
    categoryHref: "/security-help",
    imagePlaceholder:
      "Image: Flat illustration comparing a security key, an authenticator app, and an SMS code.",
  },
  {
    title: "What to do if you clicked a suspicious link",
    href: "/security-help/clicked-a-suspicious-link",
    excerpt:
      "Close the tab, check your sessions, and change the right passwords first. A calm, step-by-step cleanup.",
    category: "Security Help",
    categoryHref: "/security-help",
    imagePlaceholder:
      "Image: Browser warning page mockup with a suspicious link and a red warning banner.",
  },
];

const softwareArticles: ArticleCardProps[] = [
  {
    title: "Restore a Microsoft Office license after a PC reset",
    href: "/software-help/restore-office-license",
    excerpt:
      "Reinstall Office, sign in with the right account, and clear the license error that blocks activation.",
    category: "Software Help",
    categoryHref: "/software-help",
    imagePlaceholder:
      "Image: Screenshot of the Microsoft 365 account page with the install button visible.",
  },
  {
    title: "The safe way to remove stubborn software",
    href: "/software-help/remove-stubborn-software",
    excerpt:
      "When the normal uninstaller fails, use these safe built-in tools before reaching for a third-party cleaner.",
    category: "Software Help",
    categoryHref: "/software-help",
    imagePlaceholder:
      "Image: Screenshot of Windows Installed apps settings with an app selected for uninstall.",
  },
  {
    title: "10 built-in Windows tools you should be using",
    href: "/software-help/built-in-windows-tools",
    excerpt:
      "Skip the downloads. These free utilities already handle screenshots, storage, focus, and more.",
    category: "Software Help",
    categoryHref: "/software-help",
    imagePlaceholder:
      "Image: Grid of Windows tool icons including Snipping Tool, Storage Sense, and Focus assist.",
  },
];

export default function Home() {
  return (
    <main className="container-page pb-16 pt-8 sm:pt-10 lg:pt-12">
      <HeroFeatured
        headingLevel="h1"
        title="How to spot a phishing email before you click it"
        href="/security-help/spot-phishing-email"
        excerpt="Scammers leave small clues in the sender address, the greeting, and the link itself. Here is a two-minute routine that catches them."
        category="Security Help"
        categoryHref="/security-help"
        imagePlaceholder="Image: Annotated screenshot of a phishing email with the sender address, greeting, and link callouts highlighted."
      />

      <CategorySection
        title="Windows Help"
        href="/windows-help"
        description="Step-by-step fixes for the most common Windows headaches."
        articles={windowsArticles}
        className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
      />

      <CategorySection
        title="Security Help"
        href="/security-help"
        description="Simple habits and clear instructions for staying safe online."
        articles={securityArticles}
        className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
      />

      <CategorySection
        title="Software Help"
        href="/software-help"
        description="Install, restore, and get more from the software you already own."
        articles={softwareArticles}
        className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
      />

      <section className="mt-14 rounded-lg border border-line bg-surface px-6 py-10 sm:mt-16 sm:px-10 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Still stuck?
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Tell us what is going wrong.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Send us the error message, the app you are using, and what you have
            already tried. We will point you to the right guide.
          </p>
          <Link
            href="/contact-support"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
          >
            Contact support
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
