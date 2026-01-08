"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function Brand() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // +10% at top, then -25% once scrolling (net 0.825 vs original size)
  const scale = reduce ? 1.1 : useTransform(scrollY, [0, 220], [1.1, 0.825]);

  const base =
    "block font-sans font-semibold tracking-[-0.04em] leading-none text-[clamp(70px,9.9vw,132px)]";
  const xray = "text-white mix-blend-difference";

  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="relative w-full px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="absolute left-4 sm:left-6 top-4 sm:top-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.2, 1, 0.2, 1] }}
            style={{ scale, transformOrigin: "0% 0%" }}
            className={[base, xray].join(" ")}
          >
            Isaac
          </motion.span>
        </div>

        <div className="absolute right-4 sm:right-6 top-4 sm:top-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.2, 1, 0.2, 1], delay: 0.03 }}
            style={{ scale, transformOrigin: "100% 0%" }}
            className={[base, xray].join(" ")}
          >
            Seiler
          </motion.span>
        </div>
      </div>
    </div>
  );
}
