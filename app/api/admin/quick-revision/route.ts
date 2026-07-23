import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/zod/quickRevisionSchema";
import { Prisma } from "@prisma/client";

// ─── Subjects that use named columns (History backward compat) ────────────────
const NAMED_COLUMN_SUBJECTS = new Set(["HISTORY", "HINDI", "ENGLISH"]);

// GET /api/admin/quick-revision — list with pagination, search, filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const subject = searchParams.get("subject") || "";
    const className = searchParams.get("class") || "";
    const board = searchParams.get("board") || "";
    const published = searchParams.get("published");
    const skip = (page - 1) * limit;

    const where: Prisma.QuickRevisionWhereInput = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { chapter: { contains: search } },
        { keywords: { contains: search } },
      ];
    }
    if (subject) where.subject = subject as any;
    if (className) where.className = className;
    if (board) where.board = board;
    if (published !== null && published !== "") {
      where.published = published === "true";
    }

    const [items, total, totalPublished, totalDraft, mostViewed] =
      await Promise.all([
        prisma.quickRevision.findMany({
          where,
          orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
          skip,
          take: limit,
          select: {
            id: true,
            title: true,
            slug: true,
            subject: true,
            chapter: true,
            className: true,
            board: true,
            featured: true,
            published: true,
            views: true,
            thumbnail: true,
            createdAt: true,
          },
        }),
        prisma.quickRevision.count({ where }),
        prisma.quickRevision.count({ where: { published: true } }),
        prisma.quickRevision.count({ where: { published: false } }),
        prisma.quickRevision.findMany({
          where: { published: true },
          orderBy: { views: "desc" },
          take: 5,
          select: { id: true, title: true, views: true, slug: true },
        }),
      ]);

    return NextResponse.json({
      items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      stats: {
        total: await prisma.quickRevision.count(),
        published: totalPublished,
        draft: totalDraft,
        mostViewed,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/quick-revision error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST /api/admin/quick-revision — create
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Auto-generate slug if not provided
    if (!body.slug) {
      body.slug = generateSlug(body.title || "");
    }

    const subject: string = body.subject || "";

    // Ensure slug uniqueness
    let slug: string = body.slug;
    const existing = await prisma.quickRevision.findUnique({
      where: { slug },
    });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // Build Prisma payload
    const payload: Prisma.QuickRevisionCreateInput = {
      title: body.title,
      slug,
      subject: subject as any,
      chapter: body.chapter || "General",
      className: body.className,
      board: body.board || "All Boards",
      examLevel: body.examLevel || "Board Exam",
      keywords: body.keywords || null,
      metaTitle: body.metaTitle || null,
      metaDescription: body.metaDescription || null,
      thumbnail: body.thumbnail || null,
      displayOrder: parseInt(body.displayOrder ?? "0"),
      featured: Boolean(body.featured),
      published: Boolean(body.published),
      pyq: body.pyq || null,
      mcqs:
        body.mcqs && Array.isArray(body.mcqs) && body.mcqs.length > 0
          ? body.mcqs
          : Prisma.DbNull,
    };

    if (NAMED_COLUMN_SUBJECTS.has(subject)) {
      // History (and HINDI/ENGLISH) — store in named columns
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
      // New subjects — store in content JSON
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

    const item = await prisma.quickRevision.create({ data: payload });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/quick-revision error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
