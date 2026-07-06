import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  const filePathParams = resolvedParams.path;
  
  // Use custom upload directory from environment variable, fallback to Hostinger path in production, or public/uploads locally
  const uploadDir = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? '/home/u531590317/uploads' : path.join(process.cwd(), "public/uploads"));
  const filePath = path.join(uploadDir, ...filePathParams);

  try {
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      
      // Basic content type detection
      const filename = filePathParams[filePathParams.length - 1];
      const ext = path.extname(filename).toLowerCase();
      let contentType = 'image/jpeg';
      if (ext === '.png') contentType = 'image/png';
      else if (ext === '.webp') contentType = 'image/webp';
      else if (ext === '.svg') contentType = 'image/svg+xml';
      else if (ext === '.gif') contentType = 'image/gif';

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
      
    } else {
      return new NextResponse('File not found', { status: 404 });
    }
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
