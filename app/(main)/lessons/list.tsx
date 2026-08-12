"use client";

import { lessons } from "@/db/schema";

import { Card } from "./card";

type Props = {
  lessons: (typeof lessons.$inferSelect)[];
  activeCourseId: number;
};

export const List = ({ lessons, activeCourseId }: Props) => {

    return (
  <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
    {lessons.map((lesson) => (
      <Card
        key={lesson.id}
        id={lesson.id}
        title={lesson.title}
        imageSrc={lesson.imageSrc}
        onClick={() => {}}
        disabled={false}
        active={lesson.id == activeCourseId}
      />
    ))}
  </div>
    );
};
