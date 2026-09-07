export const instant = false; //TODO: route renders per request, no useful static shell since this is a page
import {getLesson, getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";



const LessonIdPage = async ({params}: PageProps<"/lesson/[lessonId]">) => {
  const {lessonId} = await params;
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  const userProgress = await getUserProgress(userId);
  
  const lesson = await getLesson(
    userId,
    +lessonId,
  );

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      key="practice-quiz"
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
    />
  );
};

export default LessonIdPage;
