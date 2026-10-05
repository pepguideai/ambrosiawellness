import type { Metadata } from "next";
import Link from "next/link";
import { getCategoryCounts, getPostsByCategory } from "@/lib/posts";
import { CATEGORIES, categoryFromSlug, categorySlug } from "@/lib/site";
import { CategoryPills } from "@/components/CategoryPills";
import { LoadMoreList } from "@/components/LoadMoreList";
import { PostImage } from "@/components/PostImage";
import { CategoryLabel } from "@/components/PostCard";
import { PostMetaLine } from "@/components/PostListItem";
import { SidebarNewsletter } from "@/components/SidebarNewsletter";

type Props = PageProps<"/journal">;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const category = categoryFromSlug(firstParam((await searchParams).category));
  const title = category ? `${category} | Journal` : "Journal";
  const description = category
    ? `Writing about ${category.toLowerCase()} from the Ambrosia Wellness journal.`
    : "Plain-language writing on movement, food, recovery, mindset and community.";
  const url = category ? `/journal?category=${categorySlug(category)}` : "/journal";
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function JournalPage({ searchParams }: Props) {
  const category = categoryFromSlug(firstParam((await searchParams).category));
  const posts = getPostsByCategory(category);
  const [featured, ...rest] = posts;
  const counts = getCategoryCounts();

  return (
    <>
      <section className="on-dark bg-oxblood" aria-labelledby="journal-title">
        <div className="container-site py-14 md:py-20">
          <h1 id="journal-title" className="text-[52px] text-ivory md:text-[72px]">
            The Journal
          </h1>
          <p className="mt-4 max-w-[56ch] text-[18px] text-ivory">
            {category
              ? `Everything we've written about ${category.toLowerCase()}.`
              : "Plain-language writing on movement, food, recovery, mindset and community."}
          </p>
          <div className="mt-8">
            <CategoryPills active={category} />
          </div>
        </div>
      </section>

      <div className="container-site py-14">
        {featured ? (
          <article
            className="group relative grid items-center gap-8 border-t-2 border-gold pt-8 md:grid-cols-2 md:gap-12"
            aria-labelledby="featured-title"
          >
            <PostImage
              src={featured.image}
              alt={featured.imageAlt}
              hasImage={featured.hasImage}
              sizes="(min-width: 768px) 540px, 100vw"
              priority
            />
            <div>
              <p className="text-[13px] font-semibold tracking-[0.14em] text-muted uppercase">
                Featured
              </p>
              <div className="mt-3">
                <CategoryLabel category={featured.category} />
              </div>
              <h2 id="featured-title" className="mt-1 text-[38px] leading-[1.08] md:text-[48px]">
                <Link
                  href={`/journal/${featured.slug}`}
                  className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-gold group-hover:decoration-1 group-hover:underline-offset-4"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-[52ch] text-[18px]">{featured.excerpt}</p>
              <PostMetaLine post={featured} className="mt-4" />
            </div>
          </article>
        ) : (
          <div className="border-t-2 border-gold pt-8">
            <h2 className="text-[36px]">Nothing in {category} yet.</h2>
            <p className="mt-3 max-w-[56ch] text-[18px]">
              We&apos;re working on it. Join the weekly email below to hear when new posts land, or{" "}
              <Link href="/journal" className="font-semibold text-oxblood underline decoration-gold underline-offset-4">
                browse all posts
              </Link>
              .
            </p>
          </div>
        )}

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_320px] lg:gap-16">
          <section aria-labelledby="more-posts">
            <h2 id="more-posts" className="mb-6 text-[34px]">
              {category ? `More in ${category}` : "Latest posts"}
            </h2>
            {rest.length ? (
              <LoadMoreList key={category ?? "all"} posts={rest} />
            ) : (
              <p className="border-t border-gold pt-6 text-muted">
                {featured ? "That's everything in this topic for now." : "No posts to show."}
              </p>
            )}
          </section>

          <aside className="space-y-12" aria-label="Journal sidebar">
            <SidebarNewsletter />
            <nav aria-labelledby="browse-topics">
              <h2 id="browse-topics" className="border-b border-gold pb-3 text-[28px]">
                Browse by topic
              </h2>
              <ul>
                {CATEGORIES.map((c) => (
                  <li key={c} className="border-b border-border">
                    <Link
                      href={`/journal?category=${categorySlug(c)}`}
                      aria-current={category === c ? "page" : undefined}
                      className={`flex justify-between py-3 text-[16px] font-medium text-oxblood hover:underline hover:decoration-gold hover:underline-offset-4 ${
                        category === c ? "font-semibold" : ""
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-muted">
                        {counts[c]}
                        <span className="sr-only"> {counts[c] === 1 ? "post" : "posts"}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </>
  );
}
