// components/Main.tsx
"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Brand from "./Brand";
import HeaderGradient from "./HeaderGradient";
import FooterGradient from "./FooterGradient";
import Footer from "./Footer";
import ParallaxDivider from "./ParallaxDivider";
import PhotoCarousel, { type PhotoItem } from "./PhotoCarousel";
import StoryCarousel, { type StoryItem } from "./StoryCarousel";
import ProjectModal, { PROJECT_TEMPLATES } from "./ProjectModal";

const BIO_TEXT = [
  "I'm Isaac, a recent graduate of Washington University in St. Louis, Fulbright and Truman Scholar, and a member of OpenAI's ChatGPT Lab.",
  "I've managed the communications program for a Member of Congress, published work with OpenAI, built a congressional office, founded my own consultancy, and led AI workshops for educators.",
  "I'm currently in the market for tech roles starting Summer 2026.",
];

const NEWS: StoryItem[] = [
  {
    source: "ChatGPT for Education",
    title: "Authored Substack Post on Education for OpenAI",
    image:
      "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/chatlab.jpg",
    href: "https://edunewsletter.openai.com/p/top-chats-from-the-fulbright-taiwan",
  },
  {
    source: "OpenAI",
    title: "Testimonial Featured in ChatGPT Pulse Launch",
    image: "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/pulse.jpg",
    href: "https://openai.com/index/introducing-chatgpt-pulse/",
  },
  {
    source: "OpenAI",
    title: "Study Mode Spotlight on ChatGPT's Instagram",
    image:
      "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/study-mode.jpg",
    href: "https://www.instagram.com/chatgpt/reel/DNyG5VvXEZM/",
  },
  {
    source: "Washington University in St. Louis",
    title: "Won 2024 Truman Scholarship",
    image:
      "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/truman.jpg",
    href: "https://source.washu.edu/2024/04/junior-seiler-awarded-truman-scholarship/",
  },
  {
    source: "OpenAI",
    title: "Co-Authored 100 Chats Project with the ChatGPT Lab",
    image:
      "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/100chats.jpg",
    href: "https://chatgpt.com/100chats-project",
    openInNewTab: false,
  },
  {
    source: "Washington University in St. Louis",
    title: "Named 2024 Rhodes Scholarship Finalist",
    image:
      "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/rhodes.jpg",
    href: "https://source.washu.edu/2024/11/seniors-darden-seiler-were-rhodes-scholars-finalists/",
  },
  {
    source: "Washington University in St. Louis",
    title: "Won Fulbright Award to Taiwan",
    image:
      "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/fulbright.jpg",
    href: "https://source.wustl.edu/2025/06/several-alumni-earn-fulbright-awards/",
  },
  {
    source: "Student Life",
    title: "Truman Scholarship Interview",
    image:
      "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/trumanisaac.jpg",
    href: "https://www.studlife.com/news/2024/04/24/isaac-seiler-named-truman-scholar",
  },
  {
    source: "Forbes",
    title: "60 Truman Scholars Announced (2024)",
    image:
      "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/harrytruman.jpg",
    href: "https://www.forbes.com/sites/michaeltnietzel/2024/04/13/the-truman-scholars-for-2024-are-announced/",
  },
  {
    source: "Missouri College Media Awards",
    title: "Won Award for Best College Newspaper Photography",
    image:
      "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/washuspring.png",
    href: "https://source.washu.edu/2025/05/student-life-wins-best-newspaper-honor-at-missouri-college-media-awards/",
  },
  {
    source: "Washington University in St. Louis",
    title: "University Profile",
    image:
      "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/wustl.jpg",
    href: "https://artsci.washu.edu/ampersand/isaac-seiler-setting-his-sights-high",
  },
];

const PROJECT_CARD_ORDER: { slug: string; image: string }[] = [
  {
    slug: "artificial-intelligence-in-state-government-index",
    image:
      "https://pub-b7a958248070423db848a79644c934ea.r2.dev/9.aiindex.jpg",
  },
  {
    slug: "congressional-office-setup-100-day-report",
    image:
      "https://pub-b7a958248070423db848a79644c934ea.r2.dev/1.congressionaloffice.jpg",
  },
  {
    slug: "senior-thesis-local-journalism",
    image:
      "https://pub-b7a958248070423db848a79644c934ea.r2.dev/2.thesis.jpg",
  },
  {
    slug: "electric-vehicle-access-analysis",
    image:
      "https://pub-b7a958248070423db848a79644c934ea.r2.dev/3.ev.jpg",
  },
  {
    slug: "communications-consultancy-supporting-local-candidates",
    image:
      "https://pub-b7a958248070423db848a79644c934ea.r2.dev/7.consultancy.jpg",
  },
  {
    slug: "fulbright-focus-group-sponsored-by-openai",
    image:
      "https://pub-b7a958248070423db848a79644c934ea.r2.dev/6.cgptlab.jpg",
  },
  {
    slug: "political-reporting-at-washu",
    image:
      "https://pub-b7a958248070423db848a79644c934ea.r2.dev/10.washureport.jpg",
  },
  {
    slug: "boehringer-cares-foundation-rebrand-strategy-shift",
    image:
      "https://pub-b7a958248070423db848a79644c934ea.r2.dev/5.bicf.jpg",
  },
  {
    slug: "2022-institute-for-nonprofit-news-index-survey",
    image: "https://pub-b7a958248070423db848a79644c934ea.r2.dev/8.inn.jpg",
  },
  {
    slug: "exclusive-interview-with-high-visibility-congressperson",
    image:
      "https://pub-b7a958248070423db848a79644c934ea.r2.dev/11.calvinreport.jpg",
  },
  {
    slug: "sustainable-development-health-access-report",
    image:
      "https://pub-b7a958248070423db848a79644c934ea.r2.dev/4.healthaccess.jpg",
  },
];

