import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/zod/quickRevisionSchema";
import { Prisma } from "@prisma/client";
import fs from "fs";
import path from "path";

type Params = { params: Promise<{ id: string }> };

// ─── Subjects that use named columns ─────────────────────────────────────────
const NAMED_COLUMN_SUBJECTS = new Set(["HISTORY", "HINDI", "ENGLISH"]);

// GET /api/admin/quick-revision/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const item = await prisma.quickRevision.findUnique({
      where: { id: parseInt(id) },
    });
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
    const numericId = parseInt(id);
    const body = await req.json();

    const subject: string = body.subject || "";

    // Auto-generate slug if title changed but slug not provided
    if (body.title && !body.slug) {
      body.slug = generateSlug(body.title);
    }

    // Ensure slug uniqueness (exclude current record)
    if (body.slug) {
      const existing = await prisma.quickRevision.findFirst({
        where: { slug: body.slug, NOT: { id: numericId } },
      });
      if (existing) {
        body.slug = `${body.slug}-${Date.now()}`;
      }
    }

    // Build update payload
    const payload: Prisma.QuickRevisionUpdateInput = {
      ...(body.title && { title: body.title }),
      ...(body.slug && { slug: body.slug }),
      ...(subject && { subject: subject as any }),
      ...(body.chapter !== undefined && { chapter: body.chapter || "General" }),
      ...(body.className && { className: body.className }),
      ...(body.board !== undefined && { board: body.board || "All Boards" }),
      ...(body.examLevel !== undefined && {
        examLevel: body.examLevel || "Board Exam",
      }),
      ...(body.keywords !== undefined && { keywords: body.keywords || null }),
      ...(body.metaTitle !== undefined && {
        metaTitle: body.metaTitle || null,
      }),
      ...(body.metaDescription !== undefined && {
        metaDescription: body.metaDescription || null,
      }),
      ...(body.thumbnail !== undefined && {
        thumbnail: body.thumbnail || null,
      }),
      ...(body.displayOrder !== undefined && {
        displayOrder: parseInt(body.displayOrder ?? "0"),
      }),
      ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
      ...(body.published !== undefined && {
        published: Boolean(body.published),
      }),
      ...(body.pyq !== undefined && { pyq: body.pyq || null }),
      mcqs:
        body.mcqs && Array.isArray(body.mcqs) && body.mcqs.length > 0
          ? body.mcqs
          : Prisma.DbNull,
    };

    if (NAMED_COLUMN_SUBJECTS.has(subject)) {
      // History — named columns
      payload.dateYear = body.dateYear || null;
      payload.place = body.place || null;
      payload.people = body.people || null;
      payload.reason = body.reason || null;
      payload.whatHappened = body.whatHappened || null;
      payload.result = body.result || null;
      payload.interestingFact = body.interestingFact || null;
      payload.examTrick = body.examTrick || null;
      payload.content = Prisma.DbNull;
    } else {
      // New subjects — JSON content
      payload.content =
        body.content && Object.keys(body.content).length > 0
          ? body.content
          : Prisma.DbNull;
      payload.reason = null;
      payload.whatHappened = null;
      payload.result = null;
      payload.interestingFact = null;
      payload.examTrick = null;
      payload.dateYear = null;
      payload.place = null;
      payload.people = null;
    }

    const item = await prisma.quickRevision.update({
      where: { id: numericId },
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
    const item = await prisma.quickRevision.findUnique({
      where: { id: parseInt(id) },
    });
    if (!item)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

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
