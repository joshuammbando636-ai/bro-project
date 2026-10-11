"use client";

import { useState } from "react";

/** Copies `value` to the clipboard; the label flips to "Copied" for a moment. */
export function CopyButton({ value, label = "Copy", className = "" }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (old browser / insecure context): the address is still visible to copy by hand
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`rounded-md px-1.5 py-0.5 text-xs text-muted ring-1 ring-line transition-colors hover:bg-ink hover:text-white ${className}`}
    >
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
