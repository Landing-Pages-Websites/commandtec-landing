import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { CredentialChip } from "@/components/ui/CredentialChip";
import { CtaRow } from "@/components/ui/CtaRow";
import { WHY_US, CREDENTIALS } from "@/lib/content";

export function WhyCommandtec(): React.ReactElement {
  return (
    <section id="why-commandtec" className="bg-[var(--color-bg)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionEyebrow>{WHY_US.eyebrow}</SectionEyebrow>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-[var(--color-text)]">
                {WHY_US.headline}
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-muted)]">
                {WHY_US.lead}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {CREDENTIALS.chips.map((chip) => (
                  <CredentialChip key={chip}>{chip}</CredentialChip>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 overflow-hidden rounded-xl ring-1 ring-[var(--color-border)]">
                <Image
                  src="/images/practitioner-team.jpg"
                  alt="Three professionals viewed from behind at a glass partition covered in process-flow diagrams; no faces visible."
                  width={760}
                  height={520}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {WHY_US.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 60}>
                  <article className="h-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-card">
                    <FeatureIcon name={point.icon} />
                    <h3 className="mt-4 font-display text-xl font-semibold text-[var(--color-text)]">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-muted)]">
                      {point.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={80}>
              <div className="mt-6 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="text-sm font-medium text-[var(--color-muted)]">
                  {WHY_US.socioIntro}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {WHY_US.socio.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center whitespace-nowrap rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 text-[13px] font-semibold text-[var(--color-text)]/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <CtaRow className="mt-8" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
