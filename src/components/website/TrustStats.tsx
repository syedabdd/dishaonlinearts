'use client';

import { type ReactNode } from "react";
import { Users, Trophy, Video, GraduationCap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats } from "../../data/siteData";

// ─── Gradient & Icon Config ───────────────────────────────────────────────────
const gradients = [
  { from: "#1a2e6c", to: "#2f4fb8", glow: "rgba(26,46,108,0.20)", border: "rgba(26,46,108,0.25)" },
  { from: "#c0202a", to: "#e0252e", glow: "rgba(192,32,42,0.20)", border: "rgba(192,32,42,0.25)" },
  { from: "#1e3a96", to: "#c0202a", glow: "rgba(30,58,150,0.20)", border: "rgba(30,58,150,0.25)" },
  { from: "#2f4fb8", to: "#1a2e6c", glow: "rgba(47,79,184,0.20)", border: "rgba(47,79,184,0.25)" },
];

const iconMap: Record<string, ReactNode> = {
  Users: <Users className="w-5 h-5 text-white" />,
  Trophy: <Trophy className="w-5 h-5 text-white" />,
  Youtube: <Video className="w-5 h-5 text-white" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-white" />,
};

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(ease * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}
      {inView ? suffix : ""}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TrustStats() {
  return (
    <section className="relative z-30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs mb-8 tracking-widest uppercase font-bold"
          style={{ color: "var(--text-muted)" }}
        >
          Our Impact in Numbers
        </motion.p>

        {/* ── Stats as horizontal banner with artistic accents ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative"
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-1 rounded-3xl blur-xl"
            style={{ background: "linear-gradient(90deg, rgba(26,46,108,0.15), rgba(192,32,42,0.08), rgba(26,46,108,0.15))" }}
          />

          {/* Glass panel */}
          <div
            className="relative backdrop-blur-2xl rounded-3xl shadow-lg overflow-hidden"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            {/* Diagonal artistic stripe overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: "repeating-linear-gradient(-55deg, #1a2e6c, #1a2e6c 1px, transparent 1px, transparent 24px)",
              }}
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => {
                const g = gradients[i];
                const isLastCol = (i + 1) % 2 === 0;
                const isLastRow = i >= 2;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative flex flex-col items-center justify-center gap-4 px-6 py-8 md:py-10 transition-all duration-300 cursor-default border-r border-b lg:border-b-0 border-slate-200/60 last:border-r-0"
                    style={{
                      borderRight: isLastCol ? "none" : undefined,
                      borderBottom: isLastRow ? "none" : undefined,
                    }}
                  >
                    {/* Hover background */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(ellipse at 50% 110%, ${g.glow}, transparent 65%)`,
                      }}
                    />

                    {/* Number with gradient */}
                    <div
                      className="text-4xl md:text-5xl font-black tracking-tight leading-none relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>

                    {/* Icon + Label */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="flex items-center justify-center w-10 h-10 rounded-xl shadow-md"
                        style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                      >
                        {/* Icon glow */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-300"
                          style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                        />
                        <span className="relative z-10">{iconMap[stat.icon]}</span>
                      </motion.div>

                      <div
                        className="text-xs md:text-sm font-semibold tracking-wide text-center"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {stat.label}
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-14 rounded-full transition-all duration-500"
                      style={{ background: `linear-gradient(to right, ${g.from}, ${g.to})` }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-xs mt-5 tracking-widest uppercase font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          Trusted by students across Bihar &amp; Jharkhand
        </motion.p>
      </div>
    </section>
  );
}
