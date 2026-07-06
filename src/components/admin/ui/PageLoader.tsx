"use client";

import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-3">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      <p className="text-slate-500 font-medium">Please wait...</p>
    </div>
  );
}
