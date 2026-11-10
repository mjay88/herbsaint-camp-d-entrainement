import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";
import { auth } from "@clerk/nextjs/server";
import { ALL_CARD_CATEGORIES } from "@/constants";

const FlashcardPage = async () => {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }

  const categories = ALL_CARD_CATEGORIES;
  
 //TODO: use ALL_CARD_CATEGORIES in constants for deck list.

 //Pass to List, get list to render first
  //user saved cards will be empty? handle user saved cards edge case. (Just need it to appear regardless).

//When a deck is clicked, navigate to flashcards/[category]
  //child will fetch category specific cards



  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Choose a Deck to Practice</h1>
      <List 
      categories={categories} 
      
    />
    </div>
  );
};

export default FlashcardPage;
