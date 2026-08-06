import Image from "next/image";
import { BRAND, CURRENT_YEAR, FOOTER, PHONE, PHONE_HREF } from "@/lib/content";
import { Icon } from "@/components/icons";

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="bg-[var(--color-ink)] text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-6">
            <Image
              src="/logo-white.png"
              alt="CommandTec"
              width={1000}
              height={300}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-4 font-display text-xl font-semibold text-white">
              {FOOTER.tagline}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed">
              {FOOTER.practice}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              Talk to a practitioner
            </p>
            <a
              href={PHONE_HREF}
              className="mt-3 inline-flex items-center gap-2 font-display text-2xl font-semibold text-white transition-colors hover:text-[var(--color-accent-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-sm"
              aria-label={`Call CommandTec at ${PHONE}`}
            >
              <Icon
                name="phone"
                className="h-5 w-5 text-[var(--color-accent-dark)]"
                strokeWidth={0}
                fill="currentColor"
              />
              {PHONE}
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              Please note
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/55">
              {FOOTER.disclaimer}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/55">
          <p>
            © {CURRENT_YEAR} {BRAND.legal}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
