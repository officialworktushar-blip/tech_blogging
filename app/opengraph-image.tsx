import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#0b1220",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 18,
              height: 18,
              borderRadius: 9999,
              backgroundColor: "#2dd4bf",
              marginRight: 16,
            }}
          />
          <div
            style={{
              display: "flex",
              color: "#99f6e4",
              fontSize: 26,
              letterSpacing: 5,
            }}
          >
            PRACTICAL HELP, MINUS THE JARGON
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 100,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              color: "#cbd5e1",
              fontSize: 32,
              lineHeight: 1.4,
              marginTop: 20,
              maxWidth: 920,
            }}
          >
            Clear, step-by-step guides for Windows, software, email, internet,
            and security problems.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
