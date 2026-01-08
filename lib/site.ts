// lib/site.ts

export const PERSON_NAME = "Isaac Seiler";
export const SITE_NAME = PERSON_NAME;

// keep this short (150–160 chars target)
export const SITE_DESCRIPTION =
  "Isaac Seiler’s site: bio, news, projects, and photos.";

export const EMAIL = "isaacseiler@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/isaacseiler/";

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  return withProtocol.replace(/\/+$/, "");
}

// set NEXT_PUBLIC_SITE_URL in vercel/env for correct canonical + sitemap + OG urls
export const SITE_URL = (() => {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  return envUrl ? normalizeUrl(envUrl) : "http://localhost:3000";
})();

export const SITE_HOST = (() => {
  try {
    return new URL(SITE_URL).host;
  } catch {
    return SITE_URL;
  }
})();

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
