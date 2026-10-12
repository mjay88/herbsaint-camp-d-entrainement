"use client";

import Image from "next/image";

type Props = {
  date: string;
  title: string;
  description: string;
};

export const UpdatesCard = ({ date, title, description }: Props) => {
  return (
    <div className="flex flex-col items-center w-full gap-x-4 border-2 rounded-xl">
      {/* Header */}
      <div className="relative w-full flex items-center border-b-2 p-3">
        <div className="absolute text-xs top-0 right-0 p-1">{date}</div>
        <Image src="/check.svg" alt="Check Mark" height={60} width={60} />
        <div className="flex-1 p-3 ">{title}</div>
      </div>
      <div className="flex p-3">
        <div className="flex-1 mt-3">
          <p className="text-neutral-700 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
