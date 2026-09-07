import { Suspense } from "react";
import { LearnPageContent } from "./learn-page-content";
import Skeleton from "@/components/ui/skeleton";


const LearnPage = async () => {
 
  return (
      <Suspense fallback={<Skeleton />}>
        <LearnPageContent></LearnPageContent>
      </Suspense>

  );
};

export default LearnPage;
