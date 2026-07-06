"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
          <p className="text-slate-500">{message}</p>
        </div>
        <div className="bg-slate-50 p-4 flex gap-3 justify-end border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
