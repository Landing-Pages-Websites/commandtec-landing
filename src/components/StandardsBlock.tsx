import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { CtaRow } from "@/components/ui/CtaRow";

interface Standard {
  code: string;
  name: string;
  body: string;
}

interface ExtraCard {
  icon: string;
  title: string;
  body: string;
}

interface StandardsBlockProps {
  id: string;
  eyebrow: string;
  headline: string;
  lead: string;
  standards: Standard[];
  extra: ExtraCard;
  imageSrc: string;
  imageAlt: string;
}

// Shared structure for the ISO and CMMI ad-group landing targets — rendered
// twice so neither block can read as subordinate to the other.
export function StandardsBlock({
  id,
  eyebrow,
  headline,
  lead,
  standards,
  extra,
  imageSrc,
  imageAlt,
}: StandardsBlockProps): React.ReactElement {
  return (
    <section id={id} className="bg-[var(--color-bg)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
              <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-[var(--color-text)]">
                {headline}
              </h2>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[var(--color-muted)]">
                {lead}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="relative overflow-hidden rounded-xl ring-1 ring-[var(--color-border)]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={720}
                  height={560}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {standards.map((s, i) => (
            <Reveal key={s.code} delay={i * 60}>
              <article className="group relative h-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-card">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-[3px] w-12 rounded-r-full bg-[var(--color-primary)]"
                />
                <h3 className="font-display text-[1.5rem] font-bold leading-tight text-[var(--color-primary)]">
                  {s.code}
                </h3>
                <p className="mt-0.5 text-sm font-semibold uppercase tracking-[0.05em] text-[var(--color-muted)]">
                  {s.name}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text)]/80">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-5 flex items-start gap-4 rounded-[10px] border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/[0.04] p-7">
            <FeatureIcon name={extra.icon} />
            <div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-text)]">
                {extra.title}
              </h3>
              <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-[var(--color-muted)]">
                {extra.body}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <CtaRow className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}
