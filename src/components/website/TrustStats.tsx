'use client';

import { type ReactNode } from "react";
import { Users, Trophy, Video, GraduationCap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats } from "../../data/siteData";

// ─── Gradient & Icon Config ───────────────────────────────────────────────────
const gradients = [
  {
    from: "#1a2e6c",
    to: "#2f4fb8",
    glow: "rgba(26,46,108,0.18)",
    border: "rgba(26,46,108,0.25)",
  },
  {
    from: "#c0202a",
    to: "#e0252e",
    glow: "rgba(192,32,42,0.18)",
    border: "rgba(192,32,42,0.25)",
  },
  {
    from: "#1e3a96",
    to: "#c0202a",
    glow: "rgba(30,58,150,0.18)",
    border: "rgba(30,58,150,0.25)",
  },
  {
    from: "#2f4fb8",
    to: "#1a2e6c",
    glow: "rgba(47,79,184,0.18)",
    border: "rgba(47,79,184,0.25)",
  },
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
    // Negative margin pulls it UP to overlap into Hero2's bottom
    <section className="relative z-30 -mt-10 px-4  sm:px-6 lg:px-8 pb-8">
      <div className="max-w-5xl mx-auto">
        {/* ── Glassmorphism Card Container ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Outer glow */}
          <div className="absolute -inset-1 rounded-3xl blur-xl" style={{ background: "linear-gradient(90deg, rgba(26,46,108,0.20), rgba(192,32,42,0.10), rgba(26,46,108,0.20))" }} />

          {/* Glass panel */}
          <div className="relative backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            {/* Top shimmer line */}
            <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-white to-transparent" />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => {
                const g = gradients[i];
                const isLast = i === stats.length - 1;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -3 }}
                    className={`group relative flex flex-col items-center justify-center gap-3 px-6 py-7 md:py-9 transition-all duration-300 cursor-default
                      ${!isLast ? "border-r border-b lg:border-b-0 border-slate-200/70" : "border-b lg:border-b-0 border-slate-200/70"}
                      ${i >= 2 ? "border-b-0" : ""}
                    `}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none"
                      style={{
                        background: `radial-gradient(circle at 50% 100%, ${g.glow}, transparent 70%)`,
                      }}
                    />

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                      className="relative z-10 flex items-center justify-center w-11 h-11 rounded-2xl shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                      }}
                    >
                      {/* Icon glow */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-80 blur-md transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                        }}
                      />
                      <span className="relative z-10">
                        {iconMap[stat.icon]}
                      </span>
                    </motion.div>

                    {/* Number */}
                    <div className="relative z-10 text-center">
                      <div
                        className="text-3xl md:text-4xl font-black tracking-tight leading-none"
                        style={{
                          background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        <AnimatedCounter
                          end={stat.value}
                          suffix={stat.suffix}
                        />
                      </div>

                      <div className="mt-1.5 text-xs md:text-sm font-semibold tracking-wide" style={{ color: "var(--text-muted)" }}>
                        {stat.label}
                      </div>
                    </div>

                    {/* Bottom accent bar */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-12 rounded-full transition-all duration-400"
                      style={{
                        background: `linear-gradient(to right, ${g.from}, ${g.to})`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom shimmer line */}
            <div className="absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
          </div>
        </motion.div>

        {/* ── Subtle label below ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-xs mt-4 tracking-widest uppercase font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          Trusted by students across Bihar & Jharkhand
        </motion.p>
      </div>
    </section>
  );
}
