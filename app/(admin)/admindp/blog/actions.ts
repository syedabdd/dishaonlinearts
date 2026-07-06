"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function createBlog(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const hindiTitle = formData.get("hindiTitle") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const hindiContent = formData.get("hindiContent") as string;
    const file = formData.get("image") as File | null;

    if (!title || !category || !content || !file || file.size === 0) {
      return { success: false, error: "Title, category, content, and image are required" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const baseUploadDir = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? '/home/u531590317/uploads' : path.join(process.cwd(), "public/uploads"));
    const uploadDir = path.join(baseUploadDir, "blog");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await writeFile(path.join(uploadDir, filename), buffer);
    const imagePath = `/api/images/blog/${filename}`;

    await db.execute(
      `INSERT INTO blogs (title, hindi_title, category, image, content, hindi_content) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, hindiTitle || null, category, imagePath, content, hindiContent || null]
    );

    revalidatePath("/admindp/blog");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return { success: false, error: error.message || "Failed to create blog" };
  }
}

export async function updateBlog(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const hindiTitle = formData.get("hindiTitle") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const hindiContent = formData.get("hindiContent") as string;
    const file = formData.get("image") as File | null;

    if (!title || !category || !content) {
      return { success: false, error: "Title, category, and content are required" };
    }

    let query = `UPDATE blogs SET title = ?, hindi_title = ?, category = ?, content = ?, hindi_content = ?`;
    const params: any[] = [title, hindiTitle || null, category, content, hindiContent || null];

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const baseUploadDir = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? '/home/u531590317/uploads' : path.join(process.cwd(), "public/uploads"));
      const uploadDir = path.join(baseUploadDir, "blog");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      await writeFile(path.join(uploadDir, filename), buffer);
      query += `, image = ?`;
      params.push(`/api/images/blog/${filename}`);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    await db.execute(query, params);
    revalidatePath("/admindp/blog");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return { success: false, error: error.message || "Failed to update blog" };
  }
}

export async function getBlogs() {
  try {
    const [rows] = await db.execute("SELECT * FROM blogs ORDER BY created_at DESC");
    return rows as any[];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function deleteBlog(id: number) {
  try {
    const [rows]: any = await db.execute("SELECT image FROM blogs WHERE id = ?", [id]);
    if (rows && rows.length > 0 && rows[0].image) {
      const imageUrl = rows[0].image;
      const baseUploadDir = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? '/home/u531590317/uploads' : path.join(process.cwd(), "public/uploads"));
      const filename = path.basename(imageUrl);
      const filePath = path.join(baseUploadDir, "blog", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await db.execute("DELETE FROM blogs WHERE id = ?", [id]);
    revalidatePath("/admindp/blog");
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false };
  }
}
