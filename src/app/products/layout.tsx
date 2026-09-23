import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "MathPath and School Enrichment — the two products built on Zetta Metrics' AI platform.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
