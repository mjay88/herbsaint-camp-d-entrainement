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
import { useExitModal } from "@/store/use-exit-modal";

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  //isClient indicates a boundary to the client. It doesn't mean that this is not rendered on the server. So it's just not a server component. But this can cause hydration errors because of the way we are controlling our models with zustand.
  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2"></div>
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait, don&apos;t go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You&apos;re about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
     
              <div className="flex flex-col gap-y-4 w-full outline-none">
                <Button
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={close}
                >
                  Keep learning
                </Button>

                <Button
                  variant="dangerOutline"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    close();
                    router.push("/learn");
                  }}
                >
                  End Session
                </Button>
              </div>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
