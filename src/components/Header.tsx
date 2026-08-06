"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CTA, PHONE, PHONE_HREF } from "@/lib/content";
import { Icon } from "@/components/icons";

const NAV = [
  { label: "ISO", href: "#iso-certification" },
  { label: "CMMI", href: "#cmmi-certification" },
  { label: "Process", href: "#how-it-works" },
  { label: "Why us", href: "#why-commandtec" },
  { label: "FAQ", href: "#faq" },
];

export function Header(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-[var(--color-surface)]/95 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-[var(--color-border)] shadow-[0_1px_14px_-8px_rgba(11,15,13,0.4)]"
          : "border-[var(--color-border)]/60"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 md:px-8 ${
          scrolled ? "py-[9px]" : "py-3.5"
        }`}
      >
        <Link
          href="#hero"
          className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          aria-label="CommandTec — home"
        >
          <Image
            src="/logo.png"
            alt="CommandTec"
            width={1000}
            height={265}
            priority
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled ? "h-8" : "h-9 md:h-10"
            }`}
          />
        </Link>

        <nav
          aria-label="Section navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={PHONE_HREF}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-md border-[1.5px] border-[var(--color-primary)] px-3.5 py-2 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            aria-label={`Call CommandTec at ${PHONE}`}
          >
            <Icon name="phone" className="h-4 w-4" strokeWidth={0} fill="currentColor" />
            <span className="hidden sm:inline">{PHONE}</span>
          </a>
          <a
            href={CTA.contactAnchor}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 md:px-5"
          >
            <span className="hidden sm:inline">Free consultation</span>
            <span className="sm:hidden">Consult</span>
            <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </header>
  );
}
