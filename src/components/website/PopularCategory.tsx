"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Presentation,
  MapPin,
  GraduationCap,
  School,
  BookOpen,
  Landmark,
  Building2,
  Badge,
  Layers,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "DISHA COURSES",
    icon: Presentation,
    link: "https://dishaonlineclasses.com/course.php",
  },
  {
    id: 2,
    title: "STATE EXAMS",
    icon: MapPin,
    link: "https://dishaonlineclasses.com/",
  },
  {
    id: 3,
    title: "CLASS 9TH",
    icon: GraduationCap,
    link: "https://dishaonlineclasses.com/",
  },
  {
    id: 4,
    title: "CLASS 10TH",
    icon: School,
    link: "https://dishaonlineclasses.com/",
  },
  {
    id: 5,
    title: "CLASS 11TH",
    icon: BookOpen,
    link: "https://dishaonlineclasses.com/",
  },
  {
    id: 6,
    title: "CLASS 12TH",
    icon: GraduationCap,
    link: "https://dishaonlineclasses.com/",
  },
  {
    id: 7,
    title: "BIHAR BOARD",
    icon: Landmark,
    link: "https://dishaonlineclasses.com/",
  },
  {
    id: 8,
    title: "JHARKHAND BOARD",
    icon: Landmark,
    link: "https://dishaonlineclasses.com/",
  },
  {
    id: 9,
    title: "UP BOARD",
    icon: Landmark,
    link: "https://dishaonlineclasses.com/",
  },
  {
    id: 10,
    title: "FOUNDATION COURSES",
    icon: Building2,
    link: "https://dishacompetitiveclasses.com/",
  },
  {
    id: 11,
    title: "CBSE BOARD",
    icon: Badge,
    link: "https://dishaonlineclasses.com/",
  },
  {
    id: 12,
    title: "STREAM: ARTS / ARTS / COMMERCE",
    icon: Layers,
    link: "https://dishaonlineclasses.com/",
  },
];

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-violet-500",
  "from-yellow-500 to-amber-500",
  "from-teal-500 to-cyan-500",
  "from-rose-500 to-pink-500",
  "from-sky-500 to-blue-600",
  "from-fuchsia-500 to-purple-600",
  "from-lime-500 to-green-600",
  "from-violet-500 to-indigo-600",
];

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: any = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function PopularCategory() {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ backgroundColor: "var(--bg-section)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
        />

        <div
          className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
        />

        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
              style={{
                backgroundColor: "var(--disha-badge-bg)",
                border: "1px solid var(--disha-badge-border)",
                color: "var(--disha-navy-text)",
              }}
            >
              ✨ Explore Categories
            </span>

            <h2
              className="text-4xl md:text-6xl font-black leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Popular{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Categories
              </span>
            </h2>

            <p
              className="max-w-2xl mx-auto mt-5 text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Choose your preferred course category and start learning with
              India's most trusted educational platform.
            </p>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="h-1.5 bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 mx-auto mt-8 rounded-full"
            />
          </motion.div>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const gradient = gradients[(category.id - 1) % gradients.length];

            return (
              <Link
                key={category.id}
                href={category.link}
                className="block h-full outline-none"
              >
                <motion.div
                  variants={itemVariants as any}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative h-full"
                >
                  {/* Glow */}
                  <div
                    className={`absolute -inset-1 rounded-3xl bg-linear-to-r ${gradient} opacity-0 blur-lg group-hover:opacity-40 transition-all duration-700`}
                  />

                  {/* Card */}
                  <div className="relative h-full min-h-[190px] rounded-[24px] bg-white flex flex-col items-center p-5 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden cursor-pointer">
                    
                    {/* Shine */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none">
                      <div className="absolute -left-24 top-0 h-full w-20 bg-white/60 skew-x-12 animate-[shine_1.5s_linear]" />
                    </div>

                    {/* Icon */}
                    <div className="relative mt-2 mb-6 z-0">
                      {/* Glow underneath */}
                      <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-linear-to-br ${gradient} blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500`} />
                      
                      {/* Icon container */}
                      <div className={`relative w-14 h-14 rounded-[18px] bg-linear-to-br ${gradient} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1a2e6c] mt-auto mb-4 text-center leading-snug px-1 line-clamp-2">
                      {category.title}
                    </h3>

                    {/* Bottom Line */}
                    <div className={`h-[3px] rounded-full bg-linear-to-r ${gradient} w-6 group-hover:w-10 transition-all duration-300`} />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-200px) skewX(12deg);
          }
          100% {
            transform: translateX(500px) skewX(12deg);
          }
        }
      `}</style>
    </section>
  );
}
