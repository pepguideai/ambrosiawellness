export function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`text-[13px] font-semibold tracking-[0.14em] uppercase ${
        tone === "light" ? "text-oxblood" : "text-gold-light"
      }`}
    >
      {children}
    </p>
  );
}
