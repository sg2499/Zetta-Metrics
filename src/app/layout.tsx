import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import CosmicCanvas from "@/components/CosmicCanvas";

export const metadata: Metadata = {
  title: {
    default: "ZettaMetrics | AI Engineer & Data Scientist",
    template: "%s | ZettaMetrics",
  },
  description:
    "ZettaMetrics — the studio of Shailesh Gupta. Data Scientist, AI/LLM Engineer, and EdTech product builder. MDSAI at IIT Roorkee.",
  keywords: [
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
    url: "https://zetta-metrics.com",
    siteName: "ZettaMetrics",
    title: "ZettaMetrics | AI Engineer & Data Scientist",
    description:
      "Turning data into intelligence. Intelligence into products. AI/LLM Engineering, Data Science, and EdTech from IIT Roorkee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZettaMetrics | AI Engineer & Data Scientist",
    description:
      "Turning data into intelligence. Intelligence into products.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Cosmic background layers */}
        <AmbientBackground />
        <CosmicCanvas />

        {/* App */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
