import { db } from "@/db/drizzle";
import { cacheLife, cacheTag } from "next/cache";

//get all courses
export const getCourses = async () => {
  "use cache";
  cacheTag("courses:all");
  cacheLife("seconds");

  const data = await db.query.courses.findMany();
  return data;
};
//Had to update pattern because you cannot await auth from inside "use cache". https://nextjs.org/docs/messages/next-request-in-use-cache
//getUserProgress accepts userId, which is passed in from CoursesPage and LearnPage after calling await auth()
export const getUserProgress = async (userId: string | null) => {
  "use cache";
  cacheTag("user-progress");
  cacheLife("seconds");

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
  cacheLife("seconds");

  const data = await db.query.courses.findFirst({
    where: { id: courseId },
  });

  return data;
};

export const getUnits = async (
  activeCourseId: number | null,
  authenticatedUserId: string | null,
) => {
  "use cache";
  cacheTag(`units-activeCourseId-${activeCourseId ?? "none"}`);
  cacheLife("seconds");

  if (!activeCourseId || !authenticatedUserId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: { id: activeCourseId },
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: {
                  userId: authenticatedUserId, //TODO: make sure this works
                },
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {

      if(lesson.challenges.length === 0){ //solves improperly returning true value for completed bug
        return {...lesson, completed: false}
      }
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

export const getCourseProgress = async (
  authenticatedUserId: string | null,
  activeCourseId: number | null,
) => {
  "use cache";
  cacheTag(
    `course-progress-userId-${authenticatedUserId ?? "none"}-activeCourseId-${activeCourseId ?? "none"}`,
  );
  cacheLife("seconds");

  if (!authenticatedUserId || !activeCourseId) {
    return null;
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    //TODO: understand this
    orderBy: (units, { asc }) => [asc(units.order)],
    where: { courseId: activeCourseId },
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: { userId: authenticatedUserId },
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          //challenge has no progress at all
          !challenge.challengeProgress ||
          //challenge.challengeProgress exists but nothing has been completed yet
          challenge.challengeProgress.length === 0 ||
          //has some progress but not completed
          challenge.challengeProgress.some(
            (progress) => progress.completed === false,
          )
        );
      });
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
};



export const getLesson = async (authenticatedUserId: string | null,  activeLessonId: number | null) => {
  "use cache";

  if (!authenticatedUserId) {
    return null;
  }

  const lessonId = activeLessonId ?? null;
  
  if (!lessonId) return null;

  const data = await db.query.lessons.findFirst({
    where: { id: lessonId },
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: { userId: authenticatedUserId },
          },
        },
      },
    },
  });

  if (!data || !data.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);

    return { ...challenge, completed };
  });

  return { ...data, challenges: normalizedChallenges };
};

export type Lesson = NonNullable<Awaited<ReturnType<typeof getLesson>>>; //TODO: might need to remove NonNullable

export const getLessonPercentage = async (
  activeLessonId: number | null,
  lesson: Lesson,
) => {
  "use cache";
  if (!activeLessonId) {
    return 0;
  }

  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed,
  );
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100,
  );

  return percentage;
};
