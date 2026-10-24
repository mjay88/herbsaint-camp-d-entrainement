import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { connection } from "next/server";

type Props = {
  className?: string;
};

export const Sidebar = async ({ className }: Props) => {
   //connection stops prerendering. Subsequent code only runs at request time instead of trying to prerender.
   await connection()
   const user = await currentUser();
   const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className,
      )}
    >
      <Link href="/courses">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-orange-500 tracking-wide">
            Herbsaint
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />

        <SidebarItem
          label="Updates"
          href="/updates"
          iconSrc="/megaphone.svg"
        />
        <SidebarItem label="Wine Study" href="/wine-study" iconSrc="/wine/red-wine-bottle.webp" />
        <SidebarItem label="Bodega" href="/bodega" iconSrc="/shop.svg" />
        {isAdmin && <SidebarItem label="User Progress" href="/user-progress" iconSrc="/percent.svg" height={24} width={24}/>}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </div>
  );
};
