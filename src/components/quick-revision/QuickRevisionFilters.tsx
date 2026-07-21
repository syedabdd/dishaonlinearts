"use client";

import { SUBJECT_LABELS } from "@/lib/zod/quickRevisionSchema";

interface FiltersProps {
  selectedClass: string;
  selectedSubject: string;
  selectedChapter: string;
  selectedBoard: string;
  activeSort: string;
  chapters: string[];
  onClassChange: (v: string) => void;
  onSubjectChange: (v: string) => void;
  onChapterChange: (v: string) => void;
  onBoardChange: (v: string) => void;
  onSortChange: (v: string) => void;
}

const SUBJECTS = [
  "HISTORY",
  "GEOGRAPHY",
  "POLITICAL_SCIENCE",
  "ECONOMICS",
  "SOCIOLOGY",
  "HINDI",
  "ENGLISH",
];
const BOARDS = ["Bihar Board", "CBSE", "UP Board", "All Boards"];
const SORTS = [
  { value: "latest", label: "Latest" },
  { value: "views", label: "Most Viewed" },
  { value: "featured", label: "Featured" },
];

export default function QuickRevisionFilters({
  selectedClass,
  selectedSubject,
  selectedChapter,
  selectedBoard,
  activeSort,
  chapters,
  onClassChange,
  onSubjectChange,
  onChapterChange,
  onBoardChange,
  onSortChange,
}: FiltersProps) {
  const selectCls =
    "px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a2e6c]/20 focus:border-[#1a2e6c]/50 appearance-none cursor-pointer min-w-28 transition";

  return (
    <div className="space-y-4">
      {/* Sort Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {SORTS.map((s) => (
          <button
            key={s.value}
            onClick={() => onSortChange(s.value)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeSort === s.value
                ? "bg-[#1a2e6c] text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#1a2e6c]/30 hover:text-[#1a2e6c]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Filter dropdowns */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Class */}
        <div className="relative">
          <select
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value)}
            className={selectCls}
          >
            <option value="">All Classes</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
            <option value="11th & 12th both">11th & 12th both</option>
          </select>
        </div>

        {/* Subject */}
        <div className="relative">
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className={selectCls}
          >
            <option value="">All Subjects</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {SUBJECT_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter */}
        {chapters.length > 0 && (
          <div className="relative">
            <select
              value={selectedChapter}
              onChange={(e) => onChapterChange(e.target.value)}
              className={selectCls + " max-w-48"}
            >
              <option value="">All Chapters</option>
              {chapters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Board */}
        <div className="relative">
          <select
            value={selectedBoard}
            onChange={(e) => onBoardChange(e.target.value)}
            className={selectCls}
          >
            <option value="">All Boards</option>
            {BOARDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Clear all */}
        {(selectedClass || selectedSubject || selectedChapter || selectedBoard) && (
          <button
            onClick={() => {
              onClassChange("");
              onSubjectChange("");
              onChapterChange("");
              onBoardChange("");
            }}
            className="text-xs text-[#c0202a] hover:underline font-medium transition"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
