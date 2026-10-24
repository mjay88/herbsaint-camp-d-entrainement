
"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { getCourseById } from "@/db/queries";
import { HERBSAINT_TRAINING_COURSE_ID } from "@/constants";

/**
 * created to skip cache invalidation from upsertUserProgress
 * cache revalidation can only happen from server actions or route handlers.
 * When you await an action marked as "use server" from inside a page render, it's treated as a regular next.js function.
 * Rule of thumb: avoid revalidateTag unless a user is clicking something to trigger it.
 */

export const enrollNewUser = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized");

  const course = await getCourseById(HERBSAINT_TRAINING_COURSE_ID);
  if (!course) throw new Error("Course not found");

  // Insert directly — no revalidateTag, no redirect
  try {

  
  await db
    .insert(userProgress)
    .values({
      userId,
      activeCourseId: HERBSAINT_TRAINING_COURSE_ID,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    })
    .onConflictDoNothing(); // safe if they somehow already exist

  // Mark as onboarded in Clerk
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { onboarded: true },
  });
} catch(error){
  return {error: "There was an error in enrollNewUser"}
}
};