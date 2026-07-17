"use client";

import { Trash2 } from "lucide-react";
import { deleteQuickRevision } from "./actions";

export default function DeleteButton({ id, title }: { id: number; title: string }) {
  async function handleDelete() {
    if (!confirm(`Delete "${title}"?\n\nYe action undo nahi ho sakta.`)) return;
    await deleteQuickRevision(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition cursor-pointer"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
}
