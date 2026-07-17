import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/quick-revision — public listing
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const subject = searchParams.get("subject") || "";
    const className = searchParams.get("class") || "";
    const chapter = searchParams.get("chapter") || "";
    const board = searchParams.get("board") || "";
    const sort = searchParams.get("sort") || "latest"; // latest | views | featured
    const skip = (page - 1) * limit;

    const where: any = { published: true };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { chapter: { contains: search } },
        { keywords: { contains: search } },
        { reason: { contains: search } },
      ];
    }
    if (subject) where.subject = subject;
    if (className) where.className = className;
    if (chapter) where.chapter = { contains: chapter };
    if (board) where.board = board;
    if (sort === "featured") where.featured = true;

    let orderBy: any = [{ displayOrder: "asc" }, { createdAt: "desc" }];
    if (sort === "views") orderBy = [{ views: "desc" }];
    if (sort === "featured") orderBy = [{ displayOrder: "asc" }, { createdAt: "desc" }];

    const [items, total] = await Promise.all([
      prisma.quickRevision.findMany({
        where,
        orderBy,
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
          examLevel: true,
          featured: true,
          thumbnail: true,
          views: true,
          keywords: true,
          // Quick preview — first 200 chars of whatHappened
          whatHappened: true,
          createdAt: true,
        },
      }),
      prisma.quickRevision.count({ where }),
    ]);

    // Get unique chapters for filter
    const chapters = await prisma.quickRevision.findMany({
      where: { published: true },
      select: { chapter: true },
      distinct: ["chapter"],
      orderBy: { chapter: "asc" },
    });

    return NextResponse.json({
      items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      chapters: chapters.map((c) => c.chapter),
    });
  } catch (error) {
    console.error("GET /api/quick-revision error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
