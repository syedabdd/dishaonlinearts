"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  BrainCircuit,
  BookOpenCheck,
  Trophy,
  ArrowRight,
  Smartphone,
  Star,
  Zap,
  Download,
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
      ease: "easeInOut",
    },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: "easeInOut",
    },
  }),
};

const slideLeft = {
  hidden: { opacity: 1, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, bg, title, desc, index }: any) {
  return (
    <motion.div
      custom={index}
      variants={fadeLeft as any}
      className="group relative flex items-start gap-4 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
      }}
    >
      {/* Gradient sweep on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, rgba(26,46,108,0.04), rgba(192,32,42,0.04), rgba(26,46,108,0.04))",
        }}
      />

      <div
        className={`relative z-10 h-12 w-12 rounded-xl ${bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
      >
        {icon}
      </div>

      <div className="relative z-10 text-left">
        <h3
          className="font-bold text-base md:text-lg leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        <p
          className="mt-1 text-sm md:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          {desc}
        </p>
      </div>

      {/* Right accent line */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-12 rounded-l-full transition-all duration-400"
        style={{ background: "linear-gradient(180deg, #1a2e6c, #c0202a)" }}
      />
    </motion.div>
  );
}

// ─── Social Button ────────────────────────────────────────────────────────────
function SocialButton({ icon, text, to = "#", index }: any) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp as any}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <a
        href={to}
        target={to.startsWith("http") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 hover:shadow-lg transition-all duration-300 group"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <span className="group-hover:scale-110 transition-transform duration-200">
          {icon}
        </span>
        <span
          className="font-semibold text-sm transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          {text}
        </span>
      </a>
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
      className="relative overflow-hidden pt-14 pb-10 sm:pt-20 mb-3 md:mb-0 sm:pb-16 lg:py-24 lg:pb-32 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-section)" }}
    >
      {/* ── Background Orbs ── */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: "rgba(26,46,108,0.18)" }}
      />
      <div
        className="absolute bottom-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
        style={{ backgroundColor: "rgba(192,32,42,0.12)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(26,46,108,0.10)" }}
      />

      {/* ── Decorative Grid ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #1a2e6c 1px, transparent 1px),
                            linear-gradient(to bottom, #1a2e6c 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* ── LEFT: Image Panel ── */}
          <motion.div
            variants={slideLeft as any}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="order-2 lg:order-1 flex justify-center"
          >
            <div className="relative w-full max-w-[480px]">
              {/* Glow ring */}
              <div
                className="absolute -inset-4 rounded-[40px] blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(26,46,108,0.25), rgba(192,32,42,0.15))",
                }}
              />

              {/* Card */}
              <div
                className="relative backdrop-blur-md rounded-[32px] p-8 md:p-10 overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 30px 80px rgba(26,46,108,0.15)",
                }}
              >
                {/* Inner shimmer */}
                <div
                  className="absolute inset-0 rounded-[32px]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(26,46,108,0.05), rgba(192,32,42,0.03))",
                  }}
                />

                <Image
                  src="/welcome.webp"
                  alt="Disha Arts Classes Classes"
                  className="relative z-10 w-full h-auto object-contain"
                  width={800}
                  height={600}
                  priority={true}
                />
              </div>

              {/* Floating badge – Students */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute sm:-left-11 sm:bottom-16 hidden rounded-2xl shadow-xl px-4 py-3 sm:flex items-center gap-3"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Star size={16} className="text-white fill-white" />
                </div>
                <div>
                  <p
                    className="text-xs leading-tight"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Active Students
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    50,000+
                  </p>
                </div>
              </motion.div>

              {/* Floating badge – Success */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -right-4 top-8 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <Zap size={16} className="text-white fill-white" />
                </div>
                <div>
                  <p
                    className="text-xs leading-tight"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Board Success
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    95% Rate
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT: Text Content ── */}
          <motion.div
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp as any}
              custom={0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-2 shadow-sm"
              style={{
                background: "var(--disha-badge-bg)",
                border: "1px solid var(--disha-badge-border)",
              }}
            >
              <Sparkles size={15} style={{ color: "#c0202a" }} />
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--disha-navy-text)" }}
              >
                Bihar's No.1 Digital Learning Ecosystem
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp as any}
              custom={1}
              className="text-4xl sm:text-5xl xl:text-[3.2rem] font-extrabold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Welcome to
              <span
                className="block mt-1"
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
              custom={2}
              className="mt-5 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{ color: "var(--text-secondary)" }}
            >
              Best Online Classes for Class 11th & 12th Arts (BSEB Bihar
              Board) for Bihar Students. Learn History, Geography, Political Science &
              Economics from expert faculty through live classes, smart study
              materials, doubt-solving support and complete Bihar Board exam
              preparation for top results.
            </motion.p>

            {/* Feature Cards */}
            <motion.div
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-8 space-y-3"
            >
              <FeatureCard
                index={0}
                icon={<BrainCircuit size={22} className="text-red-600" />}
                bg="bg-red-50"
                title="Expert Arts Faculties"
                desc="Learn History, Geography and Political Science from experienced mentors."
              />
              <FeatureCard
                index={1}
                icon={<BookOpenCheck size={22} className="text-orange-600" />}
                bg="bg-orange-50"
                title="Board Exam Masterclass"
                desc="High-scoring notes, PYQs and chapter-wise preparation."
              />
              <FeatureCard
                index={2}
                icon={<Trophy size={22} className="text-blue-600" />}
                bg="bg-blue-50"
                title="Topper's Legacy"
                desc="Producing Bihar Board Arts toppers year after year."
              />
            </motion.div>

            <motion.div
              variants={fadeUp as any}
              custom={6}
              className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:justify-start justify-center w-full"
            >
              <Link
                href="https://play.google.com/store/apps/details?id=co.dishaonlineclasses"
                target="_blank"
                className="w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group cursor-pointer relative w-full sm:w-auto overflow-hidden text-white font-bold px-10 py-5 rounded-2xl transition-shadow duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                    boxShadow: "0 8px 30px rgba(26,46,108,0.40)",
                  }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />

                  <span className="relative flex items-center justify-center gap-3">
                    Join Now &amp; Explore Batches
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1.5 transition-transform duration-300"
                    />
                  </span>
                </motion.button>
              </Link>

              <Link href="/download" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group cursor-pointer relative w-full sm:w-auto overflow-hidden text-white font-bold px-10 py-5 rounded-2xl transition-shadow duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                    boxShadow: "0 8px 30px rgba(26,46,108,0.40)",
                  }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />

                  <span className="relative flex items-center justify-center gap-3">
                    Download
                    <Download
                      size={20}
                      className="group-hover:-translate-y-1 transition-transform duration-300"
                    />
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeUp as any}
              custom={7}
              className="lg:mt-4 lg:pt-2 mt-8 pt-6 border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4 text-center lg:text-left"
                style={{ color: "var(--text-muted)" }}
              >
                Official Links
              </p>
              <motion.div
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.5 },
                  },
                }}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="flex flex-wrap justify-center lg:justify-start items-center gap-3"
              >
                <SocialButton
                  index={1}
                  icon={<FaYoutube size={17} style={{ color: "#c0202a" }} />}
                  text="YouTube"
                  to="https://www.youtube.com/@DishaArtsClasses"
                />
                <SocialButton
                  index={2}
                  icon={<FaWhatsapp size={17} className="text-green-500" />}
                  text="WhatsApp"
                  to="https://wa.me/917700879453"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
