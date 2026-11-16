import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  onClick: (title: string) => void;
};

export const CardBack = ({ title, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(title)}
      className={cn(
        "h-full border-2 rounded-3xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center p-3 pb-6",
        "aspect-[5/7]",
        "bg-[url(/orange-card.webp)] bg-cover"
      )}
    >
   

      <p className="text-neutral-800 text-xl text-center font-extrabold mt-1 bg-white p-2.5 rounded-3xl w-7/8">{title}</p>
    </div>
  );
};
