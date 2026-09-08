import { getCourseProgress, getLesson, getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import LessonPageClient from "./lesson-page-client";
export const LessonPageContent = async () => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  const userProgress = await getUserProgress(userId);
  console.log("userProgress: ", userProgress)
  const courseProgress = await getCourseProgress(
    userId,
    userProgress?.activeCourseId ?? null,
  );
  const lesson = await getLesson(
    userId,
    courseProgress?.activeLessonId ?? null,
  );
  return (
    <LessonPageClient lesson={lesson} userProgress={userProgress ?? null} />
  );
};

