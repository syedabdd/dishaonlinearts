"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  BookText,
  Files,
  FileText,
  HelpCircle,
  Video,
  MessageCircle,
  ListChecks,
  Languages,
  Medal,
  ArrowRight,
} from "lucide-react";

const materials = [
  {
    title: "Class Syllabus",
    desc: "Detailed subject-wise breakdown for all board exams.",
    icon: BookOpen,
    color: "from-[#1a2e6c] to-[#2f4fb8]",
    link: "https://dishaonlineclasses.com/study-materials.php",
  },
  {
    title: "NCERT Digital Books",
    desc: "Chapter-wise PDF downloads for grades 9 to 12.",
    icon: BookText,
    color: "from-[#c0202a] to-[#f44a4a]",
    link: "https://dishacompetitiveclasses.com/study-materials.php",
  },
  {
    title: "PYQ & Model Papers",
    desc: "Last 10 years past papers & expert model sets.",
    icon: Files,
    color: "from-[#1e3a96] to-[#4f68c7]",
    link: "https://dishaonlineclasses.com/study-materials.php?search=&class=all&stream=all&subject=all&exam=ncert-book&type=all",
  },
  {
    title: "Premium Free Notes",
    desc: "Handwritten topper notes & quick revision summaries.",
    icon: FileText,
    color: "from-[#c0202a] to-[#1a2e6c]",
    link: "https://dishaonlineclasses.com/study-materials.php?search=&class=all&stream=all&subject=all&exam=ncert-book&type=all",
  },
  {
    title: "Daily Live Quiz",
    desc: "Test your knowledge daily and top the leaderboard.",
    icon: HelpCircle,
    color: "from-[#1a2e6c] to-[#c0202a]",
    link: "https://dishaonlineclasses.com/quiz_home.php",
  },
  {
    title: "Live & VOD Classes",
    desc: "Interactive live sessions and high-quality recorded lectures.",
    icon: Video,
    color: "from-[#2f4fb8] to-[#1a2e6c]",
    link: "https://play.google.com/store/apps/details?id=co.dishaonlineclasses&hl=en_IN",
  },
  {
    title: "24/7 Doubt Resolution",
    desc: "Upload a photo and get instant solutions from top educators.",
    icon: MessageCircle,
    color: "from-[#c0202a] to-[#e0252e]",
    link: "/ask-doubt",
  },
  {
    title: "OMR Practice Sheets",
    desc: "Generate and download custom OMR sheets for objective prep.",
    icon: ListChecks,
    color: "from-[#1a2e6c] to-[#4f68c7]",
    link: "https://dishaonlineclasses.com/omr.php",
  },
  {
    title: "Spoken English Module",
    desc: "Interactive multi-level platform to master spoken English.",
    icon: Languages,
    color: "from-[#e0252e] to-[#c0202a]",
    link: "https://dishaonlineclasses.com/spoken-english.php",
  },
  {
    title: "Topper's Answer Copies",
    desc: "Analyze real board exam copies to understand scoring patterns.",
    icon: Medal,
    color: "from-[#1e3a96] to-[#2f4fb8]",
    link: "https://dishaonlineclasses.com/study-materials.php",
  },
];

// Reusable card inner content
function CardContent({ item }: any) {
  const Icon = item.icon;
  return (
    <div
      className="relative h-full rounded-2xl p-5 sm:p-6 overflow-hidden transition-all duration-500 hover:-translate-y-2 group"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
      }}
    >
      {/* Top right accent triangle */}
      <div
        className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
      />

      {/* Shine */}
      <div className="absolute -left-24 top-0 h-full w-16 bg-white/40 rotate-12 blur-xl group-hover:left-[130%] transition-all duration-1000 pointer-events-none" />

      {/* Icon — left side */}
      <div className="relative z-10 flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shrink-0`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h3
          className="font-bold text-sm sm:text-base leading-tight group-hover:text-blue-700 transition-all duration-300"
          style={{ color: "var(--text-primary)" }}
        >
          {item.title}
        </h3>
      </div>

      {/* Description */}
      <p
        className="relative z-10 text-xs sm:text-sm leading-relaxed pl-0"
        style={{ color: "var(--text-secondary)" }}
      >
        {item.desc}
      </p>

      {/* Explore CTA */}
      <div className="relative z-10 mt-4 hidden sm:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
        <span className="text-xs font-semibold" style={{ color: "#1a2e6c" }}>Explore</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" style={{ color: "#1a2e6c" }} />
      </div>

      {/* Bottom accent bar */}
      <div
        className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full rounded-full transition-all duration-500 bg-gradient-to-r ${item.color}`}
      />
    </div>
  );
}

export default function StudyMaterial() {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg-section)" }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#1a2e6c]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#c0202a]/5 rounded-full blur-[100px] pointer-events-none" />
      {/* Grid dots pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #1a2e6c 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14 lg:mb-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                style={{
                  backgroundColor: "var(--disha-badge-bg)",
                  border: "1px solid var(--disha-badge-border)",
                  color: "var(--disha-navy-text)",
                }}
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-semibold">Free Learning Resources</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold"
                style={{ color: "var(--text-primary)" }}
              >
                Study Materials &{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Resources
                </span>
              </h2>

              {/* Brushstroke */}
              <svg viewBox="0 0 200 10" className="w-44 h-2.5 mt-3 mb-4" fill="none">
                <path d="M5 5 Q50 2 100 5 Q150 8 195 5" stroke="url(#smGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <defs>
                  <linearGradient id="smGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1a2e6c" />
                    <stop offset="100%" stopColor="#c0202a" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1 text-base sm:text-lg max-w-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Everything you need for Arts exam preparation, revision, practice and doubt solving — all in one place.
          </motion.p>
        </div>

        {/* Cards Grid — left-aligned icon layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {materials.map((item, index) =>
            item.link.startsWith("http") ? (
              <motion.a
                href={item.link}
                key={index}
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <CardContent item={item} />
              </motion.a>
            ) : (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Link href={item.link}>
                  <CardContent item={item} />
                </Link>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
