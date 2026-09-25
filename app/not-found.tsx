import { Container } from "@/components/Container";
import { ButtonLink, OrderButton } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="section">
      <Container>
        <p className="eyebrow mb-5">Error 404</p>
        <h1 className="display max-w-3xl">This page seems to have lost its draft.</h1>
        <p className="lead mt-7">The link may be broken or the page may have moved. Let&apos;s get you back on track.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" arrow>
            Back to home
          </ButtonLink>
          <OrderButton size="lg" variant="secondary" label="Talk to us" />
        </div>
      </Container>
    </section>
  );
}
