// components/Footer.tsx (drop-in replacement)
"use client";

import Link from "next/link";
import GitWidget from "./GitWidget";

function FooterButton({
  href,
  children,
  download,
}: {
  href: string;
  children: React.ReactNode;
  download?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-neutral-50/80 transition-colors";

  if (download) {
    return (
      <a
        href={href}
        download
        className={[base, "hover:bg-white hover:text-black"].join(" ")}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={[base, "hover:bg-white hover:text-black"].join(" ")}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const repoUrl = "https://github.com/isaaciseiler-beep/newtempsite";

  return (
    <footer className="relative z-50 pt-10">
      <div className="pt-2">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-neutral-50/60">© {year} Isaac Seiler</div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <div className="flex flex-wrap gap-2 sm:flex-1 sm:justify-start">
              <FooterButton href="/resume.pdf" download>
                Resume
              </FooterButton>
              <FooterButton href="https://www.linkedin.com/in/isaacseiler/">
                LinkedIn
              </FooterButton>
              <FooterButton href="mailto:isaacseiler@gmail.com">
                Contact
              </FooterButton>
            </div>

            <div className="flex sm:justify-end">
              <GitWidget repoUrl={repoUrl} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

