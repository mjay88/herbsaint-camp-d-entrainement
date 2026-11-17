import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useMedia } from "react-use";
import { ShuffleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isCardSaved?: boolean;
  toggleSavedCard?: () => void;
  pending: boolean;
  isInShuffleMode: boolean;
  setIsInShuffleMode: Dispatch<SetStateAction<boolean>>;
  shuffleDeck: () => void;
};

export const Header = ({
  isCardSaved,
  toggleSavedCard,
  pending,
  shuffleDeck,
}: Props) => {
  const isMobile = useMedia("(max-width: 1024px", true);
  return (
    <header className="pt-2 px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <div className="flex w-full items-center justify-between font-bold">
        <Button
          variant="secondary"
          className=""
          size={isMobile ? "sm" : "lg"}
          nativeButton={false}
          render={<Link href="/flash-cards" />}
        >
          Exit
        </Button>
        <div className="flex">
          <Button
            disabled={pending}
            onClick={() => {
              shuffleDeck();
            }}
            variant="inherit"
            className=""
            size={"sm"}
          >
            <ShuffleIcon className={cn("size-8",
            "text-neutral-500 stroke-neutral-500"


            )}></ShuffleIcon>
          </Button>

          <Button
            disabled={pending}
            onClick={toggleSavedCard}
            variant="inherit"
            className=""
            size={"sm"}
          >
            {isCardSaved ? (
              <Image src="/heart.svg" alt="Heart" height={40} width={40} />
            ) : (
              <Image
                src="/heart-empty.svg"
                alt="Heart"
                height={40}
                width={40}
              />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
