"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  BookText,
  Files,
  FileText,
  HelpCircle,
  Video,
  MessageCircle,
  ListChecks,
  Languages,
  Medal,
  ArrowRight,
  Flame,
} from "lucide-react";

const materials = [
  {
    title: "Class Syllabus",
    desc: "Detailed subject-wise breakdown for all board exams.",
    icon: BookOpen,
    color: "from-sky-500 to-blue-600",
    link: "https://dishaonlineclasses.com/study-materials.php",
  },
  {
    title: "NCERT Digital Books",
    desc: "Chapter-wise PDF downloads for grades 9 to 12.",
    icon: BookText,
    color: "from-red-500 to-red-600",
    link: "https://dishacompetitiveclasses.com/study-materials.php",
  },
  {
    title: "PYQ & Model Papers",
    desc: "Last 10 years past papers & expert model sets.",
    icon: Files,
    color: "from-amber-500 to-orange-600",
    link: "https://dishaonlineclasses.com/study-materials.php?search=&class=all&stream=all&subject=all&exam=ncert-book&type=all",
  },
  {
    title: "Premium Free Notes",
    desc: "Handwritten topper notes & quick revision summaries.",
    icon: FileText,
    color: "from-orange-500 to-orange-600",
    link: "https://dishaonlineclasses.com/study-materials.php?search=&class=all&stream=all&subject=all&exam=ncert-book&type=all",
  },
  {
    title: "Daily Live Quiz",
    desc: "Test your knowledge daily and top the leaderboard.",
    icon: HelpCircle,
    color: "from-blue-500 to-indigo-600",
    link: "https://dishaonlineclasses.com/quiz_home.php",
  },
  {
    title: "Live & VOD Classes",
    desc: "Interactive live sessions and high-quality recorded lectures.",
    icon: Video,
    color: "from-sky-500 to-cyan-600",
    link: "https://play.google.com/store/apps/details?id=co.dishaonlineclasses&hl=en_IN",
  },
  {
    title: "24/7 Doubt Resolution",
    desc: "Upload a photo and get instant solutions from top educators.",
    icon: MessageCircle,
    color: "from-red-500 to-pink-600",
    link: "/ask-doubt",
  },
  {
    title: "OMR Practice Sheets",
    desc: "Generate and download custom OMR sheets for objective prep.",
    icon: ListChecks,
    color: "from-amber-500 to-yellow-600",
    link: "https://dishaonlineclasses.com/omr.php",
  },
  {
    title: "Spoken English Module",
    desc: "Interactive multi-level platform to master spoken English.",
    icon: Languages,
    color: "from-orange-500 to-orange-600",
    link: "https://dishaonlineclasses.com/spoken-english.php",
  },
  {
    title: "Topper's Answer Copies",
    desc: "Analyze real board exam copies to understand scoring patterns.",
    icon: Medal,
    color: "from-blue-500 to-indigo-600",
    link: "https://dishaonlineclasses.com/study-materials.php",
  },
];

export default function StudyMaterial() {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg-section)" }}
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-[120px]" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--disha-navy-text)" }}
            >
              Free Learning Resources
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold"
            style={{ color: "var(--text-primary)" }}
          >
            Study Materials &
            <span
              style={{
                background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}
              Learning Resources
            </span>
          </h2>

          <p
            className="max-w-2xl mx-auto mt-5 text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Everything you need for exam preparation, revision, practice and
            doubt solving — all in one place.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-6 lg:gap-8">
          {materials.map((item, index) => {
            const Icon = item.icon;

            return item.link.startsWith("http") ? (
              <a
                href={item.link}
                key={index}
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  animation: `fadeUp 0.6s ease forwards`,
                  animationDelay: `${index * 0.08}s`,
                  opacity: 0,
                }}
              >
                <div
                  className="relative h-full rounded-3xl backdrop-blur-xl p-5 sm:p-7 overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:border-blue-200"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    boxShadow: undefined,
                  }}
                >
                  {/* Gradient Hover Background */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-orange-50 opacity-0 group-hover:opacity-10 transition-all duration-700" />

                  {/* Glow Blob */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-linear-to-br from-blue-200/40 to-purple-200/40 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  {/* Shine Effect */}
                  <div className="absolute -left-24 top-0 h-full w-16 bg-white/50 rotate-12 blur-xl group-hover:left-[130%] transition-all duration-1000" />

                  {/* Icon */}
                  <div className="relative z-10 flex justify-center mb-2 sm:mb-6">
                    <div className="p-2 rounded-[24px] border-2 border-dashed border-slate-200 group-hover:border-blue-300 transition-all duration-500">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center shadow-xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3
                      className="font-bold text-base sm:text-lg lg:text-xl mb-3 group-hover:text-blue-700 transition-all duration-300"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="text-xs sm:text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="relative hidden sm:flex z-10 mt-5 justify-center">
                    <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-100 transition-all duration-500" />
                </div>
              </a>
            ) : (
              <Link
                href={item.link}
                key={index}
                className="group relative"
                style={{
                  animation: `fadeUp 0.6s ease forwards`,
                  animationDelay: `${index * 0.08}s`,
                  opacity: 0,
                }}
              >
                <div
                  className="relative h-full rounded-3xl backdrop-blur-xl p-4 overflow-hidden transition-all duration-700 hover:-translate-y-3"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  {/* Gradient Hover Background */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-orange-50 opacity-0 group-hover:opacity-10 transition-all duration-700" />

                  {/* Glow Blob */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-linear-to-br from-blue-200/40 to-purple-200/40 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  {/* Shine Effect */}
                  <div className="absolute -left-24 top-0 h-full w-16 bg-white/50 rotate-12 blur-xl group-hover:left-[130%] transition-all duration-1000" />

                  {/* Icon */}
                  <div className="relative z-10 flex justify-center mb-6">
                    <div className="p-2 rounded-[24px] border-2 border-dashed border-slate-200 group-hover:border-blue-300 transition-all duration-500">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center shadow-xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3
                      className="font-bold text-base sm:text-lg lg:text-xl mb-3 group-hover:text-blue-700 transition-all duration-300"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="text-xs sm:text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 mt-3 hidden sm:flex justify-center">
                    <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-100 transition-all duration-500" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
