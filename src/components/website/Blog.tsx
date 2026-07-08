"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Search, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getBlogs } from "../../../app/(admin)/admindp/blog/actions";
import Pagination from "./Pagination";

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [blogs, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 mb-10 flex flex-col md:flex-row justify-between gap-4">
          <div className="inline-flex items-center gap-2 bg-[#1a2e6c] text-white px-6 py-3 rounded-full font-semibold w-fit">
            <BookOpen className="w-5 h-5" />
            Latest Blogs
          </div>

          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-2xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1a2e6c]"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Latest Updates
        </h2>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-12 h-12 rounded-full border-4 border-[#1a2e6c] border-t-transparent animate-spin" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              No Blogs Found
            </h3>
            <p className="text-slate-500">Try searching something else.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {paginatedBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.4,
                }}
              >
                <Link href={`/blog/${blog.id}`}>
                  <div className="group bg-white rounded-[28px] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                    <div className="flex flex-col md:flex-row gap-5 p-5">
                      {/* Image */}
                      <div className="w-full md:w-[280px] lg:w-[320px] h-[190px] rounded-2xl overflow-hidden shrink-0">
                        <img
                          src={
                            blog.image ||
                            "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                          }
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-center flex-1">
                        <div className="mb-4">
                          <span className="bg-indigo-50 text-[#1a2e6c] text-xs font-semibold px-4 py-1.5 rounded-full">
                            {blog.category || "Education"}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#c0202a] transition">
                          {blog.title}
                        </h3>

                        <p className="text-slate-600 line-clamp-3 leading-7 mb-5">
                          {blog.content
                            ?.replace(/<[^>]*>?/gm, "")
                            .slice(0, 220)}
                          ...
                        </p>

                        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(blog.created_at).toLocaleDateString(
                              "en-GB",
                            )}
                          </div>



                          <div className="flex items-center gap-2 text-[#1a2e6c] font-semibold ml-auto">
                            Read More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            {filteredBlogs.length > 0 && (
              <p className="text-center text-xs text-slate-400 mt-3">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredBlogs.length)} of{" "}
                {filteredBlogs.length} blogs
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
