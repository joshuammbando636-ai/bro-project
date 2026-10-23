import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/config/posts";
import { ArrowPill } from "./ArrowPill";

/** Blog card: image, category · date, title, excerpt. `feature` lays it out wide on desktop. */
export function PostCard({ post, feature = false }: { post: Post; feature?: boolean }) {
  return (
    <article className={`arrow-host group relative ${feature ? "grid gap-6 md:grid-cols-12 md:items-end md:gap-10" : ""}`}>
      <div
        className={`relative overflow-hidden rounded-card bg-line ${
          feature ? "aspect-[16/10] md:col-span-7" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={post.image}
          alt=""
          fill
          sizes={feature ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className={feature ? "md:col-span-5" : "mt-5"}>
        <p className="text-sm text-muted">
          {post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3
          className={`mt-2 tracking-[-0.025em] ${
            feature ? "text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] leading-[1.1]" : "text-xl leading-snug"
          }`}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-ink"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 hidden text-muted md:block">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-3 md:mt-5" aria-hidden>
          Read more
          <ArrowPill size={32} />
        </span>
      </div>
    </article>
  );
}
