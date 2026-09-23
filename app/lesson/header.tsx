import { Progress} from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
import {  X } from "lucide-react";
import Image from "next/image";
type Props = {
  hearts: number;
  percentage: number;
};

export const Header = ({
  hearts,
  percentage,
}: Props) => {
  const {open} = useExitModal();
  return (
    <header className="max-w-[1140px] min-h-14 lg:min-h-24 pt-[10px] px-10 flex gap-x-7 items-center mx-auto w-full">
      <X
        onClick={open} 
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} className="w-full">
      </Progress>
      <div className="text-rose-500 flex items-center font-bold">
        {/* //TODO: DELETE ON remove-hearts branch after tag */}
        {/* <Image
          src="/heart.svg"
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        /> 
        {hearts}
        */}
      </div>
    </header>
  );
};
