"use client";
import { HiOutlineHeart, HiOutlineThumbUp } from "react-icons/hi";
import { useRecipeData } from "../../../context/RecipeDataContext";
import { useEffect, useState } from "react";
import { BarsSpinner } from "../../ui/Spinner";
interface props {
  recipeId: number;
}
function RecipeDetailButtons({ recipeId }: props) {
  const { toggleLike, likedRecipes, toggleSave, savedRecipes, isSavePending, isLikePending } =
    useRecipeData();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  useEffect(() => {
    setIsLiked(likedRecipes.includes(recipeId));
    setIsSaved(savedRecipes.includes(recipeId));
  }, [likedRecipes, recipeId, savedRecipes]);
  return (
    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-4 sm:relative sm:left-0 sm:-translate-x-0">
      <button>
       {isLikePending ? <BarsSpinner className="w-8 h-8"/>:  <HiOutlineThumbUp
          onClick={(e) => {
            e.preventDefault();
            toggleLike(recipeId);
          }}
          className={`h-8 w-8 stroke-natural-terracotta transition-all hover:scale-110 active:scale-125 dark:stroke-accent ${isLiked && "fill-natural-terracotta dark:fill-accent"}`}
        />}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleSave(recipeId);
        }}
      >
        {isSavePending ? <BarsSpinner className="w-8 h-8"/> : <HiOutlineHeart
          className={`h-8 w-8 stroke-natural-terracotta transition-all hover:scale-110 active:scale-125 dark:stroke-accent ${isSaved && "fill-natural-terracotta dark:fill-accent"}`}
        />}
      </button>
    </div>
  );
}

export default RecipeDetailButtons;
