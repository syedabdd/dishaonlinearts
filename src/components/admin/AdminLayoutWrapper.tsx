"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-white border border-slate-200 shadow-sm">
            <Image
              src="/Logo.PNG"
              alt="Disha Arts"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-extrabold leading-tight">
            <span className="text-blue-700">Disha</span>{" "}
            <span className="text-red-600">Arts</span>
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onMobileClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-64 min-h-screen pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
