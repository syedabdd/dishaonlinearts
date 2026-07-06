"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLecture(data: { chapterId: number; name: string; slug: string; youtubeUrl: string; thumbnail: string; content?: string; displayOrder: number }) {
  try {
    let finalSlug = data.slug;
    let count = 1;
    while (await prisma.freeCourseLecture.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${data.slug}-${count}`;
      count++;
    }

    const lecture = await prisma.freeCourseLecture.create({
      data: { ...data, slug: finalSlug },
    });
    revalidatePath("/admindp/free-lectures");
    revalidatePath("/free-courses");
    return { success: true, data: lecture };
  } catch (error: any) {
    console.error("Failed to create lecture:", error);
    return { success: false, error: error.message || "Failed to create lecture" };
  }
}

export async function updateLecture(id: number, data: { chapterId: number; name: string; slug: string; youtubeUrl: string; thumbnail: string; content?: string; displayOrder: number }) {
  try {
    let finalSlug = data.slug;
    let count = 1;
    const existing = await prisma.freeCourseLecture.findFirst({ where: { slug: finalSlug, id: { not: id } } });
    if (existing) {
      while (await prisma.freeCourseLecture.findFirst({ where: { slug: finalSlug, id: { not: id } } })) {
        finalSlug = `${data.slug}-${count}`;
        count++;
      }
    }

    const lecture = await prisma.freeCourseLecture.update({
      where: { id },
      data: { ...data, slug: finalSlug },
    });
    revalidatePath("/admindp/free-lectures");
    revalidatePath("/free-courses");
    return { success: true, data: lecture };
  } catch (error: any) {
    console.error("Failed to update lecture:", error);
    return { success: false, error: error.message || "Failed to update lecture" };
  }
}

export async function deleteLecture(id: number) {
  try {
    await prisma.freeCourseLecture.delete({
      where: { id },
    });
    revalidatePath("/admindp/free-lectures");
    revalidatePath("/free-courses");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete lecture:", error);
    return { success: false, error: error.message || "Failed to delete lecture" };
  }
}

export async function getLectures() {
  try {
    const lectures = await prisma.freeCourseLecture.findMany({
      include: { 
        chapter: {
          include: {
            subject: {
              include: {
                course: true
              }
            }
          }
        } 
      },
      orderBy: [
        { chapter: { subject: { courseId: 'asc' } } },
        { chapter: { subjectId: 'asc' } },
        { chapterId: 'asc' },
        { displayOrder: 'asc' }
      ],
    });
    return { success: true, data: lectures };
  } catch (error: any) {
    console.error("Failed to get lectures:", error);
    return { success: false, error: error.message || "Failed to get lectures" };
  }
}

export async function getChaptersBySubject(subjectId: number) {
  try {
    const chapters = await prisma.freeCourseChapter.findMany({
      where: { subjectId },
      orderBy: { displayOrder: 'asc' }
    });
    return { success: true, data: chapters };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
