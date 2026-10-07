import { Button } from "@/components/ui/button";
import { ArrowLeft, NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    // <div className="sticky bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
    //   <Link href="/courses">
    //     <Button variant="ghost" size="sm">
    //       <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
    //     </Button>
    //   </Link>
    //   <h1 className="font-bold text-lg">{title}</h1>
    //   {/* since we are using justify between, add an empty div to split the space evenly 3 ways and put the h1 perfectly centered */}
    //   <div />
    // </div>
    <div className="w-full rounded-xl bg-orange-500 p-5 text-white flex items-center justify-between z-50">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      <Button
        nativeButton={false}
        size="xxl"
        variant="secondary"
        className="hidden xl:flex border-2 border-b-4 active:border-b-2 bg-orange-400"
        render={
          //TODO: Send this link somewhere useful
          <Link href="/lesson">
            <NotebookText className="size-10" />
          </Link>
        }
      ></Button>
    </div>
  );
};
