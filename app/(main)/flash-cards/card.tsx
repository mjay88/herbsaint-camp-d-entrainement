import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  category: string;
  onClick: (category: string) => void;
};

export const Card = ({ category, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(category)}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[150px]",
      )}
    >
      <div className="min-[24px] w-full flex items-center justify-end"></div>

      <p className="text-neutral-700 text-center font-bold mt-3">{category}</p>
    </div>
  );
};
