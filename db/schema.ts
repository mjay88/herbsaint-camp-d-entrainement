import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});
