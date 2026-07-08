"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";
import Image from "next/image";
import Pagination from "@/components/website/Pagination";

const ITEMS_PER_PAGE = 10;

interface Course {
  id: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  subjects?: { chapters?: any[] }[];
}

export default function FreeCoursesClient({ courses }: { courses: Course[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const paginated = courses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Courses List */}
      <div className="space-y-4 md:space-y-5">
        {paginated.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-white/50 backdrop-blur rounded-3xl border border-slate-100">
            No free courses available at the moment.
          </div>
        ) : (
          paginated.map((course) => {
            const subjectCount = course.subjects?.length || 0;
            const chapterCount =
              course.subjects?.reduce(
                (acc, sub) => acc + (sub.chapters?.length || 0),
                0
              ) || 0;

            return (
              <Link
                key={course.id}
                href={`/free-courses/${course.slug}`}
                className="group flex items-center justify-between p-3.5 md:p-5 bg-white/90 backdrop-blur-xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] rounded-2xl md:rounded-3xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3.5 md:gap-5">
                  {/* Icon Box */}
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 bg-indigo-50 text-indigo-500 overflow-hidden relative shadow-sm">
                    {course.thumbnail ? (
                      <Image
                        src={course.thumbnail}
                        alt={course.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <GraduationCap
                        className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-bold text-slate-800 text-[15px] md:text-[17px] mb-1 group-hover:text-purple-600 transition-colors leading-tight pr-2">
                      {course.name}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 font-medium">
                      {course.description}
                    </p>
                    <div className="flex gap-3 mt-2 text-xs font-semibold text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {subjectCount} Subjects
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {chapterCount} Chapters
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex w-10 h-10 rounded-full bg-slate-50 items-center justify-center shrink-0 border border-slate-100 group-hover:bg-purple-50 group-hover:border-purple-200 transition-colors ml-2 self-auto">
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-purple-600 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Page info */}
      {courses.length > 0 && (
        <p className="text-center text-xs text-slate-400 mt-4">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
          {Math.min(currentPage * ITEMS_PER_PAGE, courses.length)} of{" "}
          {courses.length} courses
        </p>
      )}
    </>
  );
}
