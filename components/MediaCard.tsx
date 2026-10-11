import Image from "next/image";

/**
 * Shared "image card" treatment: a photo filling a rounded card with a caption
 * overlaid bottom-left on a gradient scrim, so every image slot reads as one
 * consistent visual language.
 */
export function MediaCard({
  src,
  title,
  caption = title,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
}: {
  src: string;
  title: string;
  caption?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[1.25rem] bg-line ${className}`}>
      <Image
        src={src}
        alt={title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />
      {caption && (
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent p-4 pt-12 sm:p-5 sm:pt-14">
          <span className="text-xs font-medium text-white sm:text-sm">{caption}</span>
        </div>
      )}
    </div>
  );
}
