"use client";

import Link from "next/link";
import { Clock, Eye, BookOpen, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { SUBJECT_LABELS, SUBJECT_COLORS } from "@/lib/zod/quickRevisionSchema";

interface QuickRevisionCardProps {
  item: {
    title: string;
    slug: string;
    subject: string;
    chapter: string;
    className: string;
    board: string;
    thumbnail?: string | null;
    views: number;
    whatHappened: string;
  };
  index?: number;
}

export default function QuickRevisionCard({ item, index = 0 }: QuickRevisionCardProps) {
  const subjectLabel = SUBJECT_LABELS[item.subject] || item.subject;
  const subjectColor = SUBJECT_COLORS[item.subject] || "bg-gray-100 text-gray-700 border-gray-200";
  const preview = item.whatHappened?.slice(0, 120) + (item.whatHappened?.length > 120 ? "..." : "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/quick-revision/${item.slug}`} className="group block h-full">
        <div className="relative h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col">
          {/* Gradient top bar per subject */}
          <div
            className="h-1 w-0 group-hover:w-full transition-all duration-500"
            style={{
              background: "linear-gradient(90deg, #1a2e6c, #c0202a)",
            }}
          />

          {/* Thumbnail */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 h-44">
            {item.thumbnail ? (
              <img
                src={`/api/images/${item.thumbnail}`}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a2e6c]/10 to-[#c0202a]/10 flex items-center justify-center">
                  <BookOpen size={28} className="text-[#1a2e6c]/40" />
                </div>
              </div>
            )}

            {/* Subject badge on image */}
            <div className="absolute top-3 left-3">
              <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold border ${subjectColor} backdrop-blur-sm shadow-sm`}>
                {subjectLabel}
              </span>
            </div>

            {/* Class badge */}
            <div className="absolute top-3 right-3">
              <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold bg-[#1a2e6c] text-white shadow-sm">
                Class {item.className}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4">
            <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-[#1a2e6c] transition-colors mb-1.5">
              {item.title}
            </h3>

            <p className="text-xs text-gray-400 mb-2 font-medium truncate">
              📚 {item.chapter}
            </p>

            {/* Quick preview */}
            <p className="text-xs text-gray-500 line-clamp-2 flex-1 leading-relaxed">
              {preview}
            </p>

            {/* Footer */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Eye size={11} />
                  {item.views.toLocaleString()}
                </span>
              </div>

              <span className="flex items-center gap-1 text-xs font-semibold text-[#1a2e6c] group-hover:gap-2 transition-all">
                Read
                <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
