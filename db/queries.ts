import { db } from "@/db/drizzle";
import { cacheLife, cacheTag } from "next/cache";
import { challengeProgress, challenges } from "./schema";
//get all courses
export const getCourses = async () => {
  "use cache";
  cacheTag("courses:all");
  cacheLife("days");

  const data = await db.query.courses.findMany();
  return data;
};
//Had to update pattern because you cannot await auth from inside "use cache". https://nextjs.org/docs/messages/next-request-in-use-cache
//getUserProgress accepts userId, which is passed in from CoursesPage and LearnPage after calling await auth()
export const getUserProgress = async (userId: string | null) => {
  "use cache";
  cacheTag("user-progress");
  cacheLife("days");

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


export const getUnits = async (activeCourseId: number | null) => {
  "use cache";
  cacheTag(`units-activeCourseId-${activeCourseId ?? "none"}`);
  cacheLife("days");
  //TODO: need to return empty array if userProgress.activeCourseId does not exist

  if (!activeCourseId) {
    //TODO: this will never run
    return [];
  }

  const data = await db.query.units.findMany({
    where: { id: activeCourseId },
    with: {
      lessons: {
        with: {
          challenges: {
            with: { challengeProgress: true },
          },
        },
      },
    },
  });
//returns an object with a lessons array
  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });
      
      return { ...lesson, completed: allCompletedChallenges };
    });
   
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });
  return normalizedData;
};
