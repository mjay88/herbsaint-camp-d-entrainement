export const instant = false; //TODO: Need to add Suspense and push fetch to leaf : https://nextjs.org/docs/messages/blocking-prerender-runtime#wrap-in-or-move-into-suspense
import { getCourseProgress, getLesson, getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import LessonPageClient from "./lesson-page-client";
const LessonPage = async () => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  const userProgress = await getUserProgress(userId);
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

export default LessonPage;
