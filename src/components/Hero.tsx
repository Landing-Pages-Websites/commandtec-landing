"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { FormCard } from "@/components/FormCard";
import { Icon } from "@/components/icons";
import { HERO, PHONE, PHONE_HREF } from "@/lib/content";

export function Hero(): React.ReactElement {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[var(--color-ink)] pb-14 pt-24 md:pb-20 md:pt-32"
    >
      {/* Background imagery + scrim */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-launch.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/85 to-[var(--color-ink)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,66,39,0.72)] via-transparent to-[var(--color-ink)]/40" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-x-12 gap-y-6 px-5 md:px-8 lg:grid-cols-12">
        {/* Top-left: eyebrow + H1 */}
        <div className="lg:col-span-7">
          <Reveal className="space-y-4">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-[2px] w-6 shrink-0 rounded-full bg-[var(--color-accent)]" />
              <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-dark)]">
                {HERO.eyebrow}
              </span>
            </div>
            <h1 className="font-display font-bold leading-[0.98] text-white text-[clamp(2.75rem,6vw,4.5rem)]">
              {HERO.h1Lead}{" "}
              <span className="text-[var(--color-accent-dark)]">{HERO.h1Accent}</span>
            </h1>
          </Reveal>
        </div>

        {/* Right: form — placed early in DOM so it stays high on mobile */}
        <div className="lg:col-span-5 lg:row-span-2 lg:pl-4">
          <Reveal delay={120}>
            <FormCard idPrefix="hero" />
          </Reveal>
        </div>

        {/* Below-left: subhead, proof, chips, phone CTA */}
        <div className="lg:col-span-7">
          <Reveal delay={80} className="space-y-6 pt-2">
            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-[1.0625rem]">
              {HERO.subhead}
            </p>

            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-lg font-semibold text-white">
              {HERO.proofLine.split(" · ").map((part, i) => (
                <span key={part} className="inline-flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-[var(--color-accent-dark)]">
                      ·
                    </span>
                  )}
                  {part}
                </span>
              ))}
            </p>

            <ul className="flex flex-wrap gap-2">
              {HERO.chips.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"
                >
                  <Icon
                    name="check"
                    className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent-dark)]"
                    strokeWidth={2.5}
                  />
                  {chip}
                </li>
              ))}
            </ul>

            <div className="pt-1">
              <a
                href={PHONE_HREF}
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-md border-[1.5px] border-white/35 bg-white/[0.04] px-5 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
                aria-label={`Call CommandTec at ${PHONE}`}
              >
                <Icon
                  name="phone"
                  className="h-5 w-5 text-[var(--color-accent-dark)]"
                  strokeWidth={0}
                  fill="currentColor"
                />
                <span>
                  <span className="mr-1.5 text-sm font-normal text-white/60">
                    Prefer to talk?
                  </span>
                  {PHONE}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
