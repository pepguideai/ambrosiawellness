"use client";

import { useEffect, useRef, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import { PostListItem } from "./PostListItem";

export function LoadMoreList({ posts, pageSize = 4 }: { posts: PostMeta[]; pageSize?: number }) {
  const [visible, setVisible] = useState(pageSize);
  const listRef = useRef<HTMLUListElement>(null);
  const focusIndex = useRef<number | null>(null);

  // After loading more, move keyboard focus to the first newly revealed post.
  useEffect(() => {
    if (focusIndex.current === null) return;
    const link = listRef.current?.children[focusIndex.current]?.querySelector<HTMLAnchorElement>("h3 a");
    link?.focus();
    focusIndex.current = null;
  }, [visible]);

  const remaining = posts.length - visible;

  return (
    <>
      <ul ref={listRef}>
        {posts.slice(0, visible).map((post) => (
          <li key={post.slug}>
            <PostListItem post={post} />
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <div className="border-t border-gold pt-8">
          <button
            type="button"
            onClick={() => {
              focusIndex.current = visible;
              setVisible((v) => v + pageSize);
            }}
            className="border border-oxblood px-6 py-3 font-semibold text-oxblood hover:bg-oxblood hover:text-ivory"
          >
            Load more
            <span className="sr-only"> posts ({remaining} remaining)</span>
          </button>
        </div>
      )}
    </>
  );
}
