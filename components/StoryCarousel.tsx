// components/StoryCarousel.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export type StoryItem = {
  title: string;
  source?: string;
  image?: string;
  href?: string;
  openInNewTab?: boolean;
};

const CARD_W = 253;
const CARD_GAP = 16;

function Chevron({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M15 6L8.5 12 15 18" : "M9 6l6.5 6L9 18";
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-6 w-6 filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.28)]"
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export default function StoryCarousel({ items }: { items: StoryItem[] }) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const updateNav = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const sl = el.scrollLeft;
    setCanPrev(sl > 2);
    setCanNext(sl < maxScrollLeft - 2);
  }, []);

  React.useEffect(() => {
    updateNav();
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateNav();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateNav());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateNav, items.length]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (CARD_W + CARD_GAP), behavior: "smooth" });
  };

  if (items.length === 0) {
    return <div className="text-sm text-neutral-50/60">No items yet.</div>;
  }

  return (
    <div className="relative">
      <div className="relative -mx-6 sm:-mx-10">
        <div
          ref={scrollerRef}
          className="
            flex gap-4
            overflow-x-auto overflow-y-hidden
            px-6 sm:px-10
            scroll-smooth
            snap-x snap-mandatory
            overscroll-x-contain
            [touch-action:pan-y]
            [-ms-overflow-style:none] [scrollbar-width:none]
          "
          style={{ scrollPaddingLeft: 24, scrollPaddingRight: 24 }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {items.map((item, i) => {
            const Card = (
              <article className="h-[368px] w-[253px] overflow-hidden rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.18)] md:h-[414px] snap-start flex-shrink-0">
                <div className="relative h-full w-full">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="253px"
                      quality={90}
                      priority={i < 2}
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-200" />
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    {item.source && (
                      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">
                        {item.source}
                      </div>
                    )}
                    <h3 className="mt-2 text-sm font-semibold leading-snug text-white md:text-base">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </article>
            );

            if (!item.href) return <div key={`${item.title}-${i}`}>{Card}</div>;

            const external = isExternal(item.href);
            const openInNewTab = item.openInNewTab ?? (external ? true : false);

            return (
              <Link
                key={`${item.href}-${i}`}
                href={item.href}
                target={openInNewTab ? "_blank" : undefined}
                rel={openInNewTab ? "noopener noreferrer" : undefined}
                className="focus-visible:outline-none"
              >
                {Card}
              </Link>
            );
          })}
        </div>

        {canPrev && (
          <button
            type="button"
            aria-label="previous"
            onClick={() => scrollByCard(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 bg-transparent p-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Chevron direction="left" />
          </button>
        )}

        {canNext && (
          <button
            type="button"
            aria-label="next"
            onClick={() => scrollByCard(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 bg-transparent p-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Chevron direction="right" />
          </button>
        )}
      </div>
    </div>
  );
}
