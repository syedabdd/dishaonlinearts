import React from 'react';
import { Metadata } from 'next';
import { getPublicCourses } from './actions';
import FreeCoursesClient from './FreeCoursesClient';

export const metadata: Metadata = {
  title: 'Free Courses | Disha Arts Classes',
  description: 'Select your class and stream to start learning for free.',
};

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
            Select your class &amp; stream to start.
          </p>
        </div>

        {/* Client component handles list + pagination */}
        <FreeCoursesClient courses={coursesData as any} />

      </div>
    </main>
  );
}
