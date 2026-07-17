"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Zap, BookOpen, SlidersHorizontal } from "lucide-react";
import QuickRevisionCard from "@/components/quick-revision/QuickRevisionCard";
import QuickRevisionSearch from "@/components/quick-revision/QuickRevisionSearch";
import QuickRevisionFilters from "@/components/quick-revision/QuickRevisionFilters";
import Link from "next/link";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function QuickRevisionListPage() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [sort, setSort] = useState("latest");
  const [items, setItems] = useState<any[]>([]);
  const [chapters, setChapters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounce(search, 350);

  const fetchData = useCallback(
    async (resetPage = false) => {
      setLoading(true);
      const currentPage = resetPage ? 1 : page;
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: "12",
        sort,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(selectedClass && { class: selectedClass }),
        ...(selectedSubject && { subject: selectedSubject }),
        ...(selectedChapter && { chapter: selectedChapter }),
        ...(selectedBoard && { board: selectedBoard }),
      });
      try {
        const res = await fetch(`/api/quick-revision?${params}`);
        const data = await res.json();
        if (resetPage) {
          setItems(data.items || []);
          setPage(1);
        } else {
          setItems((prev) =>
            currentPage === 1 ? data.items || [] : [...prev, ...(data.items || [])]
          );
        }
        setChapters(data.chapters || []);
        setTotal(data.pagination?.total || 0);
        setTotalPages(data.pagination?.pages || 1);
      } catch {}
      setLoading(false);
    },
    [debouncedSearch, selectedClass, selectedSubject, selectedChapter, selectedBoard, sort, page]
  );

  // Re-fetch when filters change (reset page)
  useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, selectedClass, selectedSubject, selectedChapter, selectedBoard, sort]);

  // Fetch more when page changes (not first load)
  useEffect(() => {
    if (page > 1) fetchData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const hasActiveFilters = selectedClass || selectedSubject || selectedChapter || selectedBoard;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-section)" }}>
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-[#1a2e6c]/5 via-transparent to-[#c0202a]/5" />
          <div className="absolute top-10 right-16 w-72 h-72 rounded-full bg-[#1a2e6c]/6 blur-3xl" />
          <div className="absolute bottom-0 left-16 w-72 h-72 rounded-full bg-[#c0202a]/6 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-[#1a2e6c] transition">Home</Link>
            <span>/</span>
            <span className="text-[#1a2e6c] font-semibold">QuickRevision</span>
          </nav>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a2e6c]/8 border border-[#1a2e6c]/15 text-[#1a2e6c] text-xs font-bold uppercase tracking-wider mb-5"
          >
            <Zap size={13} className="fill-current" />
            Quick Revision
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            30 Second{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Revision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg max-w-2xl mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Revise every important Arts topic in just 30 seconds. Master History,
            Geography, Political Science, Economics & more — in a flash.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl"
          >
            <QuickRevisionSearch
              value={search}
              onChange={setSearch}
              loading={loading && !!search}
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 mt-4 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} />
              <strong className="text-gray-700">{total}</strong> topics available
            </span>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {/* Filters */}
        <div className="mb-8">
          {/* Mobile toggle */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm"
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#c0202a]" />
              )}
            </button>
            <p className="text-sm text-gray-500">{total} topics</p>
          </div>

          <div className={`${showFilters ? "block" : "hidden"} md:block`}>
            <QuickRevisionFilters
              selectedClass={selectedClass}
              selectedSubject={selectedSubject}
              selectedChapter={selectedChapter}
              selectedBoard={selectedBoard}
              activeSort={sort}
              chapters={chapters}
              onClassChange={(v) => setSelectedClass(v)}
              onSubjectChange={(v) => setSelectedSubject(v)}
              onChapterChange={(v) => setSelectedChapter(v)}
              onBoardChange={(v) => setSelectedBoard(v)}
              onSortChange={(v) => setSort(v)}
            />
          </div>
        </div>

        {/* Grid */}
        {loading && items.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white border border-gray-100 h-72 animate-pulse">
                <div className="h-44 bg-gray-100 rounded-t-2xl" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen size={28} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-700 text-lg">No topics found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((item, i) => (
                <QuickRevisionCard key={item.id || item.slug} item={item} index={i} />
              ))}
            </div>

            {/* Load More */}
            {page < totalPages && (
              <div className="text-center mt-10">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loading}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#1a2e6c] to-[#c0202a] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? "Loading..." : `Load More Topics (${total - items.length} remaining)`}
                </motion.button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
