"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2, User, BookOpen, Clock } from "lucide-react";

interface BlogPostProps {
  initialBlog: any;
  trendingBlogs?: any[];
}

export default function BlogPost({
  initialBlog,
  trendingBlogs = [],
}: BlogPostProps) {
  const blog = initialBlog;
  const [progress, setProgress] = useState(0);
  const [displayLanguage, setDisplayLanguage] = useState<"en" | "hi">("en");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const current = window.scrollY;

      setProgress((current / total) * 100);
      setIsScrolled(current > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog?.id]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!blog) return null;

  const activeContent = displayLanguage === "hi" && blog.hindi_content ? blog.hindi_content : blog.content;

  const readTime = Math.max(
    1,
    Math.ceil((activeContent?.replace(/<[^>]*>/g, "").length || 0) / 1000),
  );

  const hasHindi = Boolean(blog.hindi_content && blog.hindi_content.trim().length > 0);

  return (
    <div className="min-h-screen bg-[#f8f9fc] selection:bg-indigo-500/30 font-sans">
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 z-50 h-1.5 w-full bg-slate-200/50 backdrop-blur-sm">
        <div
          className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Back Button (Appears on Scroll) */}
      <div className={`fixed top-24 left-8 z-40 transition-all duration-500 hidden xl:block ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
        <Link
          href="/blog"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-slate-600 hover:text-indigo-600 hover:scale-110 transition-all"
          title="Back to Blogs"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="mb-10 lg:mb-16 max-w-4xl mx-auto text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium mb-8 transition-colors xl:hidden"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              {blog.category && (
                <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  {blog.category}
                </span>
              )}

              {/* Language Toggle */}
              {hasHindi && (
                <div className="flex items-center bg-white rounded-full p-1 border border-slate-200 shadow-sm">
                  <button
                    onClick={() => setDisplayLanguage("en")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      displayLanguage === "en"
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setDisplayLanguage("hi")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      displayLanguage === "hi"
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    हिंदी
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
              {displayLanguage === "hi" && blog.hindi_title ? blog.hindi_title : blog.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 font-medium border-t border-b border-slate-200 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-slate-900 font-bold">{blog.author || 'Disha Arts'}</span>
              </div>
              
              <div className="h-4 w-px bg-slate-300 hidden sm:block" />

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                {new Date(blog.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              <div className="h-4 w-px bg-slate-300 hidden sm:block" />

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                {readTime} min read
              </div>

              <button
                onClick={handleShare}
                className="ml-auto sm:ml-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Hero Image */}
          {blog.image && (
            <div className="mb-12 lg:mb-20 max-w-6xl mx-auto rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative group">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto max-h-[600px] object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          )}

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
            
            {/* Left Side: Article Content */}
            <article className="bg-white rounded-[2rem] p-6 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative">
              
              {/* Objective Box */}
              {blog.objective && (
                <div className="mb-10 p-6 rounded-2xl bg-linear-to-br from-indigo-50/50 to-purple-50/50 border border-indigo-100/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <BookOpen size={80} />
                  </div>
                  <h3 className="font-bold text-lg text-indigo-900 mb-3 flex items-center gap-2 relative z-10">
                    <div className="w-1.5 h-5 bg-indigo-500 rounded-full" />
                    Key Objective
                  </h3>
                  <p className="text-slate-700 leading-relaxed relative z-10 text-lg">
                    {blog.objective}
                  </p>
                </div>
              )}

              {/* Main Content Styling */}
              <div
                className="
                  prose prose-lg prose-slate max-w-none
                  prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-slate-600 prose-p:leading-loose prose-p:mb-8
                  prose-a:text-indigo-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10
                  prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:font-medium prose-blockquote:text-slate-800 prose-blockquote:italic
                  prose-li:text-slate-600 prose-li:leading-relaxed prose-li:marker:text-indigo-400
                  prose-strong:text-slate-900 prose-strong:font-bold
                  prose-table:w-full prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm
                  prose-th:bg-slate-100 prose-th:px-4 prose-th:py-3 prose-th:text-slate-900 prose-th:font-semibold
                  prose-td:border-t prose-td:border-slate-100 prose-td:px-4 prose-td:py-3
                "
                dangerouslySetInnerHTML={{
                  __html: activeContent,
                }}
              />
            </article>

            {/* Right Side: Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-32">
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                  Trending Reads
                </h3>

                <div className="flex flex-col gap-6">
                  {trendingBlogs.length > 0 ? (
                    trendingBlogs.map((item, idx) => (
                      <Link
                        key={item.id}
                        href={`/blog/${item.slug}`}
                        className="group flex gap-4 items-start"
                      >
                        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-sm">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="flex flex-col justify-center">
                          <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs font-medium text-slate-400 mt-2 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(item.created_at).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 bg-slate-50 rounded-xl text-center">
                      <p className="text-sm text-slate-500">No trending blogs at the moment.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Optional: Add a call to action or newsletter signup in sidebar */}
              <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white shadow-xl text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl" />
                <h3 className="font-bold text-2xl mb-3 relative z-10">Love our content?</h3>
                <p className="text-indigo-100 text-sm mb-6 relative z-10">
                  Stay updated with the latest articles and study materials from Disha Arts.
                </p>
                <Link href="/" className="inline-block w-full py-3 px-4 bg-white text-indigo-700 font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all relative z-10">
                  Explore Courses
                </Link>
              </div>

            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
