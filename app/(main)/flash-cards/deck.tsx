import { cards, wineCards } from "@/db/schema";
import { useState } from "react";
import { ActiveCard } from "./activeCard";
import { Footer } from "./footer";
import Confetti from "react-confetti";
import Image from "next/image";
import { useAudio, useWindowSize } from "react-use";
type Props = {
  cards: (typeof cards.$inferSelect | typeof wineCards.$inferSelect)[] | [];
};

export const Deck = ({ cards }: Props) => {
  //need action to save card

  //TODO: eventually need to optimize to track current card somehow
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDescriptionShowing, setIsDescriptionShowing] =
    useState<boolean>(false);
  //   const router = useRouter();

  const isFirstCard = currentIndex === 0;
  const currentCard = cards[currentIndex];
  const deckCompleted = !currentCard;
  const { width, height } = useWindowSize();
  const [finishAudio, _f, finishControls] = useAudio({ src: "/finish.mp3" });
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });
  const onNext = () => {
    if (deckCompleted) {
      window.location.href = `/flash-cards`;
      //TODO: opted to go with with window.location.href = `/flash-cards`) because I couldn't get it to refresh when navigating to the previous deck
      //Is this possibly development only behavior?
      //   setCurrentIndex(0);
      //   router.push("/flash-cards");
    }
    setCurrentIndex(() => currentIndex + 1);
  };

  const onPrevious = () => {
    //TODO: handle edge case of first card
    if (isFirstCard) return null;
    if (deckCompleted) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(() => currentIndex - 1);
    }
  };

  if (deckCompleted) {
    return (
      <>
        {finishAudio}
        {correctAudio}
        {incorrectAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-2 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/mascot/mascot-thumbs-up.webp"
            alt="Finish"
            className="hidden lg:block"
            height={300}
            width={300}
          />
          <Image
            src="/mascot/mascot-thumbs-up.webp"
            alt="Finish"
            className="block lg:hidden"
            height={200}
            width={200}
          />
          <h1 className="text-xl leg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve finished the deck.
          </h1>
          <div className="flex items-center gap-x-4 w-full"></div>
        </div>
        <Footer
          onNext={onNext}
          onPrevious={onPrevious}
          deckCompleted={deckCompleted}
        />
      </>
    );
  }

  return (
    <>
      {finishAudio}
      {correctAudio}
      {incorrectAudio}
      <div className="flex-1 my-4">
        <ActiveCard
          card={currentCard}
          isDescriptionShowing={isDescriptionShowing}
          setIsDescriptionShowing={setIsDescriptionShowing}
        />
      </div>
      <Footer onNext={onNext} onPrevious={onPrevious} />
    </>
  );
};
