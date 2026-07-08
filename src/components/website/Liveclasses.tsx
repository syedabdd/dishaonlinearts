"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, User2, BookOpen } from "lucide-react";

const youtubeLinks = [
  "https://www.youtube.com/watch?v=gIdf2tIAMm0",
  "http://youtube.com/watch?v=he7e1b78OFo",
  "https://www.youtube.com/watch?v=A2rXZp1bQuw",
];

export default function LiveClasses() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const results = await Promise.all(
          youtubeLinks.map(async (url) => {
            try {
              const response = await fetch(
                `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
              );
              const data = await response.json();
              return {
                title: data.title,
                teacher: data.author_name,
                thumbnail: data.thumbnail_url.replace(
                  "hqdefault",
                  "maxresdefault",
                ),
                link: url,
              };
            } catch (error) {
              return null;
            }
          }),
        );
        setVideos(results.filter(Boolean));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <section
      className="relative py-16 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#1a2e6c]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c0202a]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header — left aligned with side decoration */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Tag */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
              style={{
                backgroundColor: "var(--disha-badge-bg)",
                border: "1px solid var(--disha-badge-border)",
                color: "var(--disha-navy-text)",
              }}
            >
              <BookOpen size={14} />
              Watch &amp; Learn for Free
            </div>

            <h2
              className="text-4xl md:text-5xl font-extrabold"
              style={{ color: "var(--text-primary)" }}
            >
              Free Live{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Arts Classes
              </span>
            </h2>

            {/* SVG brushstroke */}
            <svg viewBox="0 0 180 10" className="w-44 h-2.5 mt-3" fill="none">
              <path
                d="M5 5 Q45 2 90 5 Q135 8 175 5"
                stroke="url(#lcGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="lcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a2e6c" />
                  <stop offset="100%" stopColor="#c0202a" />
                </linearGradient>
              </defs>
            </svg>

            <p
              className="mt-4 text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              Watch our latest Arts sessions completely free — History,
              Geography, Pol. Science &amp; more.
            </p>
          </motion.div>

          {/* Button — top right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="https://www.youtube.com/@DishaArtsClasses"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl !text-white font-bold shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                boxShadow: "0 8px 25px rgba(26,46,108,0.35)",
              }}
            >
              Explore All Videos
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-3xl overflow-hidden shadow animate-pulse"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="h-56 bg-slate-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-100 rounded" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.a
                key={index}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl"
                      style={{
                        background: "linear-gradient(135deg, #1a2e6c, #c0202a)",
                      }}
                    >
                      <Play size={26} className="text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Subject tag */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md"
                      style={{ backgroundColor: "rgba(26,46,108,0.85)" }}
                    >
                      🎓 Arts Class
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-base font-bold leading-snug line-clamp-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {video.title}
                  </h3>

                  <div
                    className="flex items-center gap-2 mt-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <User2 size={15} />
                    <span className="text-sm font-medium">{video.teacher}</span>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className="mt-4 h-[2px] w-0 group-hover:w-full rounded-full transition-all duration-500"
                    style={{
                      background: "linear-gradient(90deg, #1a2e6c, #c0202a)",
                    }}
                  />
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
