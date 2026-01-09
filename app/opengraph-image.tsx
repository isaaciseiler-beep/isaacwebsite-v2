// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { PREVIEW_IMAGE_URL } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export default async function OpenGraphImage() {
  const res = await fetch(PREVIEW_IMAGE_URL, { cache: "force-cache" });
  if (!res.ok) throw new Error(`failed to fetch og image: ${res.status}`);

  const buf = await res.arrayBuffer();
  const base64 = arrayBufferToBase64(buf);
  const dataUrl = `data:image/png;base64,${base64}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#000", display: "flex" }}>
        <img
          src={dataUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    ),
    size
  );
}
