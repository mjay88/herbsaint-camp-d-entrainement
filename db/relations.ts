import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  userProgress: {
    activeLesson: r.one.lessons({
      from: r.userProgress.activeLessonId,
      to: r.lessons.id,
    }),
  },
  lessons: {
    userProgress: r.many.userProgress(),
  },
}));
