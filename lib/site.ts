export const site = {
  name: "Ambrosia Wellness",
  description:
    "Writing about movement, food and rest for people with full lives, and a community for anyone thinking it through alongside us.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
};

export const CATEGORIES = ["Movement", "Food", "Recovery", "Mindset", "Community"] as const;
export type Category = (typeof CATEGORIES)[number];

export function categorySlug(category: string) {
  return category.toLowerCase();
}

export function categoryFromSlug(slug: string | undefined): Category | undefined {
  if (!slug) return undefined;
  return CATEGORIES.find((c) => categorySlug(c) === slug.toLowerCase());
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
