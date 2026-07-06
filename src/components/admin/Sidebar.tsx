"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  ImageIcon,
  LogOut,
  PlaySquare,
  FolderOpen,
  FileVideo,
  BarChart2,
} from "lucide-react";

export default function Sidebar({
  onMobileClose,
}: {
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/admindp",
      icon: LayoutDashboard,
    },
    {
      name: "Add Blog",
      href: "/admindp/blog",
      icon: BookOpen,
    },
    {
      name: "Doubts",
      href: "/admindp/ask-doubt",
      icon: HelpCircle,
    },
    {
      name: "Banners",
      href: "/admindp/banners",
      icon: ImageIcon,
    },

    {
      name: "Free Courses",
      href: "/admindp/free-courses",
      icon: PlaySquare,
    },
    {
      name: "Analytics",
      href: "/admindp/analytics",
      icon: BarChart2,
    },
  ];

  const logout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    window.location.href = "/admin-login";
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo Section */}
      <div className="h-24 px-6 flex flex-col justify-center items-center border-b border-slate-200 bg-linear-to-r from-blue-50 via-white to-red-50">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-200">
            <Image
              src="/Logo.PNG"
              alt="Disha Arts Classes Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <span className="text-xl font-extrabold leading-tight">
              <span className="text-blue-700">Disha</span>{" "}
              <span className="text-red-600">Arts</span>
            </span>

            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {menus.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/admindp" && pathname.startsWith(item.href));

          return (
            <motion.div
              key={item.name}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={item.href}
                onClick={onMobileClose}
                className={`group flex items-center gap-3 rounded-xl px-2 py-3 no-underline transition-all duration-300 ${
                  active
                    ? "bg-linear-to-r from-blue-50 to-red-50 text-black shadow-sm"
                    : "text-black hover:bg-slate-50"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-white shadow-sm"
                      : "bg-slate-100 group-hover:bg-blue-50 group-hover:scale-110"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`transition-all duration-300 ${
                      active
                        ? "text-blue-600"
                        : "text-slate-500 group-hover:text-blue-600"
                    }`}
                  />
                </div>

                <span className="text-sm font-bold text-black">
                  {item.name}
                </span>

                <span
                  className={`ml-auto transition-all duration-300 ${
                    active
                      ? "opacity-100 text-blue-600"
                      : "opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  →
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Logout */}
      <div className="border-t border-slate-100 p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="group cursor-pointer flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          <LogOut
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span className="text-sm font-medium">Logout</span>
        </motion.button>
      </div>
    </aside>
  );
}
