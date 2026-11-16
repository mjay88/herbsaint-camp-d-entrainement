"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useKey, useMedia } from "react-use";

type Props = {
 onNext: () => void;
  onPrevious: () => void;
  deckCompleted?: boolean;
};

export const Footer = ({onNext, onPrevious, deckCompleted }: Props) => {
  useKey("ArrowLeft", onPrevious, {}, [onPrevious]);
  useKey("ArrowRight", onNext, {}, [onNext]);
 

  const isMobile = useMedia("(max-width: 1024px", true); //TODO: set to true for development. Phone usage will probably be primary use case so may need to set default value to false when done with development.
  return (
    <footer
      className={cn(
        "h-[100px] min-h-[75px] lg:-h[140px]",
       
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        <Button variant="secondary" size={isMobile ? "sm" : "lg"}
        onClick={onPrevious}
        >
         {deckCompleted === undefined ? "Previous Card" : "Start Over"}
        </Button>

        <Button
          variant="secondary"
          className="ml-auto"
          size={isMobile ? "sm" : "lg"}
          onClick={onNext}

        >
        {deckCompleted === undefined ? "Next Card" : "Back To Flashcards"}
        </Button>
      </div>
    </footer>
  );
};
