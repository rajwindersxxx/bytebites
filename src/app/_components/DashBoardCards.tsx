"use client";

import { IoLogoElectron } from "react-icons/io5";

import DashboardCountCard from "./DashboardCountCard";
import {
  HiOutlineBookmark,
  HiOutlineCalendar,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { useRecipeData } from "../context/RecipeDataContext";
import { useUserShoppingList } from "../_hooks/useUserShoppingList";
import useSavedMeals from "../_hooks/useSavedMeals";
import { filterItemsUntilSaturday } from "../_helper/clientheper";

function DashBoardCards() {
  const { savedRecipeData } = useRecipeData();
  const { data: cartRecipeData } = useUserShoppingList();
  const { savedMeals } = useSavedMeals();
  return (
    <>
      <DashboardCountCard
        heading="Bookmarks"
        count={savedRecipeData?.length}
        label="recipes"
        color="blue"
        icon={<HiOutlineBookmark />}
        link="/dashboard/bookmarks"
      />
      <DashboardCountCard
        heading="weekly meals"
        count={filterItemsUntilSaturday(savedMeals, 'date').length}
        label="meals"
        color="green"
        link="/dashboard/mealPlanner"
        icon={<HiOutlineCalendar />}
      />
      <DashboardCountCard
        heading="Items in Cart"
        count={cartRecipeData?.length}
        label="recipes"
        color="yellow"
        link="/dashboard/shoppingList"
        icon={<HiOutlineShoppingCart />}
      />
      <DashboardCountCard
        heading="AI generated"
        count={0}
        label="recipes"
        color="orange"
        link="/generateRecipe"
        icon={<IoLogoElectron />}
      />
    </>
  );
}

export default DashBoardCards;
