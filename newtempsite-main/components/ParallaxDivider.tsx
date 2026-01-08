"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function ParallaxDivider({ amount = 18 }: { amount?: number }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = reduce ? 0 : useTransform(scrollY, [0, 1200], [0, amount]);

  return (
    <motion.div
      aria-hidden
      style={{ y }}
      className="my-10 flex w-full items-center justify-center"
    >
      <div className="flex items-center gap-2 text-black/35">
        <span className="h-[6px] w-[6px] rounded-full bg-black/30" />
        <span className="h-[2px] w-16 rounded-full bg-black/20" />
        <span className="h-[6px] w-[6px] rounded-full bg-black/30" />
      </div>
    </motion.div>
  );
}
