import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | CommandTec",
  description: "CommandTec Privacy Policy",
};

export default function PrivacyPolicyPage() {
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
              className="text-[var(--color-accent-dark)]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions/"
              className="text-white/80 transition hover:text-[var(--color-accent-dark)]"
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
            Privacy Policy
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
            <p>
              CommandTec ("CommandTec," "we," "our," or "us") respects your
              privacy and is committed to protecting the information you
              provide through our website, consultation forms, contact forms,
              and related communications.
            </p>

            <p>
              This Privacy Policy explains how CommandTec collects, uses,
              maintains, and discloses information obtained through our website
              and communications.
            </p>

            <h2>Information We Collect</h2>

            <h3>Information You Provide</h3>

            <p>
              When you submit a consultation request, contact form, inquiry,
              or other request through our website, we may collect:
            </p>

            <ul>
              <li>Name</li>
              <li>Work email address</li>
              <li>Phone number</li>
              <li>Certification interest</li>
              <li>Estimated budget</li>
              <li>Other information you voluntarily provide</li>
            </ul>

            <h3>Automatically Collected Information</h3>

            <p>
              When you visit our website, certain information may be collected
              automatically. This may include your browser type, device
              information, IP address, cookies, analytics information, pages
              viewed, referring pages, usage information, and other technical
              information necessary to operate and improve the website.
            </p>

            <h2>How We Use Your Information</h2>

            <p>CommandTec may use collected information to:</p>

            <ul>
              <li>Respond to inquiries and consultation requests;</li>
              <li>Schedule consultations;</li>
              <li>Provide requested service communications;</li>
              <li>Send consultation reminders and follow-ups;</li>
              <li>Operate and maintain our website;</li>
              <li>Improve website functionality and user experience;</li>
              <li>Maintain website security;</li>
              <li>Prevent fraud, abuse, or unauthorized activity; and</li>
              <li>Comply with applicable legal requirements.</li>
            </ul>

            <h2>Consultation and Service Communications</h2>

            <p>
              Information submitted through consultation and contact forms may
              be used to communicate with you about your inquiry, consultation
              request, scheduling, reminders, follow-ups, and requested
              services.
            </p>

            <h2>SMS and Text Messaging</h2>

            <div className="mb-5 rounded-xl border-l-4 border-[var(--color-accent)] bg-[#f2f8f3] p-5">
              <p className="!mb-0 font-semibold text-[var(--color-deep)]">
                SMS consent is not a condition of purchasing goods or
                services.
              </p>
            </div>

            <p>
              CommandTec sends SMS or text messages only after a user provides
              affirmative consent to receive those messages.
            </p>

            <p>
              Messages may relate to inquiries, consultation scheduling,
              reminders, and service-related updates. Message frequency
              varies. Message and data rates may apply.
            </p>

            <p>
              You may opt out of SMS or text messages at any time by replying{" "}
              <strong>STOP</strong> to a received message. For assistance,
              reply <strong>HELP</strong>.
            </p>

            <p>
              CommandTec may send one final message confirming that an opt-out
              request has been received and processed.
            </p>

            <p>
              Mobile opt-in information and consent will not be sold, rented,
              or shared with third parties or affiliates for their marketing
              or promotional purposes.
            </p>

            <p>
              Mobile information may be provided only to service providers
              that help CommandTec deliver the requested messaging service.
            </p>

            <p>
              Text-message originator opt-in data and consent will not be
              shared with third parties for marketing purposes.
            </p>

            <h2>Cookies and Similar Technologies</h2>

            <p>
              CommandTec may use cookies and similar technologies to support
              website functionality, understand website usage, improve
              performance, and analyze traffic.
            </p>

            <p>
              You may adjust your browser settings to manage or disable
              cookies. Disabling certain cookies may affect some website
              functionality.
            </p>

            <h2>Service Providers and Legal Disclosures</h2>

            <p>
              CommandTec may use service providers that assist with website
              operation, communications, consultation scheduling, security,
              analytics, or other services necessary to operate our website
              and respond to requests.
            </p>

            <p>
              We may also disclose information when required by law,
              regulation, legal process, or governmental request, or when
              reasonably necessary to protect the rights, security, or
              property of CommandTec or others.
            </p>

            <h2>Data Retention and Security</h2>

            <p>
              CommandTec retains information for as long as reasonably
              necessary to fulfill the purposes for which it was collected,
              support requested services, maintain appropriate business
              records, comply with legal obligations, and protect our
              legitimate interests.
            </p>

            <p>
              We use reasonable safeguards designed to protect information
              against unauthorized access, use, alteration, or disclosure.
              However, no electronic transmission or storage system can be
              guaranteed to be completely secure.
            </p>

            <h2>Third-Party Links</h2>

            <p>
              Our website may contain links to websites operated by third
              parties. CommandTec is not responsible for the privacy
              practices, security, or content of third-party websites. We
              encourage you to review the privacy policies of any third-party
              website you visit.
            </p>

            <h2>Children&apos;s Privacy</h2>

            <p>
              Our website is not directed toward children. CommandTec does not
              knowingly collect personal information from children under the
              age of 13.
            </p>

            <h2>Privacy Rights and Choices</h2>

            <p>
              Depending on applicable law, you may have rights regarding your
              personal information, including the right to request access to,
              correction of, or deletion of certain information.
            </p>

            <p>
              You may also manage your browser cookie settings and opt out of
              SMS communications at any time by replying STOP to a received
              text message.
            </p>

            <h2>Policy Updates</h2>

            <p>
              CommandTec may update this Privacy Policy from time to time to
              reflect changes in our website, communications practices, or
              applicable requirements. Updates will be posted on this page
              with a revised effective date.
            </p>

            <h2>Contact Us</h2>

            <p>
              If you have questions regarding this Privacy Policy or
              CommandTec&apos;s privacy practices, please contact us:
            </p>

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
              href="/terms-and-conditions/"
              className="font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              Terms &amp; Conditions →
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
