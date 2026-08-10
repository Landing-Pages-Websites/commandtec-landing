import Image from "next/image";
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
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal className="max-w-2xl">
              <SectionEyebrow onDark>{HOW_IT_WORKS.eyebrow}</SectionEyebrow>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-white">
                {HOW_IT_WORKS.headline}
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/80">
                {HOW_IT_WORKS.lead}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
                <Image
                  src="/images/staff-training.jpg"
                  alt="An instructor at a whiteboard explaining a process flow diagram to two seated colleagues in a bright meeting room."
                  width={760}
                  height={560}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="mt-14 grid gap-5 lg:grid-cols-2">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 50}>
              <li className="group relative flex h-full gap-5 rounded-[10px] border border-white/10 bg-white/[0.03] p-7 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--color-accent-dark)] hover:shadow-card">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-[3px] w-12 rounded-r-full bg-[var(--color-accent-dark)]"
                />
                <div className="shrink-0">
                  <FeatureIcon name={step.icon} onDark />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-dark)]">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white/75">
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
