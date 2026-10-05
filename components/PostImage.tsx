import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  hasImage?: boolean;
  /** Tailwind aspect class for the frame, e.g. "aspect-[3/2]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders the post photo when a file exists in /public, otherwise a clearly
 * labeled flat placeholder block so layouts can be reviewed without stock photos.
 */
export function PostImage({
  src,
  alt,
  hasImage = false,
  aspect = "aspect-[3/2]",
  sizes = "(min-width: 768px) 33vw, 100vw",
  priority,
  className = "",
}: Props) {
  return (
    <div className={`relative w-full overflow-hidden bg-ivory-deep ${aspect} ${className}`}>
      {hasImage && src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <Placeholder label={alt} />
      )}
    </div>
  );
}

export function Placeholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-1 border border-border p-4 text-center"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-muted" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="10" r="1.8" fill="currentColor" />
        <path d="M4 18l5-5 4 4 3-3 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="text-[12px] font-semibold tracking-[0.1em] text-muted uppercase">Photo placeholder</span>
      <span className="line-clamp-2 max-w-[32ch] text-[13px] leading-snug text-muted">{label}</span>
    </div>
  );
}
