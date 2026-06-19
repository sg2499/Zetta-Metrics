import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects and Case Studies",
  description:
    "Selected AI, data science, EdTech, and product engineering work from ZettaMetrics and Shailesh Gupta.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
