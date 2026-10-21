import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getBlobDocs, getCoursePercentage, getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";

// import { Items } from "./items";
import { Quests } from "@/components/quests";
import { Updates } from "@/components/updates";
import Link from "next/link";

const BodegaPage = async () => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  const blobs = await getBlobDocs();

  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  const userProgress = await getUserProgress(userId);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

   const coursePercentage = await getCoursePercentage(
        userId,
        userProgress?.activeCourseId ?? null,
      );

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress points={userProgress.points} percentage={coursePercentage}></UserProgress>
        <Updates />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/shop.svg" alt="Shop" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Bodega
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Additional Resources
          </p>
          <ul className="w-full">
            {blobs.map((blob) => {
              return (
                <Link key={blob.url} href={blob.url}>
                  <div
                  
                    className="flex items-center w-full p-4 gap-x-4 border-t-2"
                  >
                    <Image
                      src="/points.svg"
                      alt="Points"
                      width={60}
                      height={60}
                    />
                    <div className="flex flex-col gap-y-2 w-full">
                      <p className="text-neutral-700 text-xl font-bold">
                        {blob.pathname}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default BodegaPage;
