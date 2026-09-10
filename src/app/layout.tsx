import type { Metadata, Viewport } from "next";
import { Inter, Host_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getNavPages } from "@/lib/cms/content";
import Animator from "@/components/anim/Animator";
import Cursor from "@/components/anim/Cursor";
import FloatingActions from "@/components/layout/FloatingActions";
import EnquiryModal from "@/components/layout/EnquiryModal";
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
  /**
   * Both sizes are declared so the browser picks rather than rescales: 192 for
   * the tab and the Android home screen, 512 for splash screens and anywhere
   * the icon is shown large.
   *
   * This config only takes effect because there is no longer a `favicon.ico` in
   * `src/app/` — Next's file conventions outrank `metadata.icons`, so the
   * scaffold's default icon was winning over anything declared here.
   */
  icons: {
    icon: [
      { url: "/icon/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon/icon-192.png",
    apple: { url: "/icon/icon-192.png", sizes: "192x192", type: "image/png" },
  },
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
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  /*
    Pages an editor asked to appear in a menu.

    Fetched once here rather than in each menu: the header and the footer would
    otherwise make the same call on every render of every page. One read, split
    by where the editor asked for it.
  */
  const navPages = await getNavPages();
  const headerPages = navPages.filter((page) => page.placement === "header");
  const footerPages = navPages.filter((page) => page.placement === "footer");

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
        <Cursor />
        <Navbar cmsPages={headerPages} />
        <main>{children}</main>
        <Footer cmsPages={footerPages} />
        <FloatingActions />
        <EnquiryModal />
      </body>
    </html>
  );
}
