export const instant = false;

import { Suspense } from "react";
import { LearnPageContent } from "./learn-page-content";
import Skeleton from "@/components/ui/skeleton";
import { currentUser, auth } from "@clerk/nextjs/server";
import { enrollNewUser } from "@/actions/onboarding";
import { connection } from "next/server";

const LearnPage = async () => {
  await connection();
  const { isAuthenticated, redirectToSignIn } = await auth();
  console.log("isAuthenticated", isAuthenticated)
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  const user = await currentUser();

  const showTutorial = user?.publicMetadata?.onboarded;
  
  return (
    <Suspense fallback={<Skeleton />}>
      <LearnPageContent showTutorial={!showTutorial}></LearnPageContent>
    </Suspense>
  );
};

export default LearnPage;
