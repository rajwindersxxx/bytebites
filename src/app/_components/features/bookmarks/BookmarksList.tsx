"use client";

import { useRecipeData } from "@/app/context/RecipeDataContext";
import Spinner from "../../ui/Spinner";
import RecipeCard from "../recipe/RecipeCard";

interface props {
  detailLink?: string;
  visibleButtons?: string[];
}
function BookmarksList({ detailLink, visibleButtons }: props) {
  const { savedRecipeData, isLoadingSavedRecipes } = useRecipeData();
  if (isLoadingSavedRecipes) return <Spinner className="col-span-1" />;
  if (savedRecipeData?.length === 0)
    return (
      <div className="flex h-full items-center justify-center border-r p-4 text-xl">
        No bookmarks Yet
      </div>
    );
  return (
    <>
      <div className="flex h-[calc(100vh-8.125rem)] min-h-0 flex-col gap-4 overflow-y-auto overflow-x-hidden p-3 text-sm [&_.cardDetails]:p-2 [&_.card]:w-full [&_.card]:grid-cols-[0.8fr_1.7fr] [&_h3]:text-sm ">
        {savedRecipeData?.map((item) => (
          <RecipeCard
            key={item.id}
            data={item}
            detailsLink={`${detailLink}/?recipeId=${item.id}`}
            visibleButtons={visibleButtons ? visibleButtons : ["cart", "saved"]}
          />
        ))}
      </div>
    </>
  );
}

export default BookmarksList;
