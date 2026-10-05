# Ambrosia Wellness

Content and community site built with Next.js (App Router), TypeScript, Tailwind CSS v4 and MDX.

## Develop

```bash
npm install
npm run dev
```

## Essays (Substack)

The homepage's lead section and `/essays` are pulled from the Substack RSS feed at
`https://philipambrose.substack.com/feed` (see `lib/substack.ts`). The feed is cached for an hour,
so new Substack posts appear without a redeploy. Links open the essay on Substack.

- Override the publication with `SUBSTACK_PUBLICATION_URL` (e.g. a custom domain).
- Until the publication has posts, both places show a "first essay is on its way" state.

## Writing journal posts

Add an `.mdx` file to `content/posts/`. The filename becomes the URL slug.

```yaml
---
title: "Sentence case title"
date: 2026-10-05
category: Movement        # Movement | Food | Recovery | Mindset | Community
excerpt: "One sentence shown on cards and in RSS."
image: /images/posts/my-post.jpg
imageAlt: "Describe the photo for screen readers"   # optional, falls back to title
readTime: 5
---
```

Until a file exists at `public/<image>`, the site shows a labeled placeholder block.

## Before launch

- **Newsletter:** connect an email provider in `app/api/subscribe/route.ts` (see the TODO there, which includes a Mailchimp example).
- **Contact form:** deliver inquiries in `app/api/contact/route.ts` (see the TODO there).
- **Site URL:** set `NEXT_PUBLIC_SITE_URL` in Vercel (e.g. `https://ambrosiawellness.com`) so canonical URLs, RSS and the sitemap use the right domain. Without it, Vercel's production URL is used.
- Replace placeholder photos and review all copy.

## Design tokens

Colors live in `app/globals.css` under `@theme` (the default Tailwind palette is cleared). Never use `gold` for text on ivory; use `oxblood` on ivory and `gold-light` on oxblood.
