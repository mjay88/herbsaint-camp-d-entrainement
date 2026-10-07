import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

type Props = {
  points?: number;
  percentage?: number | null;
};

export const MobileUserProgress = ({  points, percentage }: Props) => {
  return (
    <div className="flex items-center justify-end gap-x-2 w-full">
        
        <Button variant="ghost" className="text-lg flex">
              {points}
          <Image
            src="/points.svg"
            height={25}
            width={25}
            alt="Points"
            className="-ml-1.5"
          />
        
        </Button>

      <Link href="/shop">
        <Button variant="ghost" className="text-lg flex">
               {percentage}
          <Image
            src="/percent.svg"
            height={25}
            width={25}
            alt="Points"
            className="-ml-1.5"
          />
       
        </Button>
      </Link>
    </div>
  );
};
