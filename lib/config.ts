export const siteConfig = {
  name: "TechHelp",
  tagline: "Practical tech help, minus the jargon",
  description: "Clear, practical help for everyday tech problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type SiteConfig = typeof siteConfig;

export const supportConfig = {
  email: "support@techhelp.example",
  phone: "+1 (555) 010-2030",
  phoneHref: "tel:+15550102030",
  hours: "Monday–Friday, 9:00am–5:00pm (Eastern)",
  responseNote: "We usually reply within one business day.",
} as const;

export type SupportConfig = typeof supportConfig;

export const supportIssueCategories = [
  "Windows",
  "Software",
  "Email",
  "Internet",
  "Security",
  "Website feedback",
  "Something else",
] as const;
