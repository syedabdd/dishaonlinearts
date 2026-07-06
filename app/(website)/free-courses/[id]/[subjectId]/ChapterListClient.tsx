"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Folder, ChevronDown, ChevronUp, PlayCircle, Play } from 'lucide-react';

export default function ChapterListClient({ chapters, courseSlug, subjectSlug }: { chapters: any[], courseSlug: string, subjectSlug: string }) {
  const [openChapter, setOpenChapter] = useState<number | null>(chapters[0]?.id || null);

  const toggleChapter = (id: number) => {
    setOpenChapter(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {chapters.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-white/50 backdrop-blur rounded-3xl border border-slate-100">
          No chapters available at the moment.
        </div>
      ) : (
        chapters.map((chapter: any) => {
          const isOpen = openChapter === chapter.id;

          return (
            <div 
              key={chapter.id} 
              className={`bg-white backdrop-blur-xl border ${isOpen ? 'border-indigo-100 ring-2 ring-indigo-50' : 'border-slate-100'} shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-3xl transition-all duration-300 overflow-hidden`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-slate-50/50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Folder className="w-6 h-6 fill-white/20" strokeWidth={2} />
                  </div>
                  <span className="font-bold text-slate-800 text-[16px] md:text-[18px]">
                    {chapter.name}
                  </span>
                </div>
                
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-indigo-500">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
                  ) : (
                    <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
                  )}
                </div>
              </button>

              {/* Accordion Content (Lectures) */}
              {isOpen && (
                <div className="border-t border-slate-100 bg-white">
                  {chapter.lectures && chapter.lectures.length > 0 ? (
                    chapter.lectures.map((lecture: any) => (
                      <Link 
                        key={lecture.id}
                        href={`/free-courses/${courseSlug}/${subjectSlug}/${chapter.slug}/${lecture.slug}`}
                        className="group flex items-start sm:items-center justify-between p-4 md:px-6 md:py-5 hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-50"
                      >
                        <div className="flex items-start sm:items-center gap-4 pr-4">
                          <div className="w-12 h-8 rounded-md bg-slate-200 overflow-hidden shrink-0 relative group-hover:ring-2 ring-indigo-200 transition-all">
                            {lecture.thumbnail ? (
                              <img src={lecture.thumbnail} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-indigo-400 bg-indigo-50">
                                <Play className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <h4 className="font-semibold text-slate-700 text-sm md:text-[15px] leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2 sm:line-clamp-none">
                              {lecture.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-slate-400 font-medium">
                              <PlayCircle className="w-3.5 h-3.5" />
                              Video Lecture
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-3 sm:mt-0">
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No lectures available in this chapter yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
