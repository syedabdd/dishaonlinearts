import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { quickRevisionSchema, generateSlug } from "@/lib/zod/quickRevisionSchema";

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

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { chapter: { contains: search } },
        { keywords: { contains: search } },
      ];
    }
    if (subject) where.subject = subject;
    if (className) where.className = className;
    if (board) where.board = board;
    if (published !== null && published !== "") {
      where.published = published === "true";
    }

    const [items, total, totalPublished, totalDraft, mostViewed] = await Promise.all([
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

    const parsed = quickRevisionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    // Ensure slug uniqueness
    let slug = data.slug || generateSlug(data.title);
    const existing = await prisma.quickRevision.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const payload: any = { ...data, slug };
    if (payload.mcqs === null) {
      payload.mcqs = require('@prisma/client').Prisma.DbNull;
    }

    const item = await prisma.quickRevision.create({
      data: payload,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/quick-revision error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
