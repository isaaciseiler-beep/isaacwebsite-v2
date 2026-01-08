"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

export type PhotoItem = {
  image?: string;
  location: string;
  href?: string;
};

const CARD_WIDTH = 320;
const CARD_GAP = 16;

export default function PhotoCarousel({ items }: { items: PhotoItem[] }) {
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
    return <div className="text-sm text-neutral-50/60">No photos yet.</div>;
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
                <article className="w-[320px] overflow-hidden rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.14)]">
                  <div className="relative w-full aspect-video">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.location}
                        fill
                        className="object-cover"
                        sizes="320px"
                        priority={i < 2}
                      />
                    ) : (
                      <div className="h-full w-full bg-neutral-200" />
                    )}

                    <div className="absolute bottom-3 right-3">
                      <div className="rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[11px] font-medium text-black backdrop-blur-sm">
                        {item.location}
                      </div>
                    </div>
                  </div>
                </article>
              );

              if (!item.href) {
                return (
                  <div key={`${item.location}-${i}`} className="block flex-shrink-0">
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
