export const siteConfig = {
  name: "TechHelp",
  description: "Clear, practical help for everyday tech problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type SiteConfig = typeof siteConfig;
