// components/ProjectModal.tsx (DROP-IN REPLACEMENT)
"use client";

import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export type ProjectTemplate = {
  slug: string;
  title: string;
  subtitle?: string;
  source?: string;
  coverSlot?: ReactNode;
  headerSlot?: ReactNode;
  body: ReactNode;
};

function ImageHold({
  variant,
  label,
}: {
  variant: "cover" | "header";
  label: string;
}) {
  const cls =
    variant === "cover"
      ? "h-[160px] w-[118px] rounded-2xl"
      : "h-full w-full";

  return (
    <div
      className={[
        "relative overflow-hidden",
        "border border-white/10 bg-white/5",
        "shadow-[0_0_18px_rgba(0,0,0,0.25)]",
        cls,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <div className="text-xs uppercase tracking-[0.22em] text-white/55">
          {label}
        </div>
      </div>
    </div>
  );
}

const FAKE_ESSAY = (
  <div className="space-y-8">
    <p>
      This is a deliberately long placeholder essay to verify that the entire
      modal content scrolls as one unit (image, title block, and body).
    </p>
    <h3 className="text-lg font-semibold">scroll test</h3>
    <div className="space-y-6">
      {Array.from({ length: 30 }).map((_, i) => (
        <p key={i}>
          Extra paragraph {i + 1}. This is filler content to force scrolling.
        </p>
      ))}
    </div>
  </div>
);

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    slug: "ops-automation-stack",
    title: "Ops Automation Stack",
    subtitle: "How I build small systems that remove repetitive work.",
    source: "Project",
    coverSlot: <ImageHold variant="cover" label="cover hold" />,
    headerSlot: <ImageHold variant="header" label="header hold" />,
    body: FAKE_ESSAY,
  },
  {
    slug: "chatgpt-local-lab",
    title: "ChatGPT Local Lab",
    subtitle: "Workshops + experiments with educators in Taiwan.",
    source: "Project",
    coverSlot: <ImageHold variant="cover" label="cover hold" />,
    headerSlot: <ImageHold variant="header" label="header hold" />,
    body: (
      <div className="space-y-6">
        <p>Practical sessions focused on planning, feedback, and admin tasks.</p>
      </div>
    ),
  },
  {
    slug: "job-signal",
    title: "Job Signal",
    subtitle: "Tracking roles, follow-ups, and outreach with one source of truth.",
    source: "Project",
    coverSlot: <ImageHold variant="cover" label="cover hold" />,
    headerSlot: <ImageHold variant="header" label="header hold" />,
    body: (
      <div className="space-y-6">
        <p>
          A personal system for managing applications and networking without
          losing context.
        </p>
      </div>
    ),
  },
  {
    slug: "photo-map",
    title: "Portfolio Photo Map",
    subtitle: "A map-first way to browse travel + photography.",
    source: "Project",
    coverSlot: <ImageHold variant="cover" label="cover hold" />,
    headerSlot: <ImageHold variant="header" label="header hold" />,
    body: (
      <div className="space-y-6">
        <p>A UI pattern for browsing large photo libraries by place.</p>
      </div>
    ),
  },
  {
    slug: "this-site",
    title: "This Site",
    subtitle: "A one-page portfolio with a ‘window’ modal for project write-ups.",
    source: "Project",
    coverSlot: <ImageHold variant="cover" label="cover hold" />,
    headerSlot: <ImageHold variant="header" label="header hold" />,
    body: (
      <div className="space-y-6">
        <p>
          Keep the homepage fast and visual, while letting deeper write-ups open
          without navigating away.
        </p>
      </div>
    ),
  },
];

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export default function ProjectModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const slug = searchParams.get("project");
  const project = useMemo(
    () => (slug ? PROJECT_TEMPLATES.find((p) => p.slug === slug) : undefined),
    [slug]
  );

  const isOpen = Boolean(project);
  useBodyScrollLock(isOpen);

  const close = () => {
    // restore to where the user was when they opened the modal
    const raw = sessionStorage.getItem("__project_bg_y__");
    sessionStorage.setItem(
      "__project_restore_y__",
      raw ?? String(window.scrollY || 0)
    );

    const next = new URLSearchParams(searchParams.toString());
    next.delete("project");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-black/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={close}
          />

          <motion.div
            className={[
              "relative mx-4",
              "w-[min(92vw,900px)]",
              "h-[min(84vh,720px)]",
              "overflow-hidden rounded-3xl",
              "border border-white/10 bg-neutral-950",
              "shadow-[0_0_60px_rgba(0,0,0,0.55)]",
            ].join(" ")}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* x: no border, no background */}
            <button
              type="button"
              onClick={close}
              aria-label="close"
              className={[
                "absolute right-4 top-4 z-20",
                "p-2",
                "text-white/75 hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
              ].join(" ")}
            >
              <span className="text-2xl leading-none">×</span>
            </button>

            {/* single scroll container: EVERYTHING scrolls */}
            <div className="h-full overflow-y-auto">
              {/* header image: flush edges, only bottom border */}
              <div
                className={[
                  "w-full",
                  "h-[206px] sm:h-[258px]",
                  "overflow-hidden",
                  "border-b border-white/10",
                ].join(" ")}
              >
                {project.headerSlot ? (
                  <div className="h-full w-full">{project.headerSlot}</div>
                ) : (
                  <ImageHold variant="header" label="header hold" />
                )}
              </div>

              <div className="px-6 py-7">
                {project.source && (
                  <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
                    {project.source}
                  </div>
                )}
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {project.title}
                </h2>
                {project.subtitle && (
                  <p className="mt-1 text-sm text-white/65">{project.subtitle}</p>
                )}

                <div className="mt-7 border-b border-white/10" />

                <div className="mt-7 prose prose-invert max-w-none">
                  {project.body}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
