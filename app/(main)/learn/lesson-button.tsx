"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Check,
  Crown,
  Star,
  Shrimp,
  Fish,
  Drumstick,
  Salad,
  Beef,
  BottleWine,
  Wine,
  Martini,
  Beer,
  CakeSlice,
  IceCreamBowl,
  Cookie,
} from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  lessonTitle: string;
  iconIndex: number;
  currentIndex: number;
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
  lessonTitle,
  iconIndex,
  currentIndex,
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;

  const isCompleted = index < currentIndex && !current;

  const icons = [Shrimp, Fish, Drumstick, Salad, Beef, BottleWine, Wine];
  const Icon = isCompleted
    ? Check
    : current
      ? Star
      : lessonTitle.includes("Cocktails")
        ? Martini
        : lessonTitle.includes("Wine")
          ? Wine
          : lessonTitle.includes("Beer")
            ? Beer
            : lessonTitle.includes("Serving Dessert")
              ? Cookie
              : lessonTitle.includes("The Dessert Menu")
                ? CakeSlice
                : lessonTitle.includes("Dessert Menu and Suggested Pairings")
                  ? IceCreamBowl
                  : icons[iconIndex % icons.length];

  const href = isCompleted ? `/lesson/${id}` : "/lesson";
  //TODO: add mobile tool tips for
  return (
    <Link
      href={locked ? "#" : href}
      aria-disabled={locked}
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="relative z-9"
        style={{
          right: `${rightPosition}px`,
          marginTop: 24,
        }}
      >
        {current ? (
          <div className="relative h-[102px] w-[102px] mb-12">
            <div className="absolute w-max -top-6 left-1/2 -translate-x-1/2 px-1.5 text-center py-1.5 border-2 font-bold uppercase text-orange-500 bg-white rounded-xl animate-bounce-slow z-10 text-sm lg:text-base tracking-tight">
              {lessonTitle}
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>

            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: "#4ade80",
                },
                trail: {
                  stroke: "#e5e7eb",
                },
              }}
            >
              <Button
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className="h-[70px] w-[70px] border-b-8"
              >
                <Icon
                  className={cn(
                    "size-8",
                    locked
                      ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                      : "fill-primary-foreground text-primary-foreground",
                    isCompleted && Icon === Check && "fill-none stroke-[4]",
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <div className="relative h-[102px]">
            <div className="absolute w-max -top-9 lg:-top-11 left-1/2 -translate-x-1/2 px-1.5 text-center py-1.5 border-2 font-bold uppercase text-orange-500 bg-white rounded-xl animate-bounce-slow z-10 text-sm lg:text-base tracking-tight">
              {lessonTitle}
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>

            <Button
              size="rounded"
              variant={locked ? "locked" : "secondary"}
              className="h-[70px] w-[70px] border-b-8"
            >
              <Icon
                className={cn(
                  "size-8",
                  locked
                    ? "text-neutral-400 stroke-[2]"
                    : "fill-primary-foreground text-primary-foreground",
                  isCompleted && "fill-none stroke-[4]",
                )}
              />
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
};
