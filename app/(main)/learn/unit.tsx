import { lessons, units } from "@/db/schema";
import { LessonButton } from "./lesson-button";
import { UnitBanner } from "./unit-banner";
import {Shrimp, Fish, Drumstick, Salad, Beef, BottleWine, Wine, CakeSlice, IceCreamBowl} from "lucide-react";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferInsert;
      })
    | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
 const icons = [Shrimp, Fish, Drumstick, Salad, Beef, BottleWine, Wine, CakeSlice, IceCreamBowl]
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;
          const currentIndex = lessons.findIndex(l => l.id === activeLesson?.id)
          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              lessonTitle={lesson.title}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked} //TODO: change back
              // locked={false} //For testing
              percentage={activeLessonPercentage}
              iconIndex={index % icons.length}
              currentIndex={currentIndex}
            />
          );
        })}
      </div>
    </>
  );
};
