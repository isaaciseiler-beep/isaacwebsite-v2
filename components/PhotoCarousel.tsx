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

// SECTION: shorter
const SECTION_HEIGHT_PX = 320; // ~50% shorter than before

// PHOTOS: taller
const PHOTO_HEIGHT_PX = Math.round(SECTION_HEIGHT_PX * 1.5);

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

  return (
    <div
      className="relative"
      style={{ height: SECTION_HEIGHT_PX }}
    >
      <div className="relative h-full -mx-6 sm:-mx-10">
        <div className="h-full overflow-hidden px-6 sm:px-10">
          <motion.div
            className="flex items-center gap-4 h-full"
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
                <article className="w-[256px] flex-shrink-0">
                  <div
                    className="relative w-full"
                    style={{ height: PHOTO_HEIGHT_PX }}
                  >
                    {item.image && (
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
                    )}

                    {/* pill INSIDE frame */}
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-black/65 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-sm">
                        {item.location}
                      </div>
                    </div>
                  </div>
                </article>
              );

              return item.href ? (
                <Link
                  key={key}
                  href={item.href}
                  className="block flex-shrink-0"
                >
                  {Card}
                </Link>
              ) : (
                <div key={key} className="block flex-shrink-0">
                  {Card}
                </div>
              );
            })}
          </motion.div>
        </div>

        {canPrev && (
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/90 sm:left-4"
          >
            <Chevron direction="left" />
          </button>
        )}

        {canNext && (
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/90 sm:right-4"
          >
            <Chevron direction="right" />
          </button>
        )}
      </div>
    </div>
  );
}
