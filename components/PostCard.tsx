import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { PostImage } from "./PostImage";

export function CategoryLabel({ category }: { category: string }) {
  return <span className="text-[14px] font-semibold text-oxblood">{category}</span>;
}

/** Card used on the home page: 2px gold top border, image, category, title, excerpt. */
export function PostCard({ post, headingLevel = "h3" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative border-t-2 border-gold pt-5">
      <PostImage src={post.image} alt={post.imageAlt} hasImage={post.hasImage} />
      <div className="mt-4">
        <CategoryLabel category={post.category} />
        <H className="mt-1 text-[28px] leading-[1.12]">
          <Link
            href={`/journal/${post.slug}`}
            className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-gold group-hover:decoration-1 group-hover:underline-offset-4"
          >
            {post.title}
          </Link>
        </H>
        <p className="mt-2 text-[16px] text-muted">{post.excerpt}</p>
      </div>
    </article>
  );
}
