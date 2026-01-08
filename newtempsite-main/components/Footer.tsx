"use client";

import Link from "next/link";

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
    "inline-flex items-center justify-center rounded-full border border-black/20 px-5 py-2 text-sm font-medium transition-colors";

  if (download) {
    return (
      <a
        href={href}
        download
        className={[base, "hover:bg-black hover:text-white"].join(" ")}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={[base, "hover:bg-black hover:text-white"].join(" ")}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-10">
      <div className="border-t border-black/10 pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-black/60">© {year} Isaac Seiler</div>

          <div className="flex flex-wrap gap-2">
            <FooterButton href="/resume.pdf" download>
              resume
            </FooterButton>
            <FooterButton href="https://www.linkedin.com/in/isaacseiler/">
              linkedin
            </FooterButton>
            <FooterButton href="mailto:isaacseiler@gmail.com">contact</FooterButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
