"use client";

import { ArrowRight, Check, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import {
  submitSupportRequest,
  type SupportFormState,
} from "@/app/contact-support/actions";
import { supportIssueCategories } from "@/lib/config";
import { cn } from "@/lib/utils";

const initialState: SupportFormState = { status: "idle" };

const fieldClass =
  "w-full rounded-md border border-line bg-background px-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-accent";
const labelClass = "block text-sm font-medium text-foreground";

export function SupportForm() {
  const [state, formAction, isPending] = useActionState(
    submitSupportRequest,
    initialState,
  );
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-accent/30 bg-accent-soft p-6"
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check aria-hidden="true" className="size-5" />
        </div>
        <h3 className="mt-4 font-serif text-xl font-bold tracking-tight text-foreground">
          Message received
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {state.message}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
          >
            Back to home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Browse the guides
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(
              fieldClass,
              "h-11",
              errors.name && "border-red-300 focus:border-red-500",
            )}
          />
          {errors.name ? (
            <p id="name-error" className="text-sm text-red-700">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={254}
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              fieldClass,
              "h-11",
              errors.email && "border-red-300 focus:border-red-500",
            )}
          />
          {errors.email ? (
            <p id="email-error" className="text-sm text-red-700">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="category" className={labelClass}>
          What do you need help with?
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue=""
          aria-invalid={errors.category ? true : undefined}
          aria-describedby={errors.category ? "category-error" : undefined}
          className={cn(
            fieldClass,
            "h-11",
            errors.category && "border-red-300 focus:border-red-500",
          )}
        >
          <option value="" disabled>
            Choose a topic
          </option>
          {supportIssueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category ? (
          <p id="category-error" className="text-sm text-red-700">
            {errors.category}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className={labelClass}>
          Describe the problem
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={7}
          placeholder="What happened, what you were trying to do, and any error message you saw. The more detail, the faster we can help."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            fieldClass,
            "min-h-40 resize-y py-3 leading-relaxed",
            errors.message && "border-red-300 focus:border-red-500",
          )}
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-red-700">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs leading-relaxed text-subtle">
          We only use your details to reply to this request.
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )}
          {isPending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
