import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#c0202a] rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium text-sm animate-pulse">Loading content...</p>
      </div>
    </div>
  );
}