const PROJECTS: StoryItem[] = PROJECT_CARD_ORDER.map(({ slug, image }) => {
  const p = PROJECT_TEMPLATES.find((x) => x.slug === slug);
  return {
    title: p?.title ?? slug,
    source: p?.source ?? "Project",
    image,
    href: `/?project=${encodeURIComponent(slug)}`,
    openInNewTab: false,
  };
});

// UPDATED: photos section content (shuffled on each page load by PhotoCarousel)
const PHOTOS: PhotoItem[] = [
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_1.JPG",
    location: "Christchurch, New Zealand",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_10.JPG",
    location: "Banli, Taiwan",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_11.JPG",
    location: "Aoraki National Park",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_12.JPG",
    location: "Las Palmas de Gran Canaria, Spain",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_13.JPG",
    location: "Djúpivogur, Iceland",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_14.JPG",
    location: "Las Palmas de Gran Canaria, Spain",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_15.JPG",
    location: "Qiaozi Village, Taiwan",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_16.jpg",
    location: "Bitou Cape, Taiwan",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_17.JPG",
    location: "Vik, Iceland",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_18.JPG",
    location: "Keelung, Taiwan",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_19.JPG",
    location: "Aoraki National Park",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_2.JPG",
    location: "Beigan, Taiwan",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_20.JPG",
    location: "Lienchiang County, Taiwan",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_21.JPG",
    location: "Cass Bay, New Zealand",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_22.JPG",
    location: "Lienchiang County, Taiwan",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_3.JPG",
    location: "Whataroa, New Zealand",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_4.JPG",
    location: "Goose Bay, New Zealand",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_5.JPG",
    location: "Beigan, Taiwan",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_6.JPG",
    location: "Reykjavík, Iceland",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_7.JPG",
    location: "Milford Sound, New Zealand",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_8.JPG",
    location: "Reykjavík, Iceland",
  },
  {
    image: "https://pub-d64d861253704466b2766bacee500351.r2.dev/pic_9.JPG",
    location: "Stokksnes, Iceland",
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-left text-4xl font-normal leading-none tracking-tight md:text-6xl">
      {children}
    </h2>
  );
}

function ProjectLinkInterceptor() {
  const router = useRouter();

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;

      const hrefAttr = a.getAttribute("href") || "";
      if (!hrefAttr) return;

      let url: URL;
      try {
        url = new URL(hrefAttr, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (!url.searchParams.has("project")) return;

      sessionStorage.setItem("__project_bg_y__", String(window.scrollY || 0));

      e.preventDefault();
      e.stopPropagation();

      router.replace(url.pathname + url.search, { scroll: false });
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [router]);

  return null;
}

function ScrollRestoreOnClose() {
  const searchParams = useSearchParams();
  const isOpen = Boolean(searchParams.get("project"));
  const prevOpenRef = useRef(isOpen);

  useEffect(() => {
    const prev = prevOpenRef.current;
    prevOpenRef.current = isOpen;

    if (!prev || isOpen) return;

    const raw =
      sessionStorage.getItem("__project_restore_y__") ??
      sessionStorage.getItem("__project_bg_y__");

    if (!raw) return;

    const y = Number(raw);
    sessionStorage.removeItem("__project_restore_y__");

    const apply = () => {
      window.scrollTo({
        top: Number.isFinite(y) ? y : 0,
        left: 0,
        behavior: "auto",
      });
    };

    requestAnimationFrame(() => {
      apply();
      requestAnimationFrame(apply);
    });
    setTimeout(apply, 0);
    setTimeout(apply, 50);
  }, [isOpen]);

  return null;
}

export default function Main() {
  return (
    <main className="min-h-[100svh] bg-neutral-900 text-neutral-50">
      <ProjectLinkInterceptor />

      <Suspense fallback={null}>
        <ScrollRestoreOnClose />
      </Suspense>

      <Suspense fallback={null}>
        <ProjectModal />
      </Suspense>

      <Brand />
      <HeaderGradient />
      <FooterGradient />

      <div className="w-full overflow-x-hidden px-6 sm:px-10 pt-[132px] md:pt-[152px] pb-16">
        <section
          id="bio"
          className="scroll-mt-24 min-h-[calc(100svh-180px)] md:min-h-[calc(100svh-210px)]"
        >
          <div className="pt-[30svh] md:pt-[28svh]">
            <div className="space-y-3">
              {BIO_TEXT.map((line, i) => (
                <p
                  key={i}
                  className="w-full text-2xl md:text-4xl leading-[1.15] tracking-tight text-white"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        <ParallaxDivider amount={-18} />

        <section id="news" className="scroll-mt-24">
          <div className="mb-4">
            <SectionTitle>News</SectionTitle>
          </div>
          <StoryCarousel items={NEWS} />
        </section>

        <ParallaxDivider amount={22} />

        <section id="projects" className="scroll-mt-24">
          <div className="mb-4">
            <SectionTitle>Projects</SectionTitle>
          </div>
          <StoryCarousel items={PROJECTS} />
        </section>

        <ParallaxDivider amount={-14} />

        <section id="photos" className="scroll-mt-24">
          <div className="mb-4">
            <SectionTitle>Photos</SectionTitle>
          </div>
          <PhotoCarousel items={PHOTOS} />
        </section>

        <ParallaxDivider amount={18} />

        <Footer />
      </div>
    </main>
  );
}
