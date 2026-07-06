"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Rss,
  Award,
  Wrench,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "../../data/siteData";

// Defined outside component to prevent recreation on every render
const moreLinks = [
  { label: "Blog", href: "/blog", icon: Rss },
  {
    label: "Toppers",
    href: "https://dishaonlineclasses.com/toppers.php",
    icon: Award,
  },
  {
    label: "Master Tools",
    href: "https://dishacompetitiveclasses.com/tools.php",
    icon: Wrench,
  },
  {
    label: "Community",
    href: "https://dishaonlineclasses.com/community.php",
    icon: Users,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname();

  // Throttled scroll handler using requestAnimationFrame — no unnecessary re-renders
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-[24px] border-b shadow-sm"
            : "bg-transparent"
        }`}
        style={
          scrolled
            ? {
                backgroundColor: "var(--nav-bg)",
                borderColor: "var(--nav-border)",
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src="/Logo.PNG"
                  alt="Disha Arts Classes Logo"
                  className="w-14 h-14 object-contain"
                  width={56}
                  height={56}
                  priority={true}
                  unoptimized={true}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-display  font-bold text-lg leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Disha Arts Classes
                </span>
                <span
                  className="text-[10px] ml-3 tracking-widest uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Direction To Success
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return link.href.startsWith("http") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`nav-link px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group hover:bg-slate-50`}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 rounded-full ${
                        isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                      }`}
                      style={{
                        background: "linear-gradient(90deg, #1a2e6c, #c0202a)",
                      }}
                    />
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group hover:bg-slate-50`}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 rounded-full ${
                        isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                      }`}
                      style={{
                        background: "linear-gradient(90deg, #1a2e6c, #c0202a)",
                      }}
                    />
                  </Link>
                );
              })}

              {/* "More" Dropdown — pure CSS hover, no JS */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white rounded-full transition-all duration-300 shadow-md ml-1"
                  style={{ backgroundColor: "#4a1c72" }}
                >
                  More
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2 flex flex-col">
                    {moreLinks.map((link) =>
                      link.href.startsWith("http") ? (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                        >
                          <link.icon className="w-4 h-4 text-slate-400" />
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                        >
                          <link.icon className="w-4 h-4 text-slate-400" />
                          {link.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop CTA */}
            <div
              className="
    hidden lg:flex items-center gap-3
     bg-green-600 text-white hover:bg-green-700
    shadow-[0px_8px_30px_rgba(26,46,108,0.4)]
    p-2 rounded-2xl
    transition-all duration-300
  "
            >
              <a
                href="tel:+917700879453"
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                <Phone className="text-white w-4 h-4" />
                <span className="hidden text-white xl:inline">
                  +91 7700879453
                </span>
              </a>
            </div>

            {/* Mobile: hamburger button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                id="mobile-menu-toggle"
                onClick={toggleMenu}
                className="p-2 rounded-xl transition-colors"
                aria-label="Toggle menu"
                style={{
                  backgroundColor: "rgba(26,46,108,0.08)",
                  color: "var(--text-primary)",
                }}
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer — pure CSS transition, no framer-motion */}
      <>
        {/* Backdrop */}
        <div
          onClick={closeMenu}
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-[60] transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Slide-in Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-80 shadow-2xl z-[70] lg:hidden flex flex-col bg-white transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ color: "var(--text-primary)" }}
        >
          {/* Drawer Header */}
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl overflow-hidden border shadow-lg"
                style={{ borderColor: "var(--border-color)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src="/Logo.PNG"
                  alt="Disha Arts Classes Logo"
                  className="w-full h-full object-cover"
                  width={44}
                  height={44}
                  priority={true}
                  unoptimized={true}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-display font-bold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Disha Arts Classes
                </span>
                <span
                  className="text-[10px] ml-2 tracking-widest uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Direction To Success
                </span>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="mb-1">
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className={`relative flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 text-[15px] font-medium hover:bg-slate-100`}
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-2.5 left-4 h-0.5 transition-all duration-300 rounded-full ${
                          isActive ? "w-8" : "w-0"
                        }`}
                        style={{
                          background:
                            "linear-gradient(90deg, #1a2e6c, #c0202a)",
                        }}
                      />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`relative flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 text-[15px] font-medium hover:bg-slate-100`}
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-2.5 left-4 h-0.5 transition-all duration-300 rounded-full ${
                          isActive ? "w-8" : "w-0"
                        }`}
                        style={{
                          background:
                            "linear-gradient(90deg, #1a2e6c, #c0202a)",
                        }}
                      />
                    </Link>
                  )}
                </div>
              );
            })}

            <div
              className="my-2 border-t"
              style={{ borderColor: "var(--border-color)" }}
            />

            {moreLinks.map((link) => (
              <div key={link.href}>
                {link.href.startsWith("http") ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-[15px] font-medium hover:bg-slate-100"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <link.icon className="w-4 h-4 text-slate-400" />
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-[15px] font-medium hover:bg-slate-100"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <link.icon className="w-4 h-4 text-slate-400" />
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Drawer Footer */}
          <div
            className="p-6 text-white border-t space-y-3"
            style={{ borderColor: "var(--border-color)" }}
          >
            <a
              href="tel:+917700879453"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium rounded-xl transition-colors bg-green-600 text-white hover:bg-green-700 shadow-sm"
            >
              <Phone className="w-4 h-4 !text-white" />
              +91 7700879453
            </a>
          </div>
        </div>
      </>
    </>
  );
}
