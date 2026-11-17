import { cards, wineCards } from "@/db/schema";
import { useState, useTransition } from "react";
import { ActiveCard } from "./activeCard";
import { Footer } from "./footer";
import Confetti from "react-confetti";
import Image from "next/image";
import { useAudio, useWindowSize } from "react-use";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Header } from "./header";
import { ALL_CARD_CATEGORIES } from "@/constants";
import { toggleUserSavedCard } from "@/actions/save-flashcards";
type Props = {
  cards: (typeof cards.$inferSelect | typeof wineCards.$inferSelect)[] | [];
  savedCards:
    | (typeof cards.$inferSelect | typeof wineCards.$inferSelect)[]
    | []
    | null;
  //   category: typeof ALL_CARD_CATEGORIES;
};

export const Deck = ({ cards, savedCards }: Props) => {
  //need action to save card

  //TODO: eventually need to optimize to track current card somehow
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardSaved, setIsCardSaved] = useState(() => {
    if (!cards[currentIndex]) return false;
    return !!savedCards?.find((card) => card.id === cards[currentIndex]?.id);
  });

  const [pending, startTransition] = useTransition();

  const [isDescriptionShowing, setIsDescriptionShowing] =
    useState<boolean>(false);
  const [swipe, setSwipe] = useState<{
    dir: "left" | "right";
    phase: "out" | "in";
  } | null>(null);

  const isEmptyDeck = cards.length === 0;
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
      setSwipe(null);
      setCurrentIndex(0);
      //TODO: opted to go with with window.location.href = `/flash-cards`) because I couldn't get it to refresh when navigating to the previous deck
      //Is this possibly development only behavior?
      window.location.href = `/flash-cards`;
      //   router.push("/flash-cards");
      return;
    } else if (isEmptyDeck) {
      window.location.href = `/flash-cards`;
    } else {
      setSwipe({ dir: "left", phase: "out" });
    }
  };

  const onPrevious = () => {
    //TODO: handle edge case of first card
    if (isFirstCard) return null;
    if (deckCompleted) {
      setCurrentIndex(0);
    } else {
      setSwipe({ dir: "right", phase: "out" });
    }
  };

  const toggleSavedCard = () => {
    startTransition(() => {
      toggleUserSavedCard(currentCard.id, currentCard.category)
        .then((res) => {
          setIsCardSaved((prevState) => !prevState);
        })
        .catch(() =>
          toast.error(
            "Something went wrong when trying to save the card. Please try again.",
          ),
        );
    });
  };

  if (isEmptyDeck) {
    return (
      <>
        {finishAudio}
        {correctAudio}
        {incorrectAudio}
        <div className="flex flex-col gap-y-2 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/mascot/mascot-thumbs-up.webp"
            alt="Finish"
            className="hidden lg:block"
            height={300}
            width={300}
          />
          <Image
            src="/mascot/mascot-greeting.svg"
            alt="Finish"
            className="block lg:hidden"
            height={200}
            width={200}
          />
          <h1 className="text-xl leg:text-3xl font-bold text-neutral-700">
            Your deck is Empty! <br /> Add cards to your saved deck to practice
            them.
          </h1>
          <div className="flex items-center gap-x-4 w-full"></div>
        </div>
        <Footer
          onNext={onNext}
          onPrevious={onPrevious}
          deckCompleted={deckCompleted}
          isEmptyDeck={isEmptyDeck}
        />
      </>
    );
  }

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
      <Header isCardSaved={isCardSaved} toggleSavedCard={toggleSavedCard} />
      <div className="flex-1 my-4 overflow-hidden">
        <div
          className={cn(
            "h-full",
            swipe &&
              `swipe-${swipe.phase}-${swipe.phase === "out" ? swipe.dir : swipe.dir === "left" ? "right" : "left"}`,
          )}
          //fires whenever an animation finishes
          onAnimationEnd={(e) => {
            if (e.target !== e.currentTarget || !swipe) return; // ignore bubbled child animations
            if (swipe.phase === "out") {
              setCurrentIndex((i) => i + (swipe.dir === "left" ? 1 : -1));
              setIsDescriptionShowing(false);
              setSwipe({ dir: swipe.dir, phase: "in" });
            } else {
              setSwipe(null);
            }
          }}
        >
          <ActiveCard
            key={currentCard.id}
            card={currentCard}
            isDescriptionShowing={isDescriptionShowing}
            setIsDescriptionShowing={setIsDescriptionShowing}
          />
        </div>
      </div>
      <Footer
        onNext={onNext}
        onPrevious={onPrevious}
        disabled={swipe !== null}
      />
    </>
  );
};
