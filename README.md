# Kalamu Writers — marketing site (placeholder brand)

Next.js (App Router) · TypeScript · Tailwind v4 · Framer Motion · GSAP ScrollTrigger · Lenis

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build

## Where to change things
- **Business name, WhatsApp number, email, services, FAQs, samples, copy:** `config/site.ts` (single source of truth)
- **Colours, radius, spacing:** `app/globals.css` (`:root` tokens, marked `TODO: swap in real brand`)
- **Font:** `app/layout.tsx` (one `next/font` call)
- **Order / payment behaviour:** `lib/order.ts`. Every Order button asks `orderProvider` for a URL. To add Pesapal / ClickPesa / Selcom, implement `OrderProvider` there; no UI changes.
- **Form delivery:** `app/api/contact/route.ts`. Stub until `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (and `CONTACT_FROM_EMAIL`) are set.

## Env vars (Vercel)
`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`

## Before launch
Search for `PLACEHOLDER` and `TODO`: copy, stats, testimonials, samples, prices, address, map coordinates, logo, colours.

## Phase 2 (not built)
Blog / News, full shop with card checkout.
