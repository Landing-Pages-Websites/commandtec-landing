import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { CtaRow } from "@/components/ui/CtaRow";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials(): React.ReactElement {
  return (
    <section id="testimonials" className="bg-[var(--color-ink)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <SectionEyebrow onDark>{TESTIMONIALS.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-white">
            {TESTIMONIALS.headline}
          </h2>
        </Reveal>

        <div className="mt-12 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {TESTIMONIALS.quotes.map((t, i) => (
            <Reveal key={t.name} delay={i * 40} className="mb-5 break-inside-avoid">
              <figure className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none text-[var(--color-accent-dark)]"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-[15px] leading-relaxed text-white/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4 border-t border-white/10 pt-4">
                  <p className="font-display text-base font-semibold text-[var(--color-accent-dark)]">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-sm leading-snug text-white/60">
                    {t.role}
                    {t.place ? ` · ${t.place}` : ""}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <CtaRow onDark className="mt-12" />
        </Reveal>
      </div>
    </section>
  );
}
