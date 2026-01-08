// components/Menu.tsx — DROP-IN REPLACEMENT
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Key = "bio" | null;

const EASE_OUT = [0.2, 1, 0.2, 1] as const;

const bioHtml =
  "I&apos;m Isaac, a recent graduate of Washington University in St. Louis, Fulbright and Truman Scholar, and Member of ChatGPT Lab at OpenAI. I&apos;ve directed a communications program on Capitol Hill, published work through OpenAI, set up a congressional office, run my own consultancy, and conducted AI workshops for educators. I&apos;m currently in the market for tech roles starting summer 2026.";

const list = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT, staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const row = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

function UnderlineLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span>{children}</span>
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full",
          "origin-left scale-x-0 bg-white/95",
          "transition-transform duration-[520ms]",
          "[transition-timing-function:cubic-bezier(0.2,1,0.2,1)]",
          "group-hover:scale-x-100",
        ].join(" ")}
      />
    </span>
  );
}

function ArrowNE() {
  return (
    <span
      aria-hidden
      className={[
        "ml-2 inline-block select-none",
        "transition-transform duration-[520ms]",
        "[transition-timing-function:cubic-bezier(0.2,1,0.2,1)]",
        "group-hover:-translate-y-[2px] group-hover:translate-x-[2px]",
      ].join(" ")}
    >
      ↗
    </span>
  );
}

export default function Menu() {
  const [open, setOpen] = useState<Key>(null);

  const reset =
    "appearance-none bg-transparent border-0 outline-none ring-0 focus:outline-none focus:ring-0";
  const header =
    "font-sans font-normal tracking-[-0.02em] text-white text-left";
  const size = "text-xl sm:text-2xl leading-snug";
  const hit = "py-3 sm:py-4 w-full";

  return (
    <div className="w-full h-[100svh] flex items-center justify-center">
      <div className="w-full max-w-xl px-6 sm:px-10">
        <motion.ul className="w-full space-y-3" variants={list} initial="hidden" animate="show">
          {/* bio (expand only) */}
          <motion.li variants={row} className="w-full flex flex-col items-start">
            <button
              type="button"
              className={[reset, hit, header, size, "group"].join(" ")}
              onClick={() => setOpen(open === "bio" ? null : "bio")}
            >
              <UnderlineLabel>Bio</UnderlineLabel>
            </button>

            <AnimatePresence initial={false}>
              {open === "bio" && (
                <motion.div
                  key="bio"
                  className="w-full overflow-hidden"
                  initial={{ height: 0, opacity: 0, y: -8 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                >
                  <div className="pt-1 pb-4">
                    <div className="max-w-[52ch]">
                      <p
                        className="font-sans tracking-normal text-white/90 text-left text-sm sm:text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: bioHtml }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>

          {/* resume (direct download) */}
          <motion.li variants={row} className="w-full flex flex-col items-start">
            <a
              className={[hit, header, size, "group inline-flex items-center"].join(" ")}
              href="/resume.pdf"
              download
            >
              <UnderlineLabel>Resume</UnderlineLabel>
              <ArrowNE />
            </a>
          </motion.li>

          {/* linkedin */}
          <motion.li variants={row} className="w-full flex flex-col items-start">
            <a
              className={[hit, header, size, "group inline-flex items-center"].join(" ")}
              href="https://www.linkedin.com/in/isaacseiler/"
              target="_blank"
              rel="noreferrer"
            >
              <UnderlineLabel>LinkedIn</UnderlineLabel>
              <ArrowNE />
            </a>
          </motion.li>

          {/* contact */}
          <motion.li variants={row} className="w-full flex flex-col items-start">
            <a
              className={[hit, header, size, "group inline-flex items-center"].join(" ")}
              href="mailto:isaacseiler@gmail.com"
            >
              <UnderlineLabel>Contact</UnderlineLabel>
              <ArrowNE />
            </a>
          </motion.li>

          {/* pill — not clickable */}
          <motion.li variants={row} className="w-full pt-4">
            <div
              className={[
                "group relative inline-flex items-center justify-center",
                "rounded-full px-6 py-3",
                "bg-white text-black",
                "font-sans font-semibold tracking-[0.14em]",
                "text-xs sm:text-sm uppercase",
                "overflow-hidden select-none",
                "pointer-events-none",
              ].join(" ")}
            >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute -inset-8"
                  style={{
                    background:
                      "radial-gradient(140% 220% at 0% 60%, rgba(255,255,255,0.55), transparent 65%)",
                    filter: "blur(18px)",
                  }}
                  initial={{ x: "-18%" }}
                  animate={{ x: ["-18%", "26%"] }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -inset-10"
                  style={{
                    background:
                      "radial-gradient(130% 210% at 100% 40%, rgba(0,0,0,0.08), transparent 65%)",
                    filter: "blur(20px)",
                  }}
                  initial={{ x: "20%", y: "-6%" }}
                  animate={{ x: ["20%", "-10%"], y: ["-6%", "6%"] }}
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <span className="relative z-10">NEW SITE COMING SOON</span>

              <style jsx>{`
                .group:hover div[aria-hidden="true"] {
                  opacity: 1 !important;
                }
              `}</style>
            </div>
          </motion.li>
        </motion.ul>
      </div>
    </div>
  );
}
