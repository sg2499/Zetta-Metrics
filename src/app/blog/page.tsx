"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight, CalendarDays, Tag } from "lucide-react";
import { brand, insights } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease },
  }),
};

export default function BlogPage() {
  return (
    <div className="px-6 pb-20 pt-32">
      <div className="container-custom">
        <section className="mx-auto mb-14 max-w-3xl text-center">
          <p className="eyebrow">Insights</p>
          <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl">
            Technical writing that explains the work behind the portfolio.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Prismatic Metrics is the public thinking layer: project writeups,
            machine learning notes, and product-building lessons.
          </p>
          <a
            href={brand.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white"
          >
            Visit Prismatic Metrics <ArrowUpRight size={15} />
          </a>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {insights.map((post, index) => (
            <motion.a
              key={post.title}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={fadeUp}
              className="premium-card min-h-[280px]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays size={13} className="text-cyan-300" />
                  {post.date}
                </div>
                <ArrowUpRight size={16} className="text-slate-500 transition-colors group-hover:text-cyan-200" />
              </div>
              <h2 className="font-display mt-5 text-2xl font-semibold leading-tight text-white">
                {post.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{post.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-slate-400">
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </section>

        <section className="section pb-0">
          <div className="cta-band">
            <p className="eyebrow">Future direction</p>
            <h2 className="font-display max-w-3xl text-3xl font-semibold text-white md:text-5xl">
              The best articles should become native case studies.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Over time, the strongest blog posts can be migrated into ZettaMetrics
              as owned case-study pages while Prismatic Metrics remains the archive.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
