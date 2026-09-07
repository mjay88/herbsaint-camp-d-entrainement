"use client";
import Image from "next/image";
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
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

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
            <Image src="/heart.svg" alt="Mascot" height={100} width={100} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Practice Lesson
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Use practice lessons to regain hearts and points. You cannot loose
            hearts or points in practice lessons.
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
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
