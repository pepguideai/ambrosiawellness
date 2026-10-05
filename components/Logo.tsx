type Props = { tone?: "light" | "dark"; className?: string };

/** Hexagonal molecular mark: gold hexagon outline, three nodes joined by lines. */
export function LogoMark({ tone = "light", className = "h-10 w-10" }: Props) {
  const hex = tone === "light" ? "var(--color-gold)" : "var(--color-gold-light)";
  const node = tone === "light" ? "var(--color-oxblood)" : "var(--color-gold-light)";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <polygon
        points="24,3 42.19,13.5 42.19,34.5 24,45 5.81,34.5 5.81,13.5"
        fill="none"
        stroke={hex}
        strokeWidth="2"
      />
      <g stroke={node} strokeWidth="1.75" strokeLinecap="round">
        <line x1="16.5" y1="18" x2="31.5" y2="20.5" />
        <line x1="31.5" y1="20.5" x2="22" y2="32.5" />
        <line x1="22" y1="32.5" x2="16.5" y2="18" />
      </g>
      <g fill={node}>
        <circle cx="16.5" cy="18" r="3.4" />
        <circle cx="31.5" cy="20.5" r="3.4" />
        <circle cx="22" cy="32.5" r="3.4" />
      </g>
    </svg>
  );
}

export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark tone={tone} className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span
        className={`font-serif text-[21px] leading-none font-semibold whitespace-nowrap sm:text-[26px] ${
          tone === "light" ? "text-oxblood" : "text-gold-light"
        }`}
      >
        Ambrosia Wellness
      </span>
    </span>
  );
}
