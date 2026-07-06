import React from 'react';
import Link from 'next/link';
import { ChevronRight, GraduationCap, FlaskConical, LineChart, Palette } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Courses | Disha Arts Classes',
  description: 'Select your class and stream to start learning for free.',
};

import { getPublicCourses } from './actions';
import Image from 'next/image';

export default async function FreeCoursesPage() {
  const result = await getPublicCourses();
  const coursesData = (result.success && result.data) ? result.data : [];
  return (
    <main className="min-h-screen pt-28 pb-20 relative bg-slate-50/30 overflow-hidden font-sans">
      {/* Graph Paper Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
          backgroundSize: `40px 40px`
        }}
      />
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-300/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-linear-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm pb-1">
            Free Courses
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium bg-white/80 inline-block px-5 py-2 rounded-full shadow-sm border border-slate-100 backdrop-blur-md">
            Select your class & stream to start.
          </p>
        </div>

        {/* Courses List */}
        <div className="space-y-4 md:space-y-5">
          {coursesData.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-white/50 backdrop-blur rounded-3xl border border-slate-100">
              No free courses available at the moment.
            </div>
          ) : (
            coursesData.map((course: any) => {
              const subjectCount = course.subjects?.length || 0;
              const chapterCount = course.subjects?.reduce((acc: number, sub: any) => acc + (sub.chapters?.length || 0), 0) || 0;
              
              return (
                <Link 
                  key={course.id} 
                  href={`/free-courses/${course.slug}`}
                  className="group flex items-center justify-between p-3.5 md:p-5 bg-white/90 backdrop-blur-xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] rounded-2xl md:rounded-3xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3.5 md:gap-5">
                    {/* Icon Box */}
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 bg-indigo-50 text-indigo-500 overflow-hidden relative shadow-sm`}>
                      {course.thumbnail ? (
                        <Image src={course.thumbnail} alt={course.name} fill className="object-cover" unoptimized />
                      ) : (
                        <GraduationCap className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" strokeWidth={1.5} />
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
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{subjectCount} Subjects</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{chapterCount} Chapters</span>
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
        
      </div>
    </main>
  );
}
