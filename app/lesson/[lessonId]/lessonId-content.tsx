import { getLesson, getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

/**
 * indexed access type to use just params in child component.
 * Deriving the type this way guarantees the childs prop type stays in sync actual route typing
 * If the route path ever changes, it won't break
 */

type Props = {
  params: PageProps<"/lesson/[lessonId]">["params"];
};

export const LessonIdContent = async ({ params }: Props) => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  const { lessonId } = await params;
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  const userProgress = await getUserProgress(userId);

  const lesson = await getLesson(userId, +lessonId);

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
      initialUserProgress={userProgress}
    />
  );
};
