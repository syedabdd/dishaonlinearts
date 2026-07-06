import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    let referencePath = null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      
      const baseUploadDir = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? '/home/u531590317/uploads' : path.join(process.cwd(), "public/uploads"));
      const uploadDir = path.join(baseUploadDir, "doubts");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      await writeFile(path.join(uploadDir, filename), buffer);
      referencePath = `/api/images/doubts/${filename}`;
    }

    const [result] = await db.execute(
      "INSERT INTO ask_doubts (full_name, email, phone, category, description, reference) VALUES (?, ?, ?, ?, ?, ?)",
      [fullName, email, phone, category, description, referencePath]
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error creating doubt:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit doubt" },
      { status: 500 }
    );
  }
}
