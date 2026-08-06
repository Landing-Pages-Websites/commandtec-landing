import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { CredentialChip } from "@/components/ui/CredentialChip";
import { CtaRow } from "@/components/ui/CtaRow";
import { CREDENTIALS } from "@/lib/content";

export function Credentials(): React.ReactElement {
  return (
    <section id="credentials" className="bg-[var(--color-bg)] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionEyebrow>{CREDENTIALS.eyebrow}</SectionEyebrow>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {CREDENTIALS.chips.map((chip) => (
              <CredentialChip key={chip}>{chip}</CredentialChip>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[var(--color-muted)]">
            {CREDENTIALS.intro}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-border)] lg:grid-cols-4">
            {CREDENTIALS.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[var(--color-surface)] px-6 py-7"
              >
                <dt className="font-display text-4xl font-bold leading-none text-[var(--color-primary)] md:text-5xl">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug text-[var(--color-muted)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <CtaRow className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}
