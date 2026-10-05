import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { PostCard } from "@/components/PostCard";
import { Placeholder } from "@/components/PostImage";
import { HexagonMotif } from "@/components/HexagonMotif";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Eyebrow } from "@/components/Eyebrow";
import { getEssays, substackSubscribeUrl } from "@/lib/substack";
import { EssayRow, EssaysComingSoon, ExternalIcon, LeadEssay } from "@/components/Essays";

export const metadata: Metadata = {
  title: { absolute: `${site.name}: wellness that fits an ordinary Tuesday` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { title: site.name, description: site.description, url: "/" },
};

const PRINCIPLES = [
  {
    title: "Consistency over intensity",
    body: "A short session you repeat every week does more than a heroic one you never do again.",
  },
  {
    title: "Plain language",
    body: "No jargon, no miracle promises, just clear steps you can try today.",
  },
  {
    title: "Community, not comparison",
    body: "Everyone starts somewhere different, so the only useful benchmark is last week's you.",
  },
];

export const revalidate = 3600;

export default async function HomePage() {
  const latest = getAllPosts().slice(0, 3);
  const [leadEssay, ...moreEssays] = await getEssays(4);

  return (
    <>
      {/* Hero */}
      <section className="on-dark overflow-hidden bg-oxblood text-ivory" aria-labelledby="hero-title">
        <div className="container-site grid items-center gap-14 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
          <div>
            <h1 id="hero-title" className="text-[46px] leading-[1.05] text-ivory sm:text-[60px] lg:text-[72px]">
              Wellness that fits an ordinary Tuesday.
            </h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.6] text-ivory sm:text-[19px]">
              Ambrosia Wellness is writing about movement, food and rest for people with full lives,
              and a community for anyone thinking it through alongside us.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/essays"
                className="inline-block bg-gold-light px-6 py-3.5 font-semibold text-oxblood hover:bg-ivory"
              >
                Read the essays
              </Link>
              <Link
                href="/journal"
                className="font-semibold text-gold-light underline decoration-1 underline-offset-[6px] hover:decoration-2"
              >
                Browse the journal
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[300px] py-8 md:max-w-[420px]">
            <HexagonMotif className="pointer-events-none absolute top-1/2 left-1/2 w-[135%] -translate-x-1/2 -translate-y-1/2" />
            <div className="relative aspect-[4/5] border border-gold-light bg-ivory-deep">
              <Placeholder label="A person stretching in a sunlit kitchen before work" />
            </div>
          </div>
        </div>
      </section>

      {/* Essays (Substack) */}
      <section className="container-site py-20" aria-labelledby="essays-title">
        <div className="grid gap-x-16 gap-y-10 border-b border-gold pb-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <Eyebrow>Essays, on Substack</Eyebrow>
            <h2 id="essays-title" className="mt-3 text-[44px] sm:text-[60px]">
              Ideas we&apos;re thinking through.
            </h2>
          </div>
          <p className="max-w-[48ch] text-[18px] md:justify-self-end">
            Longer pieces about habits, rest, food, and what it means to look after yourself when life
            is full. Less instruction, more conversation.
          </p>
        </div>

        {leadEssay ? (
          <>
            <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
              <LeadEssay essay={leadEssay} />
              {moreEssays.length > 0 && (
                <ul aria-label="More essays">
                  {moreEssays.map((e) => (
                    <li key={e.url}>
                      <EssayRow essay={e} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/essays"
                className="inline-block border border-oxblood px-6 py-3 font-semibold text-oxblood hover:bg-oxblood hover:text-ivory"
              >
                All essays
              </Link>
              <a
                href={substackSubscribeUrl}
                className="inline-flex items-center gap-2 font-semibold text-oxblood underline decoration-gold decoration-1 underline-offset-[6px] hover:decoration-2"
              >
                Subscribe on Substack <ExternalIcon />
              </a>
            </div>
          </>
        ) : (
          <div className="mt-12">
            <EssaysComingSoon subscribeUrl={substackSubscribeUrl} />
          </div>
        )}
      </section>

      {/* Principles */}
      <section className="bg-ivory-deep" aria-labelledby="principles-title">
        <div className="container-site py-20">
          <h2 id="principles-title" className="max-w-[18ch] text-[40px] sm:text-[48px]">
            Advice you can follow on a bad day.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-t border-gold pt-5">
                <h3 className="text-[28px]">{p.title}</h3>
                <p className="mt-3 max-w-[38ch] text-[17px] text-ink">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From the journal */}
      <section className="container-site py-20" aria-labelledby="latest-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>The journal</Eyebrow>
            <h2 id="latest-title" className="mt-3 text-[40px] sm:text-[48px]">
              Practical notes for this week
            </h2>
          </div>
          <Link
            href="/journal"
            className="font-semibold text-oxblood underline decoration-gold decoration-1 underline-offset-[6px] hover:decoration-2"
          >
            See all journal posts
          </Link>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {latest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-ivory-deep" aria-labelledby="about-title">
        <div className="container-site grid items-center gap-12 py-20 md:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[4/5] w-full max-w-[440px] border border-gold bg-ivory-deep">
            <Placeholder label="Portrait of the Ambrosia Wellness team on a morning walk" />
          </div>
          <div>
            <Eyebrow>About</Eyebrow>
            <h2 id="about-title" className="mt-3 text-[40px] sm:text-[48px]">
              A place to think out loud about looking after yourself.
            </h2>
            <div className="mt-6 max-w-[60ch] space-y-4 text-[18px]">
              <p>
                We write about movement, food, recovery and mindset for people who have jobs,
                families, and not much spare time. Some of it is practical: a routine, a grocery
                list. Some of it is thinking out loud about why the simple things are hard to keep
                doing.
              </p>
              <p>
                We&apos;d rather start a conversation than sell a program. If something here is
                useful, take it. If you see it differently, tell us.
              </p>
              <p className="text-[16px] text-muted">
                Our writing is general information, not medical advice. For anything specific to your
                health, please speak to a doctor or qualified professional.
              </p>
            </div>
            <p className="mt-8 text-[16px]">
              Prefer to talk one-to-one?{" "}
              <Link
                href="/contact"
                className="font-semibold text-oxblood underline decoration-gold decoration-1 underline-offset-4 hover:decoration-2"
              >
                Get in touch about a consultation
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Community + newsletter */}
      <section id="community" className="container-site py-20" aria-labelledby="community-title">
        <div className="grid gap-12 border-t-2 border-gold pt-12 md:grid-cols-2">
          <div>
            <Eyebrow>Community</Eyebrow>
            <h2 id="community-title" className="mt-3 text-[44px] sm:text-[56px]">
              Join the community.
            </h2>
            <p className="mt-5 max-w-[48ch] text-[18px]">
              We&apos;d like this to be a conversation. Get the weekly email, reply with your own
              questions and ideas, or join the discussion under an{" "}
              <a
                href={substackSubscribeUrl}
                className="font-semibold text-oxblood underline decoration-gold decoration-1 underline-offset-4 hover:decoration-2"
              >
                essay on Substack
              </a>
              .
            </p>
          </div>
          <div id="newsletter" className="scroll-mt-8 self-end">
            <NewsletterForm buttonLabel="Join" />
            <p className="text-[15px] text-muted">No spam. Unsubscribe any time.</p>
          </div>
        </div>
      </section>
    </>
  );
}
