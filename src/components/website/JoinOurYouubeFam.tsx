"use client";

import React from "react";
import { Users, ArrowRight, Star } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const channels = [
  {
    name: "Disha Online Classes",
    subscribers: "2.76M subscribers",
    url: "https://www.youtube.com/@DishaOnlineClasses",
    emoji: "👑",
    highlight: true,
  },
  {
    name: "Disha Hindi & English Classes",
    subscribers: "1.2M subscribers",
    url: "https://www.youtube.com/@dishahindienglish",
    emoji: "📝",
    highlight: false,
  },
  {
    name: "Disha Science Classes",
    subscribers: "971K subscribers",
    url: "https://youtube.com/@DishaScienceClasses",
    emoji: "🔬",
    highlight: false,
  },
  {
    name: "Disha Arts Classes",
    subscribers: "425K subscribers",
    url: "https://youtube.com/@DishaArtsClasses",
    emoji: "🎨",
    highlight: false,
  },
  {
    name: "Disha Commerce Classes",
    subscribers: "175K subscribers",
    url: "https://www.youtube.com/@dishacommerceclasses",
    emoji: "💼",
    highlight: false,
  },
  {
    name: "Disha Science Classes English",
    subscribers: "120K subscribers",
    url: "https://www.youtube.com/@DishaScienceClassesenglishm",
    emoji: "🔬",
    highlight: false,
  },
  {
    name: "Disha Online Classes App",
    subscribers: "179K subscribers",
    url: "https://www.youtube.com/@dishaonlinetest",
    emoji: "📱",
    highlight: false,
  },
  {
    name: "Disha Junior Classes",
    subscribers: "161K subscribers",
    url: "https://www.youtube.com/@DishaJuniorClasses.",
    emoji: "📚",
    highlight: false,
  },
  {
    name: "Disha Competitive Classes",
    subscribers: "153K subscribers",
    url: "https://www.youtube.com/@DishaCompetitiveClasses",
    emoji: "🏆",
    highlight: false,
  },
  {
    name: "Sanjay Sir Ka Laadla",
    subscribers: "Subscribe now",
    url: "https://www.youtube.com/@sanjaysir_ka_ladla",
    emoji: "👨‍🏫",
    highlight: false,
  },
  {
    name: "Sanjay Sir Talks",
    subscribers: "Subscribe now",
    url: "https://www.youtube.com/@sanjaysirtalk",
    emoji: "🎙️",
    highlight: false,
  },
];

export default function JoinOurYoutubeFam() {
  const infiniteChannels = [...channels, ...channels, ...channels, ...channels];

  return (
    <section
      className="py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading — two-column */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
              style={{
                backgroundColor: "var(--disha-badge-bg)",
                border: "1px solid var(--disha-badge-border)",
                color: "var(--disha-navy-text)",
              }}
            >
              <FaYoutube style={{ color: "#c0202a" }} />
              YouTube Community
            </span>

            <h2
              className="text-3xl md:text-5xl font-black"
              style={{ color: "var(--text-primary)" }}
            >
              Join The{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Disha Family
              </span>
              !
            </h2>

            {/* Brushstroke */}
            <svg viewBox="0 0 180 10" className="w-44 h-2.5 mt-3" fill="none">
              <path
                d="M5 5 Q45 2 90 5 Q135 8 175 5"
                stroke="url(#jyGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="jyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a2e6c" />
                  <stop offset="100%" stopColor="#c0202a" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            Explore our massive YouTube ecosystem and subscribe to access
            top-tier Arts education for free.
          </motion.p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 z-20 h-full w-20 md:w-36 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--bg-page), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 z-20 h-full w-20 md:w-36 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, var(--bg-page), transparent)",
            }}
          />

          <div className="overflow-hidden">
            <div className="flex gap-5 marquee-track">
              {infiniteChannels.map((channel, index) => (
                <a
                  key={index}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <div
                    className="w-[240px] md:w-[280px] rounded-2xl shadow-sm mb-3 hover:shadow-xl hover:-translate-y-2 transition-all duration-400 overflow-hidden group"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      border: channel.highlight
                        ? "2px solid #1a2e6c"
                        : "1px solid var(--border-color)",
                    }}
                  >
                    {/* Highlight banner */}
                    {channel.highlight && (
                      <div
                        className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #1a2e6c, #c0202a)",
                        }}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        OUR FLAGSHIP CHANNEL
                      </div>
                    )}

                    <div className="flex flex-col items-center px-5 py-6">
                      {/* Emoji */}
                      <div className="text-4xl mb-3">{channel.emoji}</div>

                      {/* YouTube icon circle */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: channel.highlight
                            ? "linear-gradient(135deg, #1a2e6c, #c0202a)"
                            : "#f3f4f6",
                        }}
                      >
                        <FaYoutube
                          className={`text-3xl ${channel.highlight ? "text-white" : "text-red-600"}`}
                        />
                      </div>

                      <h3
                        className="text-sm md:text-base font-bold text-center"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {channel.name}
                      </h3>

                      <div
                        className="mt-3 rounded-full px-3 py-1.5 flex items-center gap-1.5"
                        style={{
                          backgroundColor: "var(--bg-section)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <Users size={12} />
                        <span className="text-xs font-semibold">
                          {channel.subscribers}
                        </span>
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div
                      className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
                      style={{
                        background: "linear-gradient(90deg, #1a2e6c, #c0202a)",
                      }}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-14">
          <a
            href="https://www.youtube.com/@DishaArtsClasses"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl !text-white font-bold shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
              boxShadow: "0 8px 25px rgba(26,46,108,0.35)",
            }}
          >
            Subscribe to Disha Arts
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>

      <style>{`
        .marquee-track {
          width: max-content;
          animation: scroll 80s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .marquee-track { animation-duration: 30s; }
        }
      `}</style>
    </section>
  );
}
