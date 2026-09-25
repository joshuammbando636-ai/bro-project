import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Sample works",
  description: "Browse anonymised samples of our research papers, CVs, proposals and business plans.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="pb-8 pt-10 md:pt-20">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">Sample works</p>
            <h1 className="display">The standard we write to.</h1>
            <p className="lead mt-7">
              Tap any sample to take a closer look. All examples are anonymised, and full-length samples are available on
              request.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-[var(--space-section)] pt-6">
        <Container>
          <Gallery />
        </Container>
      </section>

      <CTASection title="Like what you see?" body="Tell us what you need and we'll match the standard, with a fixed quote and a clear deadline." />
    </>
  );
}
