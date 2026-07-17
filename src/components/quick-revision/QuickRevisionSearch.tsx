"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";

interface QuickRevisionSearchProps {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export default function QuickRevisionSearch({
  value,
  onChange,
  loading = false,
  placeholder = "Search topics, chapters, keywords...",
}: QuickRevisionSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search icon / loader */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        {loading ? (
          <Loader2 size={18} className="animate-spin text-[#1a2e6c]" />
        ) : (
          <Search size={18} />
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e6c]/20 focus:border-[#1a2e6c]/50 transition-all duration-200"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
