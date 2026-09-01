import type { Metadata, Viewport } from "next";
import { Inter, Host_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Animator from "@/components/anim/Animator";
import FloatingActions from "@/components/layout/FloatingActions";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "techcadd Mohali | Best IT Training Institute in Mohali & Chandigarh",
    template: "%s | techcadd Mohali",
  },
  description: site.description,
  keywords: [
    "IT training institute Mohali",
    "computer institute Mohali",
    "AI course Mohali",
    "full stack course Chandigarh",
    "digital marketing course Mohali",
    "industrial training Mohali",
    "6 months training Mohali",
    "techcadd Mohali",
  ],
  openGraph: {
    title: "techcadd Mohali | Best IT Training Institute in Mohali & Chandigarh",
    description: site.description,
    url: site.url,
    siteName: "techcadd Mohali",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060e2b",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "techcadd Computer Education, Mohali",
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: "Mohali",
    addressRegion: "Punjab",
    postalCode: "160055",
    addressCountry: "IN",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "556" },
};

/**
 * Runs before first paint. Arms the scroll-reveal styles only when animations
 * can actually run, and starts a watchdog that disarms them if <Animator/>
 * never boots (JS disabled, chunk failed to load, script error). Without this,
 * a broken animation layer would leave every section permanently invisible.
 */
const armAnimations = `
(function(){try{
  var d=document.documentElement;
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  d.classList.add("anim-armed");
  window.__animWatchdog=setTimeout(function(){d.classList.remove("anim-armed")},3000);
}catch(e){}})();
`;

// suppressHydrationWarning on <html>: the inline script above adds `anim-armed`
// before React hydrates, so server and client markup differ there by design.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: armAnimations }} />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Animator />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
