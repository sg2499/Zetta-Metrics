import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project discussion with ZettaMetrics for AI product, EdTech, RAG, or data science work.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
