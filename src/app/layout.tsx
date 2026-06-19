import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zetta-metrics.com"),
  title: {
    default: "ZettaMetrics | AI Product Studio",
    template: "%s | ZettaMetrics",
  },
  description:
    "Founder-led AI product studio by Shailesh Gupta, building LLM applications, intelligent data systems, and EdTech platforms for businesses.",
  keywords: [
    "AI Product Studio",
    "AI MVP Development",
    "RAG Assistant",
    "Data Scientist",
    "AI Engineer",
    "LLM",
    "Machine Learning",
    "EdTech",
    "MathPath",
    "Shailesh Gupta",
    "IIT Roorkee",
    "Python",
    "Deep Learning",
  ],
  authors: [{ name: "Shailesh Gupta" }],
  creator: "Shailesh Gupta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.zetta-metrics.com",
    siteName: "ZettaMetrics",
    title: "ZettaMetrics | AI Product Studio",
    description:
      "Founder-led AI product studio building LLM applications, intelligent data systems, and EdTech platforms for businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZettaMetrics | AI Product Studio",
    description: "AI product studio for LLM apps, data systems, and EdTech platforms.",
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
    <html lang="en" className="dark">
      <body className="antialiased">
        <AmbientBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
