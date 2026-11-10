import { getCustomCardsByCategory } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { convertCategory } from "@/lib/utils";

type Props = {
  params: PageProps<"/flash-cards/[category]">["params"];
};

export const CategoryContent = async ({ params }: Props) => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) {
    return redirectToSignIn();
  }

  const { category } = await params;
  const cards = await getCustomCardsByCategory(convertCategory(category), userId);
  
  console.log("cards", cards)
  //create a deck component, the deck will handle foward, backwards, saving cards
  
  //flashcard component is a child of the deck component
  

  return (<h1>
    {convertCategory(category)}
  </h1>)
};
