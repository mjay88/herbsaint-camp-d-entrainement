import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className="w-full rounded-xl bg-orange-500 p-5 text-white flex items-center justify-between">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
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
