import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import {
  getAllUsersCourseCompletedPercentage,
  getCoursePercentage,
  getUserProgress,
} from "@/db/queries";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Quests } from "@/components/quests";
import { Progress } from "@/components/ui/progress";

const UserProgressPage = async () => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  const user = await currentUser();
  if (!isAuthenticated || user?.publicMetadata?.role !== "admin") {
    return redirectToSignIn();
  }

  const usersWithCompletedPercentage =
    await getAllUsersCourseCompletedPercentage();

  const userProgress = await getUserProgress(userId);
  const coursePercentage = await getCoursePercentage(
     userId,
     userProgress?.activeCourseId ?? null,
   );
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress points={userProgress.points} percentage={coursePercentage} />
        
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/percent.svg" alt="Shop" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            User Progress
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Percentage of Training Course Completed
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {usersWithCompletedPercentage.map((user, index) => (
            <div
              key={user.userId}
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50 gap-x-2.5"
            >
              <p className="font-bold text-lime-700">{index + 1}</p>
              <Avatar className="border bg-green-500 h-12 w-12 ml-3">
                <AvatarImage className="object-cover" src={user.userImageSrc} />
              </Avatar>
              <p className="w-1/4 font-bold text-neutral-800 text-center justify-center">
                {user.userName}
              </p>
              <div className="w-3/5 mr-2">
                <Progress
                  value={user.courseCompletedPercentage}
                  className="h-2"
                />
              </div>
              <div className="flex">
                <span className="mr-2">{user.courseCompletedPercentage}</span>
                <Image src="/percent.svg" height={25} width={25} alt="Points" />
              </div>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default UserProgressPage;
