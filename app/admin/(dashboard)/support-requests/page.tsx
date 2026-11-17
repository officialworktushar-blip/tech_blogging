import { Inbox, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

import { createClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/format";
import type { SupportRequest } from "@/lib/types";

export const metadata: Metadata = {
  title: "Support Requests",
};

export default function AdminSupportRequestsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Support Requests
        </h1>
        <p className="mt-1 text-sm text-muted">
          Messages submitted from the public contact form, newest first.
        </p>
      </header>

      <Suspense fallback={<SupportRequestsSkeleton />}>
        <SupportRequestsList />
      </Suspense>
    </div>
  );
}

async function SupportRequestsList() {
  const supabase = await createClient().catch(() => null);

  if (!supabase) {
    return (
      <Notice
        title="Supabase is not configured"
        message="Add the Supabase environment variables to .env.local, then reload this page."
      />
    );
  }

  let requests: SupportRequest[] = [];
  let total: number | null = null;
  let failed = false;

  try {
    const { data, error, count } = await supabase
      .from("support_requests")
      .select("id, name, email, category, message, created_at", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      failed = true;
    } else {
      requests = (data ?? []) as SupportRequest[];
      total = count;
    }
  } catch {
    failed = true;
  }

  if (failed) {
    return (
      <Notice
        title="Could not load support requests"
        message="Make sure supabase/schema_support.sql has been applied to this project, then refresh the page."
      />
    );
  }

  if (requests.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-dashed border-line bg-background px-6 py-14 text-center">
        <Inbox aria-hidden="true" className="mx-auto size-8 text-subtle" />
        <h2 className="mt-4 font-serif text-lg font-bold text-foreground">
          No support requests yet
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          Messages sent through the contact form will appear here.
        </p>
      </div>
    );
  }

  const requestTotal = total ?? requests.length;

  return (
    <>
      <p className="mt-6 text-sm text-muted">
        {requestTotal} request{requestTotal === 1 ? "" : "s"}
        {requestTotal > requests.length
          ? ` — showing the ${requests.length} most recent`
          : ""}
        .
      </p>

      <ul className="mt-4 space-y-4">
        {requests.map((request) => (
          <li
            key={request.id}
            className="rounded-lg border border-line bg-background p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-foreground">{request.name}</p>
                <a
                  href={`mailto:${request.email}`}
                  className="mt-0.5 inline-flex items-center gap-1.5 break-all text-sm text-accent transition-colors hover:text-accent-strong"
                >
                  <Mail aria-hidden="true" className="size-3.5 shrink-0" />
                  {request.email}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-strong">
                  {request.category}
                </span>
                <time
                  dateTime={request.created_at}
                  className="text-xs text-subtle"
                >
                  {formatDateTime(request.created_at) ?? "Unknown date"}
                </time>
              </div>
            </div>

            <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted">
              {request.message}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Notice({ title, message }: { title: string; message: string }) {
  return (
    <div className="mt-6 rounded-lg border border-line bg-background p-6">
      <h2 className="font-serif text-lg font-bold text-foreground">{title}</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">{message}</p>
    </div>
  );
}

function SupportRequestsSkeleton() {
  return (
    <div role="status" className="mt-6 space-y-4">
      <span className="sr-only">Loading support requests…</span>
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="animate-pulse rounded-lg border border-line bg-background p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="h-4 w-40 rounded bg-surface" />
            <div className="h-6 w-28 rounded-full bg-surface" />
          </div>
          <div className="mt-4 h-3 w-full rounded bg-surface" />
          <div className="mt-2 h-3 w-3/4 rounded bg-surface" />
        </div>
      ))}
    </div>
  );
}
