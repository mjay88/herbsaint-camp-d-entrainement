"use client";
import { Unit } from "./unit";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import {
  challengeOptions,
  challengeProgress,
  challenges,
  lessons,
  units as unitsSchema,
  userProgress,
} from "@/db/schema";
import { Updates } from "@/components/updates";
import { LearnFeedWrapper } from "@/components/learn-feed-wrapper";
import { ScrollingHeader } from "./scrolling-header";
import { useRouter } from "next/navigation";
import { useTutorialModal } from "@/store/use-tutorial-modal";
import { useMount } from "react-use";

type Props = {
  units: (typeof unitsSchema.$inferSelect & {
    lessons: (typeof lessons.$inferSelect & {
      challenges: (typeof challenges.$inferSelect & {
        challengeProgress: (typeof challengeProgress.$inferSelect)[];
      })[];
      completed: boolean;
    })[];
  })[];

  courseProgress: {
    activeLesson:
      | (typeof lessons.$inferSelect & {
          challenges: (typeof challenges.$inferSelect & {
            challengeProgress: (typeof challengeProgress.$inferSelect)[];
          })[];
          unit: typeof unitsSchema.$inferSelect | null;
        })
      | undefined;
    activeLessonId: number | undefined;
  } | null;
  coursePercentage: number | null;

  lessonPercentage: number;
  userProgress:
    | (typeof userProgress.$inferSelect & {
        activeCourse: {
          id: number;
          title: string;
          imageSrc: string;
        } | null;
      })
    | null
    | undefined;
  showTutorial: boolean;
};

const LearnPageClient = ({
  units,
  courseProgress,
  coursePercentage,
  lessonPercentage,
  userProgress,
  showTutorial,
}: Props) => {
  const { open: openTutorialModal } = useTutorialModal();
  
  useMount(() => {
    if (true || showTutorial) {
      openTutorialModal();
    }
  });

  const router = useRouter();
  if (!userProgress || !userProgress.activeCourse) {
    router.push("/learn");
    return null;
  }

  if (!courseProgress) {
    router.push("/learn");
    return null;
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

export default LearnPageClient;
