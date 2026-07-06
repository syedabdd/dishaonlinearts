"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSubject(data: { courseId: number; name: string; slug: string; displayOrder: number }) {
  try {
    const subject = await prisma.freeCourseSubject.create({
      data,
    });
    revalidatePath("/admindp/free-subjects");
    revalidatePath("/free-courses");
    return { success: true, data: subject };
  } catch (error: any) {
    console.error("Failed to create subject:", error);
    return { success: false, error: error.message || "Failed to create subject" };
  }
}

export async function updateSubject(id: number, data: { courseId: number; name: string; slug: string; displayOrder: number }) {
  try {
    const subject = await prisma.freeCourseSubject.update({
      where: { id },
      data,
    });
    revalidatePath("/admindp/free-subjects");
    revalidatePath("/free-courses");
    return { success: true, data: subject };
  } catch (error: any) {
    console.error("Failed to update subject:", error);
    return { success: false, error: error.message || "Failed to update subject" };
  }
}

export async function deleteSubject(id: number) {
  try {
    await prisma.freeCourseSubject.delete({
      where: { id },
    });
    revalidatePath("/admindp/free-subjects");
    revalidatePath("/free-courses");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete subject:", error);
    return { success: false, error: error.message || "Failed to delete subject" };
  }
}

export async function getSubjects() {
  try {
    const subjects = await prisma.freeCourseSubject.findMany({
      include: { course: true },
      orderBy: [
        { courseId: 'asc' },
        { displayOrder: 'asc' }
      ],
    });
    return { success: true, data: subjects };
  } catch (error: any) {
    console.error("Failed to get subjects:", error);
    return { success: false, error: error.message || "Failed to get subjects" };
  }
}

export async function getCoursesList() {
  try {
    const courses = await prisma.freeCourse.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' }
    });
    return { success: true, data: courses };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
