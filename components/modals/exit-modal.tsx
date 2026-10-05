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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image 
            src="/mascot-begging.svg"
            alt="Mascot"
            height={100}
            width={100}
            />
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
