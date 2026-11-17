"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { deleteImageByUrl, extractStoredImageUrls } from "@/lib/uploadImage";
import { cn } from "@/lib/utils";

type DeleteBlogButtonProps = {
  id: string;
  title: string;
  coverUrl?: string | null;
  content?: string | null;
  redirectAfterDelete?: boolean;
  className?: string;
};

export function DeleteBlogButton({
  id,
  title,
  coverUrl,
  content,
  redirectAfterDelete = false,
  className,
}: DeleteBlogButtonProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (busy) {
      return;
    }

    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setBusy(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw deleteError;
      }

      const imageUrls = [coverUrl, ...extractStoredImageUrls(content)].filter(
        (url): url is string => Boolean(url),
      );

      await Promise.allSettled(imageUrls.map((url) => deleteImageByUrl(url)));

      router.refresh();

      if (redirectAfterDelete) {
        router.push("/admin/blogs");
      }
    } catch (deleteError) {
      console.warn("Could not delete blog:", deleteError);
      setError("The article could not be deleted. Check your admin access.");
      setBusy(false);
      return;
    }

    setBusy(false);
  }

  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      <button
        type="button"
        onClick={() => void handleDelete()}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm font-semibold text-muted transition-colors hover:border-red-300 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash aria-hidden="true" className="size-4" />
        {busy ? "Deleting…" : "Delete"}
      </button>

      {error ? (
        <span role="alert" className="text-xs font-medium text-red-700">
          {error}
        </span>
      ) : null}
    </div>
  );
}
