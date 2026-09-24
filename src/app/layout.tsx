import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import SpotlightTracker from "@/components/SpotlightTracker";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";

// Self-hosted variable fonts (no request to Google at runtime or build time).
const manrope = localFont({ src: "./fonts/manrope-latin-wght-normal.woff2", variable: "--font-manrope", weight: "200 800", display: "swap" });
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const jetbrains = localFont({ src: "./fonts/jetbrains-mono-latin-wght-normal.woff2", variable: "--font-jetbrains", weight: "100 800", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zetta-metrics.com"),
  title: {
    default: "Zetta Metrics | AI-Native Automation Platform",
    template: "%s | Zetta Metrics",
  },
  description:
    "Zetta Metrics builds AI-driven automation platforms that turn manual, fragmented business processes into intelligent digital workflows, including MathPath and School Enrichment.",
  keywords: [
    "Zetta Metrics",
    "AI automation platform",
    "SaaS",
    "EdTech platform",
    "MathPath",
    "School Enrichment",
    "AI workflow orchestration",
    "machine learning",
    "India SaaS company",
  ],
  authors: [{ name: "Zetta Metrics Technologies Private Limited" }],
  creator: "Zetta Metrics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.zetta-metrics.com",
    siteName: "Zetta Metrics",
    title: "Zetta Metrics | AI-Native Automation Platform",
    description:
      "AI-driven automation platform company. MathPath and School Enrichment run on the same underlying platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zetta Metrics | AI-Native Automation Platform",
    description: "AI-native software for teams who are done doing things by hand.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zetta Metrics",
  legalName: "Zetta Metrics Technologies Private Limited",
  url: "https://www.zetta-metrics.com",
  logo: "https://www.zetta-metrics.com/logo-mark.png",
  description:
    "Zetta Metrics builds AI-driven automation platforms that turn manual, fragmented business processes into intelligent digital workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AmbientBackground />
          <ScrollProgress />
          <SpotlightTracker />
          <SmoothScroll />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
