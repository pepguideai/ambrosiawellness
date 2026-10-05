import Link from "next/link";
import { Wordmark } from "./Logo";
import { CATEGORIES, categorySlug } from "@/lib/site";
import { substackSubscribeUrl } from "@/lib/substack";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark mt-auto bg-oxblood-dark text-ivory">
      <div className="container-site grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="Ambrosia Wellness, home" className="inline-block">
            <Wordmark tone="dark" />
          </Link>
          <p className="mt-5 max-w-[42ch] text-[15px] text-ivory">
            Writing about movement, food and rest for people with full lives. Everything here is
            general information, not medical advice.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-[13px] font-semibold tracking-[0.12em] text-gold-light uppercase">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li><Link className="hover:text-gold-light" href="/essays">Essays</Link></li>
            <li><Link className="hover:text-gold-light" href="/journal">Journal</Link></li>
            <li><Link className="hover:text-gold-light" href="/#about">About</Link></li>
            <li><Link className="hover:text-gold-light" href="/#community">Community</Link></li>
            <li><Link className="hover:text-gold-light" href="/contact">Book a consultation</Link></li>
            <li><a className="hover:text-gold-light" href={substackSubscribeUrl}>Substack</a></li>
            <li><a className="hover:text-gold-light" href="/rss.xml">Journal RSS feed</a></li>
          </ul>
        </nav>

        <nav aria-label="Topics">
          <h2 className="font-sans text-[13px] font-semibold tracking-[0.12em] text-gold-light uppercase">
            Topics
          </h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link className="hover:text-gold-light" href={`/journal?category=${categorySlug(c)}`}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-gold-light/40">
        <p className="container-site py-6 text-[14px] text-ivory">
          © {year} Ambrosia Wellness. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
