// components/ProjectModal.tsx (drop-in replacement)
"use client";

import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type ProjectTemplate = {
  slug: string;
  title: string;
  subtitle?: string;
  source?: string;

  // placeholders (no real images yet)
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
      : "h-44 sm:h-52 w-full rounded-2xl";

  return (
    <div
      className={[
        "relative overflow-hidden border border-white/10 bg-white/5",
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

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    slug: "ops-automation-stack",
    title: "Ops Automation Stack",
    subtitle: "How I build small systems that remove repetitive work.",
    source: "Project",
    coverSlot: <ImageHold variant="cover" label="cover hold" />,
    headerSlot: <ImageHold variant="header" label="header hold" />,
    body: (
      <div className="space-y-6">
        <p>
          A lightweight pattern I use to turn messy workflows into reliable
          pipelines: capture signals, normalize them, route them, and keep a
          human-in-the-loop review step.
        </p>
        <div>
          <h3 className="text-lg font-semibold">What it does</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-white/85">
            <li>Collects inputs from email, forms, and notes</li>
            <li>Standardizes fields into one schema</li>
            <li>Automates follow-ups, reminders, and status updates</li>
            <li>Logs everything for auditability</li>
          </ul>
        </div>
      </div>
    ),
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

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" aria-modal="true" role="dialog">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-md"
        onMouseDown={close}
      />

      {/* fixed-size pane (same every time) */}
      <div
        className={[
          "relative mx-4",
          "w-[min(92vw,900px)]",
          "h-[min(84vh,720px)]",
          "overflow-hidden rounded-3xl",
          "border border-white/10 bg-neutral-950/90",
          "shadow-[0_0_60px_rgba(0,0,0,0.55)]",
          "flex flex-col", // critical for fixed header + scroll body
        ].join(" ")}
      >
        {/* header area (fixed height, non-scrolling) */}
        <div className="px-6 pt-6">
          {project.headerSlot ? (
            <div className="mb-5">{project.headerSlot}</div>
          ) : (
            <div className="mb-5">
              <ImageHold variant="header" label="header hold" />
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
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

            <button
              type="button"
              onClick={close}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              aria-label="close"
            >
              ×
            </button>
          </div>

          <div className="mt-5 border-b border-white/10" />
        </div>

        {/* scrollable content (MUST have min-h-0 inside flex) */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <div className="prose prose-invert max-w-none">{project.body}</div>
        </div>
      </div>
    </div>
  );
}

