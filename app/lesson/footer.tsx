"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useKey, useMedia } from "react-use";

//TODO: Add logic for when challenge has status of "CIRRICULUM". Should be able to just click next.
type Props = {
  onCheck: () => void;
  //TODO CURRICULUM: if status is curriculum, make next button available
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
  isCurriculum?: boolean;
};

export const Footer = ({ onCheck, status, disabled, lessonId, isCurriculum }: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px", true); //TODO: set to true for development. Phone usage will probably be primary use case so may need to set default value to false when done with development.
  return (
    <footer
      className={cn(
        "lg:-h[140px] h-[100px] border-t-2 ",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100",
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Nicely done!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Try again.
          </div>
        )}
        {status === "completed" && (
          <Button
            variant="default"
            size={isMobile ? "sm" : "lg"}
            // onClick={() => router.push(`/lesson/${lessonId}`)}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)} //TODO: Need to make sure that this triggers us mount so practice modal opens
          >
            Practice Again
          </Button>
        )}
        {status === "completed" && (
          <Button
            variant="secondary"
            className="ml-auto"
            size={isMobile ? "sm" : "lg"}
            onClick={() => (window.location.href = `/learn`)}//TODO: oncheck uses router.push which does not load new lesson, so second lesson automattically loadeds as completed. 
          >
            Continue
          </Button>
        )}
        {status !== "completed" && (
          <Button
            disabled={disabled}
            className="ml-auto"
            onClick={onCheck}
            size={isMobile ? "sm" : "lg"}
            variant={status === "wrong" ? "danger" : "secondary"}
          > 
            
            {(status === "none" && !isCurriculum) && "Check"}
            {(status === "correct" || isCurriculum) && "Next"}
            {status === "wrong" && "Retry"}
          </Button>
        )}
      </div>
    </footer>
  );
};
