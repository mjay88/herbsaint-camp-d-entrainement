

import { Suspense } from "react";
import { MainContent } from "./main-content";
import Skeleton from "@/components/ui/skeleton";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
 
  return (
      <Suspense fallback={<Skeleton />}>
    <MainContent>
      {children}
    </MainContent>
   </Suspense>
  );
};

export default MainLayout;
