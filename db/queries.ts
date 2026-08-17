import { db } from "@/db/drizzle";
import { cacheLife, cacheTag } from "next/cache";
//get all courses
export const getCourses = async () => {
  "use cache";
  cacheTag("courses:all");
  // cacheLife("days");

  const data = await db.query.courses.findMany();
  return data;
};
//get userprogress of the active user

export const getUserProgress = async (userId: string | null) => {
  "use cache";
  cacheTag("user-progress");
  // cacheLife("days");

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: { userId },
    with: {
      activeCourse: true,
    },
  });
  return data;
};

export const getCourseById = async (courseId: number) => {
  "use cache";
  cacheTag(`course-id-${courseId}`);
  cacheLife("days");

  const data = await db.query.courses.findFirst({
    where: { id: courseId },
  });

  return data;
};
