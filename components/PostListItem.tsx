import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/site";
import { PostImage } from "./PostImage";
import { CategoryLabel } from "./PostCard";

export function PostMetaLine({ post, className = "" }: { post: PostMeta; className?: string }) {
  return (
    <p className={`text-[14px] text-muted ${className}`}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true"> · </span>
      {post.readTime} min read
    </p>
  );
}

/** Journal list row: 200x140 thumbnail on the left, text on the right. */
export function PostListItem({ post }: { post: PostMeta }) {
  return (
    <article className="group relative grid gap-5 border-t border-gold py-7 sm:grid-cols-[200px_1fr]">
      <div className="sm:w-[200px]">
        <PostImage
          src={post.image}
          alt={post.imageAlt}
          hasImage={post.hasImage}
          aspect="aspect-[10/7]"
          sizes="(min-width: 640px) 200px, 100vw"
        />
      </div>
      <div>
        <CategoryLabel category={post.category} />
        <h3 className="mt-1 text-[28px] leading-[1.12]">
          <Link
            href={`/journal/${post.slug}`}
            className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-gold group-hover:decoration-1 group-hover:underline-offset-4"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-[60ch] text-[16px] text-ink">{post.excerpt}</p>
        <PostMetaLine post={post} className="mt-2" />
      </div>
    </article>
  );
}
