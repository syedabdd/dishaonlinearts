"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  PenLine, Send, List as ListIcon, Edit, Trash2, X, Plus
} from "lucide-react";
import { createBlog, getBlogs, deleteBlog, updateBlog } from "./actions";
import dynamic from "next/dynamic";
import ConfirmDeleteModal from "@/components/admin/ui/ConfirmDeleteModal";
import TableSkeleton from "@/components/admin/ui/TableSkeleton";

const SummernoteEditor = dynamic(() => import("@/components/admin/SummernoteEditor"), { ssr: false });

export default function BlogDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [hindiTitle, setHindiTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [hindiContent, setHindiContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    const data = await getBlogs();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setHindiTitle("");
    setCategory("");
    setContent("");
    setHindiContent("");
    setImage(null);
    setCurrentImage("");
    const fileInput = document.getElementById("featured-image") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleEdit = (blog: any) => {
    setEditId(blog.id);
    setTitle(blog.title || "");
    setHindiTitle(blog.hindi_title || "");
    setCategory(blog.category || "");
    setContent(blog.content || "");
    setHindiContent(blog.hindi_content || "");
    setCurrentImage(blog.image || "");
    setImage(null);
    
    // Smooth scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content || (!image && !editId)) {
      toast.error("Please fill all required fields and upload an image.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("hindiTitle", hindiTitle);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("hindiContent", hindiContent);
    if (image) formData.append("image", image);

    let result;
    if (editId) {
      result = await updateBlog(editId, formData);
    } else {
      result = await createBlog(formData);
    }
    
    setSubmitting(false);

    if (result.success) {
      toast.success(editId ? "Blog updated successfully!" : "Blog published successfully!");
      resetForm();
      fetchBlogs();
    } else {
      toast.error(result.error || "Failed to save blog");
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteBlog(deleteId);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setDeleteId(null);
    
    if (result.success) {
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } else {
      toast.error("Failed to delete blog");
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

      {/* Blog Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <PenLine className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">
              {editId ? "Edit Blog" : "Write a New Blog"}
            </h2>
          </div>
          {editId && (
            <button 
              onClick={resetForm}
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Write New
            </button>
          )}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">English Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter highly engaging title..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            {/* Hindi Title */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Hindi Title (Optional)</label>
              <input
                type="text"
                value={hindiTitle}
                onChange={(e) => setHindiTitle(e.target.value)}
                placeholder="हिंदी टाइटल यहाँ लिखें..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Category *</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors appearance-none bg-white"
                required
              >
                <option value="">Select Category</option>
                <option value="Exam Tips">Exam Tips</option>
                <option value="Study Hack">Study Hack</option>
                <option value="News & Update">News & Update</option>
                <option value="Motivation">Motivation</option>
                <option value="Result">Result</option>
              </select>
            </div>

            {/* Featured Image */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Featured Image {editId && <span className="text-xs font-normal text-slate-400">(Optional)</span>}
              </label>
              <div className="flex items-center gap-3">
                {currentImage && (
                  <div className="relative w-10 h-10 rounded overflow-hidden border border-slate-200 shadow-sm shrink-0">
                    <Image src={currentImage} alt="Current" fill className="object-cover" unoptimized />
                  </div>
                )}
                <input
                  type="file"
                  id="featured-image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors text-slate-600 cursor-pointer text-sm"
                  required={!editId}
                />
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">English Content *</label>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <SummernoteEditor value={content} onChange={(val) => setContent(val)} />
            </div>
          </div>

          {/* Hindi Blog Content */}
          <div className="space-y-1.5 mt-6">
            <label className="text-sm font-semibold text-slate-700">Hindi Content (Optional)</label>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <SummernoteEditor value={hindiContent} onChange={(val) => setHindiContent(val)} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={submitting}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-md w-full md:w-auto min-w-[200px]"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {editId ? 'Updating...' : 'Publishing...'}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {editId ? 'Update Blog' : 'Publish Blog'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* All Blogs Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ListIcon className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">All Blogs</h2>
            {!loading && (
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100">
                {blogs.length} Total
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={5} columns={5} />
        ) : blogs.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center justify-center text-slate-500">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <PenLine className="w-8 h-8 text-slate-400" />
            </div>
            <p className="font-medium text-lg">No blogs found</p>
            <p className="text-sm text-slate-400">Write your first blog to see it here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Image</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog: any) => (
                  <tr key={blog.id} className={`hover:bg-slate-50/80 transition-colors ${editId === blog.id ? 'bg-indigo-50/30' : ''}`}>
                    <td className="py-3 px-4 w-24">
                      <div className="relative w-16 h-10 rounded overflow-hidden border border-slate-200 shadow-sm">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-bold text-slate-800 line-clamp-1 max-w-[300px]">{blog.title}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 shadow-sm">
                        {blog.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-500 whitespace-nowrap">
                      {new Date(blog.created_at).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(blog)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-xs font-bold transition-colors shadow-sm"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button 
                          onClick={() => confirmDelete(blog.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-colors shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
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
