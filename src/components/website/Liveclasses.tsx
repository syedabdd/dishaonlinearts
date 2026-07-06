"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, GraduationCap } from "lucide-react";

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
                `https://www.youtube.com/oembed?url=${encodeURIComponent(
                  url,
                )}&format=json`,
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
      className="py-16 lg:py-24"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold"
            style={{ color: "var(--text-primary)" }}
          >
            Free{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Live Classes
            </span>
          </h2>

          <p
            className="mt-3 text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Watch our latest top sessions completely free
          </p>

          <div
            className="w-24 h-1.5 rounded-full mx-auto mt-5"
            style={{ background: "linear-gradient(90deg, #1a2e6c, #c0202a)" }}
          />
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl overflow-hidden shadow animate-pulse"
              >
                <div className="h-60 bg-slate-200" />
                <div className="p-5">
                  <div className="h-5 bg-slate-200 rounded mb-3" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
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
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
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
                    className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Play size={34} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-lg font-bold leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {video.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-4 text-orange-500">
                    <GraduationCap size={18} />
                    <span className="font-medium">{video.teacher}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex text-gray-200 justify-center mt-14"
        >
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
            Explore All Videos
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
