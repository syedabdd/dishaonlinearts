"use client";

import { Filter, RefreshCcw, Search, ExternalLink, CheckCircle, Clock, Trash2, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "@/components/admin/ui/ConfirmDeleteModal";
import TableSkeleton from "@/components/admin/ui/TableSkeleton";
import { getDoubts, updateDoubtStatus, deleteDoubt } from "./actions";

export default function AskDoubtPage() {
  const [doubts, setDoubts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchDoubts = async () => {
    setLoading(true);
    const data = await getDoubts();
    setDoubts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    const res = await updateDoubtStatus(id, newStatus);
    toast.success("Doubt status updated");
    await fetchDoubts();
    setUpdatingId(null);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    setUpdatingId(deleteId);
    await deleteDoubt(deleteId);
    toast.success("Doubt deleted successfully");
    await fetchDoubts();
    setUpdatingId(null);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = 
      doubt.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doubt.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doubt.phone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === "All Statuses" || doubt.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingCount = doubts.filter(d => d.status === "Pending").length;

  return (
    <div className="min-h-screen bg-[#f4f6fa] p-8 animate-in fade-in duration-300">
      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this doubt inquiry? This action cannot be undone."
      />

      {/* Header & Stats */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#1e293b]">Doubt Management</h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">Filter, review, and resolve student doubts.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-[140px] shadow-sm transition-all hover:shadow-md">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">TOTAL INQUIRIES</p>
            <p className="text-2xl font-black text-[#1e293b]">{doubts.length}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 min-w-[140px] shadow-sm transition-all hover:shadow-md">
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">PENDING RESOLUTION</p>
            <p className="text-2xl font-black text-amber-600">{pendingCount}</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap items-end gap-4">
          {/* Search Keyword */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">SEARCH KEYWORD</label>
            <input
              type="text"
              placeholder="Name, Email, Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-shadow"
            />
          </div>

          {/* Status */}
          <div className="w-[180px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">STATUS</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white transition-shadow"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Resolved</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="w-[160px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">START DATE</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-shadow"
            />
          </div>

          {/* End Date */}
          <div className="w-[160px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">END DATE</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-shadow"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm transition-colors shadow-sm">
              <Filter className="w-4 h-4 fill-white" />
              Apply Filters
            </button>
            <button 
              onClick={() => { setSearchTerm(""); setStatusFilter("All Statuses"); fetchDoubts(); }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm transition-colors border border-gray-200 shadow-sm"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all">
        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={5} columns={7} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">SUBMISSION DATE</th>
                  <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">STUDENT DETAILS</th>
                  <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">CATEGORY</th>
                  <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">DOUBT DESCRIPTION</th>
                  <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">ATTACHMENT</th>
                  <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">STATUS</th>
                  <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDoubts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-16">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                          <Search className="w-8 h-8 text-gray-300" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">No Records Found</h3>
                        <p className="text-gray-400 text-sm">Adjust your filters to see results.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDoubts.map((doubt: any) => (
                    <tr key={doubt.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-5">
                        <div className="text-sm font-semibold text-gray-800">
                          {new Date(doubt.created_at || Date.now()).toLocaleDateString("en-GB")}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(doubt.created_at || Date.now()).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="text-sm font-bold text-[#1e293b]">{doubt.full_name}</div>
                        <div className="text-xs text-gray-500 mt-1">{doubt.email}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{doubt.phone}</div>
                      </td>
                      <td className="p-5">
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100 shadow-sm">
                          {doubt.category}
                        </span>
                      </td>
                      <td className="p-5 max-w-[300px]">
                        <p className="text-sm text-gray-600 line-clamp-3" title={doubt.description}>
                          {doubt.description}
                        </p>
                      </td>
                      <td className="p-5 text-center">
                        {doubt.reference ? (
                          <a 
                            href={doubt.reference} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400 font-medium">None</span>
                        )}
                      </td>
                      <td className="p-5 text-center">
                        <button 
                          onClick={() => handleStatusUpdate(doubt.id, doubt.status === "Resolved" ? "Pending" : "Resolved")}
                          disabled={updatingId === doubt.id}
                          title={doubt.status === "Resolved" ? "Click to mark as Pending" : "Click to mark as Resolved"}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all shadow-sm ${
                            doubt.status === "Resolved" 
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 hover:shadow" 
                              : "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 hover:shadow"
                          } ${updatingId === doubt.id ? 'opacity-50 cursor-wait' : ''}`}
                        >
                          {updatingId === doubt.id ? (
                            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : doubt.status === "Resolved" ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          {doubt.status || 'Pending'}
                        </button>
                      </td>
                      <td className="p-5 text-center">
                        <button 
                          onClick={() => confirmDelete(doubt.id)}
                          disabled={updatingId === doubt.id}
                          className={`p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shadow-sm ${updatingId === doubt.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
