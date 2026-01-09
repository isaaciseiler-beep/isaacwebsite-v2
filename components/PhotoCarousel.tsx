// components/PhotoCarousel.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export type PhotoItem = {
  image?: string;
  location: string;
  href?: string;
};

const CARD_WIDTH = 256;
const CARD_GAP = 16;

// was 420; +50% taller
const PHOTO_HEIGHT_PX = 630;

function Chevron({ direction }: { direction: "left" | "right" }) {
  const d =
    direction === "left"
      ? "M15 6L8.5 12 15 18"
      : "M9 6l6.5 6L9 18";

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
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  const shuffledItems = useMemo(() => shuffle(items), [items]);

  useEffect(() => {
    setIndex(0);
  }, [shuffledItems.length]);

  const maxIndex = Math.max(0, shuffledItems.length - 1);
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const transition = useMemo(
    () =>
      reduce
        ? { duration: 0 }
        : { duration: 0.45, ease: [0.4, 0, 0.2, 1] as any },
    [reduce]
  );

  const goPrev = () => setIndex((v) => Math.max(0, v - 1));
  const goNext = () => setIndex((v) => Math.min(maxIndex, v + 1));

  if (shuffledItems.length === 0) {
    return <div className="text-sm text-neutral-50/60">No photos yet.</div>;
  }

  return (
    <div className="relative">
      <div className="relative -mx-6 sm:-mx-10">
        <div className="overflow-hidden px-6 sm:px-10">
          <motion.div
            className="flex gap-4"
            animate={{ x: -index * (CARD_WIDTH + CARD_GAP) }}
            transition={transition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 && canNext) goNext();
              else if (info.offset.x > 60 && canPrev) goPrev();
            }}
          >
            {shuffledItems.map((item, i) => {
              const key = item.image ?? `${item.location}-${i}`;

              const Card = (
                <article
                  className="w-[256px] bg-transparent"
                  style={{ height: PHOTO_HEIGHT_PX }}
                >
                  {/* photo frame */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: PHOTO_HEIGHT_PX }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.location}
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                        style={{
                          height: PHOTO_HEIGHT_PX,
                          width: "auto",
                          maxWidth: "100%",
                          display: "block",
                          marginInline: "auto",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <div className="h-full w-full bg-neutral-200" />
                    )}

                    {/* inside bottom-right of photo frame */}
                    <div className="absolute bottom-3 right-3">
                      <div className="rounded-full bg-black/75 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
                        {item.location}
                      </div>
                    </div>
                  </div>
                </article>
              );

              if (!item.href) {
                return (
                  <div key={key} className="block flex-shrink-0">
                    {Card}
                  </div>
                );
              }

              return (
                <Link
                  key={key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block flex-shrink-0 focus-visible:outline-none"
                >
                  {Card}
                </Link>
              );
            })}
          </motion.div>
        </div>

        {canPrev && (
          <button
            type="button"
            aria-label="previous"
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent p-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:left-4"
          >
            <Chevron direction="left" />
          </button>
        )}

        {canNext && (
          <button
            type="button"
            aria-label="next"
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent p-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-4"
          >
            <Chevron direction="right" />
          </button>
        )}
      </div>
    </div>
  );
}
