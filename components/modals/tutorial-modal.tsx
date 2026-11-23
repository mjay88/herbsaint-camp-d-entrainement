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
  const { isOpen, close, handleClose } = useTutorialModal();

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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[80vw] max-w-[80vw]">
        <DialogHeader>
          <Carousel>
            <CarouselContent>
              <CarouselItem className="h-[80vh] flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-around items-center">
                 <Image 
                 src="/mascot/mascot-greeting.svg"
                 width={300}
                 height={300}
                 alt="Welcome Mascot"
                 />
                  <p className="text-center text-lg font-semibold">
                     Welcome to the LRG! Let the new hire training begin!
                    </p>
                </div>
              </CarouselItem>
              <CarouselItem className="h-[80vh] flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-around items-center">
                  <video
                    src="gifs/tutorial-1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full object-cover p-1 rounded-xl"
                  />
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-center text-lg font-semibold">
                      Once you have signed up, navigate to each lesson
                      sequentially.
                    </p>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="h-[80vh] flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-around items-center">
                  <video
                    src="gifs/tutorial-2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full object-cover p-1 rounded-xl"
                  />
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-center text-lg font-semibold">
                      Click through each lesson, answering the questions correctly until you reach the end.
                    </p>
                   
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="h-[80vh] flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-around items-center">
                  <video
                    src="gifs/tutorial-3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-9/10 h-9/10 object-fit p-1 rounded-xl"
                  />
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-center text-lg font-semibold">
                      Navigate to the FLASH CARDS section to get extra practice on menu items.
                    </p>
                    <p className="text-center text-lg font-semibold">
                      Like cards are added to the SAVED deck.
                    </p>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="h-[80vh] flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-around items-center">
                  <video
                    src="gifs/tutorial-4.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-fit p-1 rounded-xl"
                  />
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-center text-lg font-semibold">
                      Navigate to the LEADERBOARD section to check out your peers&apos; scores.
                    </p>
                  
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="h-[80vh] flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-around items-center">
                  <video
                    src="gifs/tutorial-5.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-fit p-1 rounded-xl"
                  />
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-center text-lg font-semibold">
                      Additional resources can be found in the BODEGA section.
                    </p>
                  
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="h-[80vh] flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-around items-center">
                 <Image 
                 src="/mascot/mascot-thumbs-up.webp"
                 width={300}
                 height={300}
                 alt="Welcome Mascot"
                 />
                   <p className="text-center text-lg font-semibold">
                     We hope you have fun learning! If you have any questions, please reach out to your immediate supervisor.
                    </p>
                </div>
              </CarouselItem>
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
              onClick={handleClose}
            >
              Exit Tutorial
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
