import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { CtaRow } from "@/components/ui/CtaRow";
import { OFFERS } from "@/lib/content";

export function Offers(): React.ReactElement {
  return (
    <section
      id="offers"
      className="arc-motif bg-[var(--color-deep)] py-20 md:py-28"
      style={{ ["--arc-x" as string]: "88%", ["--arc-y" as string]: "82%" }}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <SectionEyebrow onDark>{OFFERS.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-white">
            {OFFERS.headline}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {OFFERS.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="flex h-full flex-col rounded-xl border border-white/12 bg-white/[0.05] p-8">
                <FeatureIcon name={item.icon} onDark />
                <h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <CtaRow onDark align="center" className="mt-12" />
        </Reveal>
      </div>
    </section>
  );
}
