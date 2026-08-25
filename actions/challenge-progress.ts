"use server";

import { db } from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress,  userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import {  eq } from "drizzle-orm";
import { updateTag } from "next/cache";

export const upsertChallengeProgress = async (activeChallengeId: number) => {
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
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));

    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, activeUserId));
    //upsertChallengeProgress updates multiple tables, updateTag re runs the queries for that data
    updateTag(`user-progress-${activeUserId ?? "none"}`);
    updateTag(
      `units-activeCourseId-${currentUserProgress.activeCourseId ?? "none"}`,
    );
    updateTag(`lesson-${lessonId ?? "none"}-user-${activeUserId ?? "none"}`);
    updateTag(
      `course-progress-userId-${activeUserId ?? "none"}-activeCourseId-${currentUserProgress.activeCourseId ?? "none"}`,
    );
    updateTag("leaderboard");
    return;
  }

  await db.insert(challengeProgress).values({
    challengeId: activeChallengeId,
    userId: activeUserId,
    completed: true,
  });

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, activeUserId));

  //upsertChallengeProgress updates multiple tables, updateTag re runs the queries for that data
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
