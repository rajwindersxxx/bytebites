"use client";
import { HiOutlineHeart, HiOutlineThumbUp } from "react-icons/hi";
import { useRecipeData } from "../context/RecipeDataContext";
import { useEffect, useState } from "react";
interface props {
  recipeId: number;
}
function RecipeDetailButtons({ recipeId }: props) {
  const { toggleLike, likedRecipes, toggleSave, savedRecipes } =
    useRecipeData();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  useEffect(() => {
    setIsLiked(likedRecipes.includes(recipeId));
    setIsSaved(savedRecipes.includes(recipeId));
  }, [likedRecipes, recipeId, savedRecipes]);
  return (
    <div className="flex gap-4">
      <button>
        <HiOutlineThumbUp
          onClick={(e) => {
            e.preventDefault();
            toggleLike(recipeId);
          }}
          className={`h-8 w-8 stroke-natural-terracotta dark:stroke-accent transition-all hover:scale-110 active:scale-125  ${isLiked && "fill-natural-terracotta dark:fill-accent"}`}
        />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleSave(recipeId);
        }}
      >
        <HiOutlineHeart
          className={`h-8 w-8 stroke-natural-terracotta dark:stroke-accent transition-all hover:scale-110 active:scale-125  ${isSaved && "fill-natural-terracotta dark:fill-accent"}`}
        />
      </button>
    </div>
  );
}

export default RecipeDetailButtons;
