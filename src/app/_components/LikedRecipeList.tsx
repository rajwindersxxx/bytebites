"use client";
import { useRecipeData } from "../context/RecipeDataContext";
import RecipeCard from "./RecipeCard";
function LikedRecipeList() {
  const { likedRecipesData } = useRecipeData();
  return (
      <div className="grid h-[calc(100vh-300px)]  items-start min-h-0 grid-cols-3 flex-col gap-4 overflow-y-auto overflow-x-hidden p-3 text-sm [&_.cardDetails]:p-2 [&_.card]:w-full [&_.card]:grid-cols-[0.8fr_1.7fr] [&_h3]:text-sm">
        {likedRecipesData?.map((item) => (
          <RecipeCard data={item} key={item.id} visibleButtons={['like', 'saved']}/>
        ))}
      </div>
  );
}

export default LikedRecipeList;
