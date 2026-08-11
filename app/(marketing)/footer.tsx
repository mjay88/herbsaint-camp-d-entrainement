import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button variant="ghost" className="flex-1">
          <Image
            src="/gumbo-circle.svg"
            alt="Bowl of Gumbo"
            height={58}
            width={58}
            className="mr-4 rounded-md"
          />
        </Button>
        <Button variant="ghost" className="flex-1">
          <Image
            src="/wine-red.svg"
            alt="Red wine Bottle"
            height={78}
            width={78}
            className="mr-4 rounded-md"
          />
        </Button>
        <Button variant="ghost" className="flex-1">
          <Image
            src="/spaghetti.svg"
            alt="Spaghetti"
            height={58}
            width={58}
            className="mr-4 rounded-md"
          />
        </Button>
        <Button variant="ghost" className="flex-1">
          <Image
            src="/wholer-ham.svg"
            alt="Ham Bone"
            height={58}
            width={58}
            className="mr-4 rounded-md"
          />
        </Button>
        <Button variant="ghost" className="flex-1">
          <Image
            src="/glass-wine.svg"
            alt="Wine Glass"
            height={58}
            width={58}
            className="mr-4 rounded-md"
          />
        </Button>
      </div>
    </footer>
  );
};
