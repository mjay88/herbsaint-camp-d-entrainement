"use server";

import { ALL_CARD_CATEGORIES } from "@/constants";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { userSavedWineCards, userSavedCards } from "@/db/schema";
import { updateTag } from "next/cache";

/**
 *
 * @param0 - cardId: id of currentCard
 * @param1 - category: typeof ALL_CARD_CATEGRORIES
 *
 *
 * Gets current users saved cards deck
 * Checks if the passed cardId exists in the saved cards deck.
 *  *If the category is "WINES_BY_THE_GLASS", checks userSavedWineCards
 *  *If not, checks userSavedCards
 *
 *
 * If it does, remove it
 * If it doesn't, add it
 *
 * revalidate tags
 *
 *
 */

export const toggleUserSavedCard = async (
  cardToToggleId: number,
  category: (typeof ALL_CARD_CATEGORIES)[number],
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (category === "WINES BY THE GLASS") {
    const foundCard = await db.query.userSavedWineCards.findFirst({
      where: { userId: userId, cardId: cardToToggleId },
    });
    if (!!foundCard) {
      await db
        .delete(userSavedWineCards)
        .where(
          and(
            eq(userSavedWineCards.userId, userId),
            eq(userSavedWineCards.cardId, cardToToggleId),
          ),
        );
    } else {
      await db.insert(userSavedWineCards).values({
        userId: userId,
        cardId: cardToToggleId,
      });
    }
  } else {
    const foundCard = await db.query.userSavedCards.findFirst({
      where: { userId: userId },
    });
    if (!!foundCard) {
      await db
        .delete(userSavedCards)
        .where(
          and(
            eq(userSavedCards.userId, userId),
            eq(userSavedCards.cardId, cardToToggleId),
          ),
        );
    } else {
      await db.insert(userSavedCards).values({
        userId: userId,
        cardId: cardToToggleId,
      });
    }
  }

  updateTag(`user-saved-cards-${userId}`);
  updateTag(`flashcard-by-category:${category}-${userId}`);
  updateTag(`flashcard-by-category:SAVED-${userId}`);
  return;
};
