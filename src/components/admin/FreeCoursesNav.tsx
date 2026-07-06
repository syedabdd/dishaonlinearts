"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FreeCoursesNav() {
  const pathname = usePathname();

  const links = [
    { name: "Courses", href: "/admindp/free-courses" },
    { name: "Subjects", href: "/admindp/free-subjects" },
    { name: "Chapters", href: "/admindp/free-chapters" },
    { name: "Lectures", href: "/admindp/free-lectures" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-slate-200/60 shadow-sm w-fit">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`px-6 py-2.5 rounded-xl font-bold text-[15px] transition-all duration-300 flex items-center justify-center ${
              isActive
                ? "bg-blue-600 text-white! shadow-md shadow-blue-200/50"
                : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-blue-600"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
