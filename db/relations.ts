import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  
  userProgress: {
    activeCourse: r.one.courses({
      from: r.userProgress.activeCourseId,
      to: r.courses.id,
    }),
  },
  courses: {
    userProgress: r.many.userProgress(),
  },
}));
