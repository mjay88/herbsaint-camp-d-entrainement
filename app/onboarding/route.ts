import { HERBSAINT_TRAINING_COURSE_ID } from "@/constants";
import { db } from "@/db/drizzle";
import { getCourseById } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const GET = async (req: Request): Promise<void | Response> => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const course = await getCourseById(HERBSAINT_TRAINING_COURSE_ID);
  if (!course) throw new Error("Course not found");

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
    revalidateTag(`user-progress-${userId}`, { expire: 0 });
    revalidateTag(
      `course-progress-userId-${userId}-activeCourseId-${HERBSAINT_TRAINING_COURSE_ID}`,
      { expire: 0 },
    );
    revalidateTag(
      `course-percentage-userId-${userId}-activeCourseId-${HERBSAINT_TRAINING_COURSE_ID}`,
      { expire: 0 },
    );
    //why don't I have to revalidateTag for getUnits, getLesson, and getLessonPercentage?
  } catch (error) {
    console.error(error);
    throw new Error(`There was an error signing in a new user`, {
      cause: error,
    });
  }

  redirect("/learn");
};
