"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCourse(data: { name: string; slug: string; thumbnail?: string; description: string; featured: boolean; status: string; displayOrder: number }) {
  try {
    const course = await prisma.freeCourse.create({
      data,
    });
    revalidatePath("/admindp/free-courses");
    revalidatePath("/free-courses");
    return { success: true, data: course };
  } catch (error: any) {
    console.error("Failed to create course:", error);
    return { success: false, error: error.message || "Failed to create course" };
  }
}

export async function updateCourse(id: number, data: { name: string; slug: string; thumbnail?: string; description: string; featured: boolean; status: string; displayOrder: number }) {
  try {
    const course = await prisma.freeCourse.update({
      where: { id },
      data,
    });
    revalidatePath("/admindp/free-courses");
    revalidatePath("/free-courses");
    revalidatePath(`/free-courses/${course.slug}`);
    return { success: true, data: course };
  } catch (error: any) {
    console.error("Failed to update course:", error);
    return { success: false, error: error.message || "Failed to update course" };
  }
}

export async function deleteCourse(id: number) {
  try {
    await prisma.freeCourse.delete({
      where: { id },
    });
    revalidatePath("/admindp/free-courses");
    revalidatePath("/free-courses");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete course:", error);
    return { success: false, error: error.message || "Failed to delete course" };
  }
}

export async function getCourses() {
  try {
    const courses = await prisma.freeCourse.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return { success: true, data: courses };
  } catch (error: any) {
    console.error("Failed to get courses:", error);
    return { success: false, error: error.message || "Failed to get courses" };
  }
}
