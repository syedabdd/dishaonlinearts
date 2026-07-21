"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  Download,
  Palette,
  Globe2,
  BookMarked,
} from "lucide-react";
import { FaYoutube, FaWhatsapp } from "react-icons/fa";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: "easeOut",
    },
  }),
};

// ─── Subjects Pill ─────────────────────────────────────────────────────────────
const subjects = [
  { label: "History", emoji: "🏛️" },
  { label: "Geography", emoji: "🌍" },
  { label: "Pol. Science", emoji: "⚖️" },
  { label: "Economics", emoji: "📊" },
  { label: "Sociology", emoji: "👥" },
  { label: "Philosophy", emoji: "🔮" },
  { label: "Home Science", emoji: "🏠" },
  { label: "Psychology", emoji: "🧠" },
];

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, index, accent }: any) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp as any}
      className="group relative flex flex-col items-start text-left rounded-[28px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
      }}
    >
      {/* Artistic corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: accent }}
      />
      <div
        className="relative z-10 h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-md mb-5"
        style={{ background: accent }}
      >
        {icon}
      </div>
      <div className="relative z-10">
        <h3
          className="font-bold text-lg mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {desc}
        </p>
      </div>
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: accent }}
      />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Hero2() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-section)" }}
    >
      {/* ── Decorative ink-splash blobs ── */}
      <div
        className="absolute top-10 left-[-80px] w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none opacity-30"
        style={{ backgroundColor: "rgba(26,46,108,0.18)" }}
      />
      <div
        className="absolute bottom-20 right-[-60px] w-[380px] h-[380px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{ backgroundColor: "rgba(192,32,42,0.15)" }}
      />
      {/* Decorative diagonal stripes */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #1a2e6c,
            #1a2e6c 1px,
            transparent 1px,
            transparent 18px
          )`,
        }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-0 sm:pt-24 lg:pt-28 z-10">
        {/* Two-column hero layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left column — Text */}
          <div className="flex-1 flex flex-col items-start text-left">
            {/* Badge */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              custom={0}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 shadow-sm"
              style={{
                background: "var(--disha-badge-bg)",
                border: "1px solid var(--disha-badge-border)",
              }}
            >
              <Palette size={16} style={{ color: "#c0202a" }} />
              <span
                className="text-sm font-bold tracking-wide uppercase"
                style={{ color: "var(--disha-navy-text)" }}
              >
                Bihar's No.1 Arts Platform
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp as any}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              custom={1}
              className="text-5xl sm:text-6xl xl:text-[4.2rem] font-bold leading-[1.08] tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Welcome to
              <span
                className="block mt-2 font-extrabold"
                style={{
                  background:
                    "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Disha Arts Classes
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp as any}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              custom={2}
              className="mt-6 text-lg sm:text-xl leading-relaxed max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Bihar's most trusted platform for Class 11th &amp; 12th Arts
              (BSEB). Learn History, Geography, Political Science &amp;
              Economics from expert faculty.
            </motion.p>

            {/* Subject Pills */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              custom={2.5}
              className="mt-7 flex flex-wrap gap-2"
            >
              {subjects.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {s.emoji} {s.label}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              custom={3}
              className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link
                href="https://play.google.com/store/apps/details?id=co.dishaonlineclasses"
                target="_blank"
                className="w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-auto overflow-hidden text-white font-bold px-9 py-4 rounded-[18px] transition-all duration-300 shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                    boxShadow: "0 8px 30px rgba(26,46,108,0.40)",
                  }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                  <span className="relative flex items-center justify-center gap-3 text-base">
                    Explore Courses
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1.5 transition-transform duration-300"
                    />
                  </span>
                </motion.button>
              </Link>

              <Link href="/download" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-auto overflow-hidden font-bold px-9 py-4 rounded-[18px] transition-all duration-300"
                  style={{
                    background: "transparent",
                    border: "2px solid #1a2e6c",
                    color: "#1a2e6c",
                  }}
                >
                  <span className="relative flex items-center justify-center gap-3 text-base">
                    Download App
                    <Download
                      size={18}
                      className="group-hover:-translate-y-1 transition-transform duration-300"
                    />
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              custom={4}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-black">
                Connect:
              </span>
              <a
                href="https://www.youtube.com/@DishaArtsClasses"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl px-4 py-2.5 hover:shadow-lg transition-all duration-300 group"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <FaYoutube
                  size={18}
                  style={{ color: "#c0202a" }}
                  className="group-hover:scale-110 transition-transform"
                />
                <span
                  className="font-medium text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  YouTube
                </span>
              </a>
              <a
                href="https://wa.me/917700879453"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl px-4 py-2.5 hover:shadow-lg transition-all duration-300 group"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <FaWhatsapp
                  size={18}
                  className="text-green-500 group-hover:scale-110 transition-transform"
                />
                <span
                  className="font-medium text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  WhatsApp
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right column — Hero Image with artistic frame */}
          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            custom={4}
            className="flex-1 relative w-full max-w-[500px] mx-auto lg:mx-0"
          >
            {/* Decorative frame elements */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 rounded-tl-3xl border-t-4 border-l-4 opacity-40"
              style={{ borderColor: "#1a2e6c" }}
            />
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-br-3xl border-b-4 border-r-4 opacity-40"
              style={{ borderColor: "#c0202a" }}
            />
            {/* Glow ring behind image */}
            <div
              className="absolute -inset-6 rounded-[40px] blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(26,46,108,0.12), rgba(192,32,42,0.08))",
              }}
            />
            <Image
              src="/welcome.webp"
              alt="Disha Arts Classes"
              className="relative z-10 w-full h-auto object-contain rounded-3xl shadow-2xl"
              width={800}
              height={600}
              priority={true}
            />
          </motion.div>
        </div>

        {/* ── Feature Cards — 3 columns below ── */}
        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.1, delayChildren: 0.5 },
            },
          }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-10 py-10 mb-0 grid md:grid-cols-3 gap-6 w-full"
        >
          <FeatureCard
            index={0}
            icon={<BookMarked size={24} className="text-white" />}
            title="Expert Arts Faculty"
            desc="Learn humanities from highly experienced and passionate educators specializing in Arts stream."
            accent="linear-gradient(135deg, #1a2e6c 0%, #2f4fb8 100%)"
          />
          <FeatureCard
            index={1}
            icon={<BookOpen size={24} className="text-white" />}
            title="Bihar Board Focused"
            desc="Curated notes, PYQs, and study resources tailored specifically for BSEB Arts students."
            accent="linear-gradient(135deg, #c0202a 0%, #f44a4a 100%)"
          />
          <FeatureCard
            index={2}
            icon={<Globe2 size={24} className="text-white" />}
            title="Top Rankers Every Year"
            desc="Consistently producing top-tier results and district toppers in Arts board exams."
            accent="linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)"
          />
        </motion.div>
      </div>
    </section>
  );
}
