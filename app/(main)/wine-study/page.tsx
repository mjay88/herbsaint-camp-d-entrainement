import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { wineSchedule } from "@/constants";
// import { Items } from "./items";
import { Quests } from "@/components/quests";
import { WineItem } from "./wineItem";
import { Updates } from "@/components/updates";
const WineStudyPage = async () => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  const userProgress = await getUserProgress(userId);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress points={userProgress.points}></UserProgress>
        <div>
          <Updates />
        </div>
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/wine/red-wine-bottle.webp"
            alt="Wine Bottle"
            height={90}
            width={90}
            className="mt-5"
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Wine Study
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Employees can prepare and reference our wine study schedule here.
            New wines will populate at the top, so they can scroll down to
            reference wines that we have previously covered in pre-meal.
          </p>
          <ul className="w-full space-y-4">
            {/* TODO: Make sure to sort in the query instead of the UI */}
            {[...wineSchedule].reverse().map((wine) => {
              return <WineItem {...wine} key={wine.date} />;
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default WineStudyPage;
