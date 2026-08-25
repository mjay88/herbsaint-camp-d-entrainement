export const instant = false;
import { auth } from "@clerk/nextjs/server";
import { Header } from "./header";
import { Unit } from "./unit";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { FeedWrapper } from "@/components/feed-wrapper";
import { getCourseProgress, getUnits, getUserProgress, getLesson, getLessonPercentage, Lesson } from "@/db/queries";
import { redirect } from "next/navigation";
import { lessons, units as unitsSchema } from "@/db/schema";

const LearnPage = async () => {
  const { userId } = await auth();
  //TODO: redirect is no userId

  const userProgress = await getUserProgress(userId);
  //New pattern do to cacheComponents no cookies and headers in functions flagged with "use cache"
  const units = await getUnits(userProgress?.activeCourseId ?? null, userId);

  const courseProgress = await getCourseProgress(userId, userProgress?.activeCourseId ?? null);

  const lesson = await getLesson(userId, courseProgress?.activeLessonId ?? null) as Lesson;//TODO: Check if I need this type assertion
  const lessonPercentage = await getLessonPercentage(courseProgress?.activeLessonId ?? null, lesson)
  console.log("lessonPercentage: ", lessonPercentage)
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress){
    redirect("/courses")
  }



  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                unit: typeof unitsSchema.$inferSelect;
              } | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
