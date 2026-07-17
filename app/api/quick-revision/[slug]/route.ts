import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ slug: string }> };

// GET /api/quick-revision/[slug]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;

    const item = await prisma.quickRevision.findUnique({
      where: { slug, published: true },
    });

    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Increment view count (non-blocking)
    prisma.quickRevision.update({
      where: { id: item.id },
      data: { views: { increment: 1 } },
    }).catch(console.error);

    // Fetch prev/next topics (same subject)
    const [prev, next] = await Promise.all([
      prisma.quickRevision.findFirst({
        where: {
          published: true,
          subject: item.subject,
          id: { lt: item.id },
        },
        orderBy: { id: "desc" },
        select: { title: true, slug: true, subject: true },
      }),
      prisma.quickRevision.findFirst({
        where: {
          published: true,
          subject: item.subject,
          id: { gt: item.id },
        },
        orderBy: { id: "asc" },
        select: { title: true, slug: true, subject: true },
      }),
    ]);

    // Fetch related topics (same subject, different item)
    const related = await prisma.quickRevision.findMany({
      where: {
        published: true,
        subject: item.subject,
        NOT: { id: item.id },
      },
      orderBy: { views: "desc" },
      take: 4,
      select: {
        title: true,
        slug: true,
        subject: true,
        chapter: true,
        className: true,
        thumbnail: true,
        views: true,
        whatHappened: true,
      },
    });

    return NextResponse.json({ item, prev, next, related });
  } catch (error) {
    console.error("GET /api/quick-revision/[slug] error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
