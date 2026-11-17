"use client";

import { NodeViewWrapper, type ReactNodeViewProps } from "@tiptap/react";
import { Loader2, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";

import { uploadImage } from "@/lib/uploadImage";

export function ImagePlaceholderView({
  node,
  updateAttributes,
  deleteNode,
  editor,
  getPos,
}: ReactNodeViewProps) {
  const description =
    typeof node.attrs.description === "string" ? node.attrs.description : "";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file?: File) => {
    if (!file || uploading) {
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uploaded = await uploadImage(file, "content");
      const from = getPos();

      if (typeof from === "number") {
        editor
          .chain()
          .focus()
          .deleteRange({ from, to: from + node.nodeSize })
          .setImage({ src: uploaded.url, alt: description })
          .run();
      } else {
        editor
          .chain()
          .focus()
          .deleteNode("imagePlaceholder")
          .setImage({ src: uploaded.url, alt: description })
          .run();
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "The image could not be uploaded. Try again.",
      );
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <NodeViewWrapper className="image-placeholder image-placeholder-node">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        className="hidden"
        aria-label="Upload an image for this placeholder"
        onChange={(event) => void handleUpload(event.target.files?.[0])}
      />
      <input
        type="text"
        value={description}
        aria-label="Image placeholder description"
        placeholder="Describe the screenshot, photo, or mockup needed here."
        onMouseDown={(event) => event.stopPropagation()}
        onChange={(event) =>
          updateAttributes({ description: event.target.value })
        }
        className="w-full max-w-xl rounded border border-line bg-background px-3 py-2 text-center text-sm text-foreground outline-none transition-colors focus:border-accent"
      />
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          disabled={uploading}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-md border border-line bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Upload aria-hidden="true" className="size-4" />
          )}
          {uploading ? "Uploading…" : "Upload image"}
        </button>
        <button
          type="button"
          disabled={uploading}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={() => deleteNode()}
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold text-subtle transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 aria-hidden="true" className="size-4" />
          Delete box
        </button>
      </div>
      {error ? (
        <p
          role="alert"
          className="mt-3 max-w-xl text-xs font-medium text-red-700"
        >
          {error}
        </p>
      ) : null}
    </NodeViewWrapper>
  );
}
