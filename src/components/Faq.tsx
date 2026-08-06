"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { CtaRow } from "@/components/ui/CtaRow";
import { Icon } from "@/components/icons";
import { FAQ } from "@/lib/content";

export function Faq(): React.ReactElement {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--color-bg)] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <SectionEyebrow>Before you reach out</SectionEyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-[var(--color-text)]">
            Questions organizations ask us.
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 40}>
                <div
                  className={`rounded-xl border transition-colors ${
                    isOpen
                      ? "border-[var(--color-primary)] bg-[var(--color-surface)] shadow-card"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/50"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 rounded-xl p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] md:p-6"
                    >
                      <span className="font-display text-lg font-semibold leading-snug text-[var(--color-text)] md:text-xl">
                        {item.q}
                      </span>
                      <Icon
                        name="plus"
                        className={`mt-1 h-5 w-5 shrink-0 text-[var(--color-primary)] transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        strokeWidth={2.2}
                      />
                    </button>
                  </h3>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 text-[15px] leading-relaxed text-[var(--color-muted)] md:px-6">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <CtaRow align="center" className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}
