import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Shailesh Gupta",
  description:
    "Founder profile for Shailesh Gupta, the Data Scientist and AI product builder behind ZettaMetrics.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
