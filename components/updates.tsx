"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { updates } from "@/constants";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const Updates = () => {
  const [open, setOpen] = useState(true);
  return (
   
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="border-2 rounded-xl p-4"
      >
        <div className="flex items-center justify-between w-full p-1">
          <h3 className="font-bold text-lg">Updates</h3>
          <div>
            <Link href="/updates">
              <Button size="sm" variant="primaryOutline">
                View all
              </Button>
            </Link>
          <CollapsibleTrigger
            render={
              <Button size="sm" variant="primaryOutline">
                {open ?  "View Less" : "View More"}
              </Button>
            }
          >
            View Less
          </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent className="">
          <ul className="w-full space-y-4">
            {/* TODO: Make sure updates are sorted in query */}
            {[...updates].reverse().map((update) => {
              return (
                <div
                  className="flex items-center w-full pb-4 gap-x-3"
                  key={update.title}
                >
                  <Image src="/check.svg" alt="Points" width={40} height={40} />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-sm line-clamp-2">
                      <span className="italic pr-1">{update.date}</span>
                      <span className="font-bold"> {update.title} </span> :{" "}
                      <span className=""> {update.description} </span>
                    </p>
                    <p className="text-neutral-700 text-sm font-bold overflow-hidden"></p>
                  </div>
                </div>
              );
            })}
          </ul>
        </CollapsibleContent>
      </Collapsible>
  );
};
