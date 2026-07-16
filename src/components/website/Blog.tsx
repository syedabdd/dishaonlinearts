"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Search, ArrowRight, Zap, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { getBlogs } from "../../../app/(admin)/admindp/blog/actions";
import Pagination from "./Pagination";

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Blogs");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Extract unique categories from blogs
  const categories = useMemo(() => {
    const cats = new Set(blogs.map((b) => b.category).filter(Boolean));
    return ["All Blogs", ...Array.from(cats)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All Blogs" || blog.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, search, activeCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="min-h-screen bg-[#f4f6f9] pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Search & Filter Container (Matches screenshot style) */}
        <div className="bg-white rounded-[2rem] p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
          
          {/* Search Bar */}
          <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search topics by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm sm:text-base shadow-sm"
            />
          </div>

          {/* Category Chips (Horizontal Scroll) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
            {categories.map((category: any) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#111827] text-white shadow-md scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
              <div className="absolute inset-0 rounded-full border-4 border-[#111827] border-t-transparent animate-spin" />
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] border border-slate-200 p-12 text-center shadow-sm"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No blogs found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All Blogs"); }}
              className="mt-6 px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm"
            >
              Clear All
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            
            {/* Blog List (Horizontal Card style) */}
            <AnimatePresence mode="popLayout">
              {paginatedBlogs.map((blog, index) => (
                <motion.div
                  layout
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/blog/${blog.slug || blog.id}`} className="block">
                    <div className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_24px_rgb(0,0,0,0.04)] hover:shadow-lg hover:border-slate-200 transition-all duration-300">
                      
                      {/* Left: Image Container */}
                      <div className="relative w-full md:w-[280px] lg:w-[320px] h-[160px] md:h-[180px] lg:h-[200px] shrink-0 bg-slate-50 border-r border-slate-100 p-4 flex items-center justify-center">
                        <img
                          src={blog.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643"}
                          alt={blog.title}
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                      
                      {/* Right: Content Container */}
                      <div className="flex flex-col flex-1 p-4 md:p-5">
                        
                        {/* Category Badge */}
                        {blog.category && (
                          <div className="mb-2">
                            <span className="inline-block bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-full">
                              {blog.category}
                            </span>
                          </div>
                        )}
                        
                        {/* Title */}
                        <h3 className="text-slate-900 text-lg md:text-[20px] font-bold leading-snug line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                          {blog.title}
                        </h3>
                        
                        {/* Excerpt/Content Preview */}
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2 mb-3">
                          {blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) : "Read this article to learn more about the complete study plan and strategy for your upcoming examinations..."}
                        </p>
                        
                        {/* Footer: Date and Read More */}
                        <div className="mt-auto flex items-center justify-between text-slate-400 text-xs font-medium pt-3 border-t border-slate-50">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-GB') : "15/07/2026"}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-[#111827] font-bold group-hover:text-indigo-600 transition-colors">
                            Read More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}
            
            {filteredBlogs.length > 0 && (
              <p className="text-center text-sm font-medium text-slate-400 mt-6">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredBlogs.length)} of{" "}
                {filteredBlogs.length} blogs
              </p>
            )}
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
