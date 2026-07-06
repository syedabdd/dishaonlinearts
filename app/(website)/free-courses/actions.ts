"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicCourses() {
  try {
    const courses = await prisma.freeCourse.findMany({
      include: {
        subjects: {
          include: {
            chapters: true
          }
        }
      },
      orderBy: { displayOrder: 'asc' },
    });
    return { success: true, data: courses };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getCourseBySlug(slug: string) {
  try {
    const course = await prisma.freeCourse.findUnique({
      where: { slug },
      include: {
        subjects: {
          orderBy: { displayOrder: 'asc' },
          include: {
            chapters: true
          }
        }
      }
    });
    if (!course) return { success: false, error: "Course not found" };
    return { success: true, data: course };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSubjectBySlug(courseSlug: string, subjectSlug: string) {
  try {
    const subject = await prisma.freeCourseSubject.findFirst({
      where: { 
        slug: subjectSlug,
        course: { slug: courseSlug }
      },
      include: {
        course: true,
        chapters: {
          orderBy: { displayOrder: 'asc' },
          include: {
            lectures: {
              orderBy: { displayOrder: 'asc' }
            }
          }
        }
      }
    });
    if (!subject) return { success: false, error: "Subject not found" };
    return { success: true, data: subject };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getLectureBySlug(courseSlug: string, subjectSlug: string, chapterSlug: string, lectureSlug: string) {
  try {
    const lecture = await prisma.freeCourseLecture.findFirst({
      where: {
        slug: lectureSlug,
        chapter: {
          slug: chapterSlug,
          subject: { slug: subjectSlug },
          course: { slug: courseSlug }
        }
      },
      include: {
        chapter: {
          include: {
            subject: {
              include: { course: true }
            }
          }
        }
      }
    });
    if (!lecture) return { success: false, error: "Lecture not found" };

    // Get previous and next lectures in the same chapter
    const allLectures = await prisma.freeCourseLecture.findMany({
      where: { chapterId: lecture.chapterId },
      orderBy: { displayOrder: 'asc' },
      select: { slug: true, name: true }
    });

    const currentIndex = allLectures.findIndex(l => l.slug === lectureSlug);
    const prevLecture = currentIndex > 0 ? allLectures[currentIndex - 1] : null;
    const nextLecture = currentIndex < allLectures.length - 1 ? allLectures[currentIndex + 1] : null;

    return { 
      success: true, 
      data: { lecture, prevLecture, nextLecture, relatedLectures: allLectures }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
