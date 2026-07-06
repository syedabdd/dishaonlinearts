import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, PlayCircle, BookOpen, Globe } from 'lucide-react';
import { Metadata } from 'next';

import { getCourseBySlug } from '../actions';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const result = await getCourseBySlug(resolvedParams.id);
  const title = result.success && result.data ? `${result.data.name} | Disha Arts` : 'Subjects | Free Courses';
  return {
    title,
    description: result.success && result.data ? result.data.description : 'Select a subject to continue.',
  };
}

export default async function SubjectsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const courseSlug = resolvedParams.id;
  const result = await getCourseBySlug(courseSlug);
  
  if (!result.success || !result.data) {
    return <div className="min-h-screen pt-40 pb-20 text-center text-xl font-bold">Course not found</div>;
  }
  
  const course = result.data;
  const subjects = course.subjects || [];

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
        <div className="flex items-center gap-4 md:gap-5 mb-10">
          {/* Back Button */}
          <Link 
            href="/free-courses" 
            className="hidden md:flex w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-x-1 group shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-slate-800 group-hover:text-purple-600 transition-colors" strokeWidth={2.5} />
          </Link>

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-1 bg-linear-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm pb-1">
              {course.name}
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl">
              {course.description}
            </p>
          </div>
        </div>

        {/* Subjects List */}
        <div className="space-y-4 md:space-y-5">
          {subjects.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-white/50 backdrop-blur rounded-3xl border border-slate-100">
              No subjects available at the moment.
            </div>
          ) : (
            subjects.map((subject: any) => {
              const Icon = BookOpen; // Using a default icon
              const chapterCount = subject.chapters?.length || 0;
              return (
                <Link 
                  key={subject.id} 
                  href={`/free-courses/${courseSlug}/${subject.slug}`}
                  className="group flex items-center justify-between p-3.5 md:p-5 bg-white/90 backdrop-blur-xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] rounded-2xl md:rounded-3xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3.5 md:gap-5">
                    {/* Icon Box */}
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 bg-indigo-100 text-indigo-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                    </div>
                    
                    {/* Text */}
                    <div>
                      <h3 className="font-bold text-slate-800 text-[17px] md:text-[19px] mb-1 group-hover:text-purple-600 transition-colors leading-tight pr-2">
                        {subject.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs md:text-sm text-slate-500 font-medium">
                        <PlayCircle className="w-3.5 h-3.5 text-blue-600" />
                        {chapterCount} Chapters
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-slate-50 items-center justify-center shrink-0 border border-slate-100 group-hover:bg-purple-50 group-hover:border-purple-200 transition-colors ml-2">
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
