import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  userProgress: {
    activeCourse: r.one.courses({
      //activeCourse = custom key. activecourse will be a single object from the usersProgress table, rather than an array of objects
      from: r.userProgress.activeCourseId, //starts the soft relation between userProgress and courses tables at the activeCourseId column of userProgress. Same as in schema
      to: r.courses.id, //establish soft relation with id column in courses table
    }),
  },
  courses: {
    userProgress: r.many.userProgress(), //userProgress = custom key. r.many.userProgress() defines that userProgress will be an array of objects. One course can have many different users actively on that course
    units: r.many.units(), //units = custom key. defines that units will be an array of objects. Once course can have several units
  },
  units: {
    course: r.one.courses({
      //course = custom key. r.one.courses defines that courseId will be a single object
      from: r.units.courseId, //
      to: r.courses.id,
    }),
  },

  lessons: {
    unit: r.one.units({
      //unit = custom key. r.one.units defines that a lesson will belong to only one unit
      from: r.lessons.unitId, //establish soft relation starts a unitId column in lessons table
      to: r.units.id, //establishes that lessons.unitId points to the id column in units
    }),
    challenges: r.many.challenges(),//returns array of challenge objects associated with a specific lesson.
  },

  challenges: {
    lesson: r.one.lessons({
      //lesson = custom key. r.one.lessons defines that challenges will be associated with one lesson
      from: r.challenges.lessonId, //lessonId column in challenges table references id column in lessons table
      to: r.lessons.id, //column referenced by challenges.lessonId column
    }),
    challengeOptions: r.many.challengeOptions(), //returns an array of challengesOptions objects associated with given challenge
    challengeProgress: r.many.challengeProgress(), //returns an array of challengeProgress objects associated with given challenge
  },

  challengeOptions: {
    challenge: r.one.challenges({
      //challenge = custom key. r.one.challenges defines a challengeOption will only be associated with one  challenge
      from: r.challengeOptions.challengeId, //The challengeId column in the challenge table references the id column in challenges table
      to: r.challenges.id,
    }),
  },

  challengeProgress: {
    challenge: r.one.challenges({
      //challenge = custom key. r.one.challenges defines a challengeProgress object will only be associated with one challenge
      from: r.challengeProgress.challengeId, //The challengeId column in the challengeProgress table references the id column in challenges table
      to: r.challenges.id,
    }),
  },
}));
