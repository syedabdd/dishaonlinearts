"use client";

import { CloudUpload, Plus, Clock, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "@/components/admin/ui/ConfirmDeleteModal";
import { 
  getAdminBanners, 
  createBanner, 
  deleteBanner, 
  toggleBannerStatus, 
  updateBannerOrder 
} from "./actions";

export default function BannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteData, setDeleteData] = useState<{id: number, url: string} | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setIsLoading(true);
    const data = await getAdminBanners();
    setBanners(data);
    setIsLoading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("image", selectedFile);
    
    const res = await createBanner(formData);
    if (res.success) {
      toast.success("Banner uploaded successfully!");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchBanners();
    } else {
      toast.error(res.error || "Upload failed");
    }
    setIsUploading(false);
  };

  const confirmDelete = (id: number, url: string) => {
    setDeleteData({ id, url });
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteData) return;
    setIsDeleting(true);
    const result = await deleteBanner(deleteData.id, deleteData.url);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setDeleteData(null);

    if (result && result.success !== false) {
      toast.success("Banner deleted successfully");
      fetchBanners();
    } else {
      toast.error("Failed to delete banner");
    }
  };

  const handleToggle = async (id: number, currentStatus: number) => {
    const res = await toggleBannerStatus(id, currentStatus);
    toast.success("Banner status updated");
    fetchBanners();
  };

  const handleOrderChange = async (id: number, newOrder: string) => {
    const orderNum = parseInt(newOrder, 10);
    if (!isNaN(orderNum)) {
      await updateBannerOrder(id, orderNum);
      toast.success("Banner order updated");
      fetchBanners();
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] p-8 md:p-12 animate-in fade-in duration-300">
      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this banner image? This action cannot be undone."
      />

      {/* Header */}
      <div className="mb-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-black text-[#1e293b]">Carousel Setup</h1>
        <p className="text-gray-500 mt-1 font-medium">Upload and manage homepage slider banners.</p>
      </div>

      {/* Upload Area */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12 flex flex-col items-center justify-center">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          accept="image/*" 
          className="hidden" 
        />
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`w-full max-w-2xl border-2 border-dashed ${selectedFile ? 'border-green-400 bg-green-50' : 'border-indigo-400 bg-indigo-50/50 hover:bg-indigo-50'} rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-colors`}
        >
          <div className={`w-14 h-14 ${selectedFile ? 'bg-green-500' : 'bg-indigo-500'} rounded-full flex items-center justify-center mb-4 shadow-md transition-colors`}>
            <CloudUpload className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-[#1e293b] font-bold text-lg mb-1">
            {selectedFile ? selectedFile.name : "Drag & Drop or Click to Select"}
          </h3>
          <p className="text-gray-400 text-sm font-medium">Optimal Size: 1920x600px (JPG, PNG, WEBP)</p>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button 
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="bg-indigo-600 disabled:bg-gray-400 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all shadow-sm hover:shadow-md min-w-[200px]"
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" strokeWidth={2.5} />
                Add to Carousel
              </>
            )}
          </button>
          
          {selectedFile && (
            <button 
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              disabled={isUploading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg flex items-center justify-center font-bold transition-colors shadow-sm disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Active Banners */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-[#1e293b] mb-6">Manage Banners</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div className="w-full aspect-[21/9] bg-gray-200"></div>
                <div className="p-4 flex gap-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></div>
              </div>
            ))}
          </div>
        ) : banners.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-500">
            No banners uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((banner: any) => (
              <div key={banner.id} className={`bg-white rounded-xl shadow-sm border ${banner.is_active ? 'border-gray-200' : 'border-red-200 opacity-75'} overflow-hidden group transition-all`}>
                <div className="relative w-full aspect-[21/9] bg-gray-100 border-b border-gray-100">
                  <Image 
                    src={banner.image_url} 
                    alt={`Banner ${banner.id}`} 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                  {!banner.is_active && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">Hidden</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex flex-col gap-4">
                  {/* Info row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-semibold">
                        {new Date(banner.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-500">Order:</span>
                      <input 
                        type="number" 
                        defaultValue={banner.display_order}
                        onBlur={(e) => handleOrderChange(banner.id, e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm font-bold text-center focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  
                  {/* Actions row */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <button 
                      onClick={() => handleToggle(banner.id, banner.is_active ? 1 : 0)}
                      className={`flex-1 flex justify-center items-center gap-1.5 px-4 py-2 ${banner.is_active ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'} rounded-lg text-xs font-bold transition-colors shadow-sm`}
                    >
                      {banner.is_active ? (
                        <><EyeOff className="w-4 h-4" /> Hide</>
                      ) : (
                        <><Eye className="w-4 h-4" /> Show</>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => confirmDelete(banner.id, banner.image_url)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
