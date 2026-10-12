"use client";

import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  date: string;
  grape: string;
  producer: string;
  region: string;
  price: number;
  color: string;
  description: string;
};

export const WineItem = ({
  date,
  grape,
  producer,
  region,
  price,
  color,
  description,
}: Props) => {
  const [pending, startTransition] = useTransition();

  const Icon =
    color === "white"
      ? "/wine/white-wine-bottle.webp"
      : color === "red"
        ? "/wine/red-wine-bottle.webp"
        : "/wine/rose-wine-bottle.webp";

  return (
    <div className="flex flex-col items-center w-full gap-x-4 border-2 rounded-xl">
      {/* Header */}
      <div className="relative w-full flex items-center border-b-2 p-3">
        <div className="absolute text-xs top-0 right-0 p-1">{date}</div>
        <Image src={Icon} alt="Bottle of Wine" height={60} width={60}  />
        <div className="flex-1 p-3 ">
          <span className="font-semibold">{grape}</span> {producer} <span className="underline">{region}</span> {price}
        </div>
      </div>
      <div className="flex p-3">
        <div className="flex-1 mt-3">
          <p className="text-neutral-700 text-base leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};
