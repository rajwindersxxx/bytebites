"use client";
import { IoLogoElectron } from "react-icons/io5";
import {
  HiOutlineBookmark,
  HiOutlineCalendar,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { useRecipeData } from "@/app/context/RecipeDataContext";
import { useUserShoppingList } from "@/app/_hooks/useUserShoppingList";
import useSavedMeals from "@/app/_hooks/useSavedMeals";
import DashboardCountCard from "../../ui/DashboardCountCard";
import { filterItemsUntilSaturday } from "@/app/_helper/clientheper";

function DashBoardCards() {
  const { savedRecipeData } = useRecipeData();
  const { userShoppingList } = useUserShoppingList();
  const { savedMeals } = useSavedMeals();
  return (
    <>
      <DashboardCountCard
        heading="Bookmarks"
        count={savedRecipeData?.length}
        label="recipes"
        color="blue"
        icon={<HiOutlineBookmark />}
        link="/bookmarks"
      />
      <DashboardCountCard
        heading="weekly meals"
        count={filterItemsUntilSaturday(savedMeals, "date").length}
        label="meals"
        color="green"
        link="/mealPlanner"
        icon={<HiOutlineCalendar />}
      />
      <DashboardCountCard
        heading="Items in Cart"
        count={userShoppingList?.length}
        label="recipes"
        color="yellow"
        link="/shoppingList"
        icon={<HiOutlineShoppingCart />}
      />
      <DashboardCountCard
        heading="AI generated"
        count={0}
        label="recipes"
        color="orange"
        link="/bookmarks"
        icon={<IoLogoElectron />}
      />
    </>
  );
}

export default DashBoardCards;
