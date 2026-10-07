import { MobileSidebar } from "./mobile-sidebar";
import { MobileUserProgress } from "./mobile-user-progress";

type Props = {
  points?: number;
  percentage?: number | null;
}


export const MobileHeader = ({points, percentage}: Props) => {
  return (
    <nav className="lg:hidden px-2 h-[50px] flex items-center bg-white border-b fixed top-0 w-full z-50">
        <MobileSidebar /> 
        <MobileUserProgress points={points} percentage={percentage} />
    </nav>
  );
};
