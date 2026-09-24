import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "MathPath and School Enrichment: the two Ed-Tech platforms built on Zetta Metrics' AI-native foundation.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
