export const instant = false;
import { auth } from "@clerk/nextjs/server";
import { Header } from "./header";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { FeedWrapper } from "@/components/feed-wrapper";

const LearnPage = async () => {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) {
    return redirectToSignIn();
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ imageSrc: "/mascot.svg", title: "Menu" }}
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
