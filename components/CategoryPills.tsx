import Link from "next/link";
import { CATEGORIES, categorySlug, type Category } from "@/lib/site";

export function CategoryPills({ active }: { active?: Category }) {
  const items: { label: string; href: string; isActive: boolean }[] = [
    { label: "All", href: "/journal", isActive: !active },
    ...CATEGORIES.map((c) => ({
      label: c,
      href: `/journal?category=${categorySlug(c)}`,
      isActive: active === c,
    })),
  ];
  return (
    <nav aria-label="Filter by category">
      <ul className="flex flex-wrap gap-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              scroll={false}
              aria-current={item.isActive ? "page" : undefined}
              className={`inline-block border border-gold-light px-4 py-2 text-[15px] font-semibold ${
                item.isActive ? "bg-gold-light text-oxblood" : "text-gold-light hover:bg-gold-light/15"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
