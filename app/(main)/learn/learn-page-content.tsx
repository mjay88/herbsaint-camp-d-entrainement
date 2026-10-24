import { auth } from "@clerk/nextjs/server";
import { Unit } from "./unit";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import {
  getCourseProgress,
  getUnits,
  getUserProgress,
  getLesson,
  getLessonPercentage,
  getCoursePercentage,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { lessons, units as unitsSchema } from "@/db/schema";
import { ScrollingHeader } from "./scrolling-header";
import { Updates } from "@/components/updates";
import { LearnFeedWrapper } from "@/components/learn-feed-wrapper";
import { connection } from "next/server";

type Props = {
  showTutorial: boolean;
} 

export const LearnPageContent = async ({showTutorial}: Props) => {
  await connection()
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  
 
  const userProgress = await getUserProgress(userId);

  //filter out Dessert Menu Unit. I didn't want to remove it from the seed file so it can be accessed later as a stand alone file.
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
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/learn");
  }

  if (!courseProgress) {
    redirect("/learn");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-3 lg:px-6">
      <StickyWrapper>
        <UserProgress
          points={userProgress.points}
          percentage={coursePercentage}
        />
        <Updates />
      </StickyWrapper>
      <LearnFeedWrapper>
        <ScrollingHeader
          courseTitle={userProgress.activeCourse.title}
          units={units}
        >
          {units.map((unit) => (
            <div key={unit.id}>
              <Unit
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={
                  courseProgress?.activeLesson as
                    | (typeof lessons.$inferSelect & {
                        unit: typeof unitsSchema.$inferSelect;
                      })
                    | undefined
                }
                activeLessonPercentage={lessonPercentage}
              />
            </div>
          ))}
        </ScrollingHeader>
      </LearnFeedWrapper>
    </div>
  );
};
