"use client";

import Image from "next/image";
import { useMedia } from "react-use";

type Props = {
  children: React.ReactNode;
};

export const LearnFeedWrapper = ({ children }: Props) => {
  const isMobile = useMedia("(max-width: 425px", true);
  return (
    <div className="flex-1 relative lg:top-0 pb-10"
   
    >
      <Image
        src="/mascot/mascot-greeting.svg"
        height={isMobile ? 120 : 150}
        width={isMobile ? 120 : 150}
        alt="Gumbo"
        className="absolute animate-bounce-slow-alt"
        style={{
          left: isMobile ? "0%" : "3%",
          top: isMobile ? "4.5%" : "5.9%",
        }}
      />
      <Image
        src="/menu-drawings/table-circle.webp"
        height={isMobile ? 125 : 175}
        width={isMobile ? 125 : 175}
        alt="Spaghetti"
        className="absolute animate-back-and-forth"
        style={{
          right: isMobile ? "9%" : "5%",
          top: isMobile ? "13%" : "12%",
        }}
      />
      <Image
        src="/menu-drawings/banana-brown-butter-tart.webp"
        height={isMobile ? 110 : 150}
        width={isMobile ? 110 : 150}
        alt="Gumbo"
        className="absolute animate-bounce-slow-alt"
        style={{
           left: isMobile ? "5%" : "8%",
          top: isMobile ? "25.5%" : "25.5%",
        }}
      />
       <Image
        src="/menu-drawings/spaghetti.webp"
        height={isMobile ? 120 : 145}
        width={isMobile ? 120 : 145}
        alt="Gumbo"
        className="absolute animate-bounce-slow-alt"
        style={{
          right: isMobile ? "3%" : "7%",
          top: isMobile ? "38.5%" : "38.9%",
        }}
      />
       <Image
        src="/menu-drawings/wine-bottle-rose.webp"
        height={isMobile ? 175 : 205}
        width={isMobile ? 175 : 205}
        alt="Gumbo"
        className="absolute animate-back-and-forth"
        style={{
          right: isMobile ? "60%" : "60%",
          top: isMobile ? "47.5%" : "53.9%",
        }}
      />
       <Image
        src="/menu-drawings/old-fashioned.webp"
        height={isMobile ? 115 : 165}
        width={isMobile ? 115 : 165}
        alt="Gumbo"
        className="absolute animate-back-and-forth"
        style={{
          right: isMobile ? "62%" : "70%",
          top: isMobile ? "68.5%" : "68.9%",
        }}
      />
       <Image
        src="/menu-drawings/table-square.webp"
        height={isMobile ? 100 : 165}
        width={isMobile ? 100 : 165}
        alt="Gumbo"
        className="absolute animate-back-and-forth"
        style={{
          left: isMobile ? "67%" : "70%",
          top: isMobile ? "64.5%" : "63.5%",
        }}
      />
       <Image
        src="/menu-drawings/wine-bottles.webp"
        height={isMobile ? 100 : 165}
        width={isMobile ? 100 : 165}
        alt="Gumbo"
        className="absolute animate-back-and-forth"
        style={{
          left: isMobile ? "62%" : "64%",
          top: isMobile ? "77.5%" : "75.5%",
        }}
      />
       <Image
        src="/menu-drawings/duck-leg.webp"
        height={isMobile ? 120 : 150}
        width={isMobile ? 120 : 150}
        alt="Gumbo"
        className="absolute animate-bounce-slow-alt"
        style={{
          right: isMobile ? "10%" : "12%",
          top: isMobile ? "90.5%" : "87.9%",
        }}
      />
      {children}
    </div>
  );
};
