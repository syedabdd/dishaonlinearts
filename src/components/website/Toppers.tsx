"use client";

import React from "react";
import { ArrowRight, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Toppers() {
  const toppers = [
    {
      id: 1,
      name: "Nand Sultana",
      image:
        "https://dishaonlineclasses.com/uploads/toppers/1776233433_Rank2.jpeg",
      link: "https://dishaonlineclasses.com/toppers.php",
    },
    {
      id: 2,
      name: "Ansh Raj",
      image:
        "https://dishaonlineclasses.com/uploads/toppers/1776233427_Rank4.jpeg",
      link: "https://dishaonlineclasses.com/toppers.php",
    },
    {
      id: 3,
      name: "Bikash Kumar",
      image:
        "https://dishaonlineclasses.com/uploads/toppers/1776233422_Rank5.jpeg",
      link: "https://dishaonlineclasses.com/toppers.php",
    },
    {
      id: 4,
      name: "Abhay Kumar",
      image:
        "https://dishaonlineclasses.com/uploads/toppers/1776233416_Rank6Jamui.jpeg",
      link: "https://dishaonlineclasses.com/toppers.php",
    },
  ];

  const containerVariants: any = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: any = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" }, // Smooth spring-like ease
    },
  };

  return (
    <section
      className="relative overflow-hidden py-28"
      style={{
        backgroundColor: "#0b1121",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "inset 0 20px 40px -20px rgba(0,0,0,0.5)",
      }}
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{ background: "linear-gradient(135deg, #1a2e6c, #c0202a)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{ background: "#c0202a" }}
        />

        {/* Crystal Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20 text-center lg:text-left">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-md"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Trophy size={16} className="text-yellow-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-white">
                Our Pride
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white"
            >
              The Champions Of{" "}
              <span className="relative inline-block mt-2 lg:mt-0">
                <span
                  className="relative z-10 text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #fbbf24, #f59e0b, #ef4444)",
                  }}
                >
                  Disha Classes
                </span>
                <Sparkles className="absolute -top-6 -right-8 w-8 h-8 text-yellow-400 opacity-60 animate-pulse" />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-slate-300 font-light"
            >
              Creating history every year. Meet our top achievers who trusted
              Disha Online Classes for their ultimate success.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <a
              href="https://dishaonlineclasses.com/toppers.php"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #1a2e6c, #c0202a)",
                boxShadow: "0 10px 30px rgba(192,32,42,0.3)",
              }}
            >
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative text-gray-200 z-10">
                View All Toppers
              </span>
              <ArrowRight className="relative text-gray-200 z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Toppers Cards Grid */}
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
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
                className="block h-full group perspective-1000"
              >
                <div
                  className="relative h-full rounded-[2rem] p-2 overflow-hidden transition-all duration-500 transform-gpu group-hover:-translate-y-4 group-hover:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {/* Glowing border effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(26,46,108,0.5), rgba(192,32,42,0.5))",
                      padding: "1px",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />

                  {/* Crystal Shine Sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 overflow-hidden rounded-[2rem]">
                    <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[25deg] group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
                  </div>

                  {/* Image Container */}
                  <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden bg-[#0d163a]">
                    <img
                      src={topper.image}
                      alt={topper.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ minHeight: "380px" }}
                    />

                    {/* Premium Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#070c1e] via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes sweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
