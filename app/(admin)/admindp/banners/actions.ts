"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import fs from "fs";

export async function createBanner(formData: FormData) {
  try {
    const file = formData.get("image") as File | null;

    if (!file || file.size === 0) {
      return { success: false, error: "Image file is required" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

    const baseUploadDir = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? '/home/u531590317/uploads' : path.join(process.cwd(), "public/uploads"));
    const uploadDir = path.join(baseUploadDir, "banners");
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await writeFile(path.join(uploadDir, filename), buffer);
    const imagePath = `/api/images/banners/${filename}`;

    await db.execute(
      "INSERT INTO banners (image_url, is_active, display_order) VALUES (?, ?, ?)",
      [imagePath, 1, 0] // 1 for active
    );

    revalidatePath("/admindp/banners");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating banner:", error);
    return {
      success: false,
      error: error.message || "Failed to create banner",
    };
  }
}

export async function getAdminBanners() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM banners ORDER BY display_order ASC, created_at DESC"
    );
    return rows as any[];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}

export async function getActiveBanners() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM banners WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC"
    );
    return rows as any[];
  } catch (error) {
    console.error("Error fetching active banners:", error);
    return [];
  }
}

export async function toggleBannerStatus(id: number, currentStatus: number) {
  try {
    const newStatus = currentStatus === 1 ? 0 : 1;
    await db.execute("UPDATE banners SET is_active = ? WHERE id = ?", [
      newStatus,
      id,
    ]);
    revalidatePath("/admindp/banners");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling banner status:", error);
    return { success: false };
  }
}

export async function updateBannerOrder(id: number, newOrder: number) {
  try {
    await db.execute("UPDATE banners SET display_order = ? WHERE id = ?", [
      newOrder,
      id,
    ]);
    revalidatePath("/admindp/banners");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating banner order:", error);
    return { success: false };
  }
}

export async function deleteBanner(id: number, imageUrl?: string) {
  try {
    if (imageUrl) {
      const baseUploadDir = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? '/home/u531590317/uploads' : path.join(process.cwd(), "public/uploads"));
      const filename = path.basename(imageUrl);
      const filePath = path.join(baseUploadDir, "banners", filename);
      if (fs.existsSync(filePath)) {
        await unlink(filePath);
      }
    }
    await db.execute("DELETE FROM banners WHERE id = ?", [id]);
    revalidatePath("/admindp/banners");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting banner:", error);
    return { success: false };
  }
}
