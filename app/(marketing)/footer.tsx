import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button variant="ghost" className="flex-1">
          <Image
            src="/menu-drawings/gumbo.webp"
            alt="Bowl of Gumbo"
            height={58}
            width={58}
            className="mr-4 rounded-md"
          />
        </Button>
        <Button variant="ghost" className="flex-1">
          <Image
            src="/menu-drawings/wine-bottle-red.webp"
            alt="Red wine Bottle"
            height={58}
            width={58}
            className="mr-4 rounded-md"
          />
        </Button>
        <Button variant="ghost" className="flex-1">
          <Image
            src="/menu-drawings/spaghetti.webp"
            alt="Spaghetti"
            height={58}
            width={58}
            className="mr-4 rounded-md"
          />
        </Button>
        <Button variant="ghost" className="flex-1">
          <Image
             src="/menu-drawings/duck-leg.webp"
            alt="Duck Leg"
            height={58}
            width={58}
            className="mr-4 rounded-md"
          />
        </Button>
        <Button variant="ghost" className="flex-1">
          <Image
           src="/menu-drawings/martini.webp"
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
