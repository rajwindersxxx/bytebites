"use client";

import { useSearchParams } from "next/navigation";
import { useRecipeData } from "../context/RecipeDataContext";
import RecipeSummary from "./RecipeSummary";
import Ingredients from "./Ingredients";

function RecipeShortDetails() {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("recipeId");
  const { savedRecipeData } = useRecipeData();

  const selectedRecipe = savedRecipeData.filter(
    (item) => item.id === Number(recipeId),
  )[0];
  return (
    <div className="max-h-[calc(100vh-200px)] overflow-y-scroll">
      {selectedRecipe?.extendedIngredients && (
        <Ingredients extendedIngredients={selectedRecipe.extendedIngredients} />
      )}
      {selectedRecipe?.summary && (
        <RecipeSummary summary={selectedRecipe.summary} />
      )}
    </div>
  );
}

export default RecipeShortDetails;
