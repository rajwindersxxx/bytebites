"use client";
import { useRecipeData } from "../context/RecipeDataContext";
import RecipeCard from "./RecipeCard";

function BookmarksList() {
  const { savedRecipeData } = useRecipeData();
  return (
    <div className="flex max-h-[calc(100vh-200px)] min-h-0 flex-col gap-4 overflow-y-auto p-3 [&_h3]:text-sm text-sm  [&_.card]:grid-cols-[0.8fr_1.7fr] [&_.card]:w-[20rem] [&_.cardDetails]:p-2">
      {savedRecipeData.map((item) => (
        <RecipeCard
          key={item.id}
          data={item}
          detailsLink={`/dashboard/bookmarks?recipeId=${item.id}`}
        />
      ))}
    </div>
  );
}

export default BookmarksList;
