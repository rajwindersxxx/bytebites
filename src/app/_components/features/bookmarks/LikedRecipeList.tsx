"use client";
import { useRecipeData } from "../../../context/RecipeDataContext";
import RecipeCard from "../recipe/RecipeCard";
function LikedRecipeList() {
  const { likedRecipesData } = useRecipeData();
  return (
    <div className="h-[calc(100vh-150px)] flex flex-wrap items-start gap-4 overflow-y-auto overflow-x-hidden p-3 text-sm [&_.cardDetails]:p-2 [&_.card]:w-[400px] [&_.card]:grid-cols-[0.8fr_1.7fr] [&_h3]:text-sm">
      {likedRecipesData?.map((item) => (
        <RecipeCard
          data={item}
          key={item.id}
          visibleButtons={["like", "saved"]}
        />
      ))}
    </div>
  );
}

export default LikedRecipeList;
