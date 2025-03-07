"use client";
import { uniqueId } from "lodash";
import { useRecipeData } from "../context/RecipeDataContext";
import RecipeCard from "./RecipeCard";
import Spinner from "./Spinner";

interface props {
  detailLink?: string;
  visibleButtons?: string[];
}
function BookmarksList({ detailLink, visibleButtons }: props) {
  const { savedRecipeData, isLoadingSavedRecipes } = useRecipeData();
  if (isLoadingSavedRecipes) return <Spinner className="col-span-1" />;
  return (
    <div className="flex h-[calc(100vh-250px)] min-h-0 flex-col gap-4 overflow-y-auto overflow-x-hidden p-3 text-sm [&_.cardDetails]:p-2 [&_.card]:w-full [&_.card]:grid-cols-[0.8fr_1.7fr] [&_h3]:text-sm">
      {savedRecipeData.map((item) => (
        <RecipeCard
          key={uniqueId()}
          data={item}
          detailsLink={`${detailLink}/?recipeId=${item.id}`}
          visibleButtons={visibleButtons ? visibleButtons : ["cart", "saved"]}
        />
      ))}
    </div>
  );
}

export default BookmarksList;
