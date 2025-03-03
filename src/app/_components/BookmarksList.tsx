"use client";
import { useRecipeData } from "../context/RecipeDataContext";
import RecipeCard from "./RecipeCard";
import Spinner from "./Spinner";
interface props {
  detailLink?: string
}
function BookmarksList({detailLink}: props) {
  const { savedRecipeData, isLoadingSavedRecipes } = useRecipeData();
  if (isLoadingSavedRecipes) return <Spinner className="col-span-1" />;
  return (
    <div className="flex max-h-[calc(100vh-200px)] min-h-0 flex-col gap-4 overflow-y-auto overflow-x-hidden p-3 text-sm [&_.cardDetails]:p-2 [&_.card]:w-[20rem] [&_.card]:grid-cols-[0.8fr_1.7fr] [&_h3]:text-sm ">
      {savedRecipeData.map((item) => (
          <RecipeCard key={item.id}
            data={item}
            detailsLink={`${detailLink}/?recipeId=${item.id}`}
          />
      ))}
    </div>
  );
}

export default BookmarksList;
