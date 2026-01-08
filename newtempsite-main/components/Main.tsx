"use client";

import Brand from "./Brand";
import Footer from "./Footer";
import ParallaxDivider from "./ParallaxDivider";
import PhotoCarousel, { type PhotoItem } from "./PhotoCarousel";
import StoryCarousel, { type StoryItem } from "./StoryCarousel";

const BIO =
  "i'm isaac, a recent graduate of washington university in st. louis, fulbright and truman scholar, and member of chatgpt lab at openai. i've directed a communications program on capitol hill, published work through openai, set up a congressional office, run my own consultancy, and conducted ai workshops for educators. i'm currently in the market for tech roles starting summer 2026.";

const NEWS: StoryItem[] = [
  {
    source: "press",
    title: "replace with your latest news item",
    image: "/placeholders/story.svg",
    href: "https://example.com",
  },
  {
    source: "press",
    title: "replace with another headline",
    image: "/placeholders/story.svg",
    href: "https://example.com",
  },
  {
    source: "press",
    title: "replace with another headline",
    image: "/placeholders/story.svg",
  },
];

const PROJECTS: StoryItem[] = [
  {
    source: "project",
    title: "replace with a project name",
    image: "/placeholders/story.svg",
    href: "https://example.com",
  },
  {
    source: "project",
    title: "replace with another project",
    image: "/placeholders/story.svg",
  },
  {
    source: "project",
    title: "replace with another project",
    image: "/placeholders/story.svg",
  },
];

const PHOTOS: PhotoItem[] = [
  { location: "new york", image: "/placeholders/photo.svg" },
  { location: "st. louis", image: "/placeholders/photo.svg" },
  { location: "san francisco", image: "/placeholders/photo.svg" },
  { location: "dc", image: "/placeholders/photo.svg" },
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
    <main className="min-h-[100svh] bg-white text-black">
      <Brand />

      {/* prevent any horizontal overflow / sideways page scroll */}
      <div className="-mx-4 sm:-mx-6 overflow-x-hidden">
        <div className="w-full px-4 sm:px-6 pt-[132px] md:pt-[152px] pb-16">
          {/* bio */}
          <section id="bio" className="scroll-mt-24">
            <div className="mb-4 md:mb-5">
              <SectionTitle>Bio</SectionTitle>
            </div>
            <div className="max-w-[62ch]">
              <p className="text-sm leading-relaxed text-black/80 sm:text-base">
                {BIO}
              </p>
            </div>
          </section>

          <ParallaxDivider amount={-18} />

          {/* news feed */}
          <section id="news" className="scroll-mt-24">
            <div className="mb-4 md:mb-5">
              <SectionTitle>News</SectionTitle>
            </div>
            <div className="mb-2">
              <StoryCarousel items={NEWS} />
            </div>
          </section>

          <ParallaxDivider amount={22} />

          {/* projects */}
          <section id="projects" className="scroll-mt-24">
            <div className="mb-4 md:mb-5">
              <SectionTitle>Projects</SectionTitle>
            </div>
            <div className="mb-2">
              <StoryCarousel items={PROJECTS} />
            </div>
          </section>

          <ParallaxDivider amount={-14} />

          {/* photos */}
          <section id="photos" className="scroll-mt-24">
            <div className="mb-4 md:mb-5">
              <SectionTitle>Photos</SectionTitle>
            </div>
            <div className="mb-2">
              <PhotoCarousel items={PHOTOS} />
            </div>
          </section>

          <ParallaxDivider amount={18} />

          {/* footer */}
          <Footer />
        </div>
      </div>
    </main>
  );
}
