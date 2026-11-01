"use client";

import Image from "next/image";
import { useMedia } from "react-use";

type Props = {
  children: React.ReactNode;
};

export const LearnFeedWrapper = ({ children }: Props) => {
  const isMobile = useMedia("(max-width: 425px", true);
  return (
    <div className="flex-1 relative lg:top-0 mb-40">
      {/* Mascot */}
      <Image
        src="/mascot/mascot-greeting.svg"
        height={isMobile ? 120 : 175}
        width={isMobile ? 120 : 175}
        alt="Mascot"
        className="absolute animate-bounce-slow-alt"
        style={{
          left: isMobile ? "0%" : "3%",
          top: isMobile ? "5.5%" : "5.9%",
        }}
      />
      {/* Gumbo */}
      <Image
        src="/menu-drawings/gumbo.webp"
        height={isMobile ? 100 : 175}
        width={isMobile ? 100 : 175}
        alt="Gumbo"
        className="absolute"
        style={{
          right: isMobile ? "3%" : "8%",
          top: isMobile ? "5.5%" : "7%",
        }}
      />
      {/* Table */}
      <Image
        src="/menu-drawings/table-circle.webp"
        height={isMobile ? 125 : 200}
        width={isMobile ? 125 : 200}
        alt="Round Table"
        className="absolute animate-back-and-forth"
        style={{
          right: isMobile ? "9%" : "25%",
          top: isMobile ? "13%" : "14%",
        }}
      />
      {/* Out of Office */}
      <Image
        src="/menu-drawings/out-of-office.webp"
        height={isMobile ? 100 : 150}
        width={isMobile ? 100 : 150}
        alt="Cocktail"
        className="absolute -rotate-7"
        style={{
          right: isMobile ? "75%" : "75%",
          top: isMobile ? "16%" : "17%",
        }}
      />
      {/* BB Tart */}
      <Image
        src="/menu-drawings/banana-brown-butter-tart.webp"
        height={isMobile ? 130 : 165}
        width={isMobile ? 130 : 165}
        alt="Dessert"
        className="absolute animate-bounce-slow-alt"
        style={{
          left: isMobile ? "7%" : "25%",
          top: isMobile ? "26%" : "24.5%",
        }}
      />
      {/* Ice Cream */}
      <Image
        src="/menu-drawings/ice-cream.webp"
        height={isMobile ? 100 : 165}
        width={isMobile ? 100 : 165}
        alt="Dessert"
        className="absolute"
        style={{
          right: isMobile ? "0%" : "10%",
          top: isMobile ? "23%" : "22%",
        }}
      />
      {/* Mascot Thumbs Up */}
      <Image
        src="/mascot/mascot-thumbs-up.webp"
        height={isMobile ? 120 : 175}
        width={isMobile ? 120 : 175}
        alt="Mascot"
        className="absolute animate-bounce-slow-alt -scale-x-100"
        style={{
          right: isMobile ? "-3%" : "10%",
          top: isMobile ? "33.5%" : "33.9%",
        }}
      />
      {/* Square Table */}
      <Image
        src="/menu-drawings/table-square.webp"
        height={isMobile ? 90 : 175}
        width={isMobile ? 90 : 175}
        alt="Mascot"
        className="absolute"
        style={{
          left: isMobile ? "0%" : "10%",
          top: isMobile ? "33%" : "33.9%",
        }}
      />
      {/* Spaghetti */}
      <Image
        src="/menu-drawings/spaghetti.webp"
        height={isMobile ? 120 : 165}
        width={isMobile ? 120 : 165}
        alt="Spaghetti"
        className="absolute"
        style={{
          right: isMobile ? "7%" : "27%",
          top: isMobile ? "38.5%" : "40.9%",
        }}
      />
      {/* White Bottle*/}
      <Image
        src="/menu-drawings/wine-bottle-white.webp"
        height={isMobile ? 155 : 205}
        width={isMobile ? 155 : 205}
        alt="Wine Bottle"
        className="absolute animate-bounce-slow-alt rotate-9"
        style={{
          right: isMobile ? "0%" : "7%",
          top: isMobile ? "44.5%" : "46.9%",
        }}
      />

      {/* Fried Green Tomatoes */}
      <Image
        src="/menu-drawings/fgt.webp"
        height={isMobile ? 140 : 205}
        width={isMobile ? 140 : 205}
        alt="Fried Green Tomatos"
        className="absolute"
        style={{
          right: isMobile ? "55%" : "70%",
          top: isMobile ? "56.5%" : "47.9%",
        }}
      />
      {/* Rose Bottle */}
      <Image
        src="/menu-drawings/wine-bottle-rose.webp"
        height={isMobile ? 175 : 205}
        width={isMobile ? 175 : 205}
        alt="Wine Bottle"
        className="absolute animate-back-and-forth"
        style={{
          right: isMobile ? "60%" : "60%",
          top: isMobile ? "47.5%" : "53.9%",
        }}
      />
      {/* Old Fashioned */}
      <Image
        src="/menu-drawings/old-fashioned.webp"
        height={isMobile ? 135 : 165}
        width={isMobile ? 135 : 165}
        alt="Gumbo"
        className="absolute animate-bounce-slow-alt"
        style={{
           left: isMobile ? "0%" : "7%",
          top: isMobile ? "69%" : "72%",
        }}
      />
      {/* Martini */}
      <Image
        src="/menu-drawings/martini.webp"
        height={isMobile ? 135 : 165}
        width={isMobile ? 135 : 165}
        alt="Martini"
        className="absolute rotate-5"
        style={{
          right: isMobile ? "0%" : "17%",
          top: isMobile ? "71%" : "70%",
        }}
      />
      {/* Table Circle */}
      <Image
        src="/menu-drawings/table-circle.webp"
        height={isMobile ? 125 : 205}
        width={isMobile ? 125 : 205}
        alt="Gumbo"
        className="absolute animate-back-and-forth"
        style={{
          right: isMobile ? "2%" : "7%",
          top: isMobile ? "64.5%" : "60.5%",
        }}
      />
      {/* Wine Bottle */}
      <Image
        src="/menu-drawings/wine-bottles.webp"
        height={isMobile ? 125 : 200}
        width={isMobile ? 125 : 200}
        alt="Gumbo"
        className="absolute animate-back-and-forth"
        style={{
          right: isMobile ? "9%" : "30%",
          top: isMobile ? "77.5%" : "75.5%",
        }}
      />
      {/* Table Square */}
      <Image
        src="/menu-drawings/table-square.webp"
        height={isMobile ? 120 : 165}
        width={isMobile ? 120 : 165}
        alt="Table"
        className="absolute"
        style={{
          right: isMobile ? "0%" : "12%",
          top: isMobile ? "84.5%" : "84.9%",
        }}
      />
      {/* Tuna Tartare */}
      <Image
        src="/menu-drawings/tuna-tartare.webp"
        height={isMobile ? 120 : 165}
        width={isMobile ? 120 : 165}
        alt="Tuna Tartare"
        className="absolute animate-bounce-slow-alt"
        style={{
          left: isMobile ? "0%" : "12%",
          top: isMobile ? "84.5%" : "84.9%",
        }}
      />
      {/* Duck Leg */}
      <Image
        src="/menu-drawings/duck-leg.webp"
        height={isMobile ? 135 : 175}
        width={isMobile ? 135 : 175}
        alt="Gumbo"
        className="absolute animate-bounce-slow-alt"
        style={{
          right: isMobile ? "10%" : "25%",
          top: isMobile ? "91.5%" : "91.9%",
        }}
      />
      <Image
        src="/menu-drawings/bar-and-bottle-shelf.webp"
        height={isMobile ? 300 : 400}
        width={isMobile ? 300 : 400}
        alt="Gumbo"
        className="absolute animate-back-and-forth"
        style={{
          left: isMobile ? "5%" : "3%",
          top: isMobile ? "99.5%" : "98.5%",
        }}
      />
      {children}
    </div>
  );
};
