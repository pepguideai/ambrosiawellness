import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/posts";
import { categorySlug, site } from "@/lib/site";
import { PostImage } from "@/components/PostImage";
import { PostCard } from "@/components/PostCard";
import { PostMetaLine } from "@/components/PostListItem";
import { NewsletterForm } from "@/components/NewsletterForm";

type Props = PageProps<"/journal/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `/journal/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      section: post.category,
      ...(post.hasImage ? { images: [{ url: post.image, alt: post.imageAlt }] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    articleSection: post.category,
    url: `${site.url}/journal/${post.slug}`,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <article>
        <header className="container-site pt-12 md:pt-16">
          <div className="mx-auto max-w-[760px]">
            <nav aria-label="Breadcrumb" className="text-[14px]">
              <Link href="/journal" className="font-medium text-muted hover:text-oxblood hover:underline">
                Journal
              </Link>
              <span aria-hidden="true" className="px-2 text-muted">/</span>
              <Link
                href={`/journal?category=${categorySlug(post.category)}`}
                className="font-semibold text-oxblood hover:underline hover:decoration-gold hover:underline-offset-4"
              >
                {post.category}
              </Link>
            </nav>
            <h1 className="mt-4 text-[42px] leading-[1.06] md:text-[60px]">{post.title}</h1>
            <p className="mt-5 max-w-[60ch] text-[19px] text-muted">{post.excerpt}</p>
            <PostMetaLine post={post} className="mt-5 border-t border-gold pt-4" />
          </div>
          <div className="mx-auto mt-10 max-w-[960px]">
            <PostImage
              src={post.image}
              alt={post.imageAlt}
              hasImage={post.hasImage}
              aspect="aspect-[16/9]"
              sizes="(min-width: 1040px) 960px, 100vw"
              priority
            />
          </div>
        </header>

        <div className="container-site py-12 md:py-16">
          <div className="mx-auto max-w-[760px]">
            <div className="prose-post">
              <MDXRemote source={post.content} />
            </div>
          </div>
        </div>
      </article>

      <section className="container-site pb-16" aria-labelledby="post-newsletter">
        <div className="mx-auto max-w-[760px] border-t-2 border-gold bg-ivory-deep p-6 sm:p-10">
          <h2 id="post-newsletter" className="text-[34px] sm:text-[40px]">
            Get the next one in your inbox.
          </h2>
          <p className="mt-3 max-w-[54ch] text-[17px]">
            One email a week with the newest post, one small thing to try, and answers to reader
            questions.
          </p>
          <div className="mt-6">
            <NewsletterForm buttonLabel="Join" />
            <p className="text-[15px] text-muted">No spam. Unsubscribe any time.</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-gold" aria-labelledby="keep-reading">
          <div className="container-site py-16">
            <h2 id="keep-reading" className="text-[40px]">
              Keep reading
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
