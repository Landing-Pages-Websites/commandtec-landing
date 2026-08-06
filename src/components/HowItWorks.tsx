import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { CtaRow } from "@/components/ui/CtaRow";
import { HOW_IT_WORKS } from "@/lib/content";

export function HowItWorks(): React.ReactElement {
  return (
    <section
      id="how-it-works"
      className="arc-motif bg-[var(--color-ink)] py-20 md:py-28"
      style={{ ["--arc-x" as string]: "12%", ["--arc-y" as string]: "12%" }}
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <SectionEyebrow onDark>{HOW_IT_WORKS.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-white">
            {HOW_IT_WORKS.headline}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/80">
            {HOW_IT_WORKS.lead}
          </p>
        </Reveal>

        <ol className="relative mt-12 space-y-8">
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 bottom-6 hidden w-px bg-white/12 sm:block"
          />
          {HOW_IT_WORKS.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 50}>
              <li className="relative flex gap-5">
                <div className="relative z-10 shrink-0 rounded-full bg-[var(--color-ink)]">
                  <FeatureIcon name={step.icon} onDark />
                </div>
                <div className="pt-1">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-dark)]">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-white/75">
                    {step.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={80}>
          <CtaRow onDark className="mt-12" />
        </Reveal>
      </div>
    </section>
  );
}
