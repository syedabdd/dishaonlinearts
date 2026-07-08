"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, ExternalLink } from "lucide-react";

const platforms = [
  {
    title: "Disha Hindi & English",
    subtitle: "Hindi & English Preparation",
    link: "https://www.youtube.com/@dishahindienglish",
    emoji: "📝",
  },
  {
    title: "Disha Arts Classes",
    subtitle: "Arts Stream Preparation",
    link: "https://www.youtube.com/@DishaArtsClasses",
    emoji: "🎨",
  },
  {
    title: "Disha Commerce Classes",
    subtitle: "Commerce Stream Preparation",
    link: "https://www.youtube.com/@dishacommerceclasses",
    emoji: "💼",
  },
  {
    title: "Disha Science Classes",
    subtitle: "Science Stream Preparation",
    link: "https://www.youtube.com/@DishaOnlineClasses",
    emoji: "🔬",
  },
  {
    title: "Disha Competitive",
    subtitle: "Competitive Exam Preparation",
    link: "https://www.youtube.com/@DishaCompetitiveClasses",
    emoji: "🏆",
  },
];

export default function DigitalEcoSystem() {
  const loopCards = [...platforms, ...platforms, ...platforms, ...platforms];

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#050c20" }}
    >
      {/* Animated dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient blobs */}
      <div
        className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: "rgba(26,46,108,0.30)" }}
      />
      <div
        className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: "rgba(192,32,42,0.22)" }}
      />
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div
            className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold backdrop-blur-md"
            style={{
              border: "1px solid rgba(192,32,42,0.40)",
              backgroundColor: "rgba(192,32,42,0.10)",
              color: "#f44a4a",
            }}
          >
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#c0202a" }}
            />
            THE DISHA UNIVERSE
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto max-w-4xl text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Explore Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4f68c7 0%, #c0202a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Digital Ecosystem
            </span>
          </h2>

          {/* Brushstroke under heading */}
          <div className="flex justify-center mt-4">
            <svg viewBox="0 0 200 12" className="w-48 h-3" fill="none">
              <path
                d="M5 6 Q50 2 100 6 Q150 10 195 6"
                stroke="url(#deGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="deGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f68c7" />
                  <stop offset="100%" stopColor="#c0202a" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-slate-400">
            Access our complete network of specialized educational portals
            designed to accelerate your success.
          </p>
        </motion.div>

        {/* Infinite Marquee */}
        <div className="relative py-4 overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-24 md:w-48 bg-gradient-to-r from-[#050c20] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 md:w-48 bg-gradient-to-l from-[#050c20] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="flex gap-5 w-max"
          >
            {loopCards.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group relative w-[260px] md:w-[300px] rounded-2xl p-6 will-change-transform cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#1a2e6c]/20 via-transparent to-[#c0202a]/15" />

                  {/* Top glow blob */}
                  <div className="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Emoji + icon */}
                  <div className="relative z-10 flex items-center gap-4 mb-5">
                    <div className="text-3xl">{item.emoji}</div>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{
                        border: "1px solid rgba(255,255,255,0.12)",
                        backgroundColor: "rgba(26,46,108,0.20)",
                      }}
                    >
                      <Globe className="h-6 w-6" style={{ color: "#4f68c7" }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-base font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400">{item.subtitle}</p>
                  </div>

                  {/* External link icon */}
                  <ExternalLink className="absolute top-4 right-4 w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors duration-300" />

                  {/* Hover border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/25 transition-all duration-500" />
                </motion.div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <motion.a
            href="https://www.youtube.com/@DishaArtsClasses"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group cursor-pointer relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-2xl !text-white font-bold shadow-xl transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
              boxShadow: "0 8px 30px rgba(26,46,108,0.70)",
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Disha Arts Channel
              <Globe className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            </span>
            <div className="absolute top-0 left-[-150%] h-full w-[100%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-700 ease-in-out group-hover:left-[150%] z-0" />
          </motion.a>
        </motion.div>

        <div className="mx-auto mt-16 h-px max-w-4xl bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      </div>
    </section>
  );
}
