"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { List as ListIcon, Edit, Trash2, Plus, FolderOpen, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";
import FreeCoursesNav from "@/components/admin/FreeCoursesNav";
import { createSubject, getSubjects, deleteSubject, updateSubject, getCoursesList } from "./actions";
import ConfirmDeleteModal from "@/components/admin/ui/ConfirmDeleteModal";
import TableSkeleton from "@/components/admin/ui/TableSkeleton";

export default function FreeSubjectsDashboard() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [editId, setEditId] = useState<number | null>(null);
  const [courseId, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [subRes, crsRes] = await Promise.all([getSubjects(), getCoursesList()]);
    if (subRes.success) setSubjects(subRes.data || []);
    if (crsRes.success) setCourses(crsRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!editId) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const resetForm = () => {
    setEditId(null);
    setCourseId("");
    setName("");
    setSlug("");
    setDisplayOrder(0);
  };

  const handleEdit = (subject: any) => {
    setEditId(subject.id);
    setCourseId(subject.courseId.toString());
    setName(subject.name || "");
    setSlug(subject.slug || "");
    setDisplayOrder(subject.displayOrder || 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId || !name || !slug) {
      toast.error("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    const data = {
      courseId: parseInt(courseId),
      name, 
      slug, 
      displayOrder: Number(displayOrder)
    };

    let result;
    if (editId) {
      result = await updateSubject(editId, data);
    } else {
      result = await createSubject(data);
    }
    
    setSubmitting(false);

    if (result.success) {
      toast.success(editId ? "Subject updated successfully!" : "Subject created successfully!");
      resetForm();
      fetchData();
    } else {
      toast.error(result.error || "Failed to save subject");
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteSubject(deleteId);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setDeleteId(null);
    
    if (result.success) {
      toast.success("Subject deleted successfully");
      fetchData();
    } else {
      toast.error("Failed to delete subject");
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
        <span className="text-slate-900 font-semibold">Subjects</span>
      </div>

      <FreeCoursesNav />

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">
              {editId ? "Edit Subject" : "Add New Subject"}
            </h2>
          </div>
          {editId && (
            <button 
              onClick={resetForm}
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Select Course *</label>
              <select 
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
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
              <label className="text-sm font-semibold text-slate-700">Subject Name *</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                required
              />
            </div>

          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={submitting}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-md w-full md:w-auto min-w-[200px]"
            >
              {submitting ? 'Saving...' : editId ? 'Update Subject' : 'Create Subject'}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ListIcon className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">All Subjects</h2>
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={3} columns={5} />
        ) : subjects.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No subjects found</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Course</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Subject Name</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map((subject: any) => (
                  <tr key={subject.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-500">{subject.course?.name}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{subject.name}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(subject)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => confirmDelete(subject.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
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
