"use client";
import { compareDesc, isWithinInterval, parseISO, subDays } from "date-fns";
import useSavedMeals from "../_hooks/useSavedMeals";
import { useUserShoppingList } from "../_hooks/useUserShoppingList";
import { useRecipeData } from "../context/RecipeDataContext";
import ActivityCardListItem from "./ActivityCardListItem";
import { INGREDIENT_IMAGE_URL } from "../_config/foodApiConfig";

function ActivityCard() {
  const {  savedRecipeData } = useRecipeData();
  const { savedMeals } = useSavedMeals();
  const { data: userShoppingList } = useUserShoppingList();
  let resentMeal, recentSaved, pendingItem, purchasedItem;
  if (savedMeals) {
    resentMeal = filterAndSortByRecentDates(savedMeals, "created_at", 3)[0];
  }
  if (savedRecipeData) {
    recentSaved = filterAndSortByRecentDates(
      savedRecipeData,
      "created_at",
      3,
    )[0];
  }
  // if (likedRecipesData) {
  //   const recentLike = filterAndSortByRecentDates(
  //     likedRecipesData,
  //     "created_at",
  //     3,
  //   )[0];
  // }
  if (userShoppingList) {
    console.log(userShoppingList);
    const pendingItems = userShoppingList.filter(
      (item) => item.isPurchased === false,
    );
    const purchasedItems = userShoppingList.filter(
      (item) => item.isPurchased === true,
    );
    pendingItem = filterAndSortByRecentDates(pendingItems, "created_at", 3)[0];
    purchasedItem = filterAndSortByRecentDates(
      purchasedItems,
      "created_at",
      3,
    )[0];
    console.log(pendingItem, purchasedItem);
  }

  return (
    <div className="col-span-1 rounded-md bg-green-300 p-4 dark:bg-green-900">
      <h2 className="pb-4 text-xl uppercase"> Activity</h2>
      <ul className="flex flex-col justify-center gap-4">
        {resentMeal && (
          <ActivityCardListItem image={resentMeal.bitebytesRecipes.image}>
            Added {resentMeal.title.slice(0,15)} to meals
          </ActivityCardListItem>
        )}
        {recentSaved && (
          <ActivityCardListItem image={recentSaved.image}>
            bookmarks {recentSaved.title}
          </ActivityCardListItem>
        )}
        {purchasedItem && (
          <ActivityCardListItem
            image={INGREDIENT_IMAGE_URL + "/" + purchasedItem.image}
          >
            Purchased {purchasedItem.name}
          </ActivityCardListItem>
        )}
        {pendingItem && (
          <ActivityCardListItem
            image={INGREDIENT_IMAGE_URL + "/" + pendingItem.image}
          >
            {pendingItem.name} added to cart
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
  const pastDate = subDays(today, dayCount);

  return data
    .filter((item) => {
      const itemDate = parseISO(item[dateKey] as string);
      return isWithinInterval(itemDate, { start: pastDate, end: today });
    })
    .sort((a, b) =>
      compareDesc(
        parseISO(a[dateKey] as string),
        parseISO(b[dateKey] as string),
      ),
    );
}
