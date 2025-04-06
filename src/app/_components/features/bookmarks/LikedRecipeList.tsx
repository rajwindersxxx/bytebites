"use client";
import { useRecipeData } from "../../../_context/RecipeDataContext";
import RecipeCard from "../recipe/RecipeCard";
function LikedRecipeList() {
  const { likedRecipesData } = useRecipeData();
  return (
    <>
      {likedRecipesData && likedRecipesData.length === 0 && (
        <div className="flex h-[calc(100vh-160px)] items-center justify-center border-t text-xl">
          No Recipe liked yet
        </div>
      )}
      <div className="flex max-h-[calc(100vh-160px)] flex-wrap items-start gap-4 overflow-y-auto overflow-x-hidden p-3 text-sm [&_.cardDetails]:p-2 [&_.card]:w-[400px] [&_.card]:grid-cols-[0.8fr_1.7fr] [&_h3]:text-sm">
        {likedRecipesData?.map((item) => (
          <RecipeCard
            data={item}
            key={item.id}
            visibleButtons={["like", "saved"]}
          />
        ))}
      </div>
    </>
  );
}

export default LikedRecipeList;
