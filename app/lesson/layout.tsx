import { LessonContent } from "./lesson-content";
import { Suspense } from "react";
import Skeleton from "@/components/ui/skeleton";

type Props = {
  children: React.ReactNode;
};

const LessonLayout = async ({ children }: Props) => {
  return (
    <Suspense fallback={<Skeleton />}>
      <LessonContent>{children}</LessonContent>
    </Suspense>
  );
};

export default LessonLayout;
