import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Consultations and contact",
  description:
    "Ask about a one-to-one consultation with Ambrosia Wellness, or send us a question about the journal.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="on-dark bg-oxblood" aria-labelledby="contact-title">
        <div className="container-site py-14 md:py-20">
          <Eyebrow tone="dark">Consultations</Eyebrow>
          <h1 id="contact-title" className="mt-3 text-[48px] text-ivory md:text-[64px]">
            Let&apos;s talk about your week.
          </h1>
          <p className="mt-4 max-w-[56ch] text-[18px] text-ivory">
            A consultation is a conversation about where you are now and a simple routine that fits
            around the rest of your life. Send us a note and we&apos;ll reply by email.
          </p>
        </div>
      </section>

      <div className="container-site grid gap-14 py-16 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-[640px]">
          <ContactForm />
        </div>
        <aside className="h-fit border-t-2 border-gold bg-ivory-deep p-6" aria-labelledby="what-to-expect">
          <h2 id="what-to-expect" className="text-[28px]">
            What to expect
          </h2>
          <ul className="mt-4 list-[square] space-y-3 pl-5 text-[16px] marker:text-oxblood">
            <li>We read every message and reply personally.</li>
            <li>We&apos;ll suggest a time to talk if a consultation sounds like a good fit.</li>
            <li>
              We give general fitness and lifestyle guidance, not medical advice. For injuries or
              health conditions, please speak to a doctor first.
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
