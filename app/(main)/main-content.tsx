
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
import { getCoursePercentage, getCourseProgress, getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";

type Props = {
  children: React.ReactNode;
};

export const MainContent = async ({ children }: Props) => {
  const { isAuthenticated, redirectToSignIn, userId } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  const userProgress = await getUserProgress(userId);
 
     const coursePercentage = await getCoursePercentage(
        userId,
        userProgress?.activeCourseId ?? null,
      );

  return (
    <>
      <MobileHeader points={userProgress?.points} percentage={coursePercentage}/>
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>
    </>
  );
};

