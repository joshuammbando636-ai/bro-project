import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { formatDate, getPost, LINK, posts, readingMinutes } from "@/config/posts";
import { Container } from "@/components/Container";
import { CallButton, OrderButton } from "@/components/Button";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await props.params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [post.image],
    },
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const post = getPost((await props.params).slug);
  if (!post) notFound();

  const service = siteConfig.services.find((s) => s.slug === post.service);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.image}`,
    datePublished: post.date,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article className="pb-16 pt-6 md:pb-24 md:pt-10">
        <Container>
          <Reveal>
            <p className="flex flex-wrap gap-x-2 border-b border-line pb-5 text-muted">
              <Link href="/blog" className="transition-colors hover:text-ink">
                Latest updates
              </Link>
              <span aria-hidden>/</span>
              <span>{post.category}</span>
            </p>
            <h1 className="mt-8 max-w-[24ch] text-[clamp(2.1rem,1.3rem+3vw,4rem)] leading-[1.06] tracking-[-0.035em] md:mt-10">
              {post.title}
            </h1>
            <p className="mt-6 text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingMinutes(post)} min read
            </p>
          </Reveal>

          <Reveal className="relative mt-10 aspect-[16/9] overflow-hidden rounded-card bg-line md:mt-14">
            <Image src={post.image} alt="" fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          </Reveal>

          <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
            <p className="lead lg:col-span-3">{post.excerpt}</p>
            <div className="max-w-[65ch] text-[1.0625rem] leading-relaxed lg:col-span-8 lg:col-start-5">
              {post.body.map((b, i) =>
                "h2" in b ? (
                  <h2 key={i} className="mb-3 mt-10 text-2xl tracking-[-0.02em] first:mt-0">
                    {b.h2}
                  </h2>
                ) : "ul" in b ? (
                  <ul key={i} className="my-5 list-disc space-y-2 pl-5 marker:text-muted">
                    {b.ul.map((item) => (
                      <li key={item}>{withLinks(item)}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className="mt-4 first:mt-0">
                    {withLinks(b.p)}
                  </p>
                ),
              )}

              {/* Call to action */}
              <div className="mt-14 rounded-card bg-brand-soft p-6 sm:p-8">
                <p className="text-xl tracking-[-0.02em]">
                  Need help with {service ? service.audience : "your document"}?
                </p>
                <p className="mt-2 text-muted">
                  Call or WhatsApp us for a fixed quote.
                  {service && (
                    <>
                      {" "}
                      <Link href={`/services/${service.slug}`} className="link text-ink">
                        See how we write {service.title.toLowerCase()}
                      </Link>
                      .
                    </>
                  )}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CallButton />
                  <OrderButton variant="secondary" label="WhatsApp us" service={post.service} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <section className="section border-t border-line" aria-labelledby="more-posts">
          <Container>
            <h2 id="more-posts" className="h2">
              More updates
            </h2>
            <Reveal stagger className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </Reveal>
          </Container>
        </section>
      )}
    </>
  );
}

/** Turns [words](/path) in post text into internal links */
function withLinks(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    out.push(text.slice(last, m.index));
    out.push(
      <Link key={m.index} href={m[2]} className="link">
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}
