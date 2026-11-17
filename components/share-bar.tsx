"use client";

import { Check, Link2, Share2 } from "lucide-react";
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
      <button type="button" onClick={nativeShare} className={actionClass}>
        <Share2 aria-hidden="true" className="size-3.5" />
        Share
      </button>

      <button type="button" onClick={copyLink} className={actionClass}>
        {copied ? (
          <Check aria-hidden="true" className="size-3.5" />
        ) : (
          <Link2 aria-hidden="true" className="size-3.5" />
        )}
        Copy
      </button>
    </div>
  );
}
