import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-active",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-active",
  display: "swap",
});

// === MEGA TAG CONFIG === (real CommandTec values — Meta declined, so no Meta Pixel)
const SITE_KEY = "5wy9d5dgo29fm8ix";
const SITE_ID = "1cbb187b-20ca-495c-85fe-f30bdc5e9abe";
const GTM_ID = "GTM-WSCKDRKJ";

export const metadata: Metadata = {
  metadataBase: new URL("https://info.commandtec.net"),
  title: "ISO & CMMI Certification Consulting | CommandTec",
  description:
    "CommandTec prepares US companies for ISO and CMMI certification end to end — documentation, process build, training, and audit coordination. US-based practitioners, delivered remotely nationwide. Free consultation for first-time clients.",
  openGraph: {
    title: "ISO & CMMI Certification Consulting, Run End to End | CommandTec",
    description:
      "Cradle-to-grave ISO and CMMI certification preparation by US-based practitioners. 20 years, 260+ commercial clients, never lost a client. Free consultation.",
    images: ["/images/hero-operations.jpg"],
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: { index: false, follow: false }, // ads LP — not indexed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  // GTM is loaded by the MEGA optimizer via gtmId in MEGA_TAG_CONFIG — no manual
  // loader. dataLayer is primed ahead of the config assignment.
  const megaTagConfig = `window.dataLayer=window.dataLayer||[];window.MEGA_TAG_CONFIG={siteKey:"${SITE_KEY}",siteId:"${SITE_ID}",gtmId:"${GTM_ID}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`;

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <meta name="mega-site-id" content={SITE_ID} />
        <script
          id="mega-tag-config"
          dangerouslySetInnerHTML={{ __html: megaTagConfig }}
        />
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={SITE_ID}
          async
        />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        {children}
        {/* CallTrackingMetrics — universal Mega account (never remove) */}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
