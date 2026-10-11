# Kalamu Writers — marketing site (placeholder brand)

Three pages: **Home** (services, process, FAQ), **Services** (hero + pinned horizontal service gallery, payments), **Contact** (WhatsApp, phone and email; no form). Customers reach the business by WhatsApp or phone.

Next.js (App Router) · TypeScript · Tailwind v4 · Framer Motion · GSAP ScrollTrigger · Lenis

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build

## Where to change things
- **Business name, WhatsApp number, email, services, FAQs, copy:** `config/site.ts` (single source of truth)
- **Colours, radius, spacing:** `app/globals.css` (`:root` tokens, marked `TODO: swap in real brand`)
- **Font:** `app/layout.tsx` (one `next/font` call)
- **Order / payment behaviour:** `lib/order.ts`. Every Order button asks `orderProvider` for a URL. To add Pesapal / ClickPesa / Selcom, implement `OrderProvider` there; no UI changes.
- **Images:** `public/images` (WebP). Service images are set per service in `config/site.ts`; page images are constants at the top of each page/component.

## Env vars (Vercel)
`NEXT_PUBLIC_SITE_URL`: the production domain (used for metadata, sitemap and share images).

## Before launch
Search for `PLACEHOLDER` and `TODO`: brand name, logo, final images and video, Instagram link, street address and opening hours (not shown until added).

## Phase 2 (not built)
Blog / News, full shop with card checkout.
