import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site py-24">
      <h1 className="text-[48px] md:text-[64px]">We couldn&apos;t find that page.</h1>
      <p className="mt-4 max-w-[56ch] text-[18px]">
        It may have moved, or the link might be mistyped. The journal is a good place to start.
      </p>
      <Link href="/journal" className="mt-8 inline-block bg-oxblood px-6 py-3 font-semibold text-ivory hover:bg-oxblood-dark">
        Go to the journal
      </Link>
    </section>
  );
}
