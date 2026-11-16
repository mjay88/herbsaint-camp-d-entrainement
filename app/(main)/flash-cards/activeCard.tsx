import { cards, wineCards } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

type Props = {
  card: typeof cards.$inferSelect | typeof wineCards.$inferSelect;
  isDescriptionShowing: boolean;
  setIsDescriptionShowing: Dispatch<SetStateAction<boolean>>;
};

export const ActiveCard = ({
  card,
  isDescriptionShowing,
  setIsDescriptionShowing,
}: Props) => {
  const isWineCard = "grapes" in card;

  const handleClick = () => {
    setIsDescriptionShowing((prevState) => !prevState);
  };

  return (
    <div
      className="h-full [perspective:1000px] cursor-pointer overflow-hidden p-3"
      onClick={handleClick}
    >
      <div
        className={cn(
          "relative h-full w-full card-flip",
          isDescriptionShowing && "flipped",
        )}
      >
        {/* Front face */}
        <div className="absolute inset-0 card-face flex items-center justify-center border-2 rounded-2xl">
          <p className="text-neutral-800 text-xl text-center font-extrabold mt-1 bg-white p-2.5 w-7/8">
            {card.title}
          </p>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 card-face card-face-back flex flex-col items-center p-3 pb-6 border-2 rounded-2xl overflow-y-auto">
          {!isWineCard ? (
            <>
              <p className="text-neutral-800 text-base text-center mt-1 bg-white p-2.5">
                {card.description}
              </p>
              <p className="text-neutral-800 text-base text-center mt-1 bg-white p-2.5">
                <span className="font-extrabold">Allergies :</span>{" "}
                {card?.allergies}
              </p>
              <p className="text-neutral-800 text-base text-center mt-1 bg-white p-2.5">
                <span className="font-extrabold">Modifications :</span>{" "}
                {card?.modifications}
              </p>
            </>
          ) : (
            <>
              <p className="text-neutral-800 text-base text-center mt-1 bg-white p-2.5">
                <span className="font-extrabold">Grapes: </span> {card?.grapes}
              </p>
              <p className="text-neutral-800 text-base text-center mt-1 bg-white p-2.5">
                <span className="font-extrabold">Country :</span>{" "}
                {card?.country}
              </p>
              <p className="text-neutral-800 text-base text-center mt-1 bg-white p-2.5">
                <span className="font-extrabold">Country :</span>{" "}
                {card?.producerInfo}
              </p>
              <p className="text-neutral-800 text-base text-center mt-1 bg-white p-2.5">
                {card.description}
              </p>
              <p className="text-neutral-800 text-base text-center mt-1 bg-white p-2.5">
                <span className="font-extrabold">Suggested Pairings :</span>{" "}
                {card.suggestedPairings}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
