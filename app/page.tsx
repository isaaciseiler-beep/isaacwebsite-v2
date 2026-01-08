// app/page.tsx — DROP-IN REPLACEMENT
import { Suspense } from "react";
import Main from "@/components/Main";
import {
  EMAIL,
  LINKEDIN_URL,
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PERSON_NAME,
        url: SITE_URL,
        email: `mailto:${EMAIL}`,
        sameAs: [LINKEDIN_URL],
      },
    ],
  };

  return (
    <>
      {/* seo: ensure a real h1 exists (visually hidden) */}
      <h1 className="sr-only">{SITE_NAME}</h1>

      {/* seo: structured data */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={null}>
        <Main />
      </Suspense>
    </>
  );
}

