import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, categorySlug, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date;
  return [
    { url: site.url, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/essays`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/journal`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...CATEGORIES.map((c) => ({
      url: `${site.url}/journal?category=${categorySlug(c)}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
    ...posts.map((p) => ({
      url: `${site.url}/journal/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
