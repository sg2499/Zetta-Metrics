import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zetta-metrics.com"),
  title: {
    default: "Zetta Metrics | AI-Native Automation Platform",
    template: "%s | Zetta Metrics",
  },
  description:
    "Zetta Metrics builds AI-driven automation platforms that turn manual, fragmented business processes into intelligent digital workflows — starting with MathPath and School Enrichment.",
  keywords: [
    "Zetta Metrics",
    "AI automation platform",
    "SaaS",
    "EdTech platform",
    "MathPath",
    "School Enrichment",
    "AI workflow orchestration",
    "machine learning",
    "India startup",
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
      "AI-driven automation platform company. Two products live: MathPath and School Enrichment.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AmbientBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
