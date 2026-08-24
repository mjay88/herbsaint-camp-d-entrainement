"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  //isClient indicates a boundary to the client. It doesn't mean that this is not rendered on the server. So it's just not a server component. But this can cause hydration errors because of the way we are controlling our models with zustand.
  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/waiter-falling.svg"
              alt="Mascot"
              height={100}
              width={100}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            You ran out of hearts!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You can gain more hearts by practicing lessons you have already
            completed
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <div className="flex flex-col gap-y-4 w-full outline-none">
            {/* <Button
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={close}
                >
                  Keep learning
                </Button> */}

            <Button
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              Go back to lessons
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
