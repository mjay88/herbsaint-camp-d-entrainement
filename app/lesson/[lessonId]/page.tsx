import { Suspense } from "react";
import Skeleton from "@/components/ui/skeleton";
import { LessonIdContent } from "./lessonId-content";

const LessonIdPage = async ({ params }: PageProps<"/lesson/[lessonId]">) => {
  return (
    <Suspense fallback={<Skeleton />}>
      <LessonIdContent params={params} />
    </Suspense>
  );
};

export default LessonIdPage;
