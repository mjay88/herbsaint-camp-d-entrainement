import { db } from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { cacheLife, cacheTag } from "next/cache";

export const getLessons = async () => {
  "use cache";
  cacheTag("lessons:all");
  cacheLife("days");

  const data = await db.select().from(lessons);
  return data;
};
