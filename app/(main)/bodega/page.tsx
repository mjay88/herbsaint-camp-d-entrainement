import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";

import { Items } from "./items";
import { Quests } from "@/components/quests";

const BodegaPage = async () => {
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
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        ></UserProgress>
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/shop.svg" alt="Shop" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Bodega
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            You can use your points to buy more hearts.
          </p>
          <Items hearts={userProgress.hearts} points={userProgress.points} />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default BodegaPage;
