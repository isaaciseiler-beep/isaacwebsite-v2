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

export default function StoryCarousel({ items }: { items: StoryItem[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, items.length - 1);
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

  if (items.length === 0) {
    return <div className="text-sm text-neutral-50/60">No items yet.</div>;
  }

  return (
    <div className="relative">
      {/* extend only to the right (matches logo buffers); no negative left margin */}
      <div className="relative -mr-6 sm:-mr-10">
        <div className="overflow-hidden pr-6 sm:pr-10">
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
            {items.map((item, i) => {
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
                        priority={i < 2}
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
                  <div key={`${item.title}-${i}`} className="block flex-shrink-0">
                    {Card}
                  </div>
                );
              }

              return (
                <Link
                  key={`${item.href}-${i}`}
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
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-black backdrop-blur transition hover:bg-white"
          >
            ←
          </button>
        )}

        {canNext && (
          <button
            type="button"
            aria-label="next"
            onClick={goNext}
            className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-black backdrop-blur transition hover:bg-white"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}

