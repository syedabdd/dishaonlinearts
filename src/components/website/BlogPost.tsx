"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";

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

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const current = window.scrollY;

      setProgress((current / total) * 100);
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
    <>
      {/* Reading Progress */}
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-[#1a2e6c] transition-all"
        style={{ width: `${progress}%` }}
      />

      <div className="min-h-screen bg-slate-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-[#1a2e6c] font-semibold mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to News
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-8">
            {/* LEFT SIDE */}
            <article className="bg-white rounded-[28px] shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-5 md:p-8">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-5">
                  {blog.category && (
                    <span className="inline-block px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                      {blog.category}
                    </span>
                  )}

                  {/* Language Toggle */}
                  {hasHindi && (
                    <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                      <button
                        onClick={() => setDisplayLanguage("en")}
                        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                          displayLanguage === "en"
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setDisplayLanguage("hi")}
                        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                          displayLanguage === "hi"
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        हिंदी
                      </button>
                    </div>
                  )}
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {displayLanguage === "hi" && blog.hindi_title ? blog.hindi_title : blog.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />

                    {new Date(blog.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>



                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blog.author}
                  </div>

                  <button
                    onClick={handleShare}
                    className="ml-auto p-2 rounded-full hover:bg-slate-100 transition"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Image */}
                {blog.image && (
                  <div className="mt-8">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="
                        w-full
                        rounded-2xl
                        object-cover
                        shadow-md
                      "
                    />
                  </div>
                )}

                {/* Objective */}
                {blog.objective && (
                  <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <h3 className="font-bold text-lg text-slate-900 mb-3">
                      Objective
                    </h3>

                    <p className="text-slate-700 leading-8">{blog.objective}</p>
                  </div>
                )}

                {/* Content */}
                <div
                  className="
                    prose
                    prose-slate
                    max-w-none
                    mt-8
                    prose-headings:font-bold
                    prose-headings:text-slate-900
                    prose-p:text-slate-700
                    prose-p:leading-8
                    prose-li:leading-8
                    prose-img:rounded-2xl
                    prose-table:block
                    prose-table:overflow-auto
                  "
                  dangerouslySetInnerHTML={{
                    __html: activeContent,
                  }}
                />
              </div>
            </article>

            {/* RIGHT SIDEBAR */}
            <aside className="space-y-5">
              <div className="bg-white rounded-3xl border border-slate-200 p-5 sticky top-28">
                <h2 className="font-bold text-lg text-slate-900 mb-5">
                  Trending Blogs
                </h2>

                <div className="space-y-4">
                  {trendingBlogs.length > 0 ? (
                    trendingBlogs.map((item) => (
                      <Link
                        key={item.id}
                        href={`/blog/${item.slug}`}
                        className="
                          flex
                          gap-3
                          group
                          pb-4
                          border-b
                          border-slate-100
                          last:border-0
                          last:pb-0
                        "
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="
                            w-24
                            h-16
                            rounded-xl
                            object-cover
                            shrink-0
                          "
                        />

                        <div>
                          <h3 className="text-sm font-semibold text-slate-800 group-hover:text-[#1a2e6c] line-clamp-3 transition">
                            {item.title}
                          </h3>

                          <p className="text-xs text-slate-500 mt-2">
                            {new Date(item.created_at).toLocaleDateString(
                              "en-GB",
                            )}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No trending blogs available.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
