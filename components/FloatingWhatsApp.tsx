"use client";

import { motion } from "framer-motion";
import { orderProvider } from "@/lib/order";
import { WhatsAppIcon } from "./Icons";

/** Floating live-chat button, bottom-right on every page. */
export function FloatingWhatsApp() {
  return (
    <motion.a
      href={orderProvider.getOrderUrl({})}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(0,0,0,.25)]"
    >
      <span aria-hidden className="animate-ring absolute inset-0 rounded-full bg-whatsapp" />
      <WhatsAppIcon width={30} height={30} className="relative" />
    </motion.a>
  );
}
