"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Brand from "./Brand";
import Footer from "./Footer";
import ParallaxDivider from "./ParallaxDivider";
import PhotoCarousel, { type PhotoItem } from "./PhotoCarousel";
import StoryCarousel, { type StoryItem } from "./StoryCarousel";

const R2_BASE = "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev";

const BIO_SENTENCES = [
  "I'm Isaac, a recent graduate of Washington University in St. Louis, Fulbright and Truman Scholar, and a member of ChatGPT Lab at OpenAI.",
  "I've directed a communications program on Capitol Hill, published work through OpenAI, set up a congressional office, run my own consultancy, and conducted AI workshops for educators.",
  "I'm currently in the market for tech roles starting Summer 2026.",
];

const NEWS: StoryItem[] = [
  {
    source: "OpenAI",
    title: "ChatGPT Pulse Launch",
    image: `${R2_BASE}/image/news/chatgpt-pulse.png`,
    href: "https://openai.com/index/introducing-chatgpt-pulse/",
  },
  {
    source: "ChatGPT",
    title: "ChatGPT Instagram Spotlight",
    image: `${R2_BASE}/image/news/chatgpt-instagram.png`,
    href: "https://www.instagram.com/chatgpt/reel/DNyG5VvXEZM/",
  },
  {
    source: "ChatGPT",
    title: "ChatGPT Pulse – 100 Chats Project",
    image: `${R2_BASE}/image/news/100-chats.png`,
    href: "https://chatgpt.com/100chats-project",
  },
  {
    source: "Washington University in St. Louis",
    title: "Michigan Truman Scholarship",
    image: `${R2_BASE}/image/news/truman.png`,
    href: "https://source.washu.edu/2024/04/junior-seiler-awarded-truman-scholarship/",
  },
  {
    source: "Washington University in St. Louis",
    title: "Fulbright to Taiwan",
    image: `${R2_BASE}/image/news/fulbright.png`,
    href: "https://source.wustl.edu/2025/06/several-alumni-earn-fulbright-awards/",
  },
  {
    source: "Truman Foundation",
    title: "Truman Scholarship Q&A",
    image: `${R2_BASE}/image/news/truman-qa.png`,
  },
  {
    source: "Truman Foundation",
    title: "60 Truman Scholars Announced (2024)",
    image: `${R2_BASE}/image/news/truman-cohort.png`,
  },
  {
    source: "Missouri College Media Awards",
    title: "Missouri College Media Awards",
    image: `${R2_BASE}/image/news/mcma.png`,
  },
  {
    source: "Washington University in St. Louis",
    title: "University Profile",
    image: `${R2_BASE}/image/news/washu-profile.png`,
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
  const bioRef = useRef<HTMLElement | null>(null);

  // progress scoped to the bio section, so fades feel “attached” to that block
  const { scrollYProgress } = useScroll({
    target: bioRef,
    offset: ["start end", "end start"],
  });

  // tuned fade windows (dark grey → white)
  const bioColor2 = useTransform(
    scrollYProgress,
    [0.28, 0.58],
    ["#52525b", "#ffffff"] // zinc-600 → white
  );
  const bioColor3 = useTransform(
    scrollYProgress,
    [0.42, 0.78],
    ["#52525b", "#ffffff"]
  );

  return (
    <main className="min-h-[100svh] bg-neutral-900 text-neutral-50">
      <Brand />

      {/* buffers match logo: px-6 sm:px-10 */}
      <div className="w-full overflow-x-hidden px-6 sm:px-10 pt-[132px] md:pt-[152px] pb-16">
        {/* BIO (no header) */}
        <section
          id="bio"
          ref={bioRef as any}
          className="scroll-mt-24 min-h-[calc(100svh-180px)] md:min-h-[calc(100svh-210px)]"
        >
          {/* starts around midway down the first frame */}
          <div className="pt-[30svh] md:pt-[28svh]">
            <div className="space-y-3">
              <p className="w-full text-2xl md:text-4xl leading-[1.15] tracking-tight text-white">
                {BIO_SENTENCES[0]}
              </p>

              <motion.p
                style={{ color: bioColor2 }}
                className="w-full text-2xl md:text-4xl leading-[1.15] tracking-tight"
              >
                {BIO_SENTENCES[1]}
              </motion.p>

              <motion.p
                style={{ color: bioColor3 }}
                className="w-full text-2xl md:text-4xl leading-[1.15] tracking-tight"
              >
                {BIO_SENTENCES[2]}
              </motion.p>
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
