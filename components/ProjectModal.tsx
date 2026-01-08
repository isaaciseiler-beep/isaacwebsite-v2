// components/ProjectModal.tsx (drop-in replacement)
"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export type ProjectTemplate = {
  slug: string;
  title: string;
  subtitle?: string;
  source?: string;

  coverSlot?: ReactNode; // vertical cover used in carousel card later
  headerSlot?: ReactNode; // horizontal header shown inside modal

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
      : "h-full w-full"; // header gets forced by the frame

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
      This is a deliberately long placeholder essay to verify that the modal body
      scrolls smoothly and that the header stays fixed. Treat the content as a
      visual/interaction test: the paragraphs are varied in length, headings
      break up the flow, and there are lists to ensure spacing is consistent.
    </p>

    <h3 className="text-lg font-semibold">1. what i mean by “small systems”</h3>
    <p>
      A “small system” is anything that reduces repeated decision-making. It can
      be as simple as a template that forces consistent inputs, or as elaborate
      as a pipeline that moves information across tools. The point is not
      complexity—it’s reliability. If the system doesn’t get used on a tired day,
      it doesn’t count.
    </p>
    <p>
      Most personal workflows fail because they ask too much: too many fields,
      too many steps, too much upkeep. A better approach is to keep the core
      loop short: capture → normalize → decide → log. Once that loop is stable,
      then you can layer in automation.
    </p>

    <h3 className="text-lg font-semibold">2. the “capture” layer</h3>
    <p>
      Capture is where information arrives: email, DMs, a note on your phone, a
      form submission, a calendar invite. The capture layer should be forgiving.
      It should accept messy inputs, because messy inputs are reality.
    </p>
    <ul className="list-disc space-y-2 pl-5 text-white/85">
      <li>
        prefer one inbox per channel, not many (one email label, one notes
        folder, one sheet)
      </li>
      <li>optimize for “can i dump this in 10 seconds”</li>
      <li>don’t require perfect categorization at capture time</li>
    </ul>

    <h3 className="text-lg font-semibold">3. normalization and routing</h3>
    <p>
      Normalization is where you standardize. Routing is where you decide what
      happens next. In practice, this is where most value is created, because it
      prevents drift: two different names for the same thing, missing context,
      unclear status, or tasks that vanish.
    </p>
    <p>
      A good schema is small: name, source, status, next action, timestamp, and
      a link back to origin. If you can’t answer “what is this, where did it
      come from, and what happens next” in one glance, the schema is too loose.
    </p>

    <h3 className="text-lg font-semibold">4. the human-in-the-loop step</h3>
    <p>
      Automation without review becomes noise. A lightweight review step—once a
      day or once a week—keeps systems aligned with reality. The key is that the
      review should be short, predictable, and focused on resolving ambiguity:
      confirm statuses, rewrite next actions, close loops.
    </p>

    <h3 className="text-lg font-semibold">5. why this matters</h3>
    <p>
      When you remove repetitive work, you don’t just save time—you reduce the
      number of times you have to renegotiate your own intentions. That shows up
      as steadier follow-through, fewer missed opportunities, and less mental
      overhead.
    </p>
    <p>
      If you’re reading this in the modal: keep scrolling. The goal is to push
      the content beyond the fold so you can confirm that scrolling feels
      natural, the scrollbar appears, and the header image remains anchored.
    </p>

    <h3 className="text-lg font-semibold">6. extra filler for scroll testing</h3>
    <p>
      The rest of this essay is intentionally repetitive in structure: paragraph
      blocks with comfortable line length, consistent spacing, and occasional
      emphasis. You should be able to scroll without any jitter, and closing the
      modal should fade smoothly without snapping the underlying page position.
    </p>
    <p>
      A modal like this works best when it feels like a “window” rather than a
      page navigation. That means: stable sizing, stable header, stable close
      affordance, and no scroll jumps. The transitions should be present but
      subtle—quick enough to feel responsive, slow enough to feel intentional.
    </p>
    <p>
      Scrolling should not “fight” the page behind. The background should remain
      exactly where it was when opened, and return there when closed, without
      re-anchoring to the carousel.
    </p>
    <p>
      If everything is behaving, you’ve now verified: (1) long content scrolls,
      (2) header stays fixed, (3) fade/blur transitions work, (4) background
      position is preserved, and (5) close button placement feels correct.
    </p>

    <h3 className="text-lg font-semibold">7. last chunk</h3>
    <p>
      End of placeholder. Replace with real writing whenever you’re ready; the
      layout should hold up to headings, lists, and long-form text.
    </p>
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
    body: FAKE_ESSAY, // filled with long fake essay to test scrolling
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

  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;
    scrollYRef.current = window.scrollY || 0;
  }, [isOpen]);

  const close = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("project");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });

    // restore background scroll position after route update
    const y = scrollYRef.current || 0;
    requestAnimationFrame(() => window.scrollTo({ top: y, left: 0, behavior: "auto" }));
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
          {/* backdrop (fade + blur) */}
          <motion.div
            className="absolute inset-0 bg-black/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={close}
          />

          {/* pane */}
          <motion.div
            className={[
              "relative mx-4",
              "w-[min(92vw,900px)]",
              "h-[min(84vh,720px)]",
              "overflow-hidden rounded-3xl",
              "border border-white/10 bg-neutral-950", // solid
              "shadow-[0_0_60px_rgba(0,0,0,0.55)]",
              "flex flex-col",
            ].join(" ")}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* close button (borderless, floating above header) */}
            <button
              type="button"
              onClick={close}
              aria-label="close"
              className={[
                "absolute right-4 top-4 z-20",
                "grid h-10 w-10 place-items-center rounded-full",
                "bg-black/35 text-white/85",
                "hover:bg-black/55 hover:text-white",
                "shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
              ].join(" ")}
            >
              <span className="text-2xl leading-none">×</span>
            </button>

            {/* header image frame (~10% taller), fills area, bottom divider */}
            <div className="px-6 pt-6">
              <div
                className={[
                  "w-full overflow-hidden rounded-2xl",
                  "border border-white/10",
                  "h-[206px] sm:h-[258px]", // ~10% taller than 44/52 (176/208)
                ].join(" ")}
              >
                {project.headerSlot ? (
                  <div className="h-full w-full">{project.headerSlot}</div>
                ) : (
                  <ImageHold variant="header" label="header hold" />
                )}
              </div>

              {/* divider between header image and text */}
              <div className="mt-5 border-b border-white/10" />

              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {project.source && (
                    <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
                      {project.source}
                    </div>
                  )}
                  <h2 className="mt-2 truncate text-2xl font-semibold tracking-tight">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="mt-1 text-sm text-white/65">{project.subtitle}</p>
                  )}
                </div>
              </div>
            </div>

            {/* scrollable content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
              <div className="prose prose-invert max-w-none">{project.body}</div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
