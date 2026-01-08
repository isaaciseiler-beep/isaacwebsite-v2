// components/ProjectModal.tsx (new file)
"use client";

import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type ProjectTemplate = {
  slug: string;
  title: string;
  subtitle?: string;
  image?: string;
  source?: string;
  body: ReactNode;
};

// five templates (edit freely)
export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    slug: "ops-automation-stack",
    title: "Ops Automation Stack",
    subtitle: "How I build small systems that remove repetitive work.",
    source: "Project",
    body: (
      <div className="space-y-6">
        <p>
          A lightweight pattern I use to turn messy workflows into reliable pipelines: capture
          signals, normalize them, route them, and keep a human-in-the-loop review step.
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
        <div>
          <h3 className="text-lg font-semibold">Why it matters</h3>
          <p className="mt-2 text-white/85">
            The goal isn’t “more automation.” It’s fewer dropped balls, faster turnaround, and
            cleaner handoffs.
          </p>
        </div>
      </div>
    ),
  },
  {
    slug: "chatgpt-local-lab",
    title: "ChatGPT Local Lab",
    subtitle: "Workshops + experiments with educators in Taiwan.",
    source: "Project",
    body: (
      <div className="space-y-6">
        <p>
          A set of practical sessions focused on classroom workflows: planning, differentiation,
          feedback, and admin tasks.
        </p>
        <div>
          <h3 className="text-lg font-semibold">Format</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-white/85">
            <li>Short demos → guided practice → take-home prompts</li>
            <li>Emphasis on verification and safe use</li>
            <li>Artifacts: templates, rubrics, and reusable prompt packs</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Outputs</h3>
          <p className="mt-2 text-white/85">
            A small library of teacher-tested workflows that reduce prep time while maintaining
            quality.
          </p>
        </div>
      </div>
    ),
  },
  {
    slug: "job-signal",
    title: "Job Signal",
    subtitle: "Tracking roles, follow-ups, and outreach with one source of truth.",
    source: "Project",
    body: (
      <div className="space-y-6">
        <p>
          A personal system for managing applications and networking without losing context.
          Designed to be fast to update and easy to audit.
        </p>
        <div>
          <h3 className="text-lg font-semibold">Core features</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-white/85">
            <li>One table for roles, contacts, and timeline events</li>
            <li>Auto-generated reminders and follow-up windows</li>
            <li>Notes that stay attached to the role (not scattered across docs)</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Principle</h3>
          <p className="mt-2 text-white/85">
            Reduce cognitive load: the system should tell you what to do next, with receipts.
          </p>
        </div>
      </div>
    ),
  },
  {
    slug: "photo-map",
    title: "Portfolio Photo Map",
    subtitle: "A map-first way to browse travel + photography.",
    source: "Project",
    body: (
      <div className="space-y-6">
        <p>
          A UI pattern for browsing large photo libraries by place, then narrowing by theme.
        </p>
        <div>
          <h3 className="text-lg font-semibold">Interaction model</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-white/85">
            <li>Map clusters → location selection → photo grid</li>
            <li>Tag filters for subject, season, and region</li>
            <li>Performance: lazy loading + responsive images</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Note</h3>
          <p className="mt-2 text-white/85">
            This site version is intentionally minimal; the full map experience lives in the main
            portfolio build.
          </p>
        </div>
      </div>
    ),
  },
  {
    slug: "this-site",
    title: "This Site",
    subtitle: "A one-page portfolio with a ‘window’ modal for project write-ups.",
    source: "Project",
    body: (
      <div className="space-y-6">
        <p>
          The goal: keep the homepage fast and visual, while letting deeper project write-ups open
          without navigating away.
        </p>
        <div>
          <h3 className="text-lg font-semibold">Implementation</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-white/85">
            <li>Carousel cards deep-link via URL query (shareable)</li>
            <li>Modal locks background scroll and blurs the page</li>
            <li>Click outside / Esc to close</li>
          </ul>
        </div>
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
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* backdrop (click to close) */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-md"
        onMouseDown={close}
      />

      {/* panel */}
      <div className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 shadow-[0_0_60px_rgba(0,0,0,0.55)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
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

        <div className="max-h-[78vh] overflow-y-auto px-6 py-6">
          <div className="prose prose-invert max-w-none">{project.body}</div>
        </div>
      </div>
    </div>
  );
}
