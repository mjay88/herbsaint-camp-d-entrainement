import Skeleton from "@/components/ui/skeleton";
import { LessonPageContent } from "./lesson-page-content";
import { Suspense } from "react";
const LessonPage = async () => {

  return (
   <Suspense fallback={<Skeleton />}>
    <LessonPageContent />
   </Suspense>
  );
};

export default LessonPage;
