import type { Metadata } from "next";
import { posts } from "@/config/posts";
import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { Statement } from "@/components/Statement";

export const metadata: Metadata = {
  title: "Latest updates",
  description:
    "Practical guides on research papers, proposals, CVs and business plans from Tanzanian writers: structure, common mistakes and what readers look for.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [first, ...rest] = posts;

  return (
    <>
      <section className="pb-16 pt-6 md:pb-24 md:pt-10">
        <Container>
          <Statement tagline="Latest updates. Practical guides." title="Clear, honest advice on the documents that open doors: research, proposals, CVs and business plans." as="h1" />
        </Container>
      </section>

      <section className="section pt-0" aria-label="All posts">
        <Container>
          {first && (
            <Reveal>
              <PostCard post={first} feature />
            </Reveal>
          )}
          {rest.length > 0 && (
            <Reveal stagger className="mt-16 grid gap-x-6 gap-y-14 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
