import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// TODO: swap in real brand — colours here mirror the CSS tokens in globals.css
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f4",
          padding: 80,
          color: "#12201d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 800 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#0e6b5b" }} />
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
          <span>Words that get you</span>
          <span style={{ color: "#0e6b5b" }}>accepted, funded and hired.</span>
        </div>
        <div style={{ fontSize: 30, color: "#4a5652" }}>Research papers · CVs · Proposals · Business plans</div>
      </div>
    ),
    size,
  );
}
