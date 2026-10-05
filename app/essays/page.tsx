import type { Metadata } from "next";
import { getEssays, substackSubscribeUrl } from "@/lib/substack";
import { EssayRow, EssaysComingSoon, ExternalIcon, LeadEssay } from "@/components/Essays";
import { Eyebrow } from "@/components/Eyebrow";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Longer writing from Ambrosia Wellness on what it means to look after yourself when life is full, published on Substack.",
  alternates: { canonical: "/essays" },
};

export default async function EssaysPage() {
  const [lead, ...rest] = await getEssays(30);

  return (
    <>
      <section className="on-dark bg-oxblood" aria-labelledby="essays-title">
        <div className="container-site py-14 md:py-20">
          <Eyebrow tone="dark">On Substack</Eyebrow>
          <h1 id="essays-title" className="mt-3 text-[52px] text-ivory md:text-[72px]">
            Essays
          </h1>
          <p className="mt-4 max-w-[58ch] text-[18px] text-ivory">
            Longer pieces where we think out loud about habits, rest, food, and what it means to look
            after yourself when life is full. Less instruction, more conversation.
          </p>
          <a
            href={substackSubscribeUrl}
            className="mt-8 inline-flex items-center gap-2 bg-gold-light px-6 py-3.5 font-semibold text-oxblood hover:bg-ivory"
          >
            Subscribe on Substack <ExternalIcon />
          </a>
        </div>
      </section>

      <div className="container-site py-14">
        {lead ? (
          <>
            <div className="mx-auto max-w-[860px]">
              <LeadEssay essay={lead} headingLevel="h2" />
            </div>
            {rest.length > 0 && (
              <section className="mx-auto mt-16 max-w-[860px]" aria-labelledby="archive-title">
                <h2 id="archive-title" className="mb-4 text-[34px]">
                  Archive
                </h2>
                <ul>
                  {rest.map((e) => (
                    <li key={e.url}>
                      <EssayRow essay={e} withImage />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          <div className="mx-auto max-w-[860px]">
            <EssaysComingSoon subscribeUrl={substackSubscribeUrl} />
          </div>
        )}
      </div>
    </>
  );
}
