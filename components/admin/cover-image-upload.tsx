"use client";

import { ImageUp, Loader2, Trash, Upload } from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";

import {
  deleteImageByUrl,
  uploadImage,
  validateImageFile,
  type UploadProgress,
} from "@/lib/uploadImage";
import { cn } from "@/lib/utils";

type CoverImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  onBusyChange?: (busy: boolean) => void;
  disabled?: boolean;
};

export function CoverImageUpload({
  value,
  onChange,
  onBusyChange,
  disabled = false,
}: CoverImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => onBusyChange?.(false);
  }, [onBusyChange]);

  function markBusy(next: boolean) {
    setBusy(next);
    onBusyChange?.(next);
  }

  async function handleFile(file: File | undefined) {
    if (!file || disabled || busy) {
      return;
    }

    setError(null);

    try {
      validateImageFile(file);
    } catch (validationError) {
      setError(
        validationError instanceof Error
          ? validationError.message
          : "Choose a JPG, PNG, or WebP image under 5 MB.",
      );
      return;
    }

    markBusy(true);
    setProgress({ phase: "validating", percent: 10 });

    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);

    try {
      const uploaded = await uploadImage(file, "covers", setProgress);
      const previousUrl = value;

      onChange(uploaded.url);

      if (previousUrl && previousUrl !== uploaded.url) {
        await deleteImageByUrl(previousUrl);
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "The image could not be uploaded. Try again.",
      );
      setLocalPreview(null);
    } finally {
      URL.revokeObjectURL(objectUrl);
      setLocalPreview(null);
      setProgress(null);
      markBusy(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  async function handleRemove() {
    if (!value || disabled || busy) {
      return;
    }

    setError(null);
    markBusy(true);

    try {
      await deleteImageByUrl(value);
      onChange("");
    } finally {
      markBusy(false);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    void handleFile(event.target.files?.[0]);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (!disabled && !busy) {
      setDragging(true);
    }
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    if (!disabled && !busy) {
      void handleFile(event.dataTransfer.files?.[0]);
    }
  }

  const previewUrl = localPreview ?? value ?? "";

  return (
    <div className="space-y-3" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        className="hidden"
        disabled={disabled || busy}
        onChange={handleInputChange}
        aria-label="Cover image file"
      />

      {previewUrl ? (
        <div
          className={cn(
            "relative aspect-[3/2] w-full overflow-hidden rounded-md border border-line bg-surface",
            dragging && "ring-2 ring-accent",
          )}
        >
          <Image
            src={previewUrl}
            alt="Cover image preview"
            fill
            unoptimized={previewUrl.startsWith("blob:")}
            sizes="(min-width: 1024px) 20rem, 100vw"
            className="object-cover"
          />

          {busy ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 text-xs font-semibold text-foreground">
              <Loader2 aria-hidden="true" className="size-5 animate-spin" />
              {progress?.phase === "uploading"
                ? `Uploading… ${progress.percent}%`
                : "Preparing image…"}
            </div>
          ) : null}

          {dragging ? (
            <div className="absolute inset-0 flex items-center justify-center bg-accent-soft/80 text-sm font-semibold text-accent-strong">
              Drop to replace this image
            </div>
          ) : null}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || busy}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line bg-surface/60 px-4 py-8 text-center transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-60",
            dragging && "border-accent bg-accent-soft/40",
          )}
        >
          {busy ? (
            <Loader2 aria-hidden="true" className="size-6 animate-spin text-accent" />
          ) : (
            <Upload aria-hidden="true" className="size-6 text-accent" />
          )}
          <span className="text-sm font-medium text-foreground">
            {busy ? "Preparing image…" : "Click to select or drag and drop an image"}
          </span>
          <span className="text-xs text-subtle">
            JPG, PNG, or WebP · up to 5 MB
          </span>
        </button>
      )}

      {busy ? (
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-surface"
          role="progressbar"
          aria-valuenow={progress?.percent ?? 10}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Image upload progress"
        >
          <div
            className="h-full bg-accent transition-all"
            style={{ width: `${progress?.percent ?? 10}%` }}
          />
        </div>
      ) : null}

      {previewUrl ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || busy}
            className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ImageUp aria-hidden="true" className="size-4" />
            Replace
          </button>
          <button
            type="button"
            onClick={() => void handleRemove()}
            disabled={disabled || busy}
            className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-red-300 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash aria-hidden="true" className="size-4" />
            Remove
          </button>
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="text-xs font-medium leading-relaxed text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
