"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Landmark,
  BookOpen,
  ArrowRight,
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
      ease: "easeOut",
    },
  }),
};

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, index }: any) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp as any}
      className="group relative flex flex-col items-center text-center backdrop-blur-md rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,46,108,0.03), rgba(192,32,42,0.03))",
        }}
      />
      <div
        className="relative z-10 h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-md mb-6"
        style={{
          background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
        }}
      >
        {icon}
      </div>
      <div className="relative z-10">
        <h3
          className="font-bold text-xl mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {desc}
        </p>
      </div>
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
        className="flex items-center gap-2 rounded-2xl px-5 py-3 hover:shadow-lg transition-all duration-300 group"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <span className="group-hover:scale-110 transition-transform duration-200">
          {icon}
        </span>
        <span
          className="font-medium text-sm transition-colors"
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
      className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24 lg:py-32 transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-section)" }}
    >
      {/* ── Artistic Background Blobs (Navy & Red) ── */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-60"
        style={{ backgroundColor: "rgba(26,46,108,0.15)" }} 
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-60"
        style={{ backgroundColor: "rgba(192,32,42,0.12)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-[100%] blur-[120px] pointer-events-none opacity-30"
        style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        
        {/* Badge */}
        <motion.div
          variants={fadeUp as any}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          custom={0}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-8 shadow-sm"
          style={{
            background: "var(--disha-badge-bg)",
            border: "1px solid var(--disha-badge-border)",
          }}
        >
          <BookOpen size={16} style={{ color: "#c0202a" }} />
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
          className="text-5xl sm:text-6xl xl:text-[4.5rem] font-bold leading-[1.1] tracking-tight max-w-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          Welcome to
          <span
            className="block mt-2 font-extrabold"
            style={{
              background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
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
          className="mt-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Best Online Classes for Class 11th & 12th Arts (BSEB). Learn History, Geography, Political Science & Economics from expert faculty through live classes and smart study materials.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp as any}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          custom={3}
          className="mt-12 flex flex-col sm:flex-row gap-5 items-center justify-center w-full"
        >
          <Link
            href="https://play.google.com/store/apps/details?id=co.dishaonlineclasses"
            target="_blank"
            className="w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto overflow-hidden text-white font-bold px-10 py-4 rounded-[20px] transition-all duration-300 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                boxShadow: "0 8px 30px rgba(26,46,108,0.40)",
              }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center justify-center gap-3 text-lg">
                Explore Courses
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </span>
            </motion.button>
          </Link>

          <Link href="/download" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto overflow-hidden font-bold px-10 py-4 rounded-[20px] transition-all duration-300"
              style={{
                background: "transparent",
                border: "2px solid #1a2e6c",
                color: "#1a2e6c"
              }}
            >
              <span className="relative flex items-center justify-center gap-3 text-lg">
                Download App
                <Download
                  size={20}
                  className="group-hover:-translate-y-1 transition-transform duration-300"
                />
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Hero Image / Logo */}
        <motion.div
          variants={fadeUp as any}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          custom={4}
          className="mt-16 sm:mt-20 relative w-full max-w-[600px] mx-auto flex justify-center"
        >
          {/* Glow ring behind image */}
          <div
            className="absolute -inset-4 rounded-[40px] blur-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(26,46,108,0.15), rgba(192,32,42,0.1))",
            }}
          />
          <Image
            src="/welcome.webp"
            alt="Disha Arts Classes"
            className="relative z-10 w-full h-auto object-contain rounded-3xl"
            width={800}
            height={600}
            priority={true}
          />
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.1, delayChildren: 0.5 },
            },
          }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-24 grid md:grid-cols-3 gap-8 w-full"
        >
          <FeatureCard
            index={0}
            icon={<Landmark size={28} className="text-white" />}
            title="Expert Faculty"
            desc="Learn humanities from highly experienced and passionate educators."
          />
          <FeatureCard
            index={1}
            icon={<BookOpen size={28} className="text-white" />}
            title="Comprehensive Material"
            desc="Curated notes, PYQs, and study resources tailored for the Bihar Board."
          />
          <FeatureCard
            index={2}
            icon={<Globe size={28} className="text-white" />}
            title="Top Results"
            desc="Consistently producing top-tier results in Arts state board exams."
          />
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={fadeUp as any}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          custom={6}
          className="mt-20 pt-8 border-t w-full max-w-3xl flex flex-col items-center"
          style={{ borderColor: "var(--border-color)" }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            CONNECT WITH US
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <SocialButton
              index={1}
              icon={<FaYoutube size={18} style={{ color: "#c0202a" }} />}
              text="YouTube"
              to="https://www.youtube.com/@DishaArtsClasses"
            />
            <SocialButton
              index={2}
              icon={<FaWhatsapp size={18} className="text-green-500" />}
              text="WhatsApp"
              to="https://wa.me/917700879453"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
