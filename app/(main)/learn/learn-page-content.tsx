import { auth } from "@clerk/nextjs/server";
import { Header } from "./header";
import { Unit } from "./unit";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { FeedWrapper } from "@/components/feed-wrapper";
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
import { Quests } from "@/components/quests";
import { ScrollingHeader } from "./scrolling-header";
import { Updates } from "@/components/updates";
import { LearnFeedWrapper } from "@/components/learn-feed-wrapper";
import { LearnMap } from "@/components/learn/learn-map";

export const LearnPageContent = async () => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  //TODO: When the first lesson is completed. Navigating back to learn from the lesson/footer does and then navigating to the next lesson does not refresh state in the Quiz component so if(!challenge) logic fires. May have something to do with updateTags. Current work around is using window.location.href in footer
  const userProgress = await getUserProgress(userId);
  //New pattern do to cacheComponents no cookies and headers in functions flagged with "use cache"


  //filter out Dessert Menu Unit. I didn't want to remove it from the seed file so it can be accessed later as a stand alone file. 
  const units = (await getUnits(userProgress?.activeCourseId ?? null, userId)).filter(unit => unit.id !== 2);

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
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
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
        <LearnMap
      units={units}
      activeLesson={
        courseProgress.activeLesson as
          | (typeof lessons.$inferSelect & { unit: typeof unitsSchema.$inferSelect })
          | undefined
      }
      activeLessonPercentage={lessonPercentage}
    />
        </ScrollingHeader>
      </LearnFeedWrapper>
    </div>
  );
};
