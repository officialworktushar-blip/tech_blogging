import slugify from "slugify";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function toSlug(value: string) {
  return slugify(value, { lower: true, strict: true, trim: true });
}
