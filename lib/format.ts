import { siteConfig } from "@/lib/config";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
  timeZoneName: "short",
});

export function formatDate(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return dateFormatter.format(date);
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return dateTimeFormatter.format(date);
}

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(value: string, max = 160) {
  if (value.length <= max) {
    return value;
  }

  const cut = value.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const shortened = lastSpace > max * 0.4 ? cut.slice(0, lastSpace) : cut;

  return `${shortened.trimEnd()}…`;
}

export function getReadingTime(
  content: string | null | undefined,
  wordsPerMinute = 220,
) {
  const text = stripHtml(content ?? "");
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function readingTimeLabel(content: string | null | undefined) {
  return `${getReadingTime(content)} min read`;
}

export function absoluteUrl(path: string) {
  try {
    return new URL(path, siteConfig.url).toString();
  } catch {
    return path;
  }
}

export function parsePage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "1", 10);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function firstParam(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() || "";
}

export function sanitizeSearchTerm(value: string) {
  return value
    .replace(/[%_,()\\"]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}
