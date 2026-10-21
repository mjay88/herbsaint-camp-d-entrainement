"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
  height?: number;
  width?: number;
};

export const SidebarItem = ({ label, iconSrc, href, height, width }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      nativeButton={false}
      render={
        <Link href={href}>
          <Image
            src={iconSrc}
            alt={label}
            className="mr-5"
            height={height ?? 32}
            width={width ?? 32}
          />
          {label}
        </Link>
      }
    >
      {" "}
    </Button>
  );
};
