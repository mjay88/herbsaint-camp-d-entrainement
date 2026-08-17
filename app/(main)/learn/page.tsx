export const instant = false;
import { auth } from "@clerk/nextjs/server";
import { Header } from "./header";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { FeedWrapper } from "@/components/feed-wrapper";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const { userId } = await auth();

  const userProgressData = getUserProgress(userId);

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ imageSrc: "/mascot.svg", title: "Soups & Salads" }}
          hearts={5}
          points={100}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Menu" />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
