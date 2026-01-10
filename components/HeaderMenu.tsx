// components/HeaderMenu.tsx (drop-in replacement)
"use client";

import * as React from "react";
import Link from "next/link";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

const OVERLAY_EVENT = "overlay-open-change";
const CSS_VAR_H = "--header-menu-h";
const CSS_VAR_OPEN = "--header-menu-open";

function useOverlayOpen() {
  const searchParams = useSearchParams();
  const projectParamOpen = Boolean(searchParams.get("project"));
  const [overlayOpen, setOverlayOpen] = React.useState(false);

  React.useEffect(() => {
    const on = (e: Event) => {
      const ce = e as CustomEvent<{ open?: boolean }>;
      setOverlayOpen(Boolean(ce?.detail?.open));
    };
    window.addEventListener(OVERLAY_EVENT, on as EventListener);
    return () => window.removeEventListener(OVERLAY_EVENT, on as EventListener);
  }, []);

  return projectParamOpen || overlayOpen;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-8 w-8 drop-shadow-[0_10px_18px_rgba(0,0,0,0.28)]"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <path
        d="M4.8 9.4 12 16.2 19.2 9.4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export default function HeaderMenu() {
  const modalOrOverlayOpen = useOverlayOpen();
  const [open, setOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  // close menu if a modal/overlay opens
  React.useEffect(() => {
    if (!modalOrOverlayOpen) return;
    setOpen(false);
    setContactOpen(false);
  }, [modalOrOverlayOpen]);

  // open state as css var (shadow fade)
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(CSS_VAR_OPEN, open ? "1" : "0");
    return () => root.style.setProperty(CSS_VAR_OPEN, "0");
  }, [open]);

  // height css var (page translate)
  React.useEffect(() => {
    const el = panelRef.current;
    const root = document.documentElement;

    if (!open || !el) {
      root.style.setProperty(CSS_VAR_H, "0px");
      return;
    }

    const apply = () => {
      const h = el.getBoundingClientRect().height;
      root.style.setProperty(CSS_VAR_H, `${Math.max(0, Math.round(h))}px`);
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);

    return () => {
      ro.disconnect();
      root.style.setProperty(CSS_VAR_H, "0px");
    };
  }, [open, contactOpen]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setContactOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const logoStyle =
    "font-sans font-semibold tracking-[-0.04em] leading-none text-[clamp(64px,9.75vw,168px)]";

  return (
    <>
      {/* chevron trigger: true center of viewport, always above headers */}
      <div className="fixed inset-x-0 top-0 z-[90]">
        <div className="flex w-full justify-center pt-6 sm:pt-8">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-white/90 hover:text-white"
            style={{ pointerEvents: modalOrOverlayOpen ? "none" : "auto" }}
            onClick={() => {
              setOpen((v) => !v);
              if (open) setContactOpen(false);
            }}
          >
            <Chevron open={open} />
          </button>
        </div>
      </div>

      {/* recessed menu panel behind the page */}
      <div className="fixed inset-x-0 top-0 z-[40]">
        <AnimatePresence initial={false}>
          {open && !modalOrOverlayOpen && (
            <motion.div
              key="header-menu"
              ref={panelRef}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full border-b border-white/10"
              style={{ background: "#4154d6", color: "#283379" }}
            >
              <div className="px-6 sm:px-10 pt-[112px] sm:pt-[132px] pb-10">
                <nav className="space-y-4">
                  <Link
                    href="https://www.linkedin.com/in/isaacseiler/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${logoStyle} hover:opacity-80`}
                  >
                    LinkedIn
                  </Link>

                  <Link
                    href="https://github.com/isaaciseiler-beep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${logoStyle} hover:opacity-80`}
                  >
                    GitHub
                  </Link>

                  <a
                    href="/resume.pdf"
                    download
                    className={`block ${logoStyle} hover:opacity-80`}
                  >
                    Resume
                  </a>

                  <button
                    type="button"
                    className={`block text-left ${logoStyle} hover:opacity-80`}
                    onClick={() => setContactOpen((v) => !v)}
                    aria-expanded={contactOpen}
                  >
                    Contact
                  </button>
                </nav>

                <AnimatePresence initial={false}>
                  {contactOpen && (
                    <motion.div
                      key="contact"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
                      className="mt-6 overflow-hidden"
                    >
                      <div className="rounded-2xl bg-white/10 p-4">
                        <iframe
                          data-tally-src="https://tally.so/embed/Ekd91N?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                          loading="lazy"
                          width="100%"
                          height="203"
                          frameBorder={0}
                          marginHeight={0}
                          marginWidth={0}
                          title="Let's Chat"
                        />
                      </div>

                      <Script
                        src="https://tally.so/widgets/embed.js"
                        strategy="afterInteractive"
                        onLoad={() => {
                          if (
                            typeof window !== "undefined" &&
                            (window as any).Tally?.loadEmbeds
                          ) {
                            (window as any).Tally.loadEmbeds();
                          }
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
