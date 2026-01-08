// components/Brand.tsx (drop-in replacement)
"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function Brand() {
  const searchParams = useSearchParams();
  const isModalOpen = Boolean(searchParams.get("project"));

  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="relative w-full px-6 sm:px-10 pt-6 sm:pt-8">
        <div className="absolute left-6 sm:left-10 top-6 sm:top-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={
              isModalOpen
                ? { opacity: 0, y: -10 }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="block font-sans font-semibold text-white tracking-[-0.04em] leading-none text-[clamp(64px,9.75vw,168px)]"
          >
            Isaac
          </motion.span>
        </div>

        <div className="absolute right-6 sm:right-10 top-6 sm:top-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={
              isModalOpen
                ? { opacity: 0, y: -10 }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.22, ease: "easeOut", delay: 0.02 }}
            className="block font-sans font-semibold text-white tracking-[-0.04em] leading-none text-[clamp(64px,9.75vw,168px)]"
          >
            Seiler
          </motion.span>
        </div>
      </div>
    </div>
  );
}

