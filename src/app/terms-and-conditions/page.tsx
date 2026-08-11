import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | CommandTec",
  description: "CommandTec Terms and Conditions",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-ink)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="https://info.commandtec.net/"
            className="font-display text-2xl font-bold tracking-tight text-white"
          >
            CommandTec
          </Link>

          <nav
            aria-label="Legal navigation"
            className="hidden items-center gap-6 text-sm font-medium md:flex"
          >
            <Link
              href="https://info.commandtec.net/"
              className="text-white/80 transition hover:text-[var(--color-accent-dark)]"
            >
              Home
            </Link>

            <Link
              href="/privacy-policy/"
              className="text-white/80 transition hover:text-[var(--color-accent-dark)]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions/"
              className="text-[var(--color-accent-dark)]"
            >
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-deep)]">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="eyebrow mb-4 !text-[var(--color-accent-dark)]">
            Legal
          </p>

          <h1 className="max-w-4xl font-display text-5xl font-bold leading-none text-white md:text-6xl">
            Terms &amp; Conditions
          </h1>

          <p className="mt-6 text-sm text-white/70">
            Effective Date: August 12, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12 lg:px-8 lg:py-16">
        <article className="mx-auto max-w-4xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-card-lg md:p-10 lg:p-12">
          <div
            className="
              font-[var(--font-body)]
              text-[1.02rem]
              leading-[1.75]
              text-[var(--color-text)]
              [&_p]:mb-5
              [&_h2]:mt-12
              [&_h2]:mb-4
              [&_h2]:font-display
              [&_h2]:text-[clamp(1.7rem,3vw,2.15rem)]
              [&_h2]:font-bold
              [&_h2]:leading-tight
              [&_h2]:text-[var(--color-deep)]
              [&_h3]:mt-8
              [&_h3]:mb-3
              [&_h3]:font-display
              [&_h3]:text-xl
              [&_h3]:font-bold
              [&_h3]:leading-tight
              [&_h3]:text-[var(--color-primary)]
              [&_ul]:mb-6
              [&_ul]:list-disc
              [&_ul]:pl-6
              [&_li]:mb-2
              [&_a]:text-[var(--color-primary)]
              [&_a]:underline
              [&_a]:underline-offset-4
              [&_a:hover]:text-[var(--color-accent-light)]
            "
          >
            <h2>Acceptance of These Terms</h2>

            <p>
              These Terms and Conditions ("Terms") govern your access to and
              use of the CommandTec website and related online services. By
              accessing or using the website, you agree to these Terms.
            </p>

            <p>
              If you do not agree with these Terms, please do not use the
              website.
            </p>

            <h2>Website Use</h2>

            <p>
              You may use the website for lawful purposes and for obtaining
              information about CommandTec, its services, and available
              consultation opportunities.
            </p>

            <p>
              You agree to provide accurate information when submitting
              information through consultation or contact forms.
            </p>

            <h2>Prohibited Activities</h2>

            <p>You may not:</p>

            <ul>
              <li>Use the website for unlawful or fraudulent purposes;</li>
              <li>
                Attempt to gain unauthorized access to the website or its
                systems;
              </li>
              <li>Interfere with website security or operation;</li>
              <li>Introduce malicious code or harmful software;</li>
              <li>
                Scrape, copy, reproduce, or distribute website content without
                authorization;
              </li>
              <li>Submit false, misleading, or unlawful information; or</li>
              <li>Use the website in a manner that violates applicable law.</li>
            </ul>

            <h2>Information Submitted by Users</h2>

            <p>
              When you submit information through a contact form, consultation
              form, or other website feature, you are responsible for ensuring
              that the information you provide is accurate and that you have
              the right to provide it.
            </p>

            <p>
              Information submitted through the website may be handled
              according to our{" "}
              <Link href="/privacy-policy/">Privacy Policy</Link>.
            </p>

            <h2>Consultation Requests</h2>

            <p>
              Submitting a consultation or service request does not guarantee
              that CommandTec will provide services, accept an engagement, or
              achieve a particular outcome.
            </p>

            <p>
              Any services or engagements provided by CommandTec are subject
              to the applicable agreement between CommandTec and the customer.
            </p>

            <div className="mb-5 rounded-xl border-l-4 border-[var(--color-accent)] bg-[#f2f8f3] p-5">
              <p className="!mb-0 font-semibold text-[var(--color-deep)]">
                CommandTec does not guarantee ISO certification, a CMMI
                maturity level, a contract award, or any particular business
                result.
              </p>
            </div>

            <p>
              Independent registrars, auditors, and certified appraisers make
              final certification and appraisal decisions. CommandTec does not
              control those independent decisions.
            </p>

            <h2>Intellectual Property Ownership</h2>

            <p>
              Unless otherwise indicated, the content, text, graphics, design,
              trademarks, logos, and other materials appearing on the website
              are owned by or used by CommandTec with appropriate rights.
            </p>

            <p>
              You may not reproduce, distribute, modify, publicly display,
              sell, or otherwise exploit website materials without appropriate
              authorization.
            </p>

            <h2>Third-Party Links</h2>

            <p>
              The website may contain links to third-party websites or
              resources. These links are provided for convenience. CommandTec
              does not control and is not responsible for the content,
              availability, security, or privacy practices of third-party
              websites.
            </p>

            <h2>Website Availability and Changes</h2>

            <p>
              CommandTec may modify, suspend, discontinue, or change portions
              of the website at any time. We do not guarantee that the website
              will always be available, uninterrupted, or free of errors.
            </p>

            <h2>Disclaimer of Warranties</h2>

            <p>
              The website and its content are provided on an "as is" and "as
              available" basis to the extent permitted by applicable law.
            </p>

            <p>
              CommandTec does not guarantee that website content will always
              be complete, current, accurate, or free from errors or
              interruptions.
            </p>

            <p>
              Information provided through the website is for general
              informational purposes and should not be understood as a
              guarantee of certification, appraisal, contract award, financial
              performance, or any particular business result.
            </p>

            <h2>Limitation of Liability</h2>

            <p>
              To the maximum extent permitted by applicable law, CommandTec
              will not be liable for indirect, incidental, special,
              consequential, or exemplary damages arising from or related to
              your use of the website or inability to use the website.
            </p>

            <p>
              Nothing in these Terms is intended to exclude or limit liability
              that cannot lawfully be excluded or limited under applicable
              law.
            </p>

            <h2>Indemnification</h2>

            <p>
              To the extent permitted by applicable law, you agree to
              indemnify and hold harmless CommandTec from claims, liabilities,
              damages, losses, and expenses arising from your unlawful use of
              the website or your violation of these Terms.
            </p>

            <h2>SMS and Text Messaging Terms</h2>

            <p>
              CommandTec sends SMS and text messages only after a user provides
              affirmative consent to receive those messages.
            </p>

            <p>
              Messages may include inquiry responses, consultation scheduling,
              reminders, and service-related updates. Message frequency
              varies. Message and data rates may apply.
            </p>

            <div className="mb-5 rounded-xl border-l-4 border-[var(--color-accent)] bg-[#f2f8f3] p-5">
              <p className="!mb-0 font-semibold text-[var(--color-deep)]">
                Consent to receive SMS messages is not a condition of purchase.
              </p>
            </div>

            <p>
              You may unsubscribe from SMS messages at any time by replying{" "}
              <strong>STOP</strong>. For assistance, reply <strong>HELP</strong>.
            </p>

            <p>
              Mobile carriers are not liable for delayed or undelivered
              messages.
            </p>

            <p>
              CommandTec may modify, suspend, or end its SMS or text messaging
              program at any time.
            </p>

            <p>
              SMS participation is also governed by the{" "}
              <Link href="/privacy-policy/">CommandTec Privacy Policy</Link>.
            </p>

            <h2>Severability</h2>

            <p>
              If any provision of these Terms is determined to be invalid or
              unenforceable, the remaining provisions will remain in effect to
              the extent permitted by law.
            </p>

            <h2>Changes to These Terms</h2>

            <p>
              CommandTec may update these Terms from time to time. Changes
              become effective when posted on this page unless otherwise
              stated. Your continued use of the website after an update
              constitutes acceptance of the revised Terms to the extent
              permitted by law.
            </p>

            <h2>Governing Law</h2>

            <div className="mb-5 rounded-xl border-l-4 border-[#c68a00] bg-[#fff8e8] p-5">
              <p className="!mb-0">
                <strong>Subject to legal review:</strong> These Terms are
                intended to be governed by the laws of the State of Alabama,
                without regard to conflict-of-law principles, except where
                applicable law requires otherwise.
              </p>
            </div>

            <h2>Contact Information</h2>

            <p>Questions regarding these Terms may be directed to:</p>

            <address className="not-italic leading-[1.8]">
              <strong>CommandTec</strong>
              <br />
              2417 Mastin Lake Road NW, Suite C
              <br />
              Huntsville, AL 35810
              <br />
              Phone:{" "}
              <a href="tel:+18777973414">877-797-3414</a>
              <br />
              Email:{" "}
              <a href="mailto:contact@commandtec.net">
                contact@commandtec.net
              </a>
            </address>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/privacy-policy/"
              className="font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              ← Privacy Policy
            </Link>

            <Link
              href="https://info.commandtec.net/"
              className="font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              ← Back to CommandTec
            </Link>
          </div>
        </article>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--color-ink)] px-6 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl font-bold">CommandTec</p>

            <p className="mt-2 text-sm text-white/60">
              2417 Mastin Lake Road NW, Suite C, Huntsville, AL 35810
            </p>
          </div>

          <div className="text-sm text-white/60">
            <a
              href="tel:+18777973414"
              className="transition hover:text-white"
            >
              877-797-3414
            </a>

            <span className="mx-2">·</span>

            <a
              href="mailto:contact@commandtec.net"
              className="transition hover:text-white"
            >
              contact@commandtec.net
            </a>
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/40">
          © 2026 CommandTec. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
