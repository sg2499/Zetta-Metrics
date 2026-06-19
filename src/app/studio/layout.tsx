import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI assistants, RAG systems, AI MVP development, EdTech platforms, and data science consulting from ZettaMetrics.",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
