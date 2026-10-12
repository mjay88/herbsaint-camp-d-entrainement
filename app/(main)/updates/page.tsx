import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";


import { updates } from "@/constants";


const UpdatesPage = async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress(userId);
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
        
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/megaphone.svg" alt="Shop" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            What&apos;s New
          </h1>
          <ul className="w-full">
            {[...updates].reverse().map((update) => {
              return (
                <>
                 <div key={update.date} className="flex flex-col items-center w-full m-4 border-2 rounded-xl">
                      {/* Header */}
                      <div className="relative w-full flex items-center border-b-2 p-3">
                        <div className="absolute text-xs top-0 right-0 p-1">{update.date}</div>
                        <Image src="/check.svg" alt="Check Mark" height={60} width={60}  />
                        <div className="flex-1 p-3 ">
                         {update.title}
                        </div>
                      </div>
                      <div className="flex p-3">
                        <div className="flex-1 mt-3">
                          <p className="text-neutral-700 text-base leading-relaxed text-muted-foreground">{update.description}</p>
                        </div>
                      </div>
                    </div>
                </>
              )
            })}
          </ul>
          
        </div>
      </FeedWrapper>
    </div>
  );
};

export default UpdatesPage;
