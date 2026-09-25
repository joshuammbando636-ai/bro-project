import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { validateContact, type ContactValues } from "@/lib/validation";

const serviceValues = [...siteConfig.services.map((s) => s.slug as string), "consultation"];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Contact / order form endpoint.
 *
 * Delivery: if RESEND_API_KEY + CONTACT_TO_EMAIL are set, the message is emailed via Resend.
 * Otherwise it is a STUB: the submission is logged and reported as successful so the UI
 * can be tested end to end.
 * TODO: set RESEND_API_KEY, CONTACT_TO_EMAIL (and CONTACT_FROM_EMAIL on a verified
 *       domain) in Vercel, or swap this block for Formspree.
 * TODO: add rate limiting (e.g. Vercel KV / Upstash) before launch.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot filled in => pretend success, send nothing
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const values: ContactValues = {
    name: str(body.name),
    contact: str(body.contact),
    service: str(body.service),
    message: str(body.message),
  };

  const errors = validateContact(values, serviceValues);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? `${siteConfig.name} <onboarding@resend.dev>`,
        to: [to],
        subject: `New enquiry: ${values.service} from ${values.name}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
<p><strong>Contact:</strong> ${escapeHtml(values.contact)}</p>
<p><strong>Service:</strong> ${escapeHtml(values.service)}</p>
<p><strong>Message:</strong></p><p>${escapeHtml(values.message).replace(/\n/g, "<br>")}</p>`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "Could not send" }, { status: 502 });
    }
  } else {
    // STUB
    console.info("[contact form — stub, no email sent]", values);
  }

  return NextResponse.json({ ok: true });
}
