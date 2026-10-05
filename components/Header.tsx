"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Wordmark } from "./Logo";

const NAV = [
  { href: "/essays", label: "Essays", match: (p: string) => p.startsWith("/essays") },
  { href: "/journal", label: "Journal", match: (p: string) => p.startsWith("/journal") },
  { href: "/#about", label: "About", match: () => false },
  { href: "/#community", label: "Community", match: () => false },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (active: boolean) =>
    `inline-block py-1 text-[16px] font-medium text-oxblood border-b-2 ${
      active ? "border-gold" : "border-transparent hover:border-border"
    }`;

  return (
    <header className="border-b border-gold bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-oxblood focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Link href="/" aria-label="Ambrosia Wellness, home">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => {
              const active = item.match(pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={linkClass(active)}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/#newsletter"
                className="inline-block bg-oxblood px-5 py-3 text-[15px] font-semibold text-ivory hover:bg-oxblood-dark"
              >
                Join the newsletter
              </Link>
            </li>
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="flex items-center gap-2 border border-oxblood px-3 py-2 text-[15px] font-semibold text-oxblood md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" />
            ) : (
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
          Menu
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Main"
        className={`border-t border-gold md:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="container-site flex flex-col py-4">
          {NAV.map((item) => {
            const active = item.match(pathname);
            return (
              <li key={item.href} className="border-b border-border">
                <Link
                  href={item.href}
                  className="block py-3 text-[17px] font-medium text-oxblood"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className={`border-b-2 ${active ? "border-gold" : "border-transparent"}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="pt-4">
            <Link
              href="/#newsletter"
              className="block bg-oxblood px-5 py-3 text-center font-semibold text-ivory"
              onClick={() => setOpen(false)}
            >
              Join the newsletter
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
