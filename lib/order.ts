import { siteConfig, type ServiceSlug } from "@/config/site";

/**
 * ORDER / PAYMENT SEAM
 *
 * v1 has no card checkout (Stripe is unavailable in Tanzania). Every "Order"
 * button in the UI asks `orderProvider` for a URL, so the UI never knows how
 * the order is actually taken.
 *
 * To add a real gateway later (Pesapal / ClickPesa / Selcom):
 *   1. Implement `OrderProvider` below (e.g. a route that creates a payment
 *      session and returns its hosted-checkout URL).
 *   2. Point `orderProvider` at it. No component changes needed.
 */
export interface OrderRequest {
  service?: ServiceSlug;
  /** Free text the customer already typed (e.g. from the contact form) */
  note?: string;
}

export interface OrderProvider {
  id: string;
  /** `external` opens in a new tab (WhatsApp / hosted checkout) */
  getOrderUrl(req: OrderRequest): string;
}

export function whatsappUrl(message: string = siteConfig.defaultOrderMessage) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const telUrl = () => siteConfig.contact.phoneHref;

function orderMessage({ service, note }: OrderRequest) {
  if (!service) return note ? `${siteConfig.defaultOrderMessage}\n\n${note}` : siteConfig.defaultOrderMessage;
  const s = siteConfig.services.find((x) => x.slug === service);
  const base = `Hello ${siteConfig.shortName}! I'd like to order ${s?.audience ?? "a document"}. Please share the next steps and a quote.`;
  return note ? `${base}\n\n${note}` : base;
}

// TODO: swap in a real payment gateway provider when available
export const whatsappProvider: OrderProvider = {
  id: "whatsapp-mobile-money",
  getOrderUrl: (req) => whatsappUrl(orderMessage(req)),
};

export const orderProvider: OrderProvider = whatsappProvider;
