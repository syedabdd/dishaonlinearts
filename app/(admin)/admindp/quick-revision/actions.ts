"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { quickRevisionSchema, generateSlug } from "@/lib/zod/quickRevisionSchema";

export async function getQuickRevisions(filters?: {
  search?: string;
  subject?: string;
  className?: string;
  published?: boolean;
}) {
  const where: any = {};
  if (filters?.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { chapter: { contains: filters.search } },
    ];
  }
  if (filters?.subject) where.subject = filters.subject;
  if (filters?.className) where.className = filters.className;
  if (filters?.published !== undefined) where.published = filters.published;

  return prisma.quickRevision.findMany({
    where,
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
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
  });
}

export async function getQuickRevisionById(id: number) {
  return prisma.quickRevision.findUnique({ where: { id } });
}

export async function getQuickRevisionStats() {
  const [total, published, draft, featured, recentlyAdded, mostViewed] =
    await Promise.all([
      prisma.quickRevision.count(),
      prisma.quickRevision.count({ where: { published: true } }),
      prisma.quickRevision.count({ where: { published: false } }),
      prisma.quickRevision.count({ where: { featured: true } }),
      prisma.quickRevision.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, title: true, subject: true, createdAt: true },
      }),
      prisma.quickRevision.findMany({
        where: { published: true },
        orderBy: { views: "desc" },
        take: 5,
        select: { id: true, title: true, views: true, slug: true },
      }),
    ]);

  return { total, published, draft, featured, recentlyAdded, mostViewed };
}

export async function createQuickRevision(formData: FormData) {
  const rawTitle = formData.get("title") as string;
  const rawSlug = (formData.get("slug") as string) || generateSlug(rawTitle);

  // Ensure slug uniqueness
  let slug = rawSlug;
  const existing = await prisma.quickRevision.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const data = {
    title: rawTitle,
    slug,
    subject: formData.get("subject") as any,
    chapter: formData.get("chapter") as string,
    className: formData.get("className") as string,
    board: (formData.get("board") as string) || "All Boards",
    examLevel: (formData.get("examLevel") as string) || "Board Exam",
    dateYear: (formData.get("dateYear") as string) || null,
    place: (formData.get("place") as string) || null,
    people: (formData.get("people") as string) || null,
    reason: formData.get("reason") as string,
    whatHappened: formData.get("whatHappened") as string,
    result: formData.get("result") as string,
    interestingFact: formData.get("interestingFact") as string,
    examTrick: formData.get("examTrick") as string,
    pyq: (formData.get("pyq") as string) || null,
    mcqQuestion: (formData.get("mcqQuestion") as string) || null,
    optionA: (formData.get("optionA") as string) || null,
    optionB: (formData.get("optionB") as string) || null,
    optionC: (formData.get("optionC") as string) || null,
    optionD: (formData.get("optionD") as string) || null,
    correctAnswer: (formData.get("correctAnswer") as string) || null,
    keywords: (formData.get("keywords") as string) || null,
    metaTitle: (formData.get("metaTitle") as string) || null,
    metaDescription: (formData.get("metaDescription") as string) || null,
    thumbnail: (formData.get("thumbnail") as string) || null,
    displayOrder: parseInt((formData.get("displayOrder") as string) || "0"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };

  await prisma.quickRevision.create({ data });
  revalidatePath("/admindp/quick-revision");
  revalidatePath("/quick-revision");
}

export async function updateQuickRevision(id: number, formData: FormData) {
  const rawTitle = formData.get("title") as string;
  const rawSlug = (formData.get("slug") as string) || generateSlug(rawTitle);

  // Ensure slug uniqueness (exclude current)
  let slug = rawSlug;
  const existing = await prisma.quickRevision.findFirst({
    where: { slug, NOT: { id } },
  });
  if (existing) slug = `${slug}-${Date.now()}`;

  const data = {
    title: rawTitle,
    slug,
    subject: formData.get("subject") as any,
    chapter: formData.get("chapter") as string,
    className: formData.get("className") as string,
    board: (formData.get("board") as string) || "All Boards",
    examLevel: (formData.get("examLevel") as string) || "Board Exam",
    dateYear: (formData.get("dateYear") as string) || null,
    place: (formData.get("place") as string) || null,
    people: (formData.get("people") as string) || null,
    reason: formData.get("reason") as string,
    whatHappened: formData.get("whatHappened") as string,
    result: formData.get("result") as string,
    interestingFact: formData.get("interestingFact") as string,
    examTrick: formData.get("examTrick") as string,
    pyq: (formData.get("pyq") as string) || null,
    mcqQuestion: (formData.get("mcqQuestion") as string) || null,
    optionA: (formData.get("optionA") as string) || null,
    optionB: (formData.get("optionB") as string) || null,
    optionC: (formData.get("optionC") as string) || null,
    optionD: (formData.get("optionD") as string) || null,
    correctAnswer: (formData.get("correctAnswer") as string) || null,
    keywords: (formData.get("keywords") as string) || null,
    metaTitle: (formData.get("metaTitle") as string) || null,
    metaDescription: (formData.get("metaDescription") as string) || null,
    thumbnail: (formData.get("thumbnail") as string) || null,
    displayOrder: parseInt((formData.get("displayOrder") as string) || "0"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };

  await prisma.quickRevision.update({ where: { id }, data });
  revalidatePath("/admindp/quick-revision");
  revalidatePath("/quick-revision");
}

export async function deleteQuickRevision(id: number) {
  const item = await prisma.quickRevision.findUnique({ where: { id } });
  if (!item) return;

  // Delete thumbnail file
  if (item.thumbnail) {
    const fs = await import("fs");
    const path = await import("path");
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

  await prisma.quickRevision.delete({ where: { id } });
  revalidatePath("/admindp/quick-revision");
  revalidatePath("/quick-revision");
}
