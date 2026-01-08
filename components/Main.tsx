"use client";

import Brand from "./Brand";
import Footer from "./Footer";
import ParallaxDivider from "./ParallaxDivider";
import PhotoCarousel, { type PhotoItem } from "./PhotoCarousel";
import StoryCarousel, { type StoryItem } from "./StoryCarousel";

const R2_BASE = "https://pub-41d52824b0bb4f44898c39e1c3c63cb8.r2.dev";

const ABOUT =
  "I'm Isaac, a recent graduate of Washington University in St. Louis, Fulbright and Truman Scholar, and a member of ChatGPT Lab at OpenAI. I've directed a communications program on Capitol Hill, published work through OpenAI, set up a congressional office, run my own consultancy, and conducted AI workshops for educators. I'm currently in the market for tech roles starting Summer 2026.";

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

/**
 * note: keep these as-is if your real photo data is coming from elsewhere.
 * PhotoCarousel now supports item.image again, so your existing data should show.
 */
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
      <Brand />

      <div className="w-full overflow-x-hidden px-4 sm:px-6 pt-[132px] md:pt-[152px] pb-16">
        {/* about me */}
        <section
          id="about"
          className="scroll-mt-24 min-h-[calc(100svh-180px)] md:min-h-[calc(100svh-210px)] flex flex-col justify-end"
        >
          <div className="mb-3">
            <SectionTitle>About Me</SectionTitle>
          </div>

          {/* about text matches header size */}
          <p className="w-full text-4xl font-normal leading-[1.05] tracking-tight text-neutral-50/85 md:text-6xl">
            {ABOUT}
          </p>
        </section>

        {/* keep parallax motion but avoid big gaps; divider itself is invisible */}
        <ParallaxDivider amount={-18} />

        {/* news */}
        <section id="news" className="scroll-mt-24">
          <div className="mb-4">
            <SectionTitle>News</SectionTitle>
          </div>
          <StoryCarousel items={NEWS} />
        </section>

        <ParallaxDivider amount={22} />

        {/* projects */}
        <section id="projects" className="scroll-mt-24">
          <div className="mb-4">
            <SectionTitle>Projects</SectionTitle>
          </div>
          <StoryCarousel items={PROJECTS} />
        </section>

        <ParallaxDivider amount={-14} />

        {/* photos */}
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
