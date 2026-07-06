import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Video, BookOpen, ChevronRight, PlayCircle, Play } from 'lucide-react';
import { getLectureBySlug } from '../../../../actions';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string, subjectId: string, chapterId: string, lectureId: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const result = await getLectureBySlug(resolvedParams.id, resolvedParams.subjectId, resolvedParams.chapterId, resolvedParams.lectureId);
  if (!result.success || !result.data) {
    return { title: 'Lecture Not Found | Free Courses' };
  }
  return {
    title: `${result.data.lecture.name} | ${result.data.lecture.chapter?.name || 'Chapter'} | Disha Arts`,
    description: result.data.lecture.content?.substring(0, 160) || 'Watch video lecture',
  };
}

export default async function LecturePage({ params }: { params: Promise<{ id: string, subjectId: string, chapterId: string, lectureId: string }> }) {
  const resolvedParams = await params;
  const courseSlug = resolvedParams.id;
  const subjectSlug = resolvedParams.subjectId;
  const chapterSlug = resolvedParams.chapterId;
  const lectureSlug = resolvedParams.lectureId;
  
  const result = await getLectureBySlug(courseSlug, subjectSlug, chapterSlug, lectureSlug);

  if (!result.success || !result.data) {
    return <div className="min-h-screen pt-40 pb-20 text-center text-xl font-bold">Lecture not found</div>;
  }

  const { lecture, prevLecture, nextLecture } = result.data;
  
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };
  
  const embedUrl = getYouTubeEmbedUrl(lecture.youtubeUrl || '');

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <Link 
            href={`/free-courses/${courseSlug}/${subjectSlug}`} 
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-x-1 group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-slate-800 group-hover:text-indigo-600 transition-colors" strokeWidth={2.5} />
          </Link>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm font-semibold">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md border border-indigo-100">
              {lecture.chapter?.subject?.course?.name}
            </span>
            <span className="text-slate-300">/</span>
            <span className="bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-md shadow-sm">
              {lecture.chapter?.subject?.name}
            </span>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="w-full aspect-video bg-black rounded-2xl md:rounded-4xl overflow-hidden shadow-2xl mb-8 relative border border-slate-200/50">
          {embedUrl ? (
            <iframe 
              src={embedUrl}
              title="Video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            ></iframe>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-3">
              <PlayCircle className="w-12 h-12" />
              <p>No video available for this lecture</p>
            </div>
          )}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
          
          {/* Title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-4 leading-tight">
            {lecture.name}
          </h1>
          
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs md:text-sm font-semibold">
              <Video className="w-3.5 h-3.5" />
              Video Lecture
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {prevLecture && (
            <Link 
              href={`/free-courses/${courseSlug}/${subjectSlug}/${chapterSlug}/${prevLecture.slug}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 text-slate-700 px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Previous
            </Link>
          )}
          
          {nextLecture ? (
            <Link 
              href={`/free-courses/${courseSlug}/${subjectSlug}/${chapterSlug}/${nextLecture.slug}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md group ml-auto"
            >
              Next Lecture
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 text-slate-400 px-8 py-3.5 rounded-xl font-bold ml-auto cursor-not-allowed">
              Next Lecture
              <ChevronRight className="w-5 h-5" />
            </div>
          )}
          </div>

          <hr className="my-8 border-slate-100" />

          {/* Text Content */}
          <div className="prose prose-slate max-w-none">
            {lecture.content && (
              <div 
                className="mt-6 prose-indigo"
                dangerouslySetInnerHTML={{ __html: lecture.content }}
              />
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
