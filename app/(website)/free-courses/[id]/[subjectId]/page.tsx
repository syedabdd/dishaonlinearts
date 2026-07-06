import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getSubjectBySlug } from '../../actions';
import { Metadata } from 'next';
import ChapterListClient from './ChapterListClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string, subjectId: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const result = await getSubjectBySlug(resolvedParams.id, resolvedParams.subjectId);
  if (!result.success || !result.data) {
    return { title: 'Subject Not Found | Free Courses' };
  }
  return {
    title: `${result.data.name} | ${result.data.course?.name || 'Course'} | Disha Arts`,
    description: `Browse chapters and lectures for ${result.data.name}`,
  };
}

export default async function ChaptersPage({ params }: { params: Promise<{ id: string, subjectId: string }> }) {
  const resolvedParams = await params;
  const courseSlug = resolvedParams.id;
  const subjectSlug = resolvedParams.subjectId;
  
  const result = await getSubjectBySlug(courseSlug, subjectSlug);

  if (!result.success || !result.data) {
    return <div className="min-h-screen pt-40 pb-20 text-center text-xl font-bold">Subject not found</div>;
  }

  const subjectData = result.data;
  const chapters = subjectData.chapters || [];

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
            href={`/free-courses/${courseSlug}`} 
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-x-1 group shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-slate-800 group-hover:text-purple-600 transition-colors" strokeWidth={2.5} />
          </Link>

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-1 bg-linear-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm pb-1">
              {subjectData.name}
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              Browse chapters & lectures.
            </p>
          </div>
        </div>

        <ChapterListClient chapters={chapters} courseSlug={courseSlug} subjectSlug={subjectSlug} />
        
      </div>
    </main>
  );
}
