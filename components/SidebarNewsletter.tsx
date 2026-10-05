import { NewsletterForm } from "./NewsletterForm";

export function SidebarNewsletter() {
  return (
    <section aria-labelledby="sidebar-newsletter" className="border-t-2 border-gold bg-ivory-deep p-6">
      <h2 id="sidebar-newsletter" className="text-[28px]">
        The weekly email
      </h2>
      <p className="mt-2 text-[16px]">
        One new post, one small thing to try, and reader questions answered. Every week.
      </p>
      <div className="mt-5">
        <NewsletterForm layout="stacked" />
        <p className="text-[14px] text-muted">No spam. Unsubscribe any time.</p>
      </div>
    </section>
  );
}
