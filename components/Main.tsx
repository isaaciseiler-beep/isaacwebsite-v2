// components/Main.tsx
"use client";

import { useEffect, useRef, useState } from "react";

import Brand from "./Brand";
import HeaderGradient from "./HeaderGradient";
import FooterGradient from "./FooterGradient";
import Footer from "./Footer";
import ParallaxDivider from "./ParallaxDivider";
import PhotoCarousel, { type PhotoItem } from "./PhotoCarousel";
import StoryCarousel, { type StoryItem } from "./StoryCarousel";

const R2_BASE = "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev";

const BIO_TEXT = [
  "I'm Isaac, a recent graduate of Washington University in St. Louis, Fulbright and Truman Scholar, and a member of OpenAI's ChatGPT Lab.",
  "I've managed programs on for a Member of Congress, published work with OpenAI, built a congressional office, founded my own consultancy, and led AI workshops for educators.",
  "I'm currently in the market for tech roles starting Summer 2026.",
];

const NEWS: StoryItem[] = [
  {
    source: "ChatGPT for Education",
    title: "Authored Substack Post on Education for OpenAI",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/chatlab.jpg`,
    href: "https://edunewsletter.openai.com/p/top-chats-from-the-fulbright-taiwan",
  },
  {
    source: "OpenAI",
    title: "Testimonial Featured in ChatGPT Pulse Launch",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/pulse.jpg`,
    href: "https://openai.com/index/introducing-chatgpt-pulse/",
  },
  {
    source: "OpenAI",
    title: "Study Mode Spotlight on ChatGPT's Instagram",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/study-mode.jpg`,
    href: "https://www.instagram.com/chatgpt/reel/DNyG5VvXEZM/",
  },
  {
    source: "Washington University in St. Louis",
    title: "Won 2024 Truman Scholarship",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/truman.jpg`,
    href: "https://source.washu.edu/2024/04/junior-seiler-awarded-truman-scholarship/",
  },
  {
    source: "OpenAI",
    title: "Co-Authored 100 Chats Project with the ChatGPT Lab",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/100chats.jpg`,
    href: "https://chatgpt.com/100chats-project",
  },
  {
    source: "Washington University in St. Louis",
    title: "Named 2024 Rhodes Scholarship Finalist",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/rhodes.jpg`,
    href: "https://source.washu.edu/2024/11/seniors-darden-seiler-were-rhodes-scholars-finalists/",
  },
  {
    source: "Washington University in St. Louis",
    title: "Won Fulbright Award to Taiwan",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/fulbright.jpg`,
    href: "https://source.wustl.edu/2025/06/several-alumni-earn-fulbright-awards/",
  },
  {
    source: "Student Life",
    title: "Truman Scholarship Interview",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/trumanisaac.jpg`,
    href: "https://www.studlife.com/news/2024/04/24/isaac-seiler-named-truman-scholar",
  },
  {
    source: "Forbes",
    title: "60 Truman Scholars Announced (2024)",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/harrytruman.jpg`,
    href: "https://www.forbes.com/sites/michaeltnietzel/2024/04/13/the-truman-scholars-for-2024-are-announced/",
  },
  {
    source: "Missouri College Media Awards",
    title: "Missouri College Media Awards",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/washuspring.png`,
    href: "https://source.washu.edu/2025/05/student-life-wins-best-newspaper-honor-at-missouri-college-media-awards/",
  },
  {
    source: "Washington University in St. Louis",
    title: "University Profile",
    image: `https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/wustl.jpg`,
    href: "https://artsci.washu.edu/ampersand/isaac-seiler-setting-his-sights-high",
  },
];

const PROJECTS: StoryItem[] = [
  { title: "Replace with a project name", source: "Project" },
  { title: "Replace with another project", source: "Project" },
  { title: "Replace with another project", source: "Project" },
];

const PHOTOS: PhotoItem[] = [
  { location: "New York" },
  { location: "St. Louis" },
  { location: "San Francisco" },
  { location: "Washington, D.C." },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-left text-4xl font-normal leading-none tracking-tight md:text-6xl">
      {children}
    </h2>
  );
}

export default function Main() {
  // bio anchors to bottom of its start frame unless it would rise above mid-viewport.
  const bioBlockRef = useRef<HTMLDivElement | null>(null);
  const [bioFlow, setBioFlow] = useState(false);

  useEffect(() => {
    const el = bioBlockRef.current;
    if (!el) return;

    const update = () => {
      const vh = window.innerHeight || 0;
      const h = el.getBoundingClientRect().height;
      setBioFlow(h > vh * 0.5);
    };

    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  return (
    <main className="min-h-[100svh] bg-neutral-900 text-neutral-50">
      <Brand />
      <HeaderGradient />
      <FooterGradient />

      {/* buffers align to logo edges */}
      <div className="w-full overflow-x-hidden px-6 sm:px-10 pt-[132px] md:pt-[152px] pb-16">
        {/* BIO (static text) */}
        <section
          id="bio"
          className="scroll-mt-24 flex min-h-[calc(100svh-180px)] flex-col md:min-h-[calc(100svh-210px)]"
        >
          <div
            ref={bioBlockRef}
            className={bioFlow ? "pt-[50svh] pb-2" : "mt-auto pb-2"}
          >
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

        {/* NEWS */}
        <section id="news" className="scroll-mt-24">
          <div className="mb-4">
            <SectionTitle>News</SectionTitle>
          </div>
          <StoryCarousel items={NEWS} />
        </section>

        <ParallaxDivider amount={22} />

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-24">
          <div className="mb-4">
            <SectionTitle>Projects</SectionTitle>
          </div>
          <StoryCarousel items={PROJECTS} />
        </section>

        <ParallaxDivider amount={-14} />

        {/* PHOTOS */}
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
