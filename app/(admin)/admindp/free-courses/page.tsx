"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { List as ListIcon, Edit, Trash2, Plus, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";
import FreeCoursesNav from "@/components/admin/FreeCoursesNav";
import { createCourse, getCourses, deleteCourse, updateCourse } from "./actions";
import ConfirmDeleteModal from "@/components/admin/ui/ConfirmDeleteModal";
import TableSkeleton from "@/components/admin/ui/TableSkeleton";

export default function FreeCoursesDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("Published");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    const result = await getCourses();
    if (result.success) {
      setCourses(result.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Simple slug generator
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!editId) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setSlug("");
    setThumbnail("");
    setDescription("");
    setFeatured(false);
    setStatus("Draft");
    setDisplayOrder(0);
  };

  const handleEdit = (course: any) => {
    setEditId(course.id);
    setName(course.name || "");
    setSlug(course.slug || "");
    setThumbnail(course.thumbnail || "");
    setDescription(course.description || "");
    setFeatured(course.featured || false);
    setStatus(course.status || "Published");
    setDisplayOrder(course.displayOrder || 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug || !description) {
      toast.error("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    const data = {
      name, slug, thumbnail, description, featured, status, displayOrder: Number(displayOrder)
    };

    let result;
    if (editId) {
      result = await updateCourse(editId, data);
    } else {
      result = await createCourse(data);
    }
    
    setSubmitting(false);

    if (result.success) {
      toast.success(editId ? "Course updated successfully!" : "Course created successfully!");
      resetForm();
      fetchCourses();
    } else {
      toast.error(result.error || "Failed to save course");
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteCourse(deleteId);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setDeleteId(null);
    
    if (result.success) {
      toast.success("Course deleted successfully");
      fetchCourses();
    } else {
      toast.error("Failed to delete course");
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
        <span className="text-slate-900 font-semibold">Free Courses</span>
      </div>

      <FreeCoursesNav />

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-200 overflow-hidden transition-all">
        <div className="bg-linear-to-r from-slate-50 to-white px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Plus className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
              {editId ? "Edit Free Course" : "Add New Free Course"}
            </h2>
          </div>
          {editId && (
            <button 
              onClick={resetForm}
              className="flex items-center gap-1.5 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-bold"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          )}
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Course Name *</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                required
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                />
                Featured Course
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              disabled={submitting}
              className="flex items-center justify-center gap-2 bg-[#1a2e6c] hover:bg-[#142255] text-white! px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full md:w-auto min-w-[200px]"
            >
              {submitting ? 'Saving...' : editId ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-md shadow-slate-200/40 border border-slate-200 overflow-hidden transition-all">
        <div className="bg-linear-to-r from-slate-50 to-white px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <ListIcon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">All Courses</h2>
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={3} columns={5} />
        ) : courses.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No courses found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="py-4 px-6 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course: any) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800 group-hover:text-[#1a2e6c] transition-colors">{course.name}</div>
                      {course.featured && <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1 inline-block">Featured</span>}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(course)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => confirmDelete(course.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
