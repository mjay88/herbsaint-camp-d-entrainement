"use server";

import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { getCourseById, getUserProgress } from "@/db/queries";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { eq } from "drizzle-orm";
import { POINTS_TO_REFILL } from "@/constants";

export const upsertUserProgress = async (courseId: number) => {
  console.log("firing at the end of practice?")
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }
  //test toast
  // throw new Error("test");
  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course is empty");
  }

  try {
    const existingUserProgress = await getUserProgress(userId);
    //if there is userProgress associated with the current user
    if (existingUserProgress) {
      await db.update(userProgress).set({
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
      });

      updateTag(`user-progress-${userId ?? "none"}`);
      redirect("/learn");
    }

    //if there is no existing user progress
    await db.insert(userProgress).values({
      userId,
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Error in from inside upsertUserProgress: ", error);
    return { error: "Something went wrong inside upsertUserProgess" };
  }
  updateTag(`user-progress-${userId ?? "none"}`);
  updateTag(`units-activeCourseId-${courseId ?? "none"}`);
  updateTag(
    `course-progress-userId-${userId ?? "none"}-activeCourseId-${courseId ?? "none"}`,
  );
  revalidatePath("/lesson");
  revalidatePath("/learn");

  return { success: true };
};

export const refillHearts = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }
  
  const currentUserProgress = await getUserProgress(userId);

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts are already full");
  }

  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error("Not enough points");
  }

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));
  updateTag(`user-progress-${userId ?? "none"}`);
  updateTag("leaderboard");
};

export const reduceHearts = async (activeChallengeId: number) => {
  const { userId: activeUserId } = await auth();

  if (!activeUserId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress(activeUserId);

  const challenge = await db.query.challenges.findFirst({
    where: { id: activeChallengeId },
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: {
      userId: activeUserId,
      challengeId: activeChallengeId,
    },
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: "practice" };
  }

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, activeUserId));
  updateTag(`user-progress-${activeUserId ?? "none"}`);
  updateTag("leaderboard");
  updateTag(`lesson-${lessonId ?? "none"}-user-${activeUserId ?? "none"}`);
};
