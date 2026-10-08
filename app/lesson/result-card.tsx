import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  value?: number | null;
  variant: "points" | "percentage";
};

export const ResultCard = ({ value, variant }: Props) => {
  const imageSrc = variant === "percentage" ? "/percent.svg" : "/points.svg";

  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        "bg-orange-400 border-orange-400",
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-center items-center p-1.5 h-10 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          "bg-orange-400",
        )}
      >
        {variant === "percentage" ? "Course Completed" : "Total XP"}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",

          "text-orange-400",
        )}
      >
         {variant === "percentage" && value}
        <Image
          alt="Icon"
          src={imageSrc}
          height={30}
          width={30}
          className={cn("mr-1.5",
          variant === "points" && "mr-1.5",
          variant === "percentage" && "ml-1.5",
          )}
        />
        {variant === "points" && value}
      </div>
    </div>
  );
};
