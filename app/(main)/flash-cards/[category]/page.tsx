import { Suspense } from "react";
import Skeleton from "@/components/ui/skeleton";
import { CategoryContent } from "./category-content";

const FlashCardCategoryPage = async ({ params }: PageProps<"/flash-cards/[category]">) => {
  return (
    <Suspense fallback={<Skeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
};

export default FlashCardCategoryPage;