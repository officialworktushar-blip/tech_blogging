"use client";

import { createClient } from "@/lib/supabase/client";

export const IMAGE_BUCKET = "blog-images";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 0.85;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export type UploadFolder = "covers" | "content";

export type UploadProgress = {
  phase: "validating" | "resizing" | "uploading" | "done";
  percent: number;
};

export type UploadedImage = {
  url: string;
  path: string;
};

function randomSuffix() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().slice(0, 8);
  }

  return Math.random().toString(36).slice(2, 10);
}

function extensionFromFile(name: string) {
  const extension = name.split(".").pop()?.toLowerCase();

  if (extension === "jpeg") {
    return "jpg";
  }

  return extension === "jpg" || extension === "png" || extension === "webp"
    ? extension
    : "webp";
}

function extensionFromBlob(blob: Blob, fallbackName: string) {
  if (blob.type === "image/jpeg") {
    return "jpg";
  }

  if (blob.type === "image/png") {
    return "png";
  }

  if (blob.type === "image/webp") {
    return "webp";
  }

  return extensionFromFile(fallbackName);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("The image could not be read."));
    image.src = src;
  });
}

export function validateImageFile(file: File) {
  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    throw new Error("Only JPG, PNG, and WebP images are supported.");
  }

  if (file.size === 0) {
    throw new Error("That file is empty. Choose another image.");
  }

  if (file.size > MAX_FILE_BYTES) {
    throw new Error("That image is larger than 5 MB. Choose a smaller file.");
  }
}

export async function resizeAndConvert(
  file: File,
  onProgress?: (progress: UploadProgress) => void,
): Promise<Blob> {
  onProgress?.({ phase: "resizing", percent: 35 });

  try {
    const objectUrl = URL.createObjectURL(file);

    try {
      const image = await loadImage(objectUrl);
      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;

      if (!naturalWidth || !naturalHeight) {
        return file;
      }

      const scale = Math.min(1, MAX_WIDTH / naturalWidth);
      const width = Math.max(1, Math.round(naturalWidth * scale));
      const height = Math.max(1, Math.round(naturalHeight * scale));
      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (!context) {
        return file;
      }

      context.drawImage(image, 0, 0, width, height);

      const converted = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/webp", WEBP_QUALITY);
      });

      return converted && converted.size > 0 ? converted : file;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {
    return file;
  }
}

export async function uploadImage(
  file: File,
  folder: UploadFolder,
  onProgress?: (progress: UploadProgress) => void,
): Promise<UploadedImage> {
  onProgress?.({ phase: "validating", percent: 10 });

  validateImageFile(file);

  const blob = await resizeAndConvert(file, onProgress);
  const path = `${folder}/${Date.now()}-${randomSuffix()}.${extensionFromBlob(
    blob,
    file.name,
  )}`;

  onProgress?.({ phase: "uploading", percent: 70 });

  let supabase: ReturnType<typeof createClient>;

  try {
    supabase = createClient();
  } catch {
    throw new Error(
      "Supabase is not configured. Add the environment variables and try again.",
    );
  }

  try {
    const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, blob, {
      contentType: blob.type || file.type,
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.warn("Image upload failed:", error);
    throw new Error(
      "The image could not be uploaded. Check your connection and admin access, then try again.",
    );
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);

  onProgress?.({ phase: "done", percent: 100 });

  return { url: data.publicUrl, path };
}

export function storagePathFromPublicUrl(publicUrl: string | null | undefined) {
  if (!publicUrl) {
    return null;
  }

  try {
    const url = new URL(publicUrl);
    const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
    const index = url.pathname.indexOf(marker);

    if (index === -1) {
      return null;
    }

    const path = url.pathname.slice(index + marker.length);

    return path ? decodeURIComponent(path) : null;
  } catch {
    return null;
  }
}

export async function deleteImageByPath(path: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.storage.from(IMAGE_BUCKET).remove([path]);

    if (error) {
      console.warn("Could not delete an old image:", error.message);
    }
  } catch (error) {
    console.warn("Could not delete an old image:", error);
  }
}

export async function deleteImageByUrl(publicUrl: string | null | undefined) {
  const path = storagePathFromPublicUrl(publicUrl);

  if (path) {
    await deleteImageByPath(path);
  }
}

export function extractStoredImageUrls(html: string | null | undefined) {
  if (!html) {
    return [];
  }

  const urls = new Set<string>();

  for (const match of html.matchAll(/src\s*=\s*["']([^"']+)["']/gi)) {
    const candidate = match[1];

    if (candidate && storagePathFromPublicUrl(candidate)) {
      urls.add(candidate);
    }
  }

  return Array.from(urls);
}
