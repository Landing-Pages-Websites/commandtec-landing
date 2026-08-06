import { Reveal } from "@/components/Reveal";
import { FormCard } from "@/components/FormCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Icon } from "@/components/icons";
import { CONTACT, PHONE, PHONE_HREF } from "@/lib/content";

export function Contact(): React.ReactElement {
  return (
    <section
      id="contact"
      className="arc-motif bg-[var(--color-deep)] py-20 md:py-28"
      style={{ ["--arc-x" as string]: "15%", ["--arc-y" as string]: "85%" }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionEyebrow onDark>{CONTACT.eyebrow}</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.02] text-white">
              {CONTACT.headline}
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/80">
              {CONTACT.lead}
            </p>
            <div className="mt-8">
              <a
                href={PHONE_HREF}
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-md border-[1.5px] border-white/35 bg-white/[0.04] px-5 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep)]"
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

        <div className="lg:col-span-6">
          <Reveal delay={120}>
            <FormCard
              idPrefix="contact"
              heading="Start your certification"
              subheading="Tell us which standard your opportunity requires and we'll scope it — at no cost."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
