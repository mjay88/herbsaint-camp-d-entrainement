import { auth } from "@clerk/nextjs/server";

import {
  getCourseProgress,
  getUnits,
  getUserProgress,
  getLesson,
  getLessonPercentage,
  getCoursePercentage,
} from "@/db/queries";
import { redirect } from "next/navigation";

import LearnPageClient from "./learn-page-client";

type Props = {
  showTutorial: boolean;
};

export const LearnPageContent = async ({ showTutorial }: Props) => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }

  const userProgress = await getUserProgress(userId);

  //filter out Dessert Menu Unit. I didn't want to remove it from the seed file so it can be accessed later as a stand alone file.
  //TODO: reseed without dessert menu unit
  const units = (
    await getUnits(userProgress?.activeCourseId ?? null, userId)
  ).filter((unit) => unit.id !== 2);
  const courseProgress = await getCourseProgress(
    userId,
    userProgress?.activeCourseId ?? null,
  );
  const coursePercentage = await getCoursePercentage(
    userId,
    userProgress?.activeCourseId ?? null,
  );
  const lesson = await getLesson(
    userId,
    courseProgress?.activeLessonId ?? null,
  );
  const lessonPercentage = await getLessonPercentage(
    courseProgress?.activeLessonId ?? null,
    lesson ?? null,
  );

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect("/onboarding");
  }

  return (
    <LearnPageClient
      units={units}
      courseProgress={courseProgress}
      coursePercentage={coursePercentage}
      lessonPercentage={lessonPercentage}
      userProgress={userProgress}
      showTutorial={showTutorial}
    />
  );
};
