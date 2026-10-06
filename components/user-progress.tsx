import Link from "next/link";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

import { courses } from "@/db/schema";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

type Props = {
  
  points: number;
  percentage: number | null;
};

export const UserProgress = ({  points, percentage }: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex flex-col justify-evenly gap-y-2 w-full">
        <p className="text-neutral-700 text-sm font-bold">Course Progress</p>
        <Progress value={percentage} className="h-2" />
      </div>

      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500 flex items-end">
          <Image
            src="/points.svg"
            height={28}
            width={28}
            alt="Points"
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
    </div>
  );
};
