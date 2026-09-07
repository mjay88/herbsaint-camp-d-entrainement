"use server";

import { db } from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath, updateTag } from "next/cache";

/**
 * updates challenge completed to true.
 * In practice mode updates hearts but not points, unless isCurriculum is true then updates neither
 * If isCurriculum is true, only updates challenge completed to true, does not update points
 *
 */

export const upsertChallengeProgress = async (
  activeChallengeId: number,
  isCurriculum?: boolean,
) => {
  const { userId: activeUserId } = await auth();

  if (!activeUserId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress(activeUserId);

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  const challenge = await db.query.challenges.findFirst({
    where: { id: activeChallengeId },
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: { userId: activeUserId, challengeId: activeChallengeId },
  });

  const isPractice = !!existingChallengeProgress;

  if (currentUserProgress.hearts === 0 && !isPractice) {
    return { error: "hearts" };
  }

  if (isPractice) {
    //Do not save progress if practicing
    // await db
    //   .update(challengeProgress)
    //   .set({
    //     completed: true,
    //   })
    //   .where(eq(challengeProgress.id, existingChallengeProgress.id));

    if (isCurriculum) return;
    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, activeUserId));
    //TODO: check if all of these tags are necessary for updating challengeProgress
    updateTag(`user-progress-${activeUserId ?? "none"}`);
    updateTag(
      `units-activeCourseId-${currentUserProgress.activeCourseId ?? "none"}`,
    );
    updateTag(`lesson-${lessonId ?? "none"}-user-${activeUserId ?? "none"}`); 
    updateTag(
      `course-progress-userId-${activeUserId ?? "none"}-activeCourseId-${currentUserProgress.activeCourseId ?? "none"}`,
    ); 
    updateTag("leaderboard");
    revalidatePath(`/lesson/${lessonId}`); //TODO: Is this necessary for updating hearts in practice mode?

    revalidatePath("/learn"); //TODO: Trying to have hearts in lesson/header update when coming straight from practice

    return;
  }

  await db.insert(challengeProgress).values({
    challengeId: activeChallengeId,
    userId: activeUserId,
    completed: true,
  });
  if (isCurriculum) {
   
    updateTag(`user-progress-${activeUserId ?? "none"}`); //getUserProgress
    updateTag(
      `units-activeCourseId-${currentUserProgress.activeCourseId ?? "none"}`,
    ); //getUnits
    updateTag(`lesson-${lessonId ?? "none"}-user-${activeUserId ?? "none"}`);//getLesson
    updateTag(
      `course-progress-userId-${activeUserId ?? "none"}-activeCourseId-${currentUserProgress.activeCourseId ?? "none"}`,
    ); //getCourseProgress
    updateTag("leaderboard");
    return;
  }
  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, activeUserId));

  updateTag(`user-progress-${activeUserId ?? "none"}`);
  updateTag(
    `units-activeCourseId-${currentUserProgress.activeCourseId ?? "none"}`,
  );
  updateTag(`lesson-${lessonId ?? "none"}-user-${activeUserId ?? "none"}`);
  updateTag(
    `course-progress-userId-${activeUserId ?? "none"}-activeCourseId-${currentUserProgress.activeCourseId ?? "none"}`,
  );
  updateTag("leaderboard");
};
