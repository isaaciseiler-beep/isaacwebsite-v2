"use client";

import { motion } from "framer-motion";

export default function HeaderGradient() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-30 h-[204px] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        background:
          "linear-gradient(to bottom, rgb(20,20,20) 0%, rgba(20,20,20,0.92) 20%, rgba(20,20,20,0.7) 45%, rgba(20,20,20,0) 100%)",
      }}
    />
  );
}
