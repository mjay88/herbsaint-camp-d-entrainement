"use client";
import { Deck } from "../deck";
import { cards, userSavedCards, userSavedWineCards, wineCards } from "@/db/schema";

type Props = {
    cards:  (typeof cards.$inferSelect | typeof wineCards.$inferSelect)[] | [];
    savedCards:   (typeof cards.$inferSelect | typeof wineCards.$inferSelect)[] | [] | null;

}
export const CategoryClient = ({ cards, savedCards }: Props) => {


  return (
    <div className="flex flex-col h-full w-full">
     
      <Deck initialCards={cards} savedCards={savedCards} />
    </div>
  );
};
