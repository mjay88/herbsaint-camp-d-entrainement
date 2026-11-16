"use client";
import { Deck } from "../deck";
import { cards, wineCards } from "@/db/schema";

type Props = {
    cards:  (typeof cards.$inferSelect | typeof wineCards.$inferSelect)[] | [];

}
export const CategoryClient = ({ cards }: Props) => {


  return (
    <div className="flex flex-col h-full w-full">
     
      <Deck cards={cards} />
    </div>
  );
};
