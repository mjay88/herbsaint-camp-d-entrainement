import { getCustomCardsByCategory, getUserSavedCards } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { convertCategory } from "@/lib/utils";
import { CategoryClient } from "./category-client";

type Props = {
  params: PageProps<"/flash-cards/[category]">["params"];
};

export const CategoryContent = async ({ params }: Props) => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) {
    return redirectToSignIn();
  }

  const { category } = await params;
  const cards = await getCustomCardsByCategory(
    convertCategory(category),
    userId,
  );

  const userSavedCards = await getUserSavedCards(userId);

  // console.log("cards", cards);
  console.log("userSavedCard", userSavedCards);
  //add the header, footer, deck component here.

  return (
    <div className="flex flex-col h-full w-full">
     <CategoryClient cards={cards} savedCards={userSavedCards} />
    </div>
  );
};
