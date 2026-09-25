import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { ButtonLink, OrderButton } from "./Button";

/** Closing call-to-action, reused at the bottom of every page. */
export function CTASection({
  title = "Ready when you are.",
  body = "Send us a message and get a fixed quote within the hour. No card needed, pay by mobile money.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-dark bg-ink text-white section">
      <Container>
        <Reveal className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-4 !text-white/60">Order or book a free consultation</p>
            <h2 className="display">{title}</h2>
            <p className="mt-6 max-w-xl text-lg text-white/70">{body}</p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
            <OrderButton size="lg" variant="light" className="w-full md:w-auto" />
            <ButtonLink
              href="/contact"
              size="lg"
              variant="ghost"
              className="w-full !text-white hover:!bg-white/10 md:w-auto"
            >
              Use the contact form
            </ButtonLink>
            <p className="text-sm text-white/50 md:text-right">
              {siteConfig.payments.methods.join(" · ")}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
