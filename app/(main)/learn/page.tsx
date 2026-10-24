export const instant = false;

import { Suspense } from "react";
import { LearnPageContent } from "./learn-page-content";
import Skeleton from "@/components/ui/skeleton";
import { currentUser, auth } from "@clerk/nextjs/server";
import { enrollNewUser } from "@/actions/onboarding";

const LearnPage = async () => {
  const { isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  const user = await currentUser();
  const isFirstTimeLoggingIn = !user?.publicMetadata?.onboarded;
  if (!isFirstTimeLoggingIn) {
    await enrollNewUser();
  }

  return (
    <Suspense fallback={<Skeleton />}>
      <LearnPageContent showTutorial={isFirstTimeLoggingIn}></LearnPageContent>
    </Suspense>
  );
};

export default LearnPage;
