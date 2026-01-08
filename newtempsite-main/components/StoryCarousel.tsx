"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

export type StoryItem = {
  title: string;
  source?: string;
  image?: string;
  href?: string;
};

const CARD_WIDTH = 253;
const CARD_GAP = 16;

export default function StoryCarousel({
  items,
}: {
  items: StoryItem[];
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  const count = items.length;
  const maxIndex = Math.max(0, count - 1);
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const slideTransition = useMemo(
    () =>
      reduce
        ? { duration: 0 }
        : { duration: 0.45, ease: [0.4, 0.0, 0.2, 1] as any },
    [reduce]
  );

  const goPrev = () => setIndex((prev) => Math.max(0, prev - 1));
  const goNext = () => setIndex((prev) => Math.min(maxIndex, prev + 1));

  if (count === 0) {
    return (
      <div className="text-sm text-black/60">no items yet.</div>
    );
  }

  return (
    <div className="relative">
      {/* left fade only (no right bezel) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/70 to-transparent sm:w-16 md:w-20" />

      {/* cancel the page's right padding only for this scroller */}
      <div className="-mr-4 sm:-mr-6">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: -index * (CARD_WIDTH + CARD_GAP) }}
            transition={slideTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 && canNext) goNext();
              else if (info.offset.x > 60 && canPrev) goPrev();
            }}
          >
            {items.map((item, idx) => {
              const Card = (
                <article className="h-[368px] w-[253px] overflow-hidden rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.18)] md:h-[414px]">
                  <div className="relative h-full w-full">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="253px"
                        priority={idx < 2}
                      />
                    ) : (
                      <div className="h-full w-full bg-neutral-200" />
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-4 text-left">
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

              if (!item.href) {
                return (
                  <div
                    key={`${item.title}-${idx}`}
                    className="block flex-shrink-0"
                    aria-disabled="true"
                  >
                    {Card}
                  </div>
                );
              }

              return (
                <Link
                  key={`${item.href}-${idx}`}
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
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-black/60">
        <div className="flex items-center gap-2">
          <CarouselNavButton dir="left" onClick={goPrev} disabled={!canPrev} />
          <CarouselNavButton dir="right" onClick={goNext} disabled={!canNext} />
        </div>
        <span className="tabular-nums">
          {index + 1} / {count}
        </span>
      </div>
    </div>
  );
}

function CarouselNavButton({
  dir,
  onClick,
  disabled,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={dir === "left" ? "previous" : "next"}
      onClick={onClick}
      disabled={disabled}
      className={[
        "grid h-9 w-9 place-items-center text-xs transition-colors focus-visible:outline-none",
        disabled
          ? "cursor-not-allowed text-black/25"
          : "text-black/60 hover:text-black",
      ].join(" ")}
    >
      {dir === "left" ? "←" : "→"}
    </button>
  );
}
