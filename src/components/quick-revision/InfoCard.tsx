"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: string | LucideIcon;
  title: string;
  content: string | null | undefined;
  color?: string; // Tailwind gradient classes
  index?: number;
  variant?: "default" | "highlight" | "exam";
}

export default function InfoCard({
  icon: Icon,
  title,
  content,
  color = "from-blue-50 to-indigo-50",
  index = 0,
  variant = "default",
}: InfoCardProps) {
  if (!content) return null;

  const isEmoji = typeof Icon === "string";

  const borderColors: Record<string, string> = {
    default: "border-blue-100",
    highlight: "border-amber-200",
    exam: "border-green-200",
  };

  const titleColors: Record<string, string> = {
    default: "text-[#1a2e6c]",
    highlight: "text-amber-700",
    exam: "text-green-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className={`relative rounded-2xl border ${borderColors[variant]} bg-gradient-to-br ${color} p-5 overflow-hidden group`}
    >
      {/* Decorative circle */}
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/30 blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm shrink-0">
          {isEmoji ? (
            <span className="text-base leading-none">{Icon as string}</span>
          ) : (
            <Icon size={16} className="text-[#1a2e6c]" />
          )}
        </div>
        <h3 className={`text-sm font-bold uppercase tracking-wide ${titleColors[variant]}`}>
          {title}
        </h3>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {content}
      </p>
    </motion.div>
  );
}
