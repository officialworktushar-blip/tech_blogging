export type NavItem = {
  label: string;
  href: string;
};

export const helpCategories: readonly NavItem[] = [
  { label: "Windows Help", href: "/windows-help" },
  { label: "Software Help", href: "/software-help" },
  { label: "Email Help", href: "/email-help" },
  { label: "Internet Help", href: "/internet-help" },
  { label: "Security Help", href: "/security-help" },
];

export const mainNavigation: readonly NavItem[] = [
  { label: "Home", href: "/" },
  ...helpCategories,
  { label: "Blog", href: "/blog" },
  { label: "Contact Support+", href: "/contact-support" },
  { label: "About Us", href: "/about-us" },
];

export const footerNavigation = {
  categories: [
    ...helpCategories,
    { label: "Blog", href: "/blog" },
  ],
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Contact Support", href: "/contact-support" },
    { label: "Careers", href: "/careers" },
    { label: "Advertise", href: "/advertise" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Accessibility", href: "/accessibility" },
  ],
} as const satisfies Record<string, readonly NavItem[]>;
