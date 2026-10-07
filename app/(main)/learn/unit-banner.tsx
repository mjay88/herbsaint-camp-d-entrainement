import { Button } from "@/components/ui/button";
import { ArrowLeft, NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  return (
    // <div className="w-full rounded-xl bg-orange-500 p-5 text-white flex items-center justify-between">
    //   <div className="space-y-2.5">
    //     <h3 className="text-2xl font-bold">{title}</h3>
    //     <p className="text-lg">{description}</p>
    //   </div>

    //   <Button
    //     nativeButton={false}
    //     size="xxl"
    //     variant="secondary"
    //     className="hidden xl:flex border-2 border-b-4 active:border-b-2 bg-orange-400"
    //     render={
    //       //TODO: Send this link somewhere useful
    //       <Link href="/lesson">
    //         <NotebookText className="size-10" />
    //       </Link>
    //     }
    //   ></Button>
    // </div>
    <div className="bg-white p-.5 pt-4 flex items-center justify-evenly mb-7 text-neutral-400 z-10">
      {/* <Link href="/courses">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
        </Button>
      </Link> */}
      <div className="border-2 flex-1 mx-3" />
      <h1 className="font-bold text-base">{title}</h1>
       <div className="border-2 flex-1 mx-3" />
      {/* since we are using justify between, add an empty div to split the space evenly 3 ways and put the h1 perfectly centered */}
      {/* <div /> */}
    </div>
  );
};
