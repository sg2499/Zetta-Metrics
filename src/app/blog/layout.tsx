import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Technical writing and project breakdowns from ZettaMetrics and Prismatic Metrics.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
