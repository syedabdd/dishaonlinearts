"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  ImageIcon,
  LogOut,
  PlaySquare,
  BarChart2,
  Menu,
  X,
} from "lucide-react";

const menus = [
  { name: "Dashboard",    href: "/admindp",              icon: LayoutDashboard },
  { name: "Blog",         href: "/admindp/blog",         icon: BookOpen        },
  { name: "Doubts",       href: "/admindp/ask-doubt",    icon: HelpCircle      },
  { name: "Banners",      href: "/admindp/banners",      icon: ImageIcon       },
  { name: "Free Courses", href: "/admindp/free-courses", icon: PlaySquare      },
  { name: "Analytics",    href: "/admindp/analytics",    icon: BarChart2       },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin-login";
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/admindp" && pathname.startsWith(href));

  return (
    <>
      {/* ── Top Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-full mx-auto h-full flex items-center justify-between px-4 lg:px-6">

          {/* Logo */}
          <Link href="/admindp" className="flex items-center gap-3 shrink-0">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200">
              <Image
                src="/Logo.PNG"
                alt="Disha Arts"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="leading-tight">
              <span className="text-base font-extrabold text-slate-900">
                Disha <span className="text-red-600">Arts</span>
              </span>
              <p className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
                Admin Panel
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {menus.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={16} />
                  {item.name}
                  {active && (
                    <motion.div
                      layoutId="admin-nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Logout (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-3">
            {/* Desktop logout */}
            <button
              onClick={logout}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <LogOut size={16} />
              Logout
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Dropdown panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-0 right-0 z-50 md:hidden shadow-xl bg-white border-b border-slate-200"
            >
              <nav className="flex flex-col p-3 gap-1">
                {menus.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        active
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                      }`}
                    >
                      <Icon size={17} />
                      {item.name}
                    </Link>
                  );
                })}

                {/* Mobile logout */}
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all mt-1 border-t border-slate-100 pt-3"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
