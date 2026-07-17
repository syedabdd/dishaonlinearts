import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const ext = path.extname(file.name).toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".jfif", ".svg", ".bmp"];
    const isImageMime = file.type.startsWith("image/");
    
    if (!isImageMime && !allowedExtensions.includes(ext)) {
      return NextResponse.json(
        { error: `Invalid file. Received name: "${file.name}", type: "${file.type}". Please upload an image.` },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });
    }

    const uploadDir =
      process.env.UPLOAD_DIR ||
      (process.env.NODE_ENV === "production"
        ? "/home/u531590317/uploads"
        : path.join(process.cwd(), "public/uploads"));

    const quickRevisionDir = path.join(uploadDir, "quick-revision");
    if (!fs.existsSync(quickRevisionDir)) {
      fs.mkdirSync(quickRevisionDir, { recursive: true });
    }

    // Generate unique filename
    const fileExt = ext || ".jpg";
    const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${fileExt}`;
    const filePath = path.join(quickRevisionDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Return relative path for storage in DB
    const relativePath = `quick-revision/${filename}`;

    return NextResponse.json({
      success: true,
      path: relativePath,
      url: `/api/images/${relativePath}`,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
