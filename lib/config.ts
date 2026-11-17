export const siteConfig = {
  name: "TechHelp",
  tagline: "Practical tech help, minus the jargon",
  description: "Clear, practical help for everyday tech problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type SiteConfig = typeof siteConfig;
