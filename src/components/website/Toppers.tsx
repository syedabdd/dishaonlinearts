"use client";

import React from "react";
import { ArrowRight, Trophy, Star, Medal } from "lucide-react";
import { motion } from "framer-motion";

export default function Toppers() {
  const toppers = [
    {
      id: 1,
      name: "Nand Sultana",
      rank: "Rank 2",
      image:
        "https://dishaonlineclasses.com/uploads/toppers/1776233433_Rank2.jpeg",
      link: "https://dishaonlineclasses.com/toppers.php",
    },
    {
      id: 2,
      name: "Ansh Raj",
      rank: "Rank 4",
      image:
        "https://dishaonlineclasses.com/uploads/toppers/1776233427_Rank4.jpeg",
      link: "https://dishaonlineclasses.com/toppers.php",
    },
    {
      id: 3,
      name: "Bikash Kumar",
      rank: "Rank 5",
      image:
        "https://dishaonlineclasses.com/uploads/toppers/1776233422_Rank5.jpeg",
      link: "https://dishaonlineclasses.com/toppers.php",
    },
    {
      id: 4,
      name: "Abhay Kumar",
      rank: "Rank 6",
      image:
        "https://dishaonlineclasses.com/uploads/toppers/1776233416_Rank6Jamui.jpeg",
      link: "https://dishaonlineclasses.com/toppers.php",
    },
  ];

  const cardVariants: any = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        backgroundColor: "#080f1e",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Diagonal geometric background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large diagonal stripe */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-60deg, #4f68c7, #4f68c7 1px, transparent 1px, transparent 30px)",
          }}
        />

        {/* Glow orbs */}
        <div
          className="absolute top-[-5%] left-[10%] w-[600px] h-[600px] rounded-full blur-[130px] opacity-15"
          style={{ background: "linear-gradient(135deg, #1a2e6c, #c0202a)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-10"
          style={{ background: "#c0202a" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <Trophy size={16} className="text-yellow-400" />
            <span className="text-sm font-bold uppercase tracking-widest text-white">
              Our Pride
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white"
          >
            Arts Board{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fbbf24, #f59e0b, #ef4444)",
              }}
            >
              Toppers
            </span>
          </motion.h2>

          {/* Brushstroke SVG */}
          <div className="flex justify-center mt-4">
            <svg viewBox="0 0 200 12" className="w-48 h-3" fill="none">
              <path
                d="M5 6 Q50 2 100 6 Q150 10 195 6"
                stroke="url(#tpGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="tpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-300 font-light max-w-2xl mx-auto"
          >
            Creating history every year. Meet our top achievers from the Arts
            stream who trusted Disha Online Classes for their success.
          </motion.p>
        </div>

        {/* Toppers Cards Grid — with name+rank overlay */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {toppers.map((topper) => (
            <motion.div
              key={topper.id}
              variants={cardVariants as any}
              className="h-full"
            >
              <a
                href={topper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
              >
                <div
                  className="relative h-full rounded-[1.75rem] overflow-hidden transition-all duration-500 transform-gpu group-hover:-translate-y-3 group-hover:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 50px -12px rgba(0,0,0,0.6)",
                  }}
                >
                  {/* Glowing border on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.75rem]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(26,46,108,0.6), rgba(192,32,42,0.6))",
                      padding: "1px",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />

                  {/* Rank badge — top left */}
                  <div className="absolute top-3 left-3 z-20">
                    <div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black backdrop-blur-md"
                      style={{
                        background: "linear-gradient(135deg, #1a2e6c, #c0202a)",
                        color: "white",
                      }}
                    >
                      <Medal className="w-3 h-3" />
                      {topper.rank}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-full w-full bg-[#0d163a]">
                    <img
                      src={topper.image}
                      alt={topper.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                      style={{ minHeight: "340px" }}
                    />

                    {/* Bottom gradient overlay with name */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-12">
                      <h3 className="text-white font-bold text-base">
                        {topper.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                        <span className="text-yellow-400 text-xs ml-1 font-semibold">
                          Top Ranker
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button — centered below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-14"
        >
          <a
            href="https://dishaonlineclasses.com/toppers.php"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold !text-white overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #1a2e6c, #c0202a)",
              boxShadow: "0 10px 30px rgba(192,32,42,0.35)",
            }}
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              View All Toppers
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      <style>{`
        .group-hover\\:scale-108:hover,
        .group:hover .group-hover\\:scale-108 {
          transform: scale(1.08);
        }
        @keyframes sweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </section>
  );
}
