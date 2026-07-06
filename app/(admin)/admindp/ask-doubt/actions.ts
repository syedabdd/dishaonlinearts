"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getDoubts() {
  try {
    const [rows] = await db.execute("SELECT * FROM ask_doubts ORDER BY created_at DESC");
    return rows as any[];
  } catch (error) {
    console.error("Error fetching doubts:", error);
    return [];
  }
}

export async function updateDoubtStatus(id: number, status: string) {
  try {
    await db.execute("UPDATE ask_doubts SET status = ? WHERE id = ?", [status, id]);
    revalidatePath("/admindp/ask-doubt");
    return { success: true };
  } catch (error) {
    console.error("Error updating doubt status:", error);
    return { success: false };
  }
}

export async function deleteDoubt(id: number) {
  try {
    await db.execute("DELETE FROM ask_doubts WHERE id = ?", [id]);
    revalidatePath("/admindp/ask-doubt");
    return { success: true };
  } catch (error) {
    console.error("Error deleting doubt:", error);
    return { success: false };
  }
}
