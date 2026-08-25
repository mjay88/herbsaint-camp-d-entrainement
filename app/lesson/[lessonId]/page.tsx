export const instant = false; //TODO: Need to add Suspense and push fetch to leaf : https://nextjs.org/docs/messages/blocking-prerender-runtime#wrap-in-or-move-into-suspense
import { getCourseProgress, getLesson, getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";
//TODO: for the logic of "CIRRICULUM", will not to mark as complete when next is clicked, or just base progress off of completed "SELECT" and "ASSIST" challenges

// type Props = {
//   params: {
//     lessonId: number;
//   };
// };

const LessonIdPage = async ({params}: PageProps<"/lesson/[lessonId]">) => {
  const {lessonId} = await params;
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
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
    />
  );
};

export default LessonIdPage;
