// components/PhotoCarousel.tsx (drop-in replacement)
"use client";

import Link from "next/link";
import * as React from "react";

export type PhotoItem = {
  image?: string;
  location: string;
  href?: string;
};

const CARD_H = 320;
const GAP = 16;

function Chevron({ direction }: { direction: "left" | "right" }) {
  const d =
    direction === "left" ? "M15 6L8.5 12 15 18" : "M9 6l6.5 6L9 18";
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

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PhotoCarousel({ items }: { items: PhotoItem[] }) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const shuffledItems = React.useMemo(() => shuffle(items), [items]);

  const updateNav = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const sl = el.scrollLeft;
    setCanPrev(sl > 2);
    setCanNext(sl < max - 2);
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
  }, [updateNav, shuffledItems.length]);

  const scrollByOne = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-photo-card]");
    const step = (first?.offsetWidth ?? 420) + GAP;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (shuffledItems.length === 0) {
    return <div className="text-sm text-neutral-50/60">No photos yet.</div>;
  }

  return (
    <div className="relative">
      {/* bleed into bezels, but keep content aligned via inner padding */}
      <div className="relative -mx-6 sm:-mx-10">
        <div
          ref={scrollerRef}
          className="
            photoScroller
            flex gap-4
            overflow-x-auto overflow-y-hidden
            px-6 sm:px-10
            snap-x snap-mandatory
            overscroll-x-contain
            scroll-smooth
            [-ms-overflow-style:none] [scrollbar-width:none]
          "
        >
          <style jsx>{`
            .photoScroller::-webkit-scrollbar {
              display: none;
            }
            .photoScroller {
              -webkit-overflow-scrolling: touch;
              /* allow both directions so vertical page scroll works over the carousel */
              touch-action: pan-x pan-y;
            }

            /* mobile: one card centered with peeks (uses full carousel real estate) */
            @media (max-width: 639px) {
              .photoScroller {
                --cardw: 82vw;
                /* clamp keeps the “start” feeling consistent while still centering the card */
                padding-left: clamp(16px, calc((100% - var(--cardw)) / 2), 40px);
                padding-right: clamp(
                  16px,
                  calc((100% - var(--cardw)) / 2),
                  40px
                );
                scroll-padding-left: clamp(
                  16px,
                  calc((100% - var(--cardw)) / 2),
                  40px
                );
                scroll-padding-right: clamp(
                  16px,
                  calc((100% - var(--cardw)) / 2),
                  40px
                );
              }
            }
          `}</style>

          {shuffledItems.map((item, i) => {
            const key = item.image ?? `${item.location}-${i}`;

            const Card = (
              <article
                data-photo-card
                className="
                  relative flex-shrink-0
                  snap-center sm:snap-start
                  overflow-hidden rounded-2xl
                  bg-white/5
                  shadow-[0_0_20px_rgba(0,0,0,0.14)]
                  w-[82vw] sm:w-max
                  max-w-[560px]
                "
                style={{ height: CARD_H }}
              >
                <div className="relative h-full w-full">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.location}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "block",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-200" />
                  )}

                  <div className="absolute bottom-3 right-3 z-20">
                    <div className="rounded-full bg-black/65 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-sm">
                      {item.location}
                    </div>
                  </div>
                </div>
              </article>
            );

            if (!item.href) return <div key={key}>{Card}</div>;

            return (
              <Link
                key={key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:outline-none"
              >
                {Card}
              </Link>
            );
          })}
        </div>

        {/* arrows hidden on mobile */}
        {canPrev && (
          <button
            type="button"
            aria-label="previous"
            onClick={() => scrollByOne(-1)}
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-transparent p-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Chevron direction="left" />
          </button>
        )}

        {canNext && (
          <button
            type="button"
            aria-label="next"
            onClick={() => scrollByOne(1)}
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-transparent p-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Chevron direction="right" />
          </button>
        )}
      </div>
    </div>
  );
}
