import Image from "next/image";
import type { Essay } from "@/lib/substack";
import { formatDate } from "@/lib/site";

export function ExternalIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`inline-block ${className}`} aria-hidden="true" focusable="false">
      <path d="M6 3h7v7M13 3L4 12" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function EssayMeta({ essay, className = "" }: { essay: Essay; className?: string }) {
  return (
    <p className={`text-[14px] text-muted ${className}`}>
      {essay.date && <time dateTime={essay.date}>{formatDate(essay.date.slice(0, 10))}</time>}
      {essay.readTime && (
        <>
          <span aria-hidden="true"> · </span>
          {essay.readTime} min read
        </>
      )}
      <span aria-hidden="true"> · </span>
      On Substack <ExternalIcon className="h-3 w-3" />
    </p>
  );
}

function EssayImage({ essay, sizes, priority }: { essay: Essay; sizes: string; priority?: boolean }) {
  if (!essay.image) return null;
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border border-gold bg-ivory-deep">
      <Image src={essay.image} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

/** The newest essay, shown large. */
export function LeadEssay({ essay, headingLevel = "h3" }: { essay: Essay; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative">
      <EssayImage essay={essay} sizes="(min-width: 1024px) 620px, 100vw" priority />
      <div className={essay.image ? "mt-6" : ""}>
        <p className="text-[13px] font-semibold tracking-[0.14em] text-oxblood uppercase">Latest essay</p>
        <H className="mt-2 text-[36px] leading-[1.08] sm:text-[46px]">
          <a
            href={essay.url}
            className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-gold group-hover:decoration-1 group-hover:underline-offset-[6px]"
          >
            {essay.title}
          </a>
        </H>
        {essay.subtitle && <p className="mt-4 line-clamp-4 max-w-[52ch] text-[19px] text-ink">{essay.subtitle}</p>}
        <EssayMeta essay={essay} className="mt-4" />
      </div>
    </article>
  );
}

/** Compact row for the essay lists. */
export function EssayRow({ essay, withImage = false }: { essay: Essay; withImage?: boolean }) {
  const showImage = withImage && essay.image;
  return (
    <article
      className={`group relative grid gap-5 border-t border-gold py-6 ${showImage ? "sm:grid-cols-[200px_1fr]" : ""}`}
    >
      {showImage && (
        <div className="relative aspect-[10/7] w-full overflow-hidden bg-ivory-deep sm:w-[200px]">
          <Image src={essay.image!} alt="" fill sizes="(min-width: 640px) 200px, 100vw" className="object-cover" />
        </div>
      )}
      <div>
        <h3 className="text-[24px] leading-[1.15] sm:text-[26px]">
          <a
            href={essay.url}
            className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-gold group-hover:decoration-1 group-hover:underline-offset-4"
          >
            {essay.title}
          </a>
        </h3>
        {essay.subtitle && <p className="mt-2 line-clamp-3 max-w-[60ch] text-[16px] text-ink">{essay.subtitle}</p>}
        <EssayMeta essay={essay} className="mt-2" />
      </div>
    </article>
  );
}

/** Shown until the Substack publication has posts (or if the feed can't be reached). */
export function EssaysComingSoon({ subscribeUrl }: { subscribeUrl: string }) {
  return (
    <div className="border-t-2 border-gold bg-ivory-deep p-8 sm:p-10">
      <h3 className="text-[32px] sm:text-[40px]">The first essay is on its way.</h3>
      <p className="mt-4 max-w-[52ch] text-[18px]">
        Essays are published on Substack. Follow along there to read the first one when it lands.
      </p>
      <a
        href={subscribeUrl}
        className="mt-7 inline-flex items-center gap-2 bg-oxblood px-6 py-3 font-semibold text-ivory hover:bg-oxblood-dark"
      >
        Follow on Substack <ExternalIcon />
      </a>
    </div>
  );
}
