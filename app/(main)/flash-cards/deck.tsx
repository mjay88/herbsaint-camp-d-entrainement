import { cards, wineCards } from "@/db/schema";
import { useState } from "react";
import { ActiveCard } from "./activeCard";
import { Footer } from "./footer";

type Props = {
  cards: (typeof cards.$inferSelect | typeof wineCards.$inferSelect)[] | [];
};

export const Deck = ({ cards }: Props) => {
  //need action to save card

  //TODO: eventually need to optimize to track current card somehow
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDescriptionShowing, setIsDescriptionShowing] = useState<boolean>(
    false
  );

  const onNext = () => {
    //TODO: handle edge case of end of deck
    setCurrentIndex(() => currentIndex + 1);
  };

  const onPrevious = () => {
    //TODO: handle edge case of first card
    setCurrentIndex(() => currentIndex - 1);
  };

  const currentCard = cards[currentIndex];

  return (
    <>
      <div className="flex-1 my-4">
       

            <ActiveCard card={currentCard} isDescriptionShowing={isDescriptionShowing}
            setIsDescriptionShowing={setIsDescriptionShowing}
             />
           
      </div>
      <Footer onNext={onNext} onPrevious={onPrevious} />
    </>
  );
};
