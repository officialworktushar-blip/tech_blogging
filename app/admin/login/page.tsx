import { ArrowLeft, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/logo";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-line bg-background p-6 shadow-sm sm:p-8">
        <Logo />

        <div className="mt-8 flex items-center gap-2 text-accent">
          <ShieldCheck aria-hidden="true" className="size-5" />
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em]">
            Admin access
          </p>
        </div>

        <h1 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground">
          Sign in to the dashboard
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Use your administrator account to manage articles, categories, and
          the blog.
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to site
        </Link>
      </div>
    </main>
  );
}
