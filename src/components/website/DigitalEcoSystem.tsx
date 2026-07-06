"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Rocket } from "lucide-react";

const platforms = [
  {
    title: "Disha Hindi & English",
    subtitle: "Disha Hindi & English Preparation",
    link: "https://www.youtube.com/@dishahindienglish",
  },
  {
    title: "Disha Arts Classes",
    subtitle: "Disha Arts Preparation",
    link: "https://www.youtube.com/@DishaArtsClasses",
  },
  {
    title: "Disha Arts Classes",
    subtitle: "Disha Arts Preparation",
    link: "https://www.youtube.com/@DishaArtsClasses",
  },
  {
    title: "Disha Commerce Classes",
    subtitle: "Disha Commerce Preparation",
    link: "https://www.youtube.com/@dishacommerceclasses",
  },
  {
    title: "Disha Competitive",
    subtitle: "Competitive Exam Preparation",
    link: "https://www.youtube.com/@DishaCompetitiveClasses",
  },
];

export default function DigitalEcoSystem() {
  const loopCards = [...platforms, ...platforms, ...platforms, ...platforms];

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#070c1e" }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)
            `,
            backgroundSize: "65px 65px",
          }}
        />
      </div>

      {/* Background Glow */}
      <div
        className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full blur-[150px]"
        style={{ backgroundColor: "rgba(26,46,108,0.25)" }}
      />
      <div
        className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full blur-[150px]"
        style={{ backgroundColor: "rgba(192,32,42,0.20)" }}
      />

      <div className="absolute left-20 top-40 h-52 w-52 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div
            className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold backdrop-blur-md"
            style={{
              border: "1px solid rgba(192,32,42,0.35)",
              backgroundColor: "rgba(192,32,42,0.10)",
              color: "#f44a4a",
            }}
          >
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#c0202a" }}
            ></span>
            THE DISHA UNIVERSE
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-8 max-w-4xl text-center"
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

          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-slate-400">
            Access our complete network of specialized educational portals
            designed to accelerate your success.
          </p>
        </motion.div>

        {/* Infinite Marquee */}
        <div className="relative mt-20 py-6">
          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-6 w-max"
          >
            {loopCards.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.04,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="group relative w-[290px] md:w-[330px] shrink-0 rounded-3xl border border-white/5 bg-transparent p-8 will-change-transform"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10"></div>
                  </div>

                  {/* Top Glow */}
                  <div className="absolute -top-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100"></div>

                  {/* Icon */}
                  <div
                    className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-3xl backdrop-blur-sm"
                    style={{
                      border: "1px solid rgba(255,255,255,0.10)",
                      backgroundColor: "rgba(26,46,108,0.15)",
                    }}
                  >
                    <Globe className="h-10 w-10" style={{ color: "#4f68c7" }} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-8 text-center">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-slate-400">{item.subtitle}</p>
                  </div>

                  {/* Border Hover */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-500 group-hover:border-blue-500/30"></div>
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
          <motion.button
            onClick={() =>
              window.open(
                "https://www.youtube.com/@DishaOnlineClasses",
                "_blank",
              )
            }
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="group cursor-pointer relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
              boxShadow: "0 8px 25px rgba(26,46,108,0.80)",
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore All Platforms
              <Rocket className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>

            {/* Crystal Shine Effect */}
            <div className="absolute top-0 left-[-150%] h-full w-[100%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-in-out group-hover:left-[150%] z-0" />

            {/* Glassmorphism subtle overlay on hover */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 z-0 backdrop-blur-[2px]" />
          </motion.button>
        </motion.div>

        {/* Bottom Line */}
        <div className="mx-auto mt-16 h-px max-w-4xl bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-30" />
      </div>
    </section>
  );
}
