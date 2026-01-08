// components/Main.tsx
"use client";

import { Suspense } from "react";

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
  "I've managed programs on for a Member of Congress, published work with OpenAI, built a congressional office, founded my own consultancy, and led AI workshops for educators.",
  "I'm currently in the market for tech roles starting Summer 2026.",
];

const NEWS: StoryItem[] = [
  {
    source: "ChatGPT for Education",
    title: "Authored Substack Post on Education for OpenAI",
    image: "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/chatlab.jpg",
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
    image: "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev/press/study-mode.jpg",
    href: "https://www.instagram.com/chatgpt/reel/DNyG5VvXEZM/",
  },
];

const PROJECTS: StoryItem[] = PROJECT_TEMPLATES.map((p) => ({
  title: p.title,
  source: p.source ?? "Project",
  // vertical cover placeholder (one per project, no real images yet)
  image: `/image/projects/${p.slug}-cover.jpg`,
  href: `/?project=${encodeURIComponent(p.slug)}#projects`,
  openInNewTab: false,
}));

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
  return (
    <main className="min-h-[100svh] bg-neutral-900 text-neutral-50">
      {/* required for useSearchParams in ProjectModal */}
      <Suspense fallback={null}>
        <ProjectModal />
      </Suspense>

      <Brand />
      <HeaderGradient />
      <FooterGradient />

      <div className="w-full overflow-x-hidden px-6 sm:px-10 pt-[132px] md:pt-[152px] pb-16">
        {/* BIO */}
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
