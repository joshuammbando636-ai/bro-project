import { CallButton, OrderButton } from "./Button";
import { Container } from "./Container";
import { Statement } from "./Statement";

/**
 * Services page, after the horizontal gallery: who writes the work and why it
 * lands with its reader. (How an order works lives on the home page.)
 */
export function WritersNote() {
  return (
    <section className="section" aria-labelledby="our-writers">
      <Container>
        <Statement
          tagline="Written by people who know your reader."
          id="our-writers"
          title="Good writing isn't more words. It's knowing exactly who will read your document, and giving them what they are looking for."
        >
          <p>
            Every document has a reader with a checklist in mind. A supervisor checks that your objectives match your
            methods. A recruiter scans for results. A funder scores against criteria. A loan officer looks for cash
            flow. We write to that checklist from the very first line.
          </p>
          <p>
            That is why your work is matched with a writer who knows the field: researchers for research, people who
            have hired and been hired for CVs, and writers who understand budgets and markets for proposals and business
            plans.
          </p>
          <p>
            We work in English and Kiswahili, and we know what Tanzanian universities, employers, banks and funders
            expect, as well as international ones. Formatting, referencing and tone are adjusted to wherever your
            document is going.
          </p>
          <p>
            Everything is written from scratch and kept private. Your details are never shared or reused, and we explain
            the thinking behind your document so you can stand behind every word of it.
          </p>
          <div className="mt-8 flex break-inside-avoid flex-wrap gap-3">
            <CallButton />
            <OrderButton variant="secondary" label="WhatsApp us" />
          </div>
        </Statement>
      </Container>
    </section>
  );
}
