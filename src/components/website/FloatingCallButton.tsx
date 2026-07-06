"use client";

import { Phone } from "lucide-react";

export default function FloatingCallButton() {
  const phoneNumber = "7700879453";

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 transition-transform duration-800 hover:scale-110 active:scale-95 group"
      aria-label="Call Us Now"
    >
      <Phone
        className="h-7 w-7 transition-transform group-hover:rotate-1 text-white"
        fill="currentColor"
      />
      <span
        className="absolute -z-10 inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
        style={{ animationDuration: "2s" }}
      ></span>
    </a>
  );
}
