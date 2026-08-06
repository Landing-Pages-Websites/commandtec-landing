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
    images: ["/images/hero-launch.jpg"],
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
  // dataLayer is initialised ahead of the config assignment.
  const megaTagConfig = `window.dataLayer=window.dataLayer||[];window.MEGA_TAG_CONFIG={siteKey:"${SITE_KEY}",siteId:"${SITE_ID}",gtmId:"${GTM_ID}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`;

  // GTM head loader — the injected tag is tagged id="mega-gtm" so the MEGA
  // optimizer's `!getElementById("mega-gtm")` guard sees it and never double-loads.
  const gtmLoader = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.id='mega-gtm';j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <meta name="mega-site-id" content={SITE_ID} />
        <script
          id="mega-tag-config"
          dangerouslySetInnerHTML={{ __html: megaTagConfig }}
        />
        <script id="mega-gtm" dangerouslySetInnerHTML={{ __html: gtmLoader }} />
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={SITE_ID}
          async
        />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        {/* GTM noscript — first child of body */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
        {children}
        {/* CallTrackingMetrics — universal Mega account (never remove) */}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
