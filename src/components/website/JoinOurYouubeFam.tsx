"use client";

import React from "react";
import { Users, ArrowRight } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const channels = [
  {
    name: "Disha Arts Classes",
    subscribers: "968K+ Subscribers",
    url: "https://youtube.com",
  },
  {
    name: "Disha Commerce Classes",
    subscribers: "167K+ Subscribers",
    url: "https://youtube.com",
  },
  {
    name: "Disha Arts Classes",
    subscribers: "406K+ Subscribers",
    url: "https://youtube.com",
  },
  {
    name: "Disha Competitive Classes",
    subscribers: "119K+ Subscribers",
    url: "https://youtube.com",
  },
  {
    name: "Disha Junior Classes",
    subscribers: "146K+ Subscribers",
    url: "https://youtube.com",
  },
  {
    name: "Disha English Classes",
    subscribers: "78K+ Subscribers",
    url: "https://youtube.com",
  },
];

export default function JoinOurYoutubeFam() {
  const infiniteChannels = [...channels, ...channels, ...channels, ...channels];

  return (
    <section
      className="py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-section)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-5xl font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Join The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Disha Family
            </span>
            , Today!
          </h2>

          <p
            className="mt-5 text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Explore our massive YouTube ecosystem and subscribe to get access to
            top-tier education for free.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Left Blur */}
          <div
            className="absolute left-0 top-0 z-20 h-full w-24 md:w-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--bg-section), transparent)",
            }}
          />

          {/* Right Blur */}
          <div
            className="absolute right-0 top-0 z-20 h-full w-24 md:w-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, var(--bg-section), transparent)",
            }}
          />

          <div className="overflow-hidden">
            <div className="flex gap-6 marquee-track">
              {infiniteChannels.map((channel, index) => (
                <a
                  key={index}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <div
                    className="w-[280px] md:w-[320px] h-[220px] rounded-[28px] shadow-sm mb-3 hover:shadow-2xl hover:shadow-red-400 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center justify-center px-6"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <FaYoutube className="text-red-600 text-4xl" />
                    </div>

                    <h3
                      className="mt-6 text-lg md:text-xl font-bold text-center"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {channel.name}
                    </h3>

                    <div
                      className="mt-4 rounded-full px-4 py-2 flex items-center gap-2"
                      style={{
                        backgroundColor: "var(--bg-section)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Users size={15} />
                      <span className="text-sm font-semibold text-slate-700">
                        {channel.subscribers}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="text-center text-gray-200 mt-14">
          <a
            href="https://www.youtube.com/@DishaOnlineClasses"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
              boxShadow: "0 8px 25px rgba(26,46,108,0.35)",
            }}
          >
            Explore All Channels
            <ArrowRight size={20} />
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
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .marquee-track {
            animation-duration: 25s;
          }
        }
      `}</style>
    </section>
  );
}
