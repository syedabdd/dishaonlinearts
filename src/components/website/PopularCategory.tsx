"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  MapPin,
  GraduationCap,
  School,
  Landmark,
  Building2,
  Badge,
  Layers,
  Palette,
  BookMarked,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "HISTORY",
    icon: Landmark,
    link: "https://dishaonlineclasses.com/course.php",
    emoji: "🏛️",
  },
  {
    id: 2,
    title: "GEOGRAPHY",
    icon: MapPin,
    link: "https://dishaonlineclasses.com/",
    emoji: "🌍",
  },
  {
    id: 3,
    title: "POL. SCIENCE",
    icon: Building2,
    link: "https://dishaonlineclasses.com/",
    emoji: "⚖️",
  },
  {
    id: 4,
    title: "ECONOMICS",
    icon: BookOpen,
    link: "https://dishaonlineclasses.com/",
    emoji: "📊",
  },
  {
    id: 5,
    title: "CLASS 11TH",
    icon: School,
    link: "https://dishaonlineclasses.com/",
    emoji: "📚",
  },
  {
    id: 6,
    title: "CLASS 12TH",
    icon: GraduationCap,
    link: "https://dishaonlineclasses.com/",
    emoji: "🎓",
  },
  {
    id: 7,
    title: "BIHAR BOARD",
    icon: Landmark,
    link: "https://dishaonlineclasses.com/",
    emoji: "📋",
  },
  {
    id: 8,
    title: "SOCIOLOGY",
    icon: Layers,
    link: "https://dishaonlineclasses.com/",
    emoji: "👥",
  },
  {
    id: 9,
    title: "PHILOSOPHY",
    icon: BookMarked,
    link: "https://dishaonlineclasses.com/",
    emoji: "🔮",
  },
  {
    id: 10,
    title: "PSYCHOLOGY",
    icon: Badge,
    link: "https://dishacompetitiveclasses.com/",
    emoji: "🧠",
  },
  {
    id: 11,
    title: "HOME SCIENCE",
    icon: Palette,
    link: "https://dishaonlineclasses.com/",
    emoji: "🏠",
  },
  {
    id: 12,
    title: "ARTS STREAM",
    icon: Layers,
    link: "https://dishaonlineclasses.com/",
    emoji: "🎨",
  },
];

// Alternating colors for visual variety
const cardAccents = [
  { from: "#1a2e6c", to: "#2f4fb8" },
  { from: "#c0202a", to: "#f44a4a" },
  { from: "#1e3a96", to: "#4f68c7" },
  { from: "#c0202a", to: "#1a2e6c" },
  { from: "#2f4fb8", to: "#1a2e6c" },
  { from: "#e0252e", to: "#c0202a" },
  { from: "#1a2e6c", to: "#c0202a" },
  { from: "#4f68c7", to: "#1e3a96" },
  { from: "#ff7a7a", to: "#e0252e" },
  { from: "#1a2e6c", to: "#2f4fb8" },
  { from: "#c0202a", to: "#f44a4a" },
  { from: "#1e3a96", to: "#c0202a" },
];

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function PopularCategory() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      {/* Artistic background — paint splatter dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-12 left-12 w-72 h-72 bg-[#1a2e6c]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-12 right-12 w-72 h-72 bg-[#c0202a]/8 rounded-full blur-3xl" />
        {/* Small decorative dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${12 + (i % 3) * 8}px`,
              height: `${12 + (i % 3) * 8}px`,
              top: `${10 + (i * 11) % 80}%`,
              left: `${5 + (i * 13) % 90}%`,
              backgroundColor: i % 2 === 0 ? "#1a2e6c" : "#c0202a",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-6"
              style={{
                backgroundColor: "var(--disha-badge-bg)",
                border: "1px solid var(--disha-badge-border)",
                color: "var(--disha-navy-text)",
              }}
            >
              🎨 Arts Subjects & Categories
            </span>

            <h2
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Choose Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Subject
              </span>
            </h2>

            <p
              className="max-w-xl mx-auto mt-4 text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              Explore all Arts stream subjects and start your journey with Bihar's most trusted Arts platform.
            </p>

            {/* Decorative paint brush stroke */}
            <div className="flex justify-center mt-6">
              <svg viewBox="0 0 180 12" className="w-44 h-3" fill="none">
                <path
                  d="M5 6 Q45 2 90 6 Q135 10 175 6"
                  stroke="url(#brushGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="brushGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1a2e6c" />
                    <stop offset="100%" stopColor="#c0202a" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Categories — horizontal list style */}
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const accent = cardAccents[(category.id - 1) % cardAccents.length];

            return (
              <Link
                key={category.id}
                href={category.link}
                className="block outline-none"
              >
                <motion.div
                  variants={itemVariants as any}
                  whileHover={{ y: -6, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative rounded-2xl bg-white flex flex-col items-center justify-center p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer min-h-[120px] sm:min-h-[160px]">

                    {/* Top right accent corner */}
                    <div
                      className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                    />

                    {/* Icon badge */}
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
                      style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
                    </div>

                    {/* Title */}
                    <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-center leading-tight px-1 group-hover:text-[#c0202a] transition-colors duration-300"
                      style={{ color: "var(--disha-navy-text)" }}
                    >
                      {category.title}
                    </h3>

                    {/* Bottom accent bar */}
                    <div
                      className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                      style={{ background: `linear-gradient(to right, ${accent.from}, ${accent.to})` }}
                    />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-200px) skewX(12deg); }
          100% { transform: translateX(500px) skewX(12deg); }
        }
      `}</style>
    </section>
  );
}
