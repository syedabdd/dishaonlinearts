import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { quickRevisionUpdateSchema, generateSlug } from "@/lib/zod/quickRevisionSchema";
import fs from "fs";
import path from "path";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/quick-revision/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const item = await prisma.quickRevision.findUnique({ where: { id: parseInt(id) } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// PUT /api/admin/quick-revision/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Auto-generate slug if title changed and slug not explicitly provided
    if (body.title && !body.slug) {
      body.slug = generateSlug(body.title);
    }

    const parsed = quickRevisionUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    // Ensure slug uniqueness (exclude current record)
    if (data.slug) {
      const existing = await prisma.quickRevision.findFirst({
        where: { slug: data.slug, NOT: { id: parseInt(id) } },
      });
      if (existing) {
        data.slug = `${data.slug}-${Date.now()}`;
      }
    }

    const payload: any = { ...data };
    if (payload.mcqs === null) {
      payload.mcqs = require('@prisma/client').Prisma.DbNull;
    }

    const item = await prisma.quickRevision.update({
      where: { id: parseInt(id) },
      data: payload,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/admin/quick-revision/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const item = await prisma.quickRevision.findUnique({ where: { id: parseInt(id) } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Delete thumbnail file if exists
    if (item.thumbnail) {
      const uploadDir =
        process.env.UPLOAD_DIR ||
        (process.env.NODE_ENV === "production"
          ? "/home/u531590317/uploads"
          : path.join(process.cwd(), "public/uploads"));
      const filePath = path.join(uploadDir, item.thumbnail);
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {}
    }

    await prisma.quickRevision.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
