// app/opengraph-image.tsx

import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_HOST, SITE_NAME } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          color: "#000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.06em",
              lineHeight: 1,
            }}
          >
            {SITE_NAME}
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.25,
              color: "rgba(0,0,0,0.72)",
              maxWidth: 960,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div style={{ fontSize: 22, color: "rgba(0,0,0,0.45)" }}>
          {SITE_HOST}
        </div>
      </div>
    ),
    size
  );
}
