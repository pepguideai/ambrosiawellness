import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { CATEGORIES, type Category } from "./site";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const PUBLIC_DIR = path.join(process.cwd(), "public");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  category: Category;
  excerpt: string;
  image: string; // path under /public, e.g. /images/posts/foo.jpg
  imageAlt: string;
  /** False until a real photo exists at `image`; components show a labeled placeholder instead. */
  hasImage: boolean;
  readTime: number; // minutes
};

export type Post = PostMeta & { content: string };

function readPost(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const required = ["title", "date", "category", "excerpt", "image", "readTime"] as const;
  for (const key of required) {
    if (data[key] === undefined || data[key] === "") {
      throw new Error(`Post "${slug}" is missing frontmatter field "${key}"`);
    }
  }
  if (!CATEGORIES.includes(data.category)) {
    throw new Error(`Post "${slug}" has unknown category "${data.category}"`);
  }

  // gray-matter parses unquoted YAML dates into Date objects.
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  const image = String(data.image);

  return {
    slug,
    title: String(data.title),
    date,
    category: data.category as Category,
    excerpt: String(data.excerpt),
    image,
    imageAlt: String(data.imageAlt ?? data.title),
    hasImage: image.startsWith("/") && fs.existsSync(path.join(PUBLIC_DIR, image)),
    readTime: Number(data.readTime),
    content,
  };
}

const getAll = cache((): Post[] =>
  fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1)),
);

function toMeta(post: Post): PostMeta {
  const meta: Partial<Post> = { ...post };
  delete meta.content;
  return meta as PostMeta;
}

export function getAllPosts(): PostMeta[] {
  return getAll().map(toMeta);
}

export function getPostsByCategory(category?: Category): PostMeta[] {
  const posts = getAllPosts();
  return category ? posts.filter((p) => p.category === category) : posts;
}

export function getPost(slug: string): Post | undefined {
  return getAll().find((p) => p.slug === slug);
}

export function getCategoryCounts(): Record<Category, number> {
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c, 0])) as Record<Category, number>;
  for (const p of getAllPosts()) counts[p.category]++;
  return counts;
}
