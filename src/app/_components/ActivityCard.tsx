"use client";
import { compareDesc, isWithinInterval, parseISO, subDays } from "date-fns";
import ActivityCardListItem from "./ActivityCardListItem";
import useSavedMeals from "../_hooks/useSavedMeals";
import { useUserShoppingList } from "../_hooks/useUserShoppingList";
import { useRecipeData } from "../context/RecipeDataContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLikedRecipes } from "../_hooks/useLikedRecipes";
import { useSession } from "next-auth/react";
import { useSavedRecipes } from "../_hooks/useSavedRecipes";

function ActivityCard() {
  const session = useSession();
  const userId = session.data?.user?.id;

  // user meals data
  const { savedMeals } = useSavedMeals();
  // user shopping cart data
  const { data: userShoppingList } = useUserShoppingList();
  // suser saved data
  const { likedRecipesData } = useLikedRecipes(Number(userId));
  const { savedRecipeData } = useSavedRecipes(Number(userId));
  const resentMeal = filterAndSortByRecentDates(savedMeals, "created_at", 3)[0];
  const resetLike = filterAndSortByRecentDates(
    likedRecipesData,
    "created_at",
    3,
  )[0];
  const recentSave = filterAndSortByRecentDates(
    savedRecipeData,
    "created_at",
    3,
  )[0];
  const pendingItems = userShoppingList?.filter(
    (item) => item.isPurchesed === false,
  );
  const purchasedItems = userShoppingList?.filter(
    (item) => item.isPurchesed === true,
  );
  console.log(recentSave);
  return (
    <div className="col-span-1 rounded-md bg-green-300 p-4 dark:bg-green-900">
      <h2 className="pb-4 text-xl uppercase"> Activity</h2>
      <ul className="flex flex-col justify-center gap-4">
        {resentMeal && (
          <ActivityCardListItem image={resentMeal.bitebytesRecipes.image}>
            Added {resentMeal.title} to meals
          </ActivityCardListItem>
        )}
        {/* {savedRecipeData && (
          <ActivityCardListItem image={'/x.jpg'}>
            bookmarks {recentSave.title}
          </ActivityCardListItem>
        )} */}
        {pendingItems && (
          <ActivityCardListItem image={"/x.jpg"}>
            recipe Name added to cart
          </ActivityCardListItem>
        )}
        {purchasedItems && (
          <ActivityCardListItem image={"/x.jpg"}>
            ingredient is purchased
          </ActivityCardListItem>
        )}
      </ul>
    </div>
  );
}

export default ActivityCard;

function filterAndSortByRecentDates<T>(
  data: T[],
  dateKey: keyof T,
  dayCount: number,
): T[] {
  const today = new Date();
  const pastDate = subDays(today, dayCount); // Get the date `dayCount` days ago

  return data
    .filter((item) => {
      const itemDate = parseISO(item[dateKey] as string); // Convert string to Date
      return isWithinInterval(itemDate, { start: pastDate, end: today });
    })
    .sort((a, b) =>
      compareDesc(
        parseISO(a[dateKey] as string),
        parseISO(b[dateKey] as string),
      ),
    );
}
