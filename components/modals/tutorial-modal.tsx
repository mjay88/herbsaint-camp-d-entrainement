"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "../ui/button";
import { useTutorialModal } from "@/store/use-tutorial-modal";

export const TutorialModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useTutorialModal();

  /**
   *
   * Since Next.js renders components twice, first on the server and again on the client, having different outputs on both the client and the server will result in hydration errors. When this component is first rendered on the client it will set isClient to true. The if check prevents hydration errors by preventing the component from rendering on the client side if it hasn't been rendered on the server side. This is a Zustand work around to prevent hydration errors.
   *
   */
  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[80vw] max-w-[80vw]" >
        <DialogHeader>
          <Carousel>
            <CarouselContent>
              <CarouselItem className="h-[80vh]">1</CarouselItem>
              <CarouselItem>2</CarouselItem>
              <CarouselItem>3</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <div className="flex flex-col gap-y-4 w-full outline-none">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={close}
            >
              Exit Tutorial
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
