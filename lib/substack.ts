import "server-only";
import { XMLParser } from "fast-xml-parser";

/**
 * Substack integration. Essays are read from the publication's RSS feed and
 * cached for an hour, so new posts appear on the site without a redeploy.
 *
 * Defaults to philipambrose.substack.com; set SUBSTACK_PUBLICATION_URL to
 * override (e.g. a custom domain). Until the feed has posts, the site shows a
 * "follow along" state instead of an empty list.
 */
export const substack = {
  profileUrl: "https://substack.com/@philipambrose",
  publicationUrl: (process.env.SUBSTACK_PUBLICATION_URL || "https://philipambrose.substack.com").replace(/\/+$/, ""),
};

/** Where "Subscribe on Substack" links point. */
export const substackSubscribeUrl = `${substack.publicationUrl}/subscribe`;

export type Essay = {
  title: string;
  subtitle: string;
  url: string;
  date: string; // ISO
  author?: string;
  image?: string;
  readTime?: number;
};

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

function text(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "object" && "#text" in (value as object)) return String((value as { "#text": unknown })["#text"]);
  return String(value);
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getEssays(limit = 20): Promise<Essay[]> {
  try {
    const res = await fetch(`${substack.publicationUrl}/feed`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Feed responded ${res.status}`);
    // An unlaunched publication redirects to the profile page (HTML, not RSS).
    if (!(res.headers.get("content-type") ?? "").includes("xml")) return [];
    const xml = parser.parse(await res.text());
    const raw = xml?.rss?.channel?.item ?? [];
    const items: Record<string, unknown>[] = Array.isArray(raw) ? raw : [raw];

    return items.slice(0, limit).flatMap((item) => {
      const url = text(item.link);
      const title = stripHtml(text(item.title));
      if (!url || !title) return [];
      const body = text(item["content:encoded"]);
      const words = body ? stripHtml(body).split(" ").length : 0;
      const enclosure = item.enclosure as { "@_url"?: string; "@_type"?: string } | undefined;
      const pubDate = new Date(text(item.pubDate));
      return [
        {
          title,
          subtitle: stripHtml(text(item.description)),
          url,
          date: Number.isNaN(pubDate.getTime()) ? "" : pubDate.toISOString(),
          author: stripHtml(text(item["dc:creator"])) || undefined,
          image: enclosure?.["@_type"]?.startsWith("image") ? enclosure["@_url"] : undefined,
          readTime: words > 300 ? Math.max(1, Math.round(words / 230)) : undefined,
        },
      ];
    });
  } catch (err) {
    console.error("[substack] could not load feed:", err);
    return [];
  }
}
