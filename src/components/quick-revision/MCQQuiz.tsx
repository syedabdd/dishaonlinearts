"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

interface MCQQuizProps {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string; // "A" | "B" | "C" | "D"
  examTrick?: string;
}

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

const OPTION_COLORS = {
  default: "bg-white border-gray-200 text-gray-700 hover:border-[#1a2e6c]/40 hover:bg-blue-50/50",
  selected: "bg-[#1a2e6c]/5 border-[#1a2e6c] text-[#1a2e6c] font-semibold",
  correct: "bg-green-50 border-green-500 text-green-800 font-semibold",
  wrong: "bg-red-50 border-red-400 text-red-700 font-semibold",
};

export default function MCQQuiz({
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  correctAnswer,
  examTrick,
}: MCQQuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  
  const options = { A: optionA, B: optionB, C: optionC, D: optionD };
  const isAnswered = selected !== null;
  const isCorrect = selected === correctAnswer;

  function getOptionStyle(key: string): string {
    if (!isAnswered) {
      return OPTION_COLORS.default;
    }
    if (key === correctAnswer) return OPTION_COLORS.correct;
    if (key === selected) return OPTION_COLORS.wrong;
    return "bg-white border-gray-100 text-gray-400";
  }

  function handleReset() {
    setSelected(null);
  }

  return (
    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-white/60 flex items-center justify-center shadow-sm">
          <HelpCircle size={16} className="text-indigo-600" />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-indigo-700">
          MCQ Quiz
        </h3>
      </div>

      {/* Question */}
      <p className="text-sm font-semibold text-gray-800 mb-4 leading-relaxed">
        {question}
      </p>

      {/* Options */}
      <div className="space-y-2.5 mb-4">
        {OPTION_LABELS.map((key) => {
          const optionText = options[key];
          if (!optionText) return null;

          return (
            <motion.button
              key={key}
              onClick={() => !isAnswered && setSelected(key)}
              disabled={isAnswered}
              whileHover={!isAnswered ? { scale: 1.01 } : {}}
              whileTap={!isAnswered ? { scale: 0.99 } : {}}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-left cursor-pointer ${getOptionStyle(key)} disabled:cursor-default`}
            >
              {/* Option letter */}
              <span className="w-7 h-7 rounded-lg bg-white/70 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                {key}
              </span>

              <span className="text-sm flex-1">{optionText}</span>

              {/* Result icon */}
              <AnimatePresence>
                {isAnswered && key === correctAnswer && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                  </motion.div>
                )}
                {isAnswered && key === selected && key !== correctAnswer && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <XCircle size={18} className="text-red-500 shrink-0" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Result Message */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 mb-3 ${
              isCorrect
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {isCorrect ? (
                <CheckCircle2 size={16} className="text-green-600" />
              ) : (
                <XCircle size={16} className="text-red-500" />
              )}
              <span
                className={`text-sm font-bold ${isCorrect ? "text-green-700" : "text-red-600"}`}
              >
                {isCorrect ? "Correct! 🎉" : `Wrong! Correct answer is Option ${correctAnswer}`}
              </span>
            </div>
            {examTrick && (
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                <span className="font-semibold text-amber-700">💡 Exam Trick: </span>
                {examTrick}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Try Again */}
      {isAnswered && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleReset}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
        >
          ↺ Try Again
        </motion.button>
      )}
    </div>
  );
}
