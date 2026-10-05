export function HexagonMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 230" className={className} aria-hidden="true" focusable="false">
      <polygon
        points="100,2 198,58.5 198,171.5 100,228 2,171.5 2,58.5"
        fill="none"
        stroke="var(--color-gold-light)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        points="100,24 179,69.5 179,160.5 100,206 21,160.5 21,69.5"
        fill="none"
        stroke="var(--color-gold-light)"
        strokeWidth="1"
        strokeOpacity="0.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
