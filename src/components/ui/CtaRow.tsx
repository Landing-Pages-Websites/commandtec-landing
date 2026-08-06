import { CTA, PHONE, PHONE_HREF } from "@/lib/content";
import { Icon } from "@/components/icons";

interface CtaRowProps {
  align?: "start" | "center";
  /** Use on deep-green / near-black panels — lightens the phone link. */
  onDark?: boolean;
  primaryLabel?: string;
  className?: string;
}

// Primary button (scrolls to #contact) + phone link. Every section[id] gets one.
export function CtaRow({
  align = "start",
  onDark = false,
  primaryLabel = CTA.primary,
  className = "",
}: CtaRowProps): React.ReactElement {
  const justify = align === "center" ? "justify-center" : "justify-start";
  const phone = onDark
    ? "border-white/35 text-white hover:bg-white/10 hover:border-white"
    : "border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/[0.06]";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${justify} ${className}`}>
      <a
        href={CTA.contactAnchor}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--color-primary)] px-6 py-3 text-base font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] active:translate-y-0 active:bg-[var(--color-primary-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
      >
        {primaryLabel}
        <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
      </a>
      <a
        href={PHONE_HREF}
        className={`inline-flex min-h-[44px] items-center gap-2 rounded-md border-[1.5px] px-5 py-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${phone}`}
        aria-label={`Call CommandTec at ${PHONE}`}
      >
        <Icon name="phone" className="h-4 w-4" strokeWidth={0} fill="currentColor" />
        {PHONE}
      </a>
    </div>
  );
}
