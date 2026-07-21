"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import QuickRevisionCard from "@/components/quick-revision/QuickRevisionCard";
import QuickRevisionSearch from "@/components/quick-revision/QuickRevisionSearch";
import { useRouter } from "next/navigation";

export default function QuickRevisionSection() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/quick-revision?sort=featured&limit=4")
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(
        `/quick-revision?search=${encodeURIComponent(search.trim())}`,
      );
    } else {
      router.push("/quick-revision");
    }
  }

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#1a2e6c]/5 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#c0202a]/5 blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1a2e6c]/20 bg-[#1a2e6c]/6 text-[#1a2e6c] text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Zap className="w-4 h-4 fill-current" />
              Quick Revision
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Revise in{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                30 Seconds
              </span>
            </motion.h2>

            {/* Brushstroke underline */}
            <svg
              viewBox="0 0 200 10"
              className="w-48 h-2.5 mt-3 mb-4"
              fill="none"
            >
              <path
                d="M5 5 Q50 2 100 5 Q150 8 195 5"
                stroke="url(#qrGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="qrGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a2e6c" />
                  <stop offset="100%" stopColor="#c0202a" />
                </linearGradient>
              </defs>
            </svg>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Revise important topics in just 30 seconds. Dates, places,
              reasons, results — everything in one flash card.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/quick-revision"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl !text-white font-bold shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                boxShadow: "0 8px 25px rgba(26,46,108,0.35)",
              }}
            >
              <BookOpen size={17} />
              View All Topics
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <form onSubmit={handleSearchSubmit}>
            <QuickRevisionSearch
              value={search}
              onChange={setSearch}
              placeholder="Search QuickRevision topics..."
            />
          </form>
        </motion.div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-100 h-72 animate-pulse"
              />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((item, i) => (
              <QuickRevisionCard key={item.slug} item={item} index={i} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
