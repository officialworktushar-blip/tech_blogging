"use client";

import { Check, Link2, Mail, Share2 } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ShareBarProps = {
  url: string;
  title: string;
  className?: string;
};

const actionClass =
  "inline-flex items-center gap-1.5 rounded-md border border-line bg-background px-3 py-2 text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent";

export function ShareBar({ url, title, className }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard access can be blocked; leave the state unchanged. */
    }
  };

  const nativeShare = async () => {
    if (typeof navigator.share !== "function") {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, url });
    } catch {
      /* The share sheet was dismissed. */
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-subtle">
        Share
      </span>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={actionClass}
      >
        X
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={actionClass}
      >
        Facebook
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={actionClass}
      >
        LinkedIn
      </a>

      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className={actionClass}
      >
        <Mail aria-hidden="true" className="size-3.5" />
        Email
      </a>

      <button type="button" onClick={copyLink} className={actionClass}>
        {copied ? (
          <Check aria-hidden="true" className="size-3.5" />
        ) : (
          <Link2 aria-hidden="true" className="size-3.5" />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>

      <button
        type="button"
        onClick={nativeShare}
        className={cn(actionClass, "sm:hidden")}
      >
        <Share2 aria-hidden="true" className="size-3.5" />
        Share
      </button>
    </div>
  );
}
