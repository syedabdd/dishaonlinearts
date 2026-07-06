"use client";

import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { List as ListIcon, Edit, Trash2, Plus, FileVideo, LayoutDashboard, ChevronRight, Video } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import FreeCoursesNav from "@/components/admin/FreeCoursesNav";
import { createLecture, getLectures, deleteLecture, updateLecture, getChaptersBySubject } from "./actions";
import { getCoursesList } from "../free-subjects/actions";
import { getSubjectsByCourse } from "../free-chapters/actions";
import ConfirmDeleteModal from "@/components/admin/ui/ConfirmDeleteModal";
import TableSkeleton from "@/components/admin/ui/TableSkeleton";

const SummernoteEditor = dynamic(() => import("@/components/admin/SummernoteEditor"), { ssr: false });

export default function FreeLecturesDashboard() {
  const [lectures, setLectures] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [editId, setEditId] = useState<number | null>(null);
  const [courseId, setCourseId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingYoutube, setFetchingYoutube] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    const [lecRes, crsRes] = await Promise.all([getLectures(), getCoursesList()]);
    if (lecRes.success) setLectures(lecRes.data || []);
    if (crsRes.success) setCourses(crsRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchSubjectsForCourse = async (cId: number) => {
    const res = await getSubjectsByCourse(cId);
    if (res.success) {
      setSubjects(res.data || []);
    } else {
      setSubjects([]);
    }
  };

  const fetchChaptersForSubject = async (sId: number) => {
    const res = await getChaptersBySubject(sId);
    if (res.success) {
      setChapters(res.data || []);
    } else {
      setChapters([]);
    }
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cId = e.target.value;
    setCourseId(cId);
    setSubjectId("");
    setChapterId("");
    setChapters([]);
    if (cId) {
      fetchSubjectsForCourse(parseInt(cId));
    } else {
      setSubjects([]);
    }
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sId = e.target.value;
    setSubjectId(sId);
    setChapterId("");
    if (sId) {
      fetchChaptersForSubject(parseInt(sId));
    } else {
      setChapters([]);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!editId) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleYoutubeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setYoutubeUrl(url);

    if (url && url.includes("youtube.com") || url.includes("youtu.be")) {
      try {
        setFetchingYoutube(true);
        const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
        if (res.ok) {
          const data = await res.json();
          if (data.title && !name) {
            setName(data.title);
            if (!editId) {
              setSlug(data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
            }
          }
          if (data.thumbnail_url && !thumbnail) {
            setThumbnail(data.thumbnail_url);
          }
        }
      } catch (err) {
        console.error("Failed to fetch youtube metadata", err);
      } finally {
        setFetchingYoutube(false);
      }
    }
  };

  const resetForm = () => {
    setEditId(null);
    setCourseId("");
    setSubjectId("");
    setChapterId("");
    setName("");
    setSlug("");
    setYoutubeUrl("");
    setThumbnail("");
    setContent("");
    setDisplayOrder(0);
    setSubjects([]);
    setChapters([]);
  };

  const handleEdit = async (lecture: any) => {
    setEditId(lecture.id);
    setCourseId(lecture.chapter.subject.courseId.toString());
    await fetchSubjectsForCourse(lecture.chapter.subject.courseId);
    setSubjectId(lecture.chapter.subjectId.toString());
    await fetchChaptersForSubject(lecture.chapter.subjectId);
    setChapterId(lecture.chapterId.toString());
    setName(lecture.name || "");
    setSlug(lecture.slug || "");
    setYoutubeUrl(lecture.youtubeUrl || "");
    setThumbnail(lecture.thumbnail || "");
    setContent(lecture.content || "");
    setDisplayOrder(lecture.displayOrder || 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterId || !name || !slug) {
      toast.error("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    const data = {
      chapterId: parseInt(chapterId),
      name, 
      slug, 
      youtubeUrl,
      thumbnail,
      content,
      displayOrder: Number(displayOrder)
    };

    let result;
    if (editId) {
      result = await updateLecture(editId, data);
    } else {
      result = await createLecture(data);
    }
    
    setSubmitting(false);

    if (result.success) {
      toast.success(editId ? "Lecture updated successfully!" : "Lecture created successfully!");
      resetForm();
      fetchInitialData();
    } else {
      toast.error(result.error || "Failed to save lecture");
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteLecture(deleteId);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setDeleteId(null);
    
    if (result.success) {
      toast.success("Lecture deleted successfully");
      fetchInitialData();
    } else {
      toast.error("Failed to delete lecture");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6 animate-in fade-in duration-300">
      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen} 
        isDeleting={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDelete} 
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 bg-white w-fit px-4 py-2 rounded-xl shadow-sm border border-slate-100">
        <Link href="/admindp" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/admindp/free-courses" className="hover:text-indigo-600 transition-colors">Free Courses</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-semibold">Lectures</span>
      </div>

      <FreeCoursesNav />

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">
              {editId ? "Edit Lecture" : "Add New Lecture"}
            </h2>
          </div>
          {editId && (
            <button 
              onClick={resetForm}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Select Course *</label>
              <select 
                value={courseId}
                onChange={handleCourseChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors bg-white"
                required
              >
                <option value="">-- Select Course --</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Select Subject *</label>
              <select 
                value={subjectId}
                onChange={handleSubjectChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors bg-white"
                required
                disabled={!courseId}
              >
                <option value="">-- Select Subject --</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Select Chapter *</label>
              <select 
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors bg-white"
                required
                disabled={!subjectId}
              >
                <option value="">-- Select Chapter --</option>
                {chapters.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-1.5 md:col-span-2 lg:col-span-3 border-t border-slate-100 pt-4 mt-2">
              <label className="text-sm font-semibold text-slate-700 flex justify-between">
                <span>YouTube URL</span>
                {fetchingYoutube && <span className="text-xs text-indigo-500 animate-pulse">Fetching details...</span>}
              </label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={handleYoutubeChange}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              />
              <p className="text-[11px] text-slate-500">Paste a YouTube URL to automatically fetch Name and Thumbnail.</p>
            </div>

            <div className="space-y-1.5 md:col-span-2 lg:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Lecture Name / Title *</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Thumbnail URL</label>
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              />
            </div>

          </div>

          <div className="space-y-1.5 mt-6">
            <label className="text-sm font-semibold text-slate-700">Lecture Notes / Content (Summernote)</label>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <SummernoteEditor value={content} onChange={(val) => setContent(val)} />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={submitting}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-md w-full md:w-auto min-w-[200px]"
            >
              {submitting ? 'Saving...' : editId ? 'Update Lecture' : 'Create Lecture'}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ListIcon className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">All Lectures</h2>
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={3} columns={5} />
        ) : lectures.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No lectures found</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Chapter</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Lecture Name</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lectures.map((lecture: any) => (
                  <tr key={lecture.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="text-xs text-slate-500">{lecture.chapter?.subject?.course?.name} &gt; {lecture.chapter?.subject?.name}</div>
                      <div className="font-semibold text-slate-700 text-sm">{lecture.chapter?.name}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      <div className="flex items-center gap-3">
                        {lecture.thumbnail && (
                          <img src={lecture.thumbnail} alt="" className="w-12 h-8 object-cover rounded shadow-sm" />
                        )}
                        {lecture.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(lecture)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => confirmDelete(lecture.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
