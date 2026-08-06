"use client";

import { useEffect, useState } from "react";
import { CTA } from "@/lib/content";
import { Icon } from "@/components/icons";

const SHOW_AFTER = 600;

// Form-only sticky CTA — full-width bar under lg, bottom-right pill at lg+.
// Never contains a tel: link (that lives in the header, hero, sections, footer).
export function FloatingCTA(): React.ReactElement {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolledPast(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const show = scrolledPast && !contactInView;

  return (
    <>
      {/* Under lg — full-width bar */}
      <div
        aria-hidden={!show}
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 px-3 py-2.5 backdrop-blur-md transition-all duration-300 lg:hidden [box-shadow:0_-6px_24px_-12px_rgba(11,15,13,0.4)] ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={CTA.contactAnchor}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-cta"
        >
          {CTA.primary}
          <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
        </a>
      </div>

      {/* lg+ — bottom-right pill */}
      <div
        aria-hidden={!show}
        className={`fixed bottom-6 right-6 z-50 hidden transition-all duration-300 lg:block ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <a
          href={CTA.contactAnchor}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
        >
          {CTA.primary}
          <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
        </a>
      </div>
    </>
  );
}
